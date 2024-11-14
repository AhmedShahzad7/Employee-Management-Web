
function getEmployees() 
{
    return JSON.parse(localStorage.getItem('employees')) || [];
}

function saveEmployees(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
}

function getEmployeeById(id) {
    const employees = getEmployees();
    return employees.find(employee => employee.id === id);
}


document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('emp-name').value;
    const empId = document.getElementById('emp-id').value;
    
    const employee = getEmployeeById(empId);
    if (employee && employee.name === name) {
        localStorage.setItem('loggedInEmployee', empId);
        window.location.href = 'Tasks.html';
    } else {
        alert('Employee not found!');
    }
});

if (document.getElementById('task-table')) {
    const loggedInEmployeeId = localStorage.getItem('loggedInEmployee');
    const employee = getEmployeeById(loggedInEmployeeId);
    
    if (employee) {
        const taskTableBody = document.querySelector('#task-table tbody');
        employee.tasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.deadline}</td>
                <td>${task.completed ? 'Completed' : 'Pending'}</td>
                <td><button onclick="markTaskCompleted(${loggedInEmployeeId}, ${index})">${task.completed ? 'Completed' : 'Mark as Completed'}</button></td>
            `;
            taskTableBody.appendChild(row);
        });
    }
}


function markTaskCompleted(empId, taskIndex) {
    const employees = getEmployees();
    const employee = employees.find(emp => emp.id === empId);
    if (employee && employee.tasks[taskIndex]) {
        employee.tasks[taskIndex].completed = true;
        saveEmployees(employees);
        location.reload(); 
    }
}


if (document.getElementById('employee-form')) {
    const form = document.getElementById('employee-form');
    const employees = getEmployees();
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('emp-name').value;
        const role = document.getElementById('emp-role').value;
        const department = document.getElementById('emp-department').value;
        const salary = document.getElementById('emp-salary').value;
        const tasks = []; 
        
        const employeeId = Date.now().toString(); 
        
        employees.push({
            id: employeeId,
            name: name,
            role: role,
            department: department,
            salary: salary,
            tasks: tasks
        });
        
        saveEmployees(employees);
        window.location.href = 'EmployeeList.html'; // Redirect to employee list after save
    });
}

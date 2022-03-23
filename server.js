// Dependencies 
const mysql = require("mysql")
const consoleTable = require('console.table');
const inquirer = require("inquirer")
const express = require("express")
const chalk = require("chalk")
chalk.enabled = true
console.log(chalk.blueBright('I am working'));

// Creating connection to sql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_database_cms"
  });


connection.connect(function(err) {
    if (err) throw err
    console.log("Connected ID " + connection.threadId)
    startInq();
});


console.log(chalk.black.bgWhiteBright(`
-----------------------------------------------
╔═╗┌┬┐┌─┐┬  ┌─┐┬ ┬┌─┐┌─┐  ╔╦╗┌─┐┌┐┌┌─┐┌─┐┌─┐┬─┐
║╣ │││├─┘│  │ │└┬┘├┤ ├┤   ║║║├─┤│││├─┤│ ┬├┤ ├┬┘
╚═╝┴ ┴┴  ┴─┘└─┘ ┴ └─┘└─┘  ╩ ╩┴ ┴┘└┘┴ ┴└─┘└─┘┴└─
____Select an option below to get started _____
-----------------------------------------------
`));

// Prompt User 
const startInq = () => {
  inquirer.prompt([
      {
        name: 'choices',
        type: 'list',
        message: 'Select:',
        choices: [
         "View All Employees", 
         "Add Employee",
         "Update Employee Role", 
         "View All Roles",
         "Add Role",
         "View All Departments",
         "Add Department",
         "Exit",
          ]
      }
    ])
    .then((answers) => {
      const {choices} = answers;

        if (choices === 'View All Employees') {
        viewAllEmployees();
        }
        
        if (choices === 'Add Employee') {
        addEmployee();
      }

      if (choices === 'Update Employee Role') {
        updateEmployeeRole();
      }

        if (choices === 'View All Roles') {
        viewAllRoles();
      }

        if (choices === 'Add Role') {
        addRole();
       }

        if (choices === 'View All Departments') {
        viewAllDepartments();
      }

        if (choices === 'Add Department') {
        addDepartment();
       }

        if (choices === 'Exit') {
            connection.end();
        }
  });
};

// VIEW ----------------------------------------------------------------------------------------------------------------------------------
// View All Employees
function viewAllEmployees() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
  function(err, res) {
    if (err) throw err
    console.log(`All Employees:`);
    console.table(res)
    startInq()
})
}

// View All Roles
function viewAllRoles() {
connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
function(err, res) {
if (err) throw err
console.log(`All Roles:`);
console.table(res)
startInq()
})
}


// View All Departments
function viewAllDepartments() {
connection.query("SELECT department.id AS id, department.name AS department FROM department;", 
function(err, res) {
if (err) throw err
    console.log(`All Departments:`);
    console.table(res)
    startInq();
  });
};

// MENU/SELECT -------------------------------------------------------------------------------------------------------------------------------
// Creating a roles array 
var rolesArray = [];
function selectRole() {
connection.query("SELECT * FROM role", function(err, res) {
  if (err) throw err
  for (var i = 0; i < res.length; i++) {
    rolesArray.push(res[i].title);
  }
})
return rolesArray;
}

// If the employee does not have a manager (null), it means they have manager status
var managersArray = [];
function selectManager() {
connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
  if (err) throw err
  for (var i = 0; i < res.length; i++) {
    managersArray.push(res[i].first_name);
  }

})
return managersArray;
}

//ADD-------------------------------------------------------------------------------------------------------------------------------
//Add an Employee
function addEmployee() { 
  inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter a first name"
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter a last name"
      },
      {
        name: "role",
        type: "list",
        message: "Enter the role title",
        choices: selectRole()
      },
      {
          name: "choice",
          type: "rawlist",
          message: "Select a manager",
          choices: selectManager()
      }

  ]).then(function (val) {
    let roleId = selectRole().indexOf(val.role) + 1
    let managerId = selectManager().indexOf(val.choice) + 1
    connection.query("INSERT INTO employee SET ?", 
    {
        first_name: val.firstName,
        last_name: val.lastName,
        manager_id: managerId,
        role_id: roleId
        
    }, function(err){
        if (err) throw err
        console.table(val)
        startInq()
    })
})
}

// Add a Role
function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function (err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "Enter the name of the role"
        },
        {
          name: "Salary",
          type: "input",
          message: "Enter the salary (must be a number)"
  
        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startInq();
            }
        )
    });
  });
  }

//Add a Department
const addDepartment = () => {
   const question = [
    {
      type: "input",
      name: "name",
      message: "Enter the name of the new department"
    }];
    
  inquirer.prompt(question)
  .then(response => {
    const query = `INSERT INTO department (name) VALUES (?)`;
    connection.query(query, [response.name], (err, res) => {
      if (err) throw err;
      console.table(res);
      console.log(`New ${response.name} department at ID ${res.insertId}`);
      startInq();
    });
  })
  .catch(err => {
    console.error(err);
  });
}

// UPDATE -------------------------------------------------------------------------------------------------------------------
// Update Employee Role
const updateEmployeeRole = () => {
  connection.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
    if (err) throw err;
    const selectedEmployee = [];
    emplRes.forEach(({ first_name, last_name, id }) => {
      selectedEmployee.push({
        name: first_name + " " + last_name,
        value: id
      });
    });
    connection.query("SELECT * FROM ROLE", (err, rolRes) => {
      if (err) throw err;
      const selectedRole = [];
      rolRes.forEach(({ title, id }) => {
       selectedRole.push({
          name: title,
          value: id
          });
        });
     
      const questions = [
        {
          type: "list",
          name: "id",
          choices: selectedEmployee,
          message: "Select an Employee to update"
        },
        {
          type: "list",
          name: "role_id",
          choices:selectedRole,
          message: "Choose a new role"
        }
      ]
  
      inquirer.prompt(questions)
        .then(response => {
          const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
          connection.query(query, [
            {role_id: response.role_id},
            "id",
            response.id
          ], (err, res) => {
            if (err) throw err;
            
            console.log("Employee updated");
            startInq();
          });
        })
        .catch(err => {
          console.error(err);
        });
      })
  });
}


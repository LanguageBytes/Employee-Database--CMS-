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

// Prompt User for Choices
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

// VIEW

// View All Employees
function viewAllEmployees() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startInq()
})
}

// View All Roles
function viewAllRoles() {
connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
function(err, res) {
if (err) throw err
console.table(res)
startInq()
})
}


// View All Departments
function viewAllDepartments() {
connection.query("SELECT department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
function(err, res) {
  if (err) throw err
  console.table(res)
  startInq()
})
}

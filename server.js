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

"View All Employees", 
"Add Employee",
"Update Employee role?", 
"View All Roles",
"Add Role",
"View All Departments",
"Add Department",
"Quit"

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
         "Update Employee role?", 
         "View All Roles",
         "Add Role",
         "View All Departments",
         "Add Department",
         "Quit",
         'Exit'
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

        if (choices === 'View All Roles') {
        viewAllRoles();
      }

        if (choices === 'Add Role') {
        addRole();
       }

        if (choices === 'View All Departments') {
          viewAllDepartments();
      }

        if (choices === 'Add a Department') {
        addDepartment();
       }

        if (choices === 'Exit') {
            connection.end();
        }
  });
};
 
viewAllEmployees()


addEmployee()


addRole()


viewAllDepartments()

addDepartment()




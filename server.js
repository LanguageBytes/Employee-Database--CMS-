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


console.log(chalk.black.bgCyanBright(`_______________________________________________
╔═╗┌┬┐┌─┐┬  ┌─┐┬ ┬┌─┐┌─┐  ╔╦╗┌─┐┌┐┌┌─┐┌─┐┌─┐┬─┐
║╣ │││├─┘│  │ │└┬┘├┤ ├┤   ║║║├─┤│││├─┤│ ┬├┤ ├┬┘
╚═╝┴ ┴┴  ┴─┘└─┘ ┴ └─┘└─┘  ╩ ╩┴ ┴┘└┘┴ ┴└─┘└─┘┴└─
____Select an option below to get started _____
_______________________________________________
`));

startInq() 
  inquirer.prompt([
  {
  type: "list",
  message: "What would you like to do?",
  name: "choice",
  choices: [
            "View All Employees?", 
            "View All Employee's By Roles?",
            "View all Emplyees By Deparments", 
            "Update Employee",
            "Add Employee?",
            "Add Role?",
            "Add Department?"
          ]
}
  ])



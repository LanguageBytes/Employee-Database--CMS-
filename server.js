// Dependencies 
const mysql = require("mysql")
const consoleTable = require('console.table');
const inquirer = require("inquirer")
const express = require("express")

// Creating connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_database_cms"
  });


connection.connect(function(err) {
    if (err) throw err
    console.log("Connected ID" + connection.threadId)
    startInq();
});

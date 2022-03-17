-- Department
INSERT INTO department (name)
VALUE ("HR");

-- Employee Role
INSERT INTO role (title, salary, department_id)
VALUE ("HR manager", 160000, 24);

-- Employee info
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Smith", 2, 3);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
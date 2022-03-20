

INSERT INTO department (name)
VALUE ("HR");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Marketing");
INSERT INTO department (name)
VALUE ("Management");


INSERT INTO role (title, salary, department_id)
VALUE ("Back-End Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Front-End Engineer", 120000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("CEO", 155000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Brand Manager", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Head of HR", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Customer Support", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("SEO Specialist", 120000, 4);


INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Roger", "Smith", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lea", "Rodriguez", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Andrey","Ivanov", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sue", "Brown", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Roshini", "Mordani", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Carl", "Dawson", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Soloman", "Stein", 2, 7);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

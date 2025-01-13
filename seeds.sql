INSERT INTO department (id, name)
VALUES 
(1, 'Engineering'),
(2, 'Marketing');

INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, 'Software Engineer', 80000, 1),
(2, 'Marketing Manager', 60000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, 'John', 'Doe', 1, 12),
(2, 'Jane', 'Smith', 2, 31);
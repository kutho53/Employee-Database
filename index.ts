require('dotenv').config();
//import dotenv from 'dotenv';
const pg = require('pg');
const inquirer = require('inquirer');
//import pg from 'pg';

//dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

  
// write function for viewDepartments()
async function viewDepartments(){
  const res = await pool.query(
    `SELECT id, name 
    FROM department
    ORDER BY name`)
  console.log('---Departments---');
  console.table(res.rows);
}
// write function for viewRoles()
async function viewRoles(){
  const res = await pool.query('SELECT * FROM role')
  console.log('---Roles---')
  console.table(res.rows);
}
// write function for viewEmployees()
async function viewEmployees(){
  const res = await pool.query('SELECT * FROM employee')
  console.log('---Employees---')
  console.table(res.rows);
}
// write function for addDepartment()
async function addDepartment(){
  const response = await inquirer.prompt([
    {
      name: 'id',
      type: 'input',
      message: 'Department ID#: '
    },
    {
      name: 'name',
      type: 'input',
      message: 'Department Name: '
    }
  ])

  const res = await pool.query(`INSERT INTO department (id, name) VALUES ($1, $2) RETURNING *`, [response.id, response.name])
  console.log('Department');
  console.table(res.rows[0]);
}
// write function for addRole()
async function addRole(){
  const response = await inquirer.prompt([
    {
      name: 'id',
      type: 'input',
      message: 'Role ID#: '
    },
    {
      name: 'title',
      type: 'input',
      message: 'Title: '
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Salary: '
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Department ID#: '
    }
  ])

  const res = await pool.query(`INSERT INTO role (id, title, salary, department_id) VALUES ($1, $2, $3, $4) RETURNING *`, [response.id, response.title, response.salary, response.department_id])
  console.log('Role');
  console.table(res.rows[0]);
}
// write function for addEmployee()
async function addEmployee(){
  const response = await inquirer.prompt([
    {
      name: 'id',
      type: 'input',
      message: 'Employee ID#: '
    },
    {
      name: 'first_name',
      type: 'input',
      message: 'First Name: '
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Last Name: '
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Role ID#: '
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Manager ID#: '
    }
  ])

  const res = await pool.query(`INSERT INTO EMPLOYEE (id, first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [response.id, response.first_name, response.last_name, response.role_id, response.manager_id])
  console.log('---Employee---');
  console.table(res.rows[0]);
}
// write function for updateEmployeeRole()
async function updateEmployeeRole(){
  const response = await inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'ID # of employee to be updated:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'New role ID#:'
    }
  ])

  const res = await pool.query(`UPDATE employee SET role_id  = $2 where id = $1 RETURNING *`, [response.employee_id, response.role_id])
  console.log('---Updated Roles---');
  console.table(res.rows);
}
//initPrompt is the start point
function initPrompt() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'startMenu',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role'
          ]
      }
    ])
    .then((answers) => {
      let selection = answers.startMenu

        if (selection === 'View all departments'){
          viewDepartments();
        } else

        if (selection === 'View all roles'){
          viewRoles();
        } else

        if (selection === 'View all employees'){
          viewEmployees();
        } else

        if (selection === 'Add a department'){
          addDepartment();
        } else

        if (selection === 'Add a role'){
          addRole();
        } else

        if (selection === 'Add an employee'){
          addEmployee();
        } else

        if (selection === 'Update an employee role'){
          updateEmployeeRole();
        }
      })

      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
    });
  }

  initPrompt()
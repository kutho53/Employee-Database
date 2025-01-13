require('dotenv').config();
const db = require('pg');
const inquirer = require('inquirer');
import pg from 'pg';

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

export { pool, connectToDb };



  
// write function for viewDepartments()
async function viewDepartments(){
  const res = await pool.query('SELECT * FROM department')
  console.log('Departments');
  console.table(res);
}
// write function for viewRoles()
async function viewRoles(){
  const res = await pool.query('SELECT * FROM role')
  console.log('Roles')
  console.table(res);
}
// write function for viewEmployees()
async function viewEmployees(){
  const res = await pool.query('SELECT * FROM employee')
  console.log('Employees')
  console.table(res);
}
// write function for addDepartment()
async function addDepartment(){
  inquirer.prompt([
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

  const res = await pool.query('INSERT INTO department (id, nameg),')
  console.log('user:', res.rows[0]);
  console.table(res);
}
// write function for addRole()

// write function for addEmployee()

// write function for updateEmployeeRole()

//startCli is the start point
function initPrompt(): void {
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
          'Update an employee role']
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
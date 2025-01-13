import Department from departmentInfo.js;


const inquirer = require('inquirer');
  
// write function for viewDepartments()
// write function for viewRoles()
// write function for viewEmployees()
// write function for addDepartment()
// write function for addRole()
// write function for addEmployee()
// write function for updateEmployeeRole()

//startCli is the start point
function startCli(): void {
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
          this.viewDepartments();
        } else

        if (selection === 'View all roles'){
          this.viewRoles();
        } else

        if (selection === 'View all employees'){
          this.viewEmployees();
        } else

        if (selection === 'Add a department'){
          this.addDepartment();
        } else

        if (selection === 'Add a role'){
          this.addRole();
        } else

        if (selection === 'Add an employee'){
          this.addEmployee();
        } else

        if (selection === 'Update an employee role'){
          this.updateEmployeeRole();
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
const inquirer = require('inquirer');
const fs = require('fs/promises');
const path = require('path');

const usersPath = path.join(__dirname, 'users.txt');

const listUsers = async () => {
  const data = await fs.readFile(usersPath);
  return JSON.parse(data);
}

const addUser = async (user) => {
  const users = await listUsers();
  users.push(user);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2))
  console.log('User added successfully!');
}

const findUser = async (name) => {
  const users = await listUsers();
  const user = users.find(item => item.name.toLowerCase() === name.toLowerCase());
  return user || null;
}

function startApp() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter user name (Press ENTER to finish adding users):',
      },
    ])
    .then(answers => {
      const { name } = answers;
      if (name === '') {
        searchUser();
        return;
      }

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'gender',
            message: 'Choose gender:',
            choices: ['Male', 'Female', 'Other'],
          },
          {
            type: 'input',
            name: 'age',
            message: 'Enter age:',
          },
        ])
        .then(async userInfo => {
          const user = {
            name: name,
            gender: userInfo.gender,
            age: userInfo.age,
          };
          await addUser(user);
          startApp();
        });
    });
}

function searchUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'search',
        message: 'Search for a user by name?',
        choices: ['Yes', 'No'],
      },
    ])
    .then(answer => {
      if (answer.search === 'No') {
        console.log('Exiting the application. Goodbye!');
        return;
      }

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'searchName',
            message: 'Enter user name to search:',
          },
        ])
        .then(async answer => {
          const { searchName } = answer;
          const foundUser = await findUser(searchName);

          if (foundUser) {
            console.log('User found:');
            console.log(`Name: ${foundUser.name}`);
            console.log(`Gender: ${foundUser.gender}`);
            console.log(`Age: ${foundUser.age}`);
          } else {
            console.log('User not found in the database.');
          }
          searchUser();
        });
    });
}

startApp();

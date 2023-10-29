const readline = require('readline');
const { uniqueValues, existInAllFiles, existInAtleastTen } = require('./helpers');

const question = 'Select one option\n' +
'1. View the total number of unique usernames\n' +
'2. View the numbers usernames occur in all files\n' +
'3. View the numbers usernames occur in at least 10 files\n' +
'Enter the number of your choice: '

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(question, (choise) => {

  switch(choise) {
    case '1':
      uniqueValues();
      rl.close();
      break;
    case '2': 
      existInAllFiles();
      rl.close();
      break;
    case '3':
      existInAtleastTen();
      rl.close();
    default:
      console.log('Invalid choice. Please choose a valid option.');
      rl.close();
  }
})


















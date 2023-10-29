const readline = require('readline');

const message = 'Enter a few words or numbers separated by space (or type "exit" to quit): ';
const question = 'What would you like to do with the input?\n' +
'1. Sort words alphabetically\n' +
'2. Show numbers from lesser to greater\n' +
'3. Show numbers from bigger to smaller\n' +
'4. Display words in ascending order by the number of letters in the word\n' +
'5. Show only unique words\n' +
'6. Display only unique values\n' +
'Enter the number of your choice: '

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getSortWordsAsc = items => items.filter(item => isNaN(item)).sort((a, b) => a.localeCompare(b)).join(' ');

const getSortNumDsc = items => items.filter(item => !isNaN(item)).sort((a, b) => a - b).join(' ');

const getSortNumAsc = items => items.filter(item => !isNaN(item)).sort((a, b) => b - a).join(' ');

const getSortWordsByLenAsc = items => items.filter(item => isNaN(item)).sort((a, b) => a.length - b.length).join(' ');

const getSortUniqWords = items => items.filter(item => isNaN(item)).filter((item, idx, arr) => arr.indexOf(item) === idx).join(' ');

const getUniqValues = items => items.filter((item, idx, arr) => arr.indexOf(item) === idx).join(' ');

const getUserInput = () => {
  rl.question(message, (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }
    processInput(input);
  });
}

function processInput(input) {
  const items = input.split(' ');

  rl.question(question, (choice) => {
    switch (parseInt(choice)) {
      case 1:
        console.log(getSortWordsAsc(items));
        break;
      case 2:
        console.log(getSortNumDsc(items));
        break;
      case 3:
        console.log(getSortNumAsc(items));
        break;
      case 4:
        console.log(getSortWordsByLenAsc(items));
        break;
      case 5:
        console.log(getSortUniqWords(items));
        break;
      case 6:
        console.log(getUniqValues(items));
        break;
      default:
        console.log('Invalid choice. Please choose a valid option.');
    }

    getUserInput();
  });
}

getUserInput();

rl.on('close', () => {
  console.log('Exiting the program. Goodbye!');
});





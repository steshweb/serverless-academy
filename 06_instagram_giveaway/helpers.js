const fs = require('fs/promises');
const path = require('path');

const existInAtleastTen = async() => {
  console.time('existInAtleastTen');

  const directoryPath = './data/';
  const totalUsermanes = {};
  
  const fileNames = await fs.readdir(directoryPath);

  for (const fileName of fileNames) {
    const filePath = path.join(directoryPath, fileName);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const usernames = new Set(fileContents.split('\n'));

    for (const username of usernames) {
      if (!totalUsermanes[username]) {
        totalUsermanes[username] = 1;
      } else {
        totalUsermanes[username] += 1;
      }
    }
  }
  const commonUsernames = Object.entries(totalUsermanes).filter(([_, count]) => count >= 10);

  console.log('Amount usernames occur in at least 10 files:', commonUsernames.length);
  console.timeEnd('existInAtleastTen');
}

const existInAllFiles = async() => {
  console.time('existInAllFiles');

  const directoryPath = './data/';
  let commonWords = new Set();
  const fileNames = await fs.readdir(directoryPath);

  for (const fileName of fileNames) {
    const filePath = path.join(directoryPath, fileName);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const words = new Set(fileContents.split('\n'));

    if (commonWords.size === 0) {
      commonWords = new Set(words);
    } 
    else {
      commonWords.forEach((word) => {
        if (!words.has(word)) {
          commonWords.delete(word);
        }
    });
    }
  }

  console.log('Amount usernames occur in all files:', commonWords.size);
  console.timeEnd('existInAllFiles');
}

const uniqueValues = async() => {
  console.time('getAllNames');
  let total = [];

  for(let i = 0; i < 20; i += 1) {
    const result = await fs.readFile(`./data/out${i}.txt`, 'utf8');
    const arr = result.split('\n');
    total.push(...arr);
  }

  const uniqueValues = new Set(total)
  console.log('Total amount of unique usernames:', uniqueValues.size);
  console.timeEnd('getAllNames');
}

module.exports = {
  uniqueValues,
  existInAllFiles,
  existInAtleastTen
}
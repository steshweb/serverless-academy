const axios = require('axios');
const endpoints = require('./endpoints');

const fetch = async(url) => {
  try {
    const result = await axios.get(url);
    return result.data;
  }
  catch (error){
    throw error
  }
}

const checkData = data => {
  for(const key in data) {
    if(typeof data[key] === 'object') {
      const result = checkData(data[key]);
      if (result !== undefined) {
        return result;
      }
    }
    else if (key === 'isDone') {
      return data[key];
    }
  }
}

const start = async () => {
  let trueCount = 0;
  let falseCount = 0;

  for(const endpoint of endpoints) {
    let count = 3;

    while(count > 0) {
      try {
        const data = await fetch(endpoint);
        const result = checkData(data);
        console.log(`[Success] ${endpoint}: isDone - ${result}`);
        result ? trueCount += 1 : falseCount += 1;
        break
      }
      catch {
        count -= 1;
      }
    }

    if(count === 0) {
      console.log(`[Fail] ${endpoint}: The endpoint is unavailable`);
    }
  }

  console.log(
    `Found True values: ${trueCount},\n` +
    `Found False values: ${falseCount}`
    );
}

start();
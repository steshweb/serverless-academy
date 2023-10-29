const axios = require('axios');
const endpoints = require('./endpoints');

const fetch = async(url) => {
  try {
    const result = await axios.get(url);
    console.log(result.data);
  }
  catch (error){
    return error.message;
  }
}

const start = async () => {
  let trueCount = 0;
  let falseCount = 0;

  for(const endpoint of endpoints) {
    let count = 3;

    while(count > 0) {
      try {
        await fetch(endpoint);
        break
      }
      catch {
        console.log('catch count')
        count -= 1;
      }
    }

    console.log(count);

    if(count === 0) {
      console.log(`[Fail] ${endpoint}: The endpoint is unavailable`);
    }
  }
}

start();
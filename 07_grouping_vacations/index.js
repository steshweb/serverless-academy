const fs = require('fs/promises');

const result = [];

const getUsers =  async() => {
  const data = await fs.readFile('./data/data.json', 'utf8');
  const developersList = JSON.parse(data);

  developersList.forEach(({ user, startDate, endDate }) => {
    const userId = user._id;
    const userName = user.name;

    const userExist = result.find(dev => dev.userId === userId);

    if (userExist) {
      userExist.vacations.push({
        startDate,
        endDate
      })
    }

    else {
      result.push({
        userId,
        userName,
        vacations: [{
          startDate,
          endDate
        }]
      })
    }

  })

  await fs.writeFile('./result.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
}

getUsers();
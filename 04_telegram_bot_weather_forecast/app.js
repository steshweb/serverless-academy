const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const { TOKEN, APIKEY } = process.env;
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
let intervalID = 0

const bot = new TelegramBot(TOKEN, { polling: true });

const mainMenu = {
  reply_markup: {
    keyboard: [['Forecast in Kharkiv']],
  },
};

const intervalMenu = {
  reply_markup: {
    keyboard: [['3 hours', '6 hours']],
  },
};

const fetchOpt = {
  params: {
    q: 'Kharkiv',
    appid: APIKEY,
    current: 'weather',
    units: 'metric'
    }
}

const getFetchData = async () => {
  const resp = await axios.get(weatherApiUrl, fetchOpt);
  return resp.data;
}

const sendMessage = async(chatId) => {
  try {
    const data = await getFetchData();
    const result = data.list[0].main;
    const response = Object.keys(result).map(key => `${key}: ${result[key]}`).join('\n');
    bot.sendMessage(chatId, response);
  }
  catch (err) {
    bot.sendMessage(chatId, 'Error, something went wrong.');
    clearInterval(intervalID);
  }
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to Weather Forecast.', mainMenu);
});

bot.onText(/Forecast in Kharkiv/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Select interval:', intervalMenu);
});

bot.onText(/3 hours|6 hours/, (msg, match) => {
  const chatId = msg.chat.id;
  const interval = match[0] === '3 hours' ? 3600000 * 3 : 3600000 * 6;
  sendMessage(chatId)

  intervalID = setInterval(() => {
    sendMessage(chatId)
  }, interval);
});



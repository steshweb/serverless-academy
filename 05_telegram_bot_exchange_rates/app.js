const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const NodeCache = require('node-cache');

const { TOKEN } = process.env;
const monoURL = 'https://api.monobank.ua/bank/currency';
const privatURL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';

const cache = new NodeCache({ stdTTL: 60 });
const bot = new TelegramBot(TOKEN, { polling: true });

const mainMenu = {
  reply_markup: {
    keyboard: [['USD', 'EUR']],
  },
};

const getMonoRates = async() => {
  const cacheKey = 'mono';

  if(cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await axios.get(monoURL);
  const rates = response.data;
  cache.set(cacheKey, rates);
  return rates;
}

const getPrivatRates = async() => {
  const cacheKey = 'privat';

  if(cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await axios.get(privatURL);
  const rates = response.data;
  cache.set(cacheKey, rates);
  return rates;
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to Exchange Rates Bot.', mainMenu);
});

bot.onText(/USD|EUR/, async(msg, match) => {
  const chatId = msg.chat.id;
  const currency = match[0];
  const rateNormalize = value => Number(value).toFixed(2);

  const sendMessage = (privatCur, monoCur) => {
    bot.sendMessage(chatId, 
      `Current Rates ${currency} in Privat:\n` + 
      `buy - ${rateNormalize(privatCur.buy)}, sale - ${rateNormalize(privatCur.sale)}\n` +
      '\n' +
      `Current Rates ${currency} in Mono:\n` +
      `buy - ${rateNormalize(monoCur.rateBuy)}, sale - ${rateNormalize(monoCur.rateSell)}\n`
    );
  }

  try {
    const monoRates = await getMonoRates();
    const privatRates = await getPrivatRates();

    if(currency === 'USD') {
      const privatUSD = privatRates.find(rate => rate.ccy === 'USD');
      const monoUSD = monoRates.find(rate => rate.currencyCodeA === 840);

      sendMessage(privatUSD, monoUSD)
    }
    else {
      const privatEUR = privatRates.find(rate => rate.ccy === 'EUR');
      const monoEUR = monoRates.find(rate => rate.currencyCodeA === 978);

      sendMessage(privatEUR, monoEUR);
    }
  } 
  catch (error) {
    bot.sendMessage(chatId, 'Error, something went wrong.')
  }
});


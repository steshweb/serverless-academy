const TelegramBot = require('node-telegram-bot-api');
const { program } = require('commander');

const { TOKEN, BOTID } = process.env;

const bot = new TelegramBot(TOKEN, {polling: true});

program
  .name('telegram-bot-note')
  .description('CLI for telegram bot notes')
  .version('1.0.0');

program
  .command('send-message <message>')
  .alias('m')
  .description('Send a text message to your Telegram bot')
  .action((message) => {
    bot.sendMessage(BOTID, message)
      .then(() => process.exit())
      .catch(error => {
        console.error('Error sending message:', error.message);
        process.exit();
      });
  });

program
  .command('send-photo <path>')
  .alias('p')
  .description('Send a photo to your Telegram bot')
  .action((path) => {
    bot.sendPhoto(BOTID, path, {
      contentType: 'image/png'
    })
      .then(() => process.exit())
      .catch(error => {
        console.error('Error sending photo:', error.message);
        process.exit();
      });
  });

program
  .command('help')
  .alias('h')
  .description('Display help information for commands and options')
  .action(() => {
    program.outputHelp();
    process.exit();
  });

  program.parse(process.argv);
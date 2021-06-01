const request = require('request');
const secrets = require('./secrets/webhook.json');
const url = `https://api.trello.com/1/tokens/${secrets.TOKEN}/webhooks?key=${secrets.API_KEY}&callbackURL=${process.env.callbackURL}&idModel=${secrets.BOARD_ID}`;

request.post(url, (error, response, body) => {
  console.log(body);
});

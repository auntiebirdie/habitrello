const crypto = require('crypto');

exports.webhook = (req, res) => {
  try {
    const action = req.body.action;

    const content = JSON.stringify(req.body) + "https://us-central1-obsessive-coding-disorder.cloudfunctions.net/habitrello";
    const doubleHash = crypto.createHmac("sha1", process.env.TRELLO_OAUTH_SECRET).update(content).digest("base64");
    const isFromTrello = doubleHash == req.headers['x-trello-webhook'];

    if (!isFromTrello) {
      res.status(403).send("not authorized");
    }
    else if (action.type == "updateCard" && action.data.card.closed) {
      const Habitica = require('habitica');

      const api = new Habitica({
        id: process.env.HABITICA_USER_ID,
        apiToken: process.env.HABITICA_API_TOKEN
      });

      // Create a task in Habitica ...
      api.post('/tasks/user', {
        text: action.data.card.name,
        type: 'todo'
      }).then((task) => {
        // ... and mark it as complete.
        api.post('/tasks/' + task.data.id + '/score/up')
          .then((result) => {
            res.status(200).send("ok");
          });
      });
    }
    else {
      // Give Trello a 200 so it knows the webhook is successful
      res.status(200).send("ok");
    }
  } catch (err) {
    console.log(err);
    
    // Log the error, but still give Trello a 200
    // Why?  Because I don't want to go through the rigamarole of it getting disabled.
    // https://developer.atlassian.com/cloud/trello/guides/rest-api/webhooks/#webhook-warning-emails-and-disablement

    res.status(200).send("ok");
  }
};

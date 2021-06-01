exports.webhook = (req, res) => {
  try {
    var action = req.body.action;

    if (action.type == "updateCard" && action.data.card.closed) {
      var Habitica = require('habitica');

      var api = new Habitica({
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

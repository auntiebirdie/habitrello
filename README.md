# habitrello
A simple webhook receiver to integrate [Habitica](https://habitica.com/) and [Trello](https://trello.com).

## why?

I love [Habitica](https://habitica.com/), but one of the problems I run into is I'll add something long-term to the Tasks and feel demotivated as it slowly turns red from sitting stagnant.

I love [Trello](https://trello.com), but one of the problems I run into is I can't raise unicorns or fight bosses.

So I made a simple Cloud Function webhook to integrate Trello, where I can manage tasks in a more project-like structure but still get EXP and gold for finishing them!

## installation

- Deploy to Google Cloud Functions (or your hosted endpoint service of choice)
  - As long as it has a static, public-facing address, it'll work 👍

- Get your User ID and API Key from Habitica
  - Log into [Habitica](https://habitica.com/)
  - Navigate to the [Settings > API page](https://habitica.com/user/settings/api) to get your ``HABITICA_USER_ID`` and ``HABITICA_API_TOKEN``

- Create a board in Trello to host your Habitica tasks
  - Log into [Trello](https://trello.com)
  - Create a new board OR choose an existing one
  - Get the board ID
    - I'm not 100% sure the best way to get this.  I load the page with the Network Inspector running, filter to find the one that contains ``lists=open``, and grab the id from the response.

![example image with network inspector response](https://i.imgur.com/msw6laE.png)

- Set up your Trello webhook
  - Call the webhook creation endpoint [see the official documentation](https://developer.atlassian.com/cloud/trello/guides/rest-api/webhooks/)
    - APIToken: IIRC this is the token returned via the [authorization workflow](https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/)
    - APIKey: [returned from the app key page](https://trello.com/app-key)
    - idModel: the board ID from previous step

- Create a task, mark it done (archive it), and check to see if you successfully gained EXP/gold/items in Habitica!

## TODO
- [ ] comments!!
- [ ] better security (verify caller, don't just accept any input from anyone)

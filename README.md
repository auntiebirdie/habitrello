# habitrello
A simple webhook receiver to integrate [Habitica](https://habitica.com/) and [Trello](https://trello.com).

## why?

I love [Habitica](https://habitica.com/), but one of the problems I run into is I'll add something long-term to the Tasks and feel demotivated as it slowly turns red from sitting stagnant.

I love [Trello](https://trello.com), but one of the problems I run into is I can't raise unicorns or fight bosses.

So I made a simple Cloud Function webhook to integrate Trello, where I can manage tasks in a more project-like structure but still get EXP and gold for finishing them!

## setup

- Create a board in Trello to host your Habitica tasks
  - Log into [Trello](https://trello.com)
  - Create a new board OR choose an existing one

- Get your User ID and API Key from Habitica
  - Log into [Habitica](https://habitica.com/)
  - Navigate to the [Settings > API page](https://habitica.com/user/settings/api) to get your ``HABITICA_USER_ID`` and ``HABITICA_API_TOKEN``
  - Save them to ``secrets/function.yaml``

- Get your Trello keys and tokens
  - Log into [Trello](https://trello.com)
  - Add the following to ``secrets/function.yaml``
    - TRELLO_OAUTH_TOKEN: [at the bottom of the app key page under OAuth](https://trello.com/app-key/)
  - Save the following to ``secrets/webhook.json``
    - API_KEY : [returned from the app key page](https://trello.com/app-key/)
    - TOKEN : [manually generate a Token on the app key page](https://trello.com/app-key/)
    - BOARD_ID: I'm not 100% sure the best way to get this.  I load the page with the Network Inspector running, filter to find the one that contains ``lists=open``, and grab the id from the response.
![example image with network inspector response](https://i.imgur.com/msw6laE.png)


- Ensure you have your gcloud configuration pointing at the desired project

- Run ``npm run deploy``

- Create a task, mark it done (archive it), and check to see if you successfully gained EXP/gold/items in Habitica!

# WonderQ

## How to run locally

1. Run `npm install` to install all project dependencies.
2. Run on the command line `npm start` to start the broker.  

## To run automated tests

1. To run automated tests, type `npm run` in the command line.

## Rest API Docs

1. `GET consumers/:id` - retrieves a list of visible messages.
2. `POST consumers/:id/:messageId` - removes the message from the message queue after processed by consumer.
3. `POST producers/` - creates a new message in the message queue.  



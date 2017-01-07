const Alexa = require('alexa-sdk');
const CB = require('charter-bus-stats');

const facts = require('./constants/facts');

const handlers = {
    'NewSession': () => {
        this.emit(':ask', 'Welcome Charter bus member!', 'Welcome!');
    },
    'LaunchRequest': () => {
        this.emit('NewSession');
    },
    'AMAZON.StopIntent': () => {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': () => {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': () => {
        this.emit(':tell', 'Goodbye!');
    },
    'getRandomFact': () => {
        const random = Math.floor(Math.random() * facts.length);

        this.emit(':tell', facts[random]);
    },
    'currentChampion': () => {
        this.emit(':tell', 'Matt Damon A.K.A. The Biebs A.K.A. Durka Durka A.K.A. I like Turtles ' +
            'A.K.A. Mohammed Jihad A.K.A. Killa A.K.A. Cameron Vail');
    },
    'zachChampionships': () => {
        this.emit(':tell', 'Zero. Forever and always. Zero.');
    },
    'charterBusMotto': () => {
        this.emit(':tell', 'Your dad, dude.');
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = process.env.API_KEY;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

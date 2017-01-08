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
    'numberOfChampionships': () => {
        // https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/issues/52
        // ...hoping this isn't the only way to get slot values
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name} has ${CB.find(name, 'championships')} championships`);
    },
    'charterBusMotto': () => {
        this.emit(':tell', 'Your dad, dude.');
    },
    'matchupHistory': () => {
      const team = this.event.request.intent.slots.team.value;
      const opponent = this.event.request.intent.slots.opponent.value;

      this.emit(':tell', `The record between ${team} and ${opponent} is ${CB.findHistory(team, opponent)}`);
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = process.env.API_KEY;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

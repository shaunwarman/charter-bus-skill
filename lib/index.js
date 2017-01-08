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
    'currentChampion': () => {
        this.emit(':tell', 'Matt Damon A.K.A. The Biebs A.K.A. Durka Durka A.K.A. I like Turtles ' +
            'A.K.A. Mohammed Jihad A.K.A. Killa A.K.A. Cameron Vail');
    },
    'charterBusMotto': () => {
        this.emit(':tell', 'Your dad, dude.');
    },
    'getRandomFact': () => {
        const random = Math.floor(Math.random() * facts.length);

        this.emit(':tell', facts[random]);
    },
    'matchupHistory': () => {
      const team = this.event.request.intent.slots.team.value;
      const opponent = this.event.request.intent.slots.opponent.value;

      this.emit(':tell', `The record between ${team} and ${opponent} is ${CB.findHistory(team, opponent)}`);
    },
    'numberOfChampionships': () => {
        // https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/issues/52
        // ...hoping this isn't the only way to get slot values
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name} has ${CB.find(name, 'championships')} championships`);
    },
    'totalRecord': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name} has a total record of ${CB.find(name, 'totalRecord')}`);
    },
    'totalPointsAgainst': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s total points against is ${CB.find(name, 'totalPointsAgainst')}`);
    },
    'totalPointsFor': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s total points for is ${CB.find(name, 'totalPointsFor')}`);
    },
    'averagePointsForByYear': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s average points for by year is ${CB.find(name, 'averagePointsForByYear')}`);
    },
    'averagePointsForByWeek': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s average points for by week is ${CB.find(name, 'averagePointsForByWeek')}`);
    },
    'averagePointsAgainstByYear': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s average points against by year is ${CB.find(name, 'averagePointsAgainstByYear')}`);
    },
    'averagePointsAgainstByWeek': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s average points against by week is ${CB.find(name, 'averagePointsAgainstByWeek')}`);
    },
    'highWeek': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s highest point week is ${CB.find(name, 'highWeek')}`);
    },
    'lowWeek': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s lowest point week is ${CB.find(name, 'lowWeek')}`);
    },
    'bestFinish': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s best finish is ${CB.find(name, 'bestFinish')} of 14`);
    },
    'worstFinish': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s worst finish is ${CB.find(name, 'worstFinish')} of 14`);
    },
    'avgFinish': () => {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s average finish is ${CB.find(name, 'avgFinish')} of 14`);
    },
    'pointsForByYear': () => {
        const year = this.event.request.intent.slots.year.value;
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s points for in ${year} was ${CB.find(year, name, 'pointsForByYear')}`);
    },
    'pointsAgainstByYear': () => {
        const year = this.event.request.intent.slots.year.value;
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s points against in ${year} was ${CB.find(year, name, 'pointsAgainstByYear')}`);
    },
    'finishByYear': () => {
        const year = this.event.request.intent.slots.year.value;
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s finish for ${year} was ${CB.find(year, name, 'finishByYear')}`);
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = process.env.API_KEY;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

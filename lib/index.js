const Alexa = require('alexa-sdk');
const CB = require('charter-bus-stats');

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome Charter bus member!', 'What would you like to know?');
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'currentChampion': function () {
        this.emit(':tell', 'Matt Damon A.K.A. The Biebs A.K.A. Durka Durka A.K.A. I like Turtles ' +
            'A.K.A. Killa A.K.A. Cameron Vail');
    },
    'charterBusMotto': function () {
        this.emit(':tell', 'Your dad, dude.');
    },
    'getRandomFact': function () {
        const facts = CB.getFacts();
        const random = Math.floor(Math.random() * facts.length);

        this.emit(':tell', facts[random]);
    },
    'matchupHistory': function () {
      const team = this.event.request.intent.slots.team.value;
      const opponent = this.event.request.intent.slots.opponent.value;

      this.emit(':tell', `The record between ${team} and ${opponent} is ${CB.findHistory(team, opponent)}`);
    },
    'numberOfChampionships': function () {
        // https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/issues/52
        // ...hoping this isn't the only way to get slot values
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name} has ${CB.find(name, 'championships')} championships`);
    },
    'totalRecord': function () {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name} has a total record of ${CB.find(name, 'totalRecord')}`);
    },
    'totalPointsAgainst': function (){
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s total points against is ${CB.find(name, 'totalPointsAgainst')}`);
    },
    'totalPointsFor': function () {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s total points for is ${CB.find(name, 'totalPointsFor')}`);
    },
    'averagePointsForByYear': function () {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s average points for by year is ${CB.find(name, 'averagePointsForByYear')}`);
    },
    'averagePointsForByWeek': function () {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s average points for by week is ${CB.find(name, 'averagePointsForByWeek')}`);
    },
    'averagePointsAgainstByYear': function () {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s average points against by year is ${CB.find(name, 'averagePointsAgainstByYear')}`);
    },
    'averagePointsAgainstByWeek': function () {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s average points against by week is ${CB.find(name, 'averagePointsAgainstByWeek')}`);
    },
    'highWeek': function () {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s highest point week is ${CB.find(name, 'highWeek')}`);
    },
    'lowWeek': function () {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s lowest point week is ${CB.find(name, 'lowWeek')}`);
    },
    'bestFinish': function () {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s best finish is ${CB.find(name, 'bestFinish')} of 14`);
    },
    'worstFinish': function () {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s worst finish is ${CB.find(name, 'worstFinish')} of 14`);
    },
    'avgFinish': function () {
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s average finish is ${CB.find(name, 'avgFinish')} of 14`);
    },
    'pointsForByYear': function () {
        const year = this.event.request.intent.slots.year.value;
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s points for in ${year} was ${CB.findByYear(year, name, 'pointsForByYear')}`);
    },
    'pointsAgainstByYear': function () {
        const year = this.event.request.intent.slots.year.value;
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s points against in ${year} was ${CB.findByYear(year, name, 'pointsAgainstByYear')}`);
    },
    'finishByYear': function () {
        const year = this.event.request.intent.slots.year.value;
        const name = this.event.request.intent.slots.name.value;

        this.emit(':tell', `${name}'s finish for ${year} was ${CB.findByYear(year, name, 'finishByYear')}`);
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = process.env.API_KEY;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

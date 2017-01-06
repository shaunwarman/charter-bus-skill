const Alexa = require('alexa-sdk');

const handlers = {
    'NewSession': function () {
        this.emit(':ask', 'Welcome Ana Spotts', 'Welcome!');
    },
    'LaunchRequest': function () {
        this.emit('getAnaLikes');
    },
    'getAnaLikes': function () {
        this.emit(':tell', 'I love to sleep!');
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', 'Goodbye!');
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = process.env.API_KEY;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

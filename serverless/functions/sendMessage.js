const functions = require("firebase-functions");

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;

const client = require("twilio")(accountSid, authToken);

function sendMessage(message) {
  client.messages
    .create({
      to: functions.config().twilio.numbers.client,
      from: functions.config().twilio.numbers.twilio,
      body: message,
    })
    .then((message) => console.log(message.sid));
}

module.exports = { sendMessage };

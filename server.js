'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '333656',
  key: '2f5ebb3dedf41a3413d2',
  secret: '812d31541025ef0d95b4',
  cluster: 'eu',
  encrypted: true
});

const server = app.listen(3000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.post('/inbound', (req, res) => {
    handleParams(req.body, res);
});

function handleParams(params, res) {
    if (!params.to || !params.msisdn) {
        console.log('This is not a valid inbound SMS message!');
    } else {
        console.log('Success');

        let incomingData = {
            messageId: params.messageId,
            from: params.msisdn,
            text: params.text,
            type: params.type,
            timestamp: params['message-timestamp']
        };

        pusher.trigger('sms-reader', 'new-sms', {"data": incomingData});
        res.send(incomingData);
    }
    res.status(200).end();
}

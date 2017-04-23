'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = app.listen(3000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.post('/inbound', (req, res) => {
    handleParams(req.body, res);
});
var Pusher = require('pusher');

var pusher = new Pusher({appId: '330989', key: 'bda0aff2ffa75d90e73a', secret: '588f93e05492464bb0bd', cluster: 'eu', encrypted: true});

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

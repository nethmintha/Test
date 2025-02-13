const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const AutoReplyBot = require('./autoReply');
const AutoStatusReadBot = require('./autoStatusRead');
const sessionManager = require('./sessionManager');
const config = require('./config.json');

const sessionId = sessionManager.getSessionId();
const client = new Client({
    authStrategy: new LocalAuth({ clientId: sessionId })
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    const autoReplyBot = new AutoReplyBot(client);
    const autoStatusReadBot = new AutoStatusReadBot(client);

    autoReplyBot.start();
    autoStatusReadBot.start();

    // Send a message to the specified number
    const number = '+947842980074'; // Replace with the desired number
    const message = 'Bot is now connected!';
    client.sendMessage(number + '@c.us', message).then(response => {
        console.log('Message sent successfully:', response);
    }).catch(err => {
        console.error('Error sending message:', err);
    });
});

client.initialize();

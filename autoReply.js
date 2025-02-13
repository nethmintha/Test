class AutoReplyBot {
    constructor(client) {
        this.client = client;
    }

    start() {
        console.log('AutoReplyBot started');
        this.client.on('message', message => {
            if (message.body) {
                this.handleMessage(message);
            }
        });
    }

    handleMessage(message) {
        const reply = this.generateReply(message.body);
        this.sendReply(message.from, reply);
    }

    generateReply(message) {
        return 'This is an auto-reply';
    }

    sendReply(to, reply) {
        this.client.sendMessage(to, reply);
    }
}

module.exports = AutoReplyBot;

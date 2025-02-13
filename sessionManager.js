const fs = require('fs');
const config = require('./config.json');

const sessionManager = {
    getSessionId() {
        if (!config.sessionId) {
            config.sessionId = `session_${Date.now()}`;
            this.saveConfig(config);
        }
        return config.sessionId;
    },
    saveConfig(updatedConfig) {
        fs.writeFileSync('config.json', JSON.stringify(updatedConfig, null, 2));
    }
};

module.exports = sessionManager;

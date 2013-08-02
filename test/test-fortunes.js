var fortunes = require('../fortunes.js');
    vows = require('vows');
var suite = vows.describe('fortunes');

suite.addBatch({
    'Fetching messages from GitHub':{
        topic: fortunes.fetchCommitHistoryFromGithub,
        'should return a list of messages if the repository is valid': {
        }
    
    }

});

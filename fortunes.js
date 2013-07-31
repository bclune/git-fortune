var redis = require('redis'),
    client = redis.createClient();

var request = require('request');
var view = require('./view');

var shuffle = require('shuffle');

// redis cache expiration in seconds
var CACHE_TIMEOUT = 300;

function fetchCommitHistoryFromGithub(repository, serverResponse) {
    apiString = 'https://api.github.com/repos' + repository + '/commits';
    console.log('Requesting ' + apiString);
    request.get(apiString, function(error, response, body){
        if (!error && response.statusCode == 200) {
            extractMessage(body, serverResponse);
        }
    });
}

function extractMessage(commitJson, response) {
    var commits = JSON.parse(commitJson);
    randomCommit = shuffle.shuffle({deck: commits}).drawRandom();
    view.writeMessage(randomCommit.commit.message, response);


}

function getCommitMessagesFromCache(repository) {
    githubResponse = client.get(repository);
    if (messages === null) {
        githubResponse = fetchCommitHistoryFromGithub(repository);
        client.setex(repository, CACHE_TIMEOUT, messages);
    }

    messages = parseResponse(githubResponse);
    return messages;
}


function chooseRandomMessage(messages) {

}

function getRandomCommitMessage(repository) {
    return chooseRandomMessage(getCommitMessages(repository));
}

exports.displayMessage = fetchCommitHistoryFromGithub;

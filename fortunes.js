var redis = require("redis"),
    client = redis.createClient();

// redis cache expiration in seconds
var CACHE_TIMEOUT = 300;

function fetchMessagesFromGithub(repository) {

}

function parseResponse(repository) {

}

function getCommitMessages(repository) {
    githubResponse = client.get(repository);
    if (messages === null) {
        githubResponse = fetchMessagesFromGithub(repository);
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

exports.getRandomCommitMessage = getRandomCommitMessage;

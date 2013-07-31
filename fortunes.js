var redis = require('redis'),
    redisClient = redis.createClient();

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
            redisClient.setex(repository, CACHE_TIMEOUT, body);
        } else {
            view.writeNotFound();
        }
    });
}

function extractMessage(commitJson, response) {
    var commits = JSON.parse(commitJson);
    randomCommit = shuffle.shuffle({deck: commits}).drawRandom();
    view.writeMessage(randomCommit.commit.message, response);
}

function getGithubResponseFromCache(repository, response) {
    redisClient.get(repository, function(err, res) { 
        if (res === null) {
            console.log('Refreshing cache from github repo: ' + repository);
            fetchCommitHistoryFromGithub(repository, response);
        } else {
            extractMessage(res, response);
        }
    });
}

exports.displayMessage = getGithubResponseFromCache;

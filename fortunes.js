var shuffle = require('shuffle'),
    request = require('request'),
    redis = require('redis'),
    redisClient = redis.createClient();

var view = require('./view');


// redis cache expiration in seconds
var CACHE_TIMEOUT = 10;
var MAX_MESSAGES = 500;
var REDIS_404_TOKEN = "_404";

function fetchCommitHistoryFromGithub(repository, serverResponse) {
    apiString = 'https://api.github.com/repos' + 
                repository + 
                '/commits?per_page=100';
    console.log('Requesting ' + apiString);
    request.get(apiString, function(error, response, body){
        if (!error && response.statusCode == 200) {
            extractMessage(body, serverResponse);
            redisClient.setex(repository, CACHE_TIMEOUT, body);
        } else {
            view.writeNotFound(serverResponse);
            redisClient.setex(repository, CACHE_TIMEOUT, REDIS_404_TOKEN);
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
        console.log('Got from redis: ' + res);
        if (res === null) {
            console.log('Refreshing cache from github repo: ' + repository);
            fetchCommitHistoryFromGithub(repository, response);
        } else if (res === REDIS_404_TOKEN) {
            view.writeNotFound(response);
        } else {
            extractMessage(res, response);
        }
    });
}

exports.displayMessage = getGithubResponseFromCache;

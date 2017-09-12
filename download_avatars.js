function getRepoContributors(repoOwner, repoName, cb, imgPath) {

  var https = require('https');
  var GITHUB_USER = GIT_USERNAME;
  var GITHUB_TOKEN = GIT_TOKEN;
  var request = require('request');
  var string = '';

  console.log("Welcome Arie's to the GitHub Avatar Downloader!");

  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN +
    '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  // console.log(requestURL);

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'ArieGerritse'
    }
  };

  request.get(options)

  .on('error', function(err) { // Note 2
    throw err;
  })

  .on('data', function(data) {

    string += data;

  })

  .on('end', function() {
    console.log('Received JSON File.');
    var obj = JSON.parse(string);
    cb(obj, imgPath);
  });
}

function justAvatars(jonObj, imgFilePath) {

  for (var x in jonObj) {
    downloadImageByURL(jonObj[x].avatar_url, imgFilePath, jonObj[x].login);
  }

  console.log('Images downloads complete to: avatars folder');

}

function downloadImageByURL(url, filePath, name) {

  var request = require('request');
  var fs = require('fs');
  var extention;

  var stream = request.get(url) // Note 1
    .on('error', function(err) { // Note 2
      throw err;
    })
    .on('response', function(response) { // Note 3
      // console.log(response.headers["content-type"]);
      extention = response.headers["content-type"].split('/');
      stream.pipe(fs.createWriteStream(filePath + '/' + name + '.' + extention[1]));
    });

}

function checkArguments() {

  var args = process.argv.slice(2);

  if (args[0] && args[1]) {

    getRepoContributors(args[0], args[1], justAvatars, 'avatars');

  } else if (args[0]) {

    console.log('Please input a valid Repo Name.');

  } else if (args[1]) {

    console.log('Please input a valid Repo Owner.');

  } else {

    console.log('Please input a valid Repo Onwer and Repo Name.');

  }

}

require('./secret.env');

checkArguments();

//4c3fb552a74ebd49dd9b49a51668e4db8d16b794 token
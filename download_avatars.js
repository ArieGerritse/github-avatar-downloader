function getRepoContributors(repoOwner, repoName, cb, imgPath) {

  var https = require('https');
  var GITHUB_USER = "ArieGerritse";
  var GITHUB_TOKEN = "4c3fb552a74ebd49dd9b49a51668e4db8d16b794";
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

  console.log('Img downloads complete to: imgs folder');

}

function downloadImageByURL(url, filePath, name) {

  var request = require('request');
  var fs = require('fs');

  request.get(url) // Note 1
    .on('error', function(err) { // Note 2
      throw err;
    })
    .pipe(fs.createWriteStream(filePath + '/' + name + '.'));
}

getRepoContributors('jquery', 'jquery', justAvatars, 'imgs');

//4c3fb552a74ebd49dd9b49a51668e4db8d16b794 token
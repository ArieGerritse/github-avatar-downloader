function getRepoContributors(repoOwner, repoName, cb, imgPath) {

  require('./secret.env');
  var https = require('https');

  //Checks if either of the dotenv calls are missing information
  if (GIT_USERNAME === null || GIT_TOKEN === null) {

    return console.log('The data of your ENV file is missing informatnon.');

  }
  var GITHUB_USER = GIT_USERNAME;
  var GITHUB_TOKEN = GIT_TOKEN;
  var request = require('request');
  var string = '';

  console.log("Welcome Arie's to the GitHub Avatar Downloader!");

  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN +
    '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

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

  //If statment finds if git repository not found stretch goal
  if (jonObj.message === "Not Found") {

    return console.log('Git Repository with that name not found.');

  } else {

    for (var x in jonObj) {
      downloadImageByURL(jonObj[x].avatar_url, imgFilePath, jonObj[x].login);
    }
  }

  console.log('Images downloads complete to: avatars folder');

}
/*
function downloadImageByURL(url, filePath, name) {

  var request = require('request');
  var fs = require('fs');
  var extention;

  var stream = request.get(url) // Note 1
    .on('error', function(err) { // Note 2
      throw err;
    })
    .on('response', function(response) { // Note 3
      extention = response.headers["content-type"].split('/');
      //Stetch: If no file exists for the file path, it makes it
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }
      stream.pipe(fs.createWriteStream(filePath + '/' + name + '.' + extention[1]));
    });

}*/

function errorCheck() {

  var fs = require('fs');
  var args = process.argv.slice(2);

  if (args[0] && args[1] && fs.existsSync('./secret.env') === true) {

    getRepoContributors(args[0], args[1], justAvatars, 'avatars');

  } else if (args[0]) {

    console.log('Please input a valid Repo Name.');

  } else if (args[1]) {

    console.log('Please input a valid Repo Owner.');

  } else if (args[2]) {
    //Stetch goal if more arguments are present throw error
    console.log('Please add the right number of arguments');

  } else if (fs.existsSync('./secret.env') === false) {

    console.log('The ENV file does not exist.');

  } else {

    console.log('Please input a valid Repo Onwer and Repo Name.');

  }

}


errorCheck();

//4c3fb552a74ebd49dd9b49a51668e4db8d16b794 token
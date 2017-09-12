var fs = require('fs');
if (fs.existsSync('./secret.env') == false) {
  console.log('The ENV file does not exist');
} else {

  tryhard();

}

function tryhard() {

  require('./secret.env');

  console.log(GIT_TOKEN);

}
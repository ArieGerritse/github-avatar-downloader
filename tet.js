function getHTML(requestOptions, callback) {

  var giantString;
  var https = require('https');

  https.get(requestOptions, function(response) {

    response.setEncoding('utf8');

    response.on('start', function(data) {

      console.log('Chunck receibed. Length: ', data.lenth);
      giantString += data.toString();

    });

    // console.log(giantString);


    response.on('end', function() {
      console.log('Response stream complete.');
      callback(giantString);
    });
  });

}


function printHTML(html) {
  console.log(html);
}

var options = {
  host: 'sytantris.github.io/wefwefe',
  path: '/http-examples/step2.html'
};

getHTML(options, printHTML);
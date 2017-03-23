var fs = require('fs-promise');
var request = require('request-promise');

var urls = [
  'https://en.wikipedia.org/wiki/Futures_and_promises',
  'https://en.wikipedia.org/wiki/Continuation-passing_style',
  'https://en.wikipedia.org/wiki/JavaScript',
  'https://en.wikipedia.org/wiki/Node.js',
  'https://en.wikipedia.org/wiki/Google_Chrome'
];

function downloadAllUrls(){}
var htmlPromises = urls.map(function(url) {
  return request.get(url);
});

Promise.all(htmlPromises)
  .then(function(htmls) {
    var writeFilePromises = htmls.map(function(html, idx) {
      return fs.writeFile(idx + '.html', html);
    });
    return Promise.all(writeFilePromises);
  })
  .then(function() {
    console.log('It worked.');
  })
  .catch(function(err) {
    console.log(err.message);
  });

var http = require('http');
var url = require("url");
var fs = require('fs');
var querystring = require('querystring');
var myfirebase = require('./src/my-firebase');

var server = http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;

  switch (pathname) {
    // ドメインへアクセス
    case '/':
      if (req.method === 'GET') {
        fs.readFile('./view/home.html', 'UTF-8', function (err, html) {
          if (err) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(err);
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
          }
        });
      }
      break;
    // submit時
    case '/ragistration':
      if (req.method === 'POST') {
        let postData = '';

        req.on('data', function (chunk) {
          postData += chunk.toString();
        });

        // リクエストボディをすべて読み込んだらendイベントが発火する。
        req.on('end', function () {
          let dataList = querystring.parse(postData);
          
          let post0 = dataList.post0;
          let post1 = dataList.post1;
          let post2 = dataList.post2;
          
          myfirebase.insert(dataList.post0);
          res.end(dataList.post0);
        });
      }
      break;
  }
});

server.listen(3000, function () {
  console.log('listening on port 3000');
});
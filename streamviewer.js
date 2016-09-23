var connect = require('connect');
var serveStatic = require('serve-static');
var favicon = require('serve-favicon');

var app = connect();

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(serveStatic(__dirname+'/public', {'index': ['index.html']}));
app.listen(3002);
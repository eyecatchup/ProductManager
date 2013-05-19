/*
 * Application bootstrap
 * Loads all needed dependendencies. @see package.json
 */

var express = require ('express');
var redis = require ('redis');
var Q = require ('q');
var app = express();

//configure app
require ('./config')(app, express);

//load product model
var product = require('./modules/product')(redis, Q);

//apply website routes routes
require ('./routes/main')(app, product);

//apply product rest routes
require('./routes/product')(app, product);

app.listen(8000);
console.log ('listening on port 8000...');

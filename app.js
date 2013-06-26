/*
 * Application bootstrap
 * Loads all needed dependendencies. @see package.json
 */

var express = require ('express');
var app = express();

//configure app
require ('./config')(app, express);

//load product model
app.product = require('./modules/product')();

//apply website routes routes
require ('./routes/main')(app);

//apply product rest routes
require('./routes/product')(app);

module.exports = app;

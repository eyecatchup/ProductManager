//configure application

module.exports = function(app, express){
    console.log('setting config');
    app.use("/css", express.static(__dirname + '/public/css'));
    app.use("/js", express.static(__dirname + '/public/js'));
    var ejs = require('ejs');
    ejs.open="{{";
    ejs.close="}}";
    app.engine('html', ejs.renderFile);
    app.set('views', __dirname + '/views');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    
    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
     }
}

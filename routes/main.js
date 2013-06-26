/*
 * configure the url routes for the server to respond to
 */

module.exports = function(app){
    app.get('/', function(req, res){
        app.product.getAll().then(function(data){
            res.render('index.html');
            res.end();
        });
    });
};

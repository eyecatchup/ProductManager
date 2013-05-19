/*
 * configure the url routes for the server to respond to
 */

module.exports = function(app, Product){
    app.get('/', function(req, res){
        Product.getAll().then(function(data){
            res.render('index.html');
            res.end();
        });
    });
};

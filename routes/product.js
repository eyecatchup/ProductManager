/*
 * Setup restfull routes used by the backbone application.
 */

module.exports = function(app){

    //return all products
    app.get('/product', function(req, res){
        app.product.getAll().then(function(data){
            res.writeHead(200, {'content-type': 'text/plain' }); 
            res.write(JSON.stringify(data));
            res.end();
        });
    });

    //get product
    app.get('/product/:id', function(req, res){
        app.product.get(req.params.id).then(function(product){
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write(JSON.stringify(product));
            res.end();
        });

    });

    //add product
    app.post('/product', function(req, res){
        app.product.add(req.body).then(function(product){
            res.writeHead(200, {'content-type': 'text/plain' });
            res.write(JSON.stringify(product));
            res.end();
        });

    });

    //update product
    app.put('/product/:id', function(req, res){
        id = req.params.id;
        entity = req.body;
        app.product.update(id, entity).then(function(product){
            res.writeHead(200, {'content-type': 'text/plain' });
            res.write(JSON.stringify(product));
            res.end();
        });
    });

    //remove product
    app.delete('/product/:id', function(req, res){
        var result = app.product.remove(req.params.id);
        res.writeHead(200, {'content-type': 'text/plain' });
        res.write(result.toString());
        res.end();
    });
}

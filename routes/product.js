/*
 * Setup restfull routes used by the backbone application.
 */

module.exports = function(app, Product){

    //return all products
    app.get('/product', function(req, res){
        Product.getAll().then(function(data){
            res.writeHead(200, {'content-type': 'text/plain' }); 
            res.write(JSON.stringify(data));
            res.end();
        });
    });

    //get product
    app.get('/product/:id', function(req, res){
        Product.get(req.params.id).then(function(product){
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write(JSON.stringify(product));
            res.end();
        });

    });

    //add product
    app.post('/product', function(req, res){
        Product.add(req.body).then(function(product){
            res.writeHead(200, {'content-type': 'text/plain' });
            res.write(JSON.stringify(product));
            res.end();
        });

    });

    //update product
    app.put('/product/:id', function(req, res){
        id = req.params.id;
        entity = req.body;
        Product.update(id, entity).then(function(product){
            res.writeHead(200, {'content-type': 'text/plain' });
            res.write(JSON.stringify(product));
            res.end();
        });

    });

    //remove product
    app.delete('/product/:id', function(req, res){
        var result = Product.remove(req.params.id);
        res.writeHead(200, {'content-type': 'text/plain' });
        res.write(result.toString());
        res.end();
    });
}

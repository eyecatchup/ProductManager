/* 
 * Encapsulates data logic for PRODUCT_SET
 * Storage:  
 *    ids in a set [1,2,3...] 
 *    key-value pairs e.g. "product:1" : "{'name':'sneakers', 'price':'50'}"
 */
var redis = require('redis');
var Q = require('q');

var f = function(){

    var PRODUCT_SET = 'products';
    var _self = this;
    var _client = redis.createClient(); 
    var _id = Date.now()/1000;

    //private function returning the redis key for a product id
    var _getKey = function(id){
        return "product:"+id;
    };


    // fetch a product asynchronously from redis
    // returns a promise to be resolved with it
    var _get = function(id){
        var deferred = Q.defer();
        _client.get(_getKey(id), function(err, product){
            if (err){
                deferred.reject(err);
            }
            deferred.resolve(JSON.parse(product));
        });
        return deferred.promise;
    };

    //fetch all products
    var _getAll =  function(){
        var deferred = Q.defer();
        _client.smembers(PRODUCT_SET, function(err, data){
            if (err){
                deferred.reject(err);
            }
            var promises = [];
            for (var i=0; i<data.length; i++){
                promises.push(_get(data[i]));
            }

            //combine all promises. the callback will be an array that contains 
            //each promise's resolve parameter - a product 

            Q.all(promises).then(function(products){
                deferred.resolve(products);
            });

        });
        return deferred.promise;
    };

    //add a new product 
    var _add = function(product){
        var deferred = Q.defer();
        _validate(product);
        
        _client.sadd(PRODUCT_SET, _id, function(err, data){
            if (err){
                deferred.reject(err);
            }
            product.id = _id;

            _client.set(_getKey(_id), JSON.stringify(product), redis.print);
            deferred.resolve(product);
            _id++;
        });
        return deferred.promise;
    };

    //remove product by id
    var _remove = function(id){
        _client.del(_getKey(id));
        return _client.srem(PRODUCT_SET, id);
    };

    //update a product
    var _update = function(id, product){
        var deferred = Q.defer();
        _client.set(_getKey(id), JSON.stringify(product), redis.print);
        deferred.resolve(product);
        return deferred.promise;
    };

    //validate product
    var _validate = function(product){
      console.log(product);
      if (!(typeof product.price === "number"))
        throw new Error("invalid price");
      if (!(typeof product.quantity === "number"))
        throw new Error("invalid quantity");
      if (!(typeof product.subtotal === "number"))
        throw new Error("invalid subtotal");
      if (!(product.price*product.quantity===product.subtotal))
        throw new Error("invalid math");
    }
    //exposed interface
    return {
        get: _get,
        getAll: _getAll,    
        add: _add,
        remove: _remove,
        update: _update
    };
};



//export our function
module.exports = f;

var chai = require('chai');
var assert = chai.assert;
var should = chai.should;
var app = require('../app');

describe('product', function(){
  before(function(){
    console.log('before handler');
  });
  after(function(){
    console.log('after handler');
  });
  it('should add product', function(done){
    //mock a product
    var product = {
      "name": "sampleproduct",
      "price": 100,
      "quantity": 3,
      "subtotal": 300
    };
    assert.isUndefined(product.id, "Product has no id");
    app.product.add(product).then(function(inserted){
      assert.isNumber(inserted.id, "Product now has an id");
      assert.equal(inserted.name, product.name, "Name match");
      assert.equal(inserted.price, product.price, "Price match");
      assert.equal(inserted.quantity, product.quantity, "Qty match");
      done();
    }).fail(done);
  });

  it('should fetch product', function(done){
    var product = {
      "name": "justaproduct",
      "price": 10,
      "quantity": 2,
      "subtotal": 20
    };
    //just a reference
    var inserted;

    //first we add a mock product then we fetch it by id
    app.product.add(product).then(function(product){
      inserted = product;
      return app.product.get(inserted.id);
    }).then(function(fetched){
        assert.equal(inserted.name, fetched.name, "Name match");
        assert.equal(inserted.price, fetched.price, "Price match");
        assert.equal(inserted.quantity, fetched.quantity, "Qty match");
        done();
    }).fail(done);
  });
  it('should delete product', function(done){
    var product = {
      "name": "anotherproduct",
      "price": 5,
      "quantity": 3,
      "subtotal": 15
    };

    app.product.add(product).then(function(product){
      var result = app.product.remove(product.id);
      assert.equal(result, 1, "Return value of delete");
      done();
    }).fail(done);
  });
  it('should edit product', function(done){
     var product = {
       "name": "justaproduct",
       "price": 3,
       "quantity": 4,
       "subtotal": 12
     };
     
     //first we add a mock product
     app.product.add(product).then(function(inserted){
       inserted.name = "newproductname";
       inserted.price = 100;
       inserted.quantity = 5;
       inserted.subtotal = 500;
       //update our product
       return app.product.update(inserted.id, inserted);
     }).then(function(updated){
         //fetch by id
         return app.product.get(updated.id);
     }).then(function(fetched){
         assert.equal(fetched.name, "newproductname", "Name match");
         assert.equal(fetched.price, 100, "Price match");
         assert.equal(fetched.quantity, 5, "Qty match");
         done();
     }).fail(done);
  });
  it('should return validation error', function(done){
    var product = {
      "name": "newproduct",
      "price": "xx",
      "quantity": "yy"
    };
    assert.throw(function(){
      console.log(app.product.add(product));
    }, Error);
    done(); 
  });
});

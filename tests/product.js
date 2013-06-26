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
      "quantity": 3
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
      "quantity": 2
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
  it('should delete product', function(){
  });
  it('should edit product');
  it('should validate product');
});

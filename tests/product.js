var chai = require('chai');
var assert = chai.assert;
var app = require('../app');
var server;

describe('product', function(){
  beforeEach(function(){
    server = app.listen(8000);
  });
  afterEach(function(){
    server.close();
  });
  it('should add product', function(){
    //mock a product
    var product = {
      "name": "sample-product",
      "price": 100,
      "quantity": 3
    };
    assert.isUndefined(product.id, "Product has no id");
    app.product.add(product).then(function(p){
      assert.isNumber(p.id, "Product now has an id");
      assert.equal(p.name, product.name, "Name match");
      assert.equal(p.price, product.price, "Price match");
      assert.equal(p.quantity, product.quantity, "Qty match");
    });
  });

  it('should fetch product', function(){
    
    
  });
  it('should delete product');
  it('should edit product');
  it('should validate product');
});

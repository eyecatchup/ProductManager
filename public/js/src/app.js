var app = app || {};

app.Product = Backbone.Model.extend({
    idAttribute  : "id",
    initialize: function(){
        this.bind("change", this.subtotal, this);
    },

    validate: function(){
        // backbone requires returning a "falsy" value for the model to be valid
        var errors = {};
        var isValid = true;
        if (parseFloat(this.get("price"))!=this.get("price")){
          errors.price = 'Invalid price.';
          isValid = false;
        }
        if (parseInt(this.get("price"))<=0){
          errors.price = 'Price should be positive.';
          isValid = false;
        }
        if (parseInt(this.get("quantity"))!=this.get("quantity")){
          errors.quantity = 'Invalid quantity.';
          isValid = false;
        }
        if (parseInt(this.get("quantity"))<1){
          errors.quantity = 'Quantity must be larger than 0.';
          isValid = false;
        }
        return (isValid)? false:errors;
    },

    urlRoot: "/product",
    defaults: {
        "name": "",
        "price" : 0,
        "quantity": 0,
        "subtotal": 0
    },
    subtotal: function(){
        this.set("subtotal", parseInt(this.get("quantity"))* parseFloat(this.get("price")));
    }
});

app.ProductView = Backbone.View.extend({
    tagName: 'li',

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.render();
    },

    events: {
        'click .product-delete': "delete",
        'click .product-edit': "edit"
    },

    render: function(){
        var html = _.template($("#product-template").html(), this.model.attributes);
        this.$el.html(html);
        return this;
    },

    delete: function(e){
        this.remove();
        this.model.destroy();
        this.collection.trigger("change");
    },

    edit: function(e){
         new app.ProductFormView({
            model: this.model, 
            collection: this.collection
        });  
    }
});

app.ProductList = Backbone.Collection.extend({
    model: app.Product,
    url: "/product"
});


app.ProductListView = Backbone.View.extend({
    el: "#product-list",

    initialize: function(){
        //pass the current context as a last parameter (otherwise we ll get the collection context)
        this.collection.bind('reset', this.render, this);
        this.collection.bind('add', this.add, this);
        this.collection.bind('change', this.total, this);
    },

    events: {
        "click .btn-add" : "renderForm"
    },
    render: function(){
        var $list = this.$el.children("ul");
        $list.empty();
        var self = this;
        if (this.collection.length===0){
            $list.html("<li class='product-list-placeholder'><small>No products added.</small></li>");
        }
        else {
            var collection = this.collection;
            this.collection.each(function(product){
                var $li = $("<li>");
                $list.append($li);
                new app.ProductView({
                    el: $li,
                    model: product,
                    collection: collection
                });
            });
        }
         new app.ProductTotalView({
            collection: this.collection
         });
    },

    add: function(product){
        var $list = this.$el.children("ul");
        var $li = $("<li>");
        $(".product-list-placeholder").remove();
        $list.append($li);
        new app.ProductView({
            el: $li,
            model: product,
            collection: this.collection
        });
        new app.ProductTotalView({
            collection: this.collection   
        });
    },

    renderForm: function(e){
        new app.ProductFormView({
            model: new app.Product(),
            collection: this.collection
        });
    },

    total: function(){
        new app.ProductTotalView({
            collection: this.collection
        });
    }
});

app.ProductTotalView = Backbone.View.extend({
    el: '#product-total',

    initialize: function(){
        var total = 0;
        _.each(this.collection.models, function(product){
            total+=product.get("subtotal");
        });
        this.render(total);
    },
    render: function(total){
        this.$el.html(total);
    }
});
app.ProductFormView = Backbone.View.extend({

    events: {
        "click .submit" : "submit"
    },
    initialize: function(){
        this.render();
    },
    render: function(){ 
        var html = _.template($("#product-form-template").html(), this.model.attributes);
        $(".product-form").html(this.$el)
        this.$el.empty().html(html);
    },
    submit: function(e){

        // store our context here
        var self = this;
        
        var name = this.$el.find("input[name='name']").val();
        var price = this.$el.find("input[name='price']").val();
        var quantity = this.$el.find("input[name='quantity']").val();

        this.model.set("name", name);
        this.model.set("price", parseFloat(price));
        this.model.set("quantity", parseInt(quantity));
        
        var err = this.model.validate();
        if (err){
            $errorContainer = this.$el.children('.errors')
            $errorContainer.empty();
            _.each(err, function(field){
                $errorContainer.append('<span>'+field+'</span><br>');
            });
            $errorContainer.show();
        }
        else{
            var isNew = (undefined == this.model.get(this.model.idAttribute))?true:false;
            this.model.save(
                   null,
                   {
                        success: function(product){
                            if (isNew)
                                self.collection.add(product);
                            self.remove();
                        },
                        error: function(err){
                            console.log(err);
                        }
                    });
             console.log(this.model);
        }
        e.preventDefault();
    }
});

$(function(){
    var list = new app.ProductList();
    var view = new app.ProductListView({
        collection: list   
    });
    list.fetch({
        reset:true
    });
});





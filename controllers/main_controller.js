const Order = require("../models/order_schema");

module.exports.main = function(req,res){

    Order.find({}, function(err, orders){
        if(err){ console.log("Error in fetching contacts from db"); return ;}
                
        return res.render("home", {
            title: "Home",
            Order_List: orders
        });
    });
};

module.exports.create = function(req, res){

    Order.create(req.body, function(err, newOrder){
        if(err) { console.log("Error in creating the order!"); return;}

        console.log("********", newOrder);
        return res.redirect("back");
    });
};

module.exports.delete = function(req, res){

    //get the id from the query in the url
    let id = req.query.id;
    
    //find the order in the database using id and delete
    Order.findByIdAndDelete(id, function(err){
        if(err){ console.log("Error in deleting an object from the database"); return;}
    
        return res.redirect("back");
    });
};
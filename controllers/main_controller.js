const Order = require("../models/order_schema");
const User = require("../models/user_schema");


module.exports.main = function(req,res){

    // Order.find({}, function(err, orders){
    //     if(err){ console.log("Error in fetching contacts from db"); return ;}
                
    //     return res.render("home", {
    //         title: "Home",
    //         Order_List: orders
    //     });
    // });

    // Order.find({})
    // .populate("ClientID")
    // .exec(function(err, orders){
    //     if(err){ console.log("Error in fetching contacts from db"); return ;}
                
    //     return res.render("home", {
    //         title: "Home",
    //         Order_List: orders
    //     });
    // });

    if(req.user) {
        User.findOne({_id: req.user._id})
        .populate("myOrders")
        .exec(function(err, user_record){
            if(err){ console.log("Error in fetching contacts from db"); return ;}
                
            return res.render("home", {
                title: "Home",
                Order_List: user_record.myOrders
            });
        });
    } else {
        return res.render("home",{
            title: "Home"
        });
    }
};

module.exports.create = function(req, res){

    Order.create({
        AWBNo: req.body.AWBNo,
        Origin: req.body.Origin,
        Dest: req.body.Dest,
        Weight: req.body.Weight,
        ClientID: req.user._id
    }, function(err, newOrder){
        if(err) { console.log("Error in creating the order!"); return;}

        // console.log("********", newOrder);
        req.user.myOrders.push(newOrder);
        req.user.save();
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
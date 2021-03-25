const Order = require("../models/order_schema");
const User = require("../models/user_schema");


module.exports.main = async function(req,res){

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

    try{

        if(req.user) {
            
            let user_record = await User.findOne({_id: req.user._id})
            .populate("myOrders");
            
            return res.render("home", {
                title: "Home",
                Order_List: user_record.myOrders
            });

        } else {
            return res.render("home",{
                title: "Home"
            });
        }
    } catch(err) {
        console.log("Error: ", err);
        return;
    }
};

module.exports.create = async function(req, res){

    try{
        let newOrder = await Order.create({
            AWBNo: req.body.AWBNo,
            Origin: req.body.Origin,
            Dest: req.body.Dest,
            Weight: req.body.Weight,
            ClientID: req.user._id
        });

        req.user.myOrders.push(newOrder);
        req.user.save();

        req.flash("success", "Order placed successfully!");
        return res.redirect("back");

    } catch(err){
        console.log("Error in creating the order!");
        return;
    }
};

module.exports.delete = async function(req, res){


    try{

        //get the id from the query in the url
        let order_id = req.query.id;
    
        //find the order in the database using id and delete it
        await Order.findByIdAndDelete(order_id);

        await User.findByIdAndUpdate(req.user._id, { $pull: {myOrders: order_id}});

        req.flash("success", "Order deleted successfully!");
        return res.redirect("back");

    } catch(err){
        console.log("Error in deleting an object from the database"); 
        return;
    }
};
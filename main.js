const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

const db = require("./config/mongoose");
const Order = require("./models/order");


//use express router
app.use("/", require("./routes/main_router"));


// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));


// app.use(express.urlencoded());          //app.use() signifies that this is a middlware
// app.use(express.static("assets"));      // middleware that directs express to include assets (static files)


// app.get("/", function(req, res){
    
//     Order.find({}, function(err, orders){
//         if(err){ console.log("Error in fetching contacts from db"); return ;}
        
//         return res.render("home", {
//             title: "My Past Orders",
//             Order_List: orders
//         });
//     });
// });

// app.get("/practice", function(req, res){
    
//     return res.render("practice", {
//         title: "Playground"
//     });
// });

// app.post("/create-Order", function(req, res){

//     Order.create({
//         AWBNo: req.body.AWBNo,
//         Origin: req.body.Origin,
//         Dest: req.body.Dest,
//         Weight: req.body.Weight,
//         ClientName: req.body.ClientName,
//         ClientID: req.body.ClientID
//     }, function(err, newOrder){
//         if(err) { console.log("Error in creating the order!"); return;}

//         console.log("********", newOrder);
//         return res.redirect("back");
//     });
// });

// app.get("/delete-order/", function(req,res){

//     //get the id from the query in the url
//     let id = req.query.id;
    
//     //find the order in the database using id and delete
//     Order.findByIdAndDelete(id, function(err){
//         if(err){ console.log("Error in deleting an object from the database"); return;}
    
//         return res.redirect("back");
//     });
// });

app.listen(port, function(err){
    if(err) { console.log(`Error in running the server: ${err}`);}

    console.log(`Server running on port: ${port}`);
});
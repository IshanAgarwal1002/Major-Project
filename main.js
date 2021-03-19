const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 8000;

const app = express();

const expressLayouts = require('express-ejs-layouts');

const db = require("./config/mongoose");
const Order = require("./models/order_schema");

app.use(express.urlencoded());          //app.use() signifies that this is a middlware
app.use(express.static("assets"));      // middleware that directs express to include assets (static files)
app.use(cookieParser());

//use express router
app.use("/", require("./routes/main_router"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.listen(port, function(err){
    if(err) { console.log(`Error in running the server: ${err}`);}

    console.log(`Server running on port: ${port}`);
});
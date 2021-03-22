const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 8000;

const app = express();

const expressLayouts = require('express-ejs-layouts');

const db = require("./config/mongoose");
const Order = require("./models/order_schema");

//used fot session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require("connect-mongodb-session")(session);


app.use(express.urlencoded());          //app.use() signifies that this is a middlware
app.use(express.static("assets"));      // middleware that directs express to include assets (static files)
app.use(cookieParser());

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//mongo store is used to store the session cookie in the db
app.use(session({
    name: "Courier",    // name of cookie
    // Change the secret before deployment in production mode 
    secret: "somethingrandom",      //encryption key
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (100*60*1000)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: "disabled"
        },
        function(err){
            console.log(err || "connect-mongodb-session setup ok");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use("/", require("./routes/main_router"));



app.listen(port, function(err){
    if(err) { console.log(`Error in running the server: ${err}`);}

    console.log(`Server running on port: ${port}`);
});
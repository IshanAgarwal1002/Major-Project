const User = require("../models/user_schema");


module.exports.profile = function(req,res){
    res.end("<h1>User Profile</h1>");
};

//get the sign up page
module.exports.signUp = function(req,res){
    return res.render("user_sign_up",{
        title: "Sign Up"
    });
};

//get the sign in page
module.exports.signIn = function(req,res){
    return res.render("user_sign_in",{
        title: "Sign In"
    });
};

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }

    User.findOne({email:req.body.email}, function(err,user){
        if(err){ console.log("Error in finding user in signing up"); return;}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){ console.log("Error in creating user while signing up"); return;}

                return res.redirect("/user/sign-in");
            });
        } else {
            return res.redirect("back");
        }
    });
};

//get the sign in data
module.exports.createSession = function(req,res){
    
};
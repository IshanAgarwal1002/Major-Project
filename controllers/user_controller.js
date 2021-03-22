const User = require("../models/user_schema");


module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render("user_profile", {
                    title: "User Profile",
                    user: user
                });
            } 

            return res.redirect("/user/sign-in");
        });
    }
    else {
        return res.redirect("/user/sign-in");
    }
};

//get the sign up page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect("/user/profile");
    }

    return res.render("user_sign_up",{
        title: "Sign Up"
    });
};

//get the sign in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect("/user/profile");
    }

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
    //find the user
    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){ console.log("Error in finding user in signing in"); return;}

    //     //handle user found
    //     if(user){

    //         //handle password which doesn't match
    //         if(user.password != req.body.password){
    //             return req.redirect("back");
    //         }

    //         //handle session creation
    //         res.cookie("user_id", user.id);
            return res.redirect("/");
    //     } 
        //handle user not found
        // else {
            // return res.redirect("back");
    //     }
    // });
};

module.exports.destroySession = function(req, res){

    req.logout();
    return res.redirect("/");
};
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
module.exports.create = async function(req,res){

    try{

        if(req.body.password != req.body.confirm_password){
            req.flash("error", "Passwords do not match!");
            return res.redirect("back");
        }
    
        let user = await User.findOne({email:req.body.email});

        if(!user){
            
            await User.create(req.body);
            req.flash("success", "Sign up successful");
            
            return res.redirect("/user/sign-in");

        } else {
            return res.redirect("back");
        }

    } catch(err){
        console.log("Error in finding user in signing up"); return;
    }
    
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

    req.flash("success", "Sign in successful");
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
    req.flash("success", "You have logged out!");

    return res.redirect("/");
};
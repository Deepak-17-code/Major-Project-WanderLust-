const User = require("../models/user.js");
module.exports.signupget = (req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signupPost = async(req,res)=>{
    try{
        let {username ,email, password} = req.body;
    const newUser = new User({email,username})
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to WanderLust");
        res.redirect("/listings");
    })
    
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.loginget= (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.loginpost = async(req,res)=>{
    req.flash("success","Welcome Back WanderLust! You LogIn");
    let redirecturl = res.locals.redirectUrl || "/listings";
    res.redirect(redirecturl);
}

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
}
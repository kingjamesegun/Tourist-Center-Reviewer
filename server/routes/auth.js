const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../model/user");
// AUTH ROTUES

router.get("/register", (req,res)=>{
    res.render("register");
});

router.post("/register", (req, res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash("success", "Welcome to Yelpcamp, " + user.username.toUpperCase());
            res.redirect("/campgrounds");
        })
    })
})
router.get("/login", (req,res)=>{
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res)=>{
    
});

router.get("/logout", (req, res)=>{
    req.logout();
    
    req.flash("success", "You're logged out");
    res.redirect("/login");
})


router.get("/", (req,res)=>{
    res.render("landing");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;
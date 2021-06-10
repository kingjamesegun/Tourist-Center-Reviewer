const express = require("express");
const router = express.Router();
const _ = require("lodash");
const middlewareObj = require('../middleware/index');


const Users = require('../model/user');

router.get("/profile/:id", middlewareObj.isLoggedIn, (req, res)=>{
    var id = req.params.id;
    if(!id){
        res.status(400).send();
    }
    Users.findById(id).then((user)=>{
        if(!user){
            return res.status(400).send();
        }
        res.render("profile/index", {profile: user});
    }).catch((err)=>{
        res.status(400).send();
    })
});


router.get("/profile/:id/edit", (req, res)=>{
    var id = req.params.id;
    Users.findById(id, (err, user)=>{
        if(err){
            res.redirect("back");
        }else{
            res.render("profile/edit", {profile: user});
        }
    })
});


router.put("/profile/:id", (req, res)=>{
    var id = req.params.id;
    console.log(req.body.username)

    Users.findByIdAndUpdate(id, req.body.username, (err, updatedProfile)=>{
        if(err){
            res.redirect("/profile/"+ id);
        }else{
            console.log(updatedProfile)
            res.redirect("/profile/" + id);
        }
    })
})





module.exports = router;
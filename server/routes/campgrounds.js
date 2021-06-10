const express = require("express");
const router = express.Router();
const Campground = require("../model/camp");

const middlewareObj = require("../middleware");


router.get("/",  (req, res)=>{
    Campground.find({}, (err, campgrounds)=>{
        if(err){
            console.log("Error", err);
        }else{
            res.render("campgrounds/campgrounds", {campgrounds : campgrounds, currentUser: req.user});
        }
    })
     
});


router.post("/", middlewareObj.isLoggedIn, (req,res)=>{
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var username = {
        id: req.user._id,
        username: req.user.username
    }
    var NewCamp ={name : name, image:image, description: description, username: username};

    Campground.create(NewCamp, (err, NewCamp)=>{
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Logged in successfully")
            res.redirect("/campgrounds");
        }
    })

})

router.get("/new", middlewareObj.isLoggedIn, (req,res)=>{
    res.render("campgrounds/new");
});

router.get("/:id", (req,res)=>{
    var id = req.params.id;
    if(!id){
        return res.status(400).send();
    }
    Campground.findById(id).populate("comments").exec(function(err, foundcampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {camp :  foundcampground})
        }
    })
});

// EDIT ROUTES
router.get("/:id/edit", checkCampgroundOwnership, (req,res)=>{
        var id = req.params.id;
        Campground.findById(id, (err, foundcampground)=>{
            res.render("campgrounds/edit", {campground : foundcampground});
    });
    
});

// UPDATES ROUTES
router.put("/:id", checkCampgroundOwnership, (req,res)=>{
    var id = req.params.id;
    Campground.findByIdAndUpdate(id, req.body.campground, (err, updatedCampground)=>{
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + id);
        }
    })
})
,

// DESTROY ROUTES
router.delete("/:id", checkCampgroundOwnership,     (req,res)=>{
    var id = req.params.id;

    Campground.findByIdAndRemove(id, (err)=>{
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Campground successfully deleted!")
            res.redirect("/campgrounds");
        }
    })
})




function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        var id = req.params.id;
        Campground.findById(id, (err, foundcampground)=>{
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                if(foundcampground.username.id.equals(req.user.id)){
                    next();
                }else{
                    req.flash("error", "Permission denied!")
                   res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error", "You've to be logged in to do that");
        res.redirect("back");
    }
}





module.exports = router;
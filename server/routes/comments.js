const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../model/camp");
const Comment = require("../model/comment");

const middlewareObj = require("../middleware");

// ============================================
// COMMENTS  ROUTES
// ===================================



router.get("/new", middlewareObj.isLoggedIn, (req,res)=>{
    var id = req.params.id;
    Campground.findById(id, (err, campground)=>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
});

router.post("/", middlewareObj.isLoggedIn, (req, res)=>{
    var id = req.params.id;
    Campground.findById(id, (err, campground)=>{
        if(err){
            console.log(err);
            res.redirect("/camgrounds");
        }else{
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    req.flash('error', "Something went wrong");
                console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment); 
                    campground.save();
                    req.flash("success", "Successfuly added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
            
        }
    })


});

// EDIT ROUTES
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, (req,res)=>{
    var id = req.params.id;
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: id, comment: foundComment});
        }
    })
});


// update routes
router.put("/:comment_id", middlewareObj.checkCommentOwnership, (req, res)=>{
    var id = req.params.comment_id;
    Comment.findByIdAndUpdate(id, req.body.comment, (err, updatedComment)=>{
        if(err){
            re.redirect("back")
        }else{
            req.flash('success', "Comment successfully edited");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// DELETE ROUTE
router.delete("/:comment_id", middlewareObj.checkCommentOwnership, (req,res)=>{
    var id = req.params.comment_id;

    Comment.findByIdAndRemove(id, (err)=>{
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted!")
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})




module.exports = router;
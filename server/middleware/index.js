const Comment = require("../model/comment");
var middlewareObj ={};


middlewareObj.checkCommentOwnership =function (req, res, next){
    if(req.isAuthenticated()){
        var id = req.params.comment_id;
        console.log(id);
        Comment.findById(id, (err, foundComment)=>{
            if(err){
                req.flash("error", "Something went wrong!");
               res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                }else{
                    req.flash("error", "Permission denied!");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error", "You've to be logged in!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}


module.exports = middlewareObj;
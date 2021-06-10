const mongoose = require("mongoose");

var Campground =  require("./model/camp");
var Comment = require("./model/comment");


data = [
    {name: "Nigeria", image : "/assets/cycling.jpg", description : "Nicehfbkrhb huh efiheoiufhe iehieovie iehuhfh hovihwro ivoihsov ihvoihsvhfbkrhb huh efiheoiufhe iehieovie iehuhfh hovihwro ivoihsov ihvoihsvhfbkrhb huh efiheoiufhe iehieovie iehuhfh hovihwro ivoihsov ihvoihsv"},
    {name: "Russia", image : "/assets/cycling.jpg", description:"hfbkrhb huh efiheoiufhe iehieovie iehuhfh hovihwro ivoihsov ihvoihsv suhusvi uivuhiduv uivuhdu hfbkrhb huh efiheoiufhe iehieovie iehuhfh hovihwro ivoihsov ihvoihsvhfbkrhb huh efiheoiufhe iehieovie iehuhfh hovihwro ivoihsov ihvoihsvhfbkrhb huh efiheoiufhe iehieovie iehuhfh hovihwro ivoihsov ihvoihsv"},
    
    {name: "Togo", image : "/assets/cycling.jpg", description : "Nicehfbkrhb huh efiheoiufhe iehieovie iehuhfh hovihwro ivoihsov ihvoihsvhfbkrhb huh efiheoiufhe iehieovie iehuhfh hovihwro ivoihsov ihvoihsvhfbkrhb huh efiheoiufhe iehieovie iehuhfh hovihwro ivoihsov ihvoihsv"},
]
function seedDB(){
    Campground.remove({}, (err)=>{
        // if(err){
        //     console.log(err);
        // }
        // console.log("Camgrounds removed");
        // data.forEach((camp)=>{
        //     Campground.create(camp, (err, campground)=>{
        //         if(err){
        //             console.log(err)                                                                                                                                                                                                                                                                                
        //         }else{
        //             console.log("Added a new campground")
        //             Comment.create({
        //                 text: "O make sense baje",
        //                 author: "James Okunola",
                    
        //             }, (err, comment)=>{
        //                 if(err){
        //                     console.log(err);
        //                 }else{
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("Created new comment");
        //                 }
        //             })
        //         }
        //     })
        // })
    });


}

module.exports = seedDB;
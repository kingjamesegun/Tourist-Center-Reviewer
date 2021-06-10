var mongoose = require("mongoose");
const { truncate } = require("lodash");
mongoose.connect("mongodb://localhost/camp",
{useNewUrlParser:true,useUnifiedTopology:true});


var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    username: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Campground", campgroundSchema);
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");

const PORT = 5001;


const seedDB = require("./seed");
const User = require("./model/user");

const commentRoutes = require("./routes/comments");
const campgroundsRoutes = require("./routes/campgrounds");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

// seedDB(); 

// authentication

app.use(flash());
app.use(require("express-session")({
    secret: "I love Imole she's the best",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("views"));
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(authRoutes);
app.use("/campgrounds",campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(profileRoutes);
app.get("*", (req, res)=>{
    res.send("Error 404: Page not found")
})






app.listen(PORT, ()=>{
    console.log("Running on port: " + PORT);
})
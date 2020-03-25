var express = require("express"),
app = express(),
mongoose = require("mongoose"),
bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/GPA_Web_App", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


var semesterSchema =  new mongoose.Schema({
    year: String,
    season: String,
    classes: [
        {
            name: String,
            grade: String,
            hours: Number
        }
    ]
});

var Semester = mongoose.model("Semester", semesterSchema);

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.redirect("/semesters");
});

//INDEX ROUTE - should show student all semesters 
app.get("/semesters", function(req, res) {
    Semester.find({}, function(err, semesters) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {semesters:semesters});
        }
    });
});

//SHOW ROUTE - should show a semester
app.get("/semesters/:id", function(req, res) {
    Semester.findById(req.params.id, function(err, foundSemester) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {semester:foundSemester});
        }
    });
});

//NEW ROUTE - should show form to create new semester
app.get("/semesters/new", function(req, res) {
    res.render("new");
});

//CREATE ROUTE - should create new semester and then redirect to index/homepage
app.post("/semesters", function(req, res){
    //req.body.semester.body = req.sanitize(req.body.semester.body);
    Semester.create(req.body.semester, function(err, newSemester){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/semesters");
        }
    });
})

app.listen(4000, () => {
    console.log("App listening on port 4000.");
})
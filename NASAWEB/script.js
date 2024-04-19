var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

mongoose.connect('mongodb://localhost:27017/SpaceWebsite', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', (error) => {
    console.error("Error in Connecting to Database:", error);
});
db.once('open', () => {
    console.log("Connected to Database");
});

app.post("/submit-form", (req, res) => {
    console.log("hitting")
    console.log(req.body)
    var email = req.body.email;
    var name = req.body.name;
    var message = req.body.message;

    var data = {
       email,name, message
    };

    db.collection('Space User Data').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        console.log("Record Inserted Successfully");
         // res.redirect("/?msg=sent");
        res.json({ message: "Message Sent Successfully" });
    });
});

app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on PORT", PORT);
});

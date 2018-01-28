var   express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        mongoose = require("mongoose"),
        indexRoutes = require("./routes/index"),
        path = require("path"),
        config = require("./config/database"),
        cors = require("cors");

const port = 3000;
mongoose.connect(config.database);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use("/",indexRoutes);
app.use(cors());




app.listen(port, function(){
    console.log("Server started @PORT:"+port);
});
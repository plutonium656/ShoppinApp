var   express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        mongoose = require("mongoose"),
        indexRoutes = require("./routes/index"),
        path = require("path"),
        config = require("./config/database"),
        cors = require("cors"),
        apiRoutes = require("./routes/api");

const port = 3000;
mongoose.connect(config.database);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");
app.use("/",indexRoutes);
app.use("/api",apiRoutes);





app.listen(port, function(){
    console.log("Server started @PORT:"+port);
});
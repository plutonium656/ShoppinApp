var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var List = require("../models/list");

router.post("/article", function(req,res){
    Article.create(req.body, function(err,article){
        if(err){
            res.send({
                success:false,
                msg:"failed to add article to database!"
            })
        } else {
            res.send({
                success:true,
                msg:"added to database: "+ article
            })
        }
    });
});

router.get("/article/get_all",function(req,res){
    Article.find(function(err,articles){
        if(err){
            res.send({
                success:false,
                msg:"unable to retrieve articles from database"
            })
        } else {
            res.send({
                success:false,
                msg:"retrieve your data from the 'data' object",
                data:articles
            });
        }
    });
});

router.delete("/article/:id", function(req,res){
    Article.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send({
                success:false,
                msg:"unable to delete entry with id: "+req.params.id
            })
        } else {
            res.send({
                success:true,
                msg:"Deleted entry widh id: "+req.params.id
            })
        }
    });
});

module.exports = router;

var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var List = require("../models/list");

router.get("/articles/all", function(req,res){
    Article.getAllArticles(function(err,articles){
        if(err)throw err;
        res.send(articles);
    });
});

router.post("/articles", function(req,res){
    console.log(req.body.name);
    var newArt = {
        name:req.body.name,
        price:req.body.price,
        shop:req.body.shop
    };
    Article.addArticle(newArt,function(err,article){
        if(err)throw err;
        res.redirect("back");
    });
});

router.post("/list/:id/add", function(req,res){
    List.addItemToList(req.params.id,req.body.item, function(err){
        if(err) throw err;
        res.render("index",articles)
    });
});

router.post("/list/new", function(req,res){
    List.create({name:"tempList"},function(err,list){
        if(err) throw err;
        Article.find(function(err,articles){
            if(err) throw err;
            res.send(list._id);
        });
    });
});

module.exports = router;

var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
    name:String,
    price:Number,
    shop:String
});

var Article = mongoose.model("Article",articleSchema);

module.exports = Article;
module.exports.getAllArticles = function(callback){
    Article.find(callback);
}

module.exports.addArticle = function(newArticle,callback){
    Article.create(newArticle,callback);
}
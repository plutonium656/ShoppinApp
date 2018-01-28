var mongoose = require("mongoose");

var listSchema = mongoose.Schema({
    name:String,
    articles:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "Article"
    }]
});

var List = mongoose.model("List",listSchema);

module.exports = List;

module.exports.getListById = function(id,callback){
    List.findById(id,callback);
}

module.exports.addItemToList = function(id,item,callback){
    List.findById(id,function(err,list){
        if(err)throw err;
        list.articles.push(item);
        list.save(callback);
    });
}
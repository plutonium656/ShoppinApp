var mongoose = require("mongoose");

var listSchema = mongoose.Schema({
    name:String,
    articles:[{
        article:{
            type:mongoose.Schema.Types.ObjectId, 
            ref: "Article"
        },
        quantity:Number
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

module.exports.saveAsNewList = function(items, callback){
    List.create({}, function(err,list){
        if(err)throw err;
        list.name = list._id;
        list.articles = items;
        list.save(callback);
    });
}
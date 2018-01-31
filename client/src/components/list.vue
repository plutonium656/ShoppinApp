<template>
<div class="row">
  <div class="col-md-6">
      <ul class="list-group">
            <li v-for="(article, index) in orderedArticles" class="list-group-item noselect" v-on:click="addToShoppingList(orderedArticles[index])">
              <span class="highlight">{{index}}</span>: {{article.name}} - <em class="pull-right">{{article.shop}}</em>
              <button class="btn btn-sm btn-danger float-right" v-on:click="removeArticleFromDatabase(articles[index])">X</button>
            </li>
      </ul>
  </div>
  <div class="col-md-6">
      <ul class="list-group">
          <li v-for="(item,index) in shoppingList" class="list-group-item noselect">
            <span class="highlight">{{index}}</span>: {{item.name}} - <em >{{item.shop}}</em> <span v-show="item.quantity">{{item.quantity}} = {{(item.quantity*item.price).toFixed(2)}}€</span>
            <button class="btn btn-sm btn-danger float-right" v-on:click="removeFromShoppingList(shoppingList[index])">X</button>
          </li>
      </ul>
      <button class="btn btn-lg btn-success fullwidth" v-on:click="saveAsNewListToDb">Liste Speichern</button>
      <button class="btn btn-sm btn-primary" v-on:click="getListFromDatabase('5a71c97d582e2743007b84da')">LoadList</button>
      <li class="list-group-item">{{sl_sum()}}€</li>
  </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
    beforeMount:function(){
        this.getArticlesFromDatabase();
        this.loadLocalList();
    },
    updated:function(){
        this.getArticlesFromDatabase();
    },
    data:function(){
        return{
            articles:[],
            shoppingList:[]
        }
    },
    methods:{
        getArticlesFromDatabase:function(){
            this.$http.get("http://localhost:3000/api/article/get_all").then(function(res){
                this.articles = res.body.data;
            });
        },
        removeArticleFromDatabase:function(article){
            this.$http.delete("http://localhost:3000/api/article/"+article._id).then(function(res){
                console.log(res);
            });
        },
        addToShoppingList:function(article){
            for(var i = 0; i < this.shoppingList.length; i++){
                // check if item allready exists
                if(article._id === this.shoppingList[i]._id){
                        this.shoppingList[i].quantity += 1;
                    return;
                }
            }
            article.quantity = 1;
            this.shoppingList.push(article); 
        },
        removeFromShoppingList:function(article){
            console.log(article);
            var index = this.shoppingList.indexOf(article);
            if(index > -1){
                this.shoppingList.splice(index,1);
            }
        },
        saveLocalList:function(){
            localStorage.setItem("localShoppingList",JSON.stringify(this.shoppingList));
        },
        loadLocalList:function(){
            if(localStorage.getItem("localShoppingList")){
                this.shoppingList = JSON.parse(localStorage.getItem("localShoppingList"));
            }
        },
        sl_sum:function(){
            var sum = 0;
            for(var i = 0; i < this.shoppingList.length; i++){
                sum += this.shoppingList[i].quantity * this.shoppingList[i].price;
            }
            return sum.toFixed(2);
        },
        saveAsNewListToDb: function(){
            var refObject = [];
            this.shoppingList.forEach(function(item){
                refObject.push({
                    _id : item._id,
                    quantity : item.quantity
                });
            });
            this.$http.post("http://localhost:3000/api/list", refObject).then(function(res){
                console.log(res);
            });
        },
        getListFromDatabase:function(id){
            this.$http.get("http://localhost:3000/api/list/"+id).then(function(res){
                console.log(res.body.articles);
            });
        }
    },
    computed:{
        orderedArticles:function(){
            return _.orderBy(this.articles,'shop');
        }
    }
}
</script>

<style scoped>
.highlight{
    font-weight: bold;
}
.fullwidth{
    width:100%;
}

ul li:hover{
background-color:lightblue;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>

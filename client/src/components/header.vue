<template>
  <header>
    <nav class="navbar navbar-dark bg-dark">
        <form class="form-inline">
            <input type="text" placeholder="Article Name" class="form-control" v-model="article.name">
            <input type="number" placeholder="Article Price" step="0.01" min="0" class="form-control" v-model="article.price">
            <select class="form-control" v-model="article.shop">
                <option v-for="option in options">{{option}}</option>
            </select>
            <button v-on:click.prevent="submitArticle" class="btn btn-primary">Eintragen</button>
        </form>
        <form>
            <select class="form-control" v-model="currentListSelection" v-on:change="onListSelected">
                <option v-for="list in dbLists">{{list.name}}</option>
            </select>
        </form>
    </nav>
  </header>
</template>

<script>
import Vue from 'vue';
import EventBus from "./event-bus";

export default {
    beforeMount:function(){
        this.getListsFromDatabase();
    },
    updated:function(){
      console.log(this.currentListSelection)  
    },
    data:function(){
        return {
            options:[
                "Aldi",
                "Tegut",
                "Rewe"
            ],
            article:{
                name:undefined,
                price:undefined,
                shop:undefined
                },
            dbLists:[],
            currentListSelection:undefined
        }
    },
    methods:{
        submitArticle:function(){
            if(this.article.name == undefined || this.article.price == undefined || this.article.shop == undefined){
               return console.log("fill out all fields!");
            }
            this.$http.post("http://localhost:3000/api/article",this.article).then(function(data){
                console.log(data);
                this.article.name = undefined;
                this.article.price = undefined;
                this.article.shop = undefined;
            });
        },
        getListsFromDatabase:function(){
            this.$http.get("http://localhost:3000/api/list").then(function(res){
                res.body.data.forEach((list) => {
                    this.dbLists.push({
                        name:list.name,
                        _id:list._id
                    });
                })
            });
        },
        onListSelected:function(){
            console.log("on-list-selection emitted with id "+this.currentListSelection);
            EventBus.$emit('on-list-selection', this.currentListSelection);
        }
    }
    
}
</script>

<style scoped>
.fullwidth{
    width:100%;
}
</style>

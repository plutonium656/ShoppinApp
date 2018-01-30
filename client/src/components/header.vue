<template>
  <header>
    <nav class="navbar navbar-dark bg-dark">
        <form class="form-inline fullwidth">
            <input type="text" placeholder="Article Name" class="form-control" v-model="article.name">
            <input type="number" placeholder="Article Price" step="0.01" min="0" class="form-control" v-model="article.price">
            <select class="form-control" v-model="article.shop">
                <option v-for="option in options">{{option}}</option>
            </select>
            <button v-on:click.prevent="submitArticle" class="btn btn-primary">Eintragen</button>
        </form>
    </nav>
  </header>
</template>

<script>
export default {
    data:function(){
        return {
            options:[
                "Aldi",
                "Tegut"
            ],
            article:{
                name:undefined,
                price:undefined,
                shop:undefined
                }
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
        }
    }
    
}
</script>

<style scoped>
.fullwidth{
    width:100%;
}
</style>

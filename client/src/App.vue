<template>
  <div id="app">
    <app-header></app-header>
      <app-list></app-list>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import List from "./components/list.vue";

export default {
  components:{
    "app-header":Header,
    "app-list":List
  },
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style>

</style>

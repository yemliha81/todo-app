<template>
  <div id="app">
    <PostComponent msg="Post Component"/>
  </div>
</template>

<script>
import PostComponent from './components/PostComponent.vue'

export default {
  name: 'App',
  components: {
    PostComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.post-container{
  width:600px;
  float:none;
  margin:0 auto;
}
.postx{
  text-align: left;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f7f7f7;
  margin-bottom: 10px;
  line-height: 37px;
}
.inputx{
      padding: 12px;
    line-height: 27px;
    float: left;
    font-size: 20px;
    border-radius: 5px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    border: 2px dashed #888;
}
.buttonx{
  padding:10px; width:150px; float:right; 
}
.buttony{
  padding:10px; float:right; 
}
.clr{clear:both; }
.pr{float:right;}
.mb10{margin-bottom:10px;}
</style>

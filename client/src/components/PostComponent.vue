<template>
  <div>
      <h1>Todo List</h1>
      <div class="post-container">
          <input type="text" class="inputx" v-model="task" v-on:keyup.enter="createPost" placeholder="Enter text">
          <div class="clr mb10"></div>
          <div class="postx"
            v-for="todo in todos"
            v-bind:item="todo"
            v-bind:key="todo.id" >
            <b>{{todo.id}} .</b> {{todo.task}} || {{ todo.taskdate }} 
            
                <button v-on:click="deletePost(todo.id)" class="buttony">x</button>
                <select class="buttony" :required="true" @change="changePriority(todo.id, $event)">
                    <option :selected="true">{{ todo.priority }}</option>
                    <option v-for="option in options" v-bind:value="option.name" v-bind:key="option.id" >{{ option.name }}</option>
                </select>

                <div class="clr"></div>
          </div>
      </div>
  </div>
</template>

<script>

import PostService from '../PostService';

export default {

  name: 'PostComponent',
  data(){
      return{
        todos : [],
        error : '',
        task : '',
        priority : '',
        taskdate : '',
        options: [
            {name: 'High', id: 1},
            {name: 'Medium', id: 2},
            {name: 'Low', id: 3},
        ]
    }
  },
  async created(){
      this.getTodos()
  },
  methods: {
      async createPost() { 
        await PostService.insertPost( this.task, this.priority);
        this.getTodos();
        alert("Task Inserted!")
      },
      async deletePost(id) { 
          await PostService.deletePost( id );
          this.getTodos();
      },
      async getTodos(){
        let todos = await PostService.getTodos();
        this.todos = todos.data;
        this.task = '';
      },
      async changePriority(id, event){
        await PostService.updatePost( id, event.target.value);
        this.getTodos();
        alert("Task Updated")
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

import axios from 'axios';
const url = 'http://localhost:4000/gettodolist';
const insertUrl = 'http://localhost:4000/addTask/';
const updateUrl = 'http://localhost:4000/updateTask/';
const deleteUrl = 'http://localhost:4000/delTask/';
const nowDate = new Date();
nowDate.setDate(nowDate.getDate() + 7);
const nextWeekDate = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();


class PostService {

    static getTodos() {
        return axios.get(url)
    }

    static insertPost(task){
        axios.post(insertUrl, {
            task: task,
            priority: 'medium',
            taskdate: nextWeekDate
        });
    }
    static updatePost(id, priority){
        axios.post(updateUrl, {
            id: id,
            priority: priority
        });
    }
    
    static deletePost(id){
        axios.get(deleteUrl+id);
    }

}

export default PostService;
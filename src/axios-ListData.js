import axios from 'axios' ; 


const instance = axios.create({

        baseURL : "https://todo-hook-7f046.firebaseio.com/"

})

export default instance;
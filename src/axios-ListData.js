import axios from 'axios'

const instance =  axios.create({
        baseURL : "https://todo-hook-7f046.firebaseio.com/",
        
})
instance.interceptors.request.use((req) => {    
        req.headers.Authorization = localStorage.getItem("idToken");
        return req;
});

export default instance;
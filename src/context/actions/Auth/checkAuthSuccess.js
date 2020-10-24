import {authSucces,checkAuth,logOut} from './registerAuth'


export default () => (dispatch) => {
        const token = localStorage.getItem('idToken') ;
        if(token) {
            const expirsin = new Date (localStorage.getItem("expTime")) ;
            if(expirsin > new Date()) {
                const userid = localStorage.getItem("idUser");
                authSucces(token,userid)(dispatch);
              
                    checkAuth (
                      (expirsin.getTime() - new Date().getTime()) / 1000
                    )(dispatch)
                  
            }else {
                    logOut()(dispatch);
            }
        }else {
            logOut()(dispatch);
        }
}
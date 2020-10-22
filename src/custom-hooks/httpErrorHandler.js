import {useState,useEffect} from 'react'

export default httpClient => {

    const [DataRequstHttp,setDataRequstHttp] = useState({
        error : null ,
        open : false ,
        })


       
    const reqInterceptor =  httpClient.interceptors.request.use((req) => {
        setDataRequstHttp({error : null ,open : false ,})
        return req;
      });

    const resInterceptor = httpClient.interceptors.response.use((res)=> res , err =>{
        setDataRequstHttp({error : err ,open : true})
    })        
   useEffect(()=>{
                return () => {
                    httpClient.interceptors.request.eject(reqInterceptor);
                    httpClient.interceptors.response.eject(resInterceptor);
                }

    },[reqInterceptor,resInterceptor, httpClient.interceptors.request,httpClient.interceptors.response])

   const errorConfirmedHandler =() =>{
         setDataRequstHttp({error : null ,open : false ,})
    }

    return [DataRequstHttp,errorConfirmedHandler];
}

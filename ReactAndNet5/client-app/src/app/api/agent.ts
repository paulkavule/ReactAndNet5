import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { history } from '../..'
import { ActivityFormValues, IActivity } from '../modals/activity'
import { Photo, Profile } from '../modals/profile'
import { User, UserFormValues } from '../modals/user'
import { store } from '../stores/store'

axios.defaults.baseURL = "http://localhost:5000"

axios.interceptors.request.use(config =>{
    const token = store.commonStore.token;
    // console.log('interceptor', token)
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response =>{
    try {
        await sleep(1000)
        return response
    } catch (ee) {
        // console.log('=>',ee)
        return await Promise.reject(ee)
    }
 },(error: AxiosError) => {
     const {data, status, config} = error.response!;
    //  console.log(data)
     switch(status){
         case 400:
            if(typeof data === 'string'){
                toast.error('Bad Request');
            }
            if(config.method === "get" && data.errors.hasOwnProperty('id')){
                history.push('/notfound')
            }
            if(data.errors){
                let errorList = []
                for(const key in data.errors){
                   errorList.push(data.errors[key])
                } 
                throw errorList.flat();
            }
            break;
         case 401:
            toast.error('un authorized');
            break;
         case 404:
            history.push('/notfound')
            break;
         case 500:
            store.commonStore.setServerError(data)
            history.push('/servererror')
            break;
     }
     return Promise.reject(error)
 })
const responseBody = <T>(response:AxiosResponse<T>) => response.data

const requests = {
    get :<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post :<T>(url:string, body:{})=>axios.post<T>(url,body).then(responseBody),
    put :<T>(url:string, body:{})=>axios.put<T>(url,body).then(responseBody),
    delete :<T>(url:string)=>axios.delete<T>(url).then(responseBody),
}

const Activities ={
    list:()=>requests.get<IActivity[]>('/Activities'),
    details:(id:string) => requests.get<IActivity>(`/Activities/${id}`),
    create:(activity:ActivityFormValues) => requests.post<void>('/Activities', activity),
    update:(activity:ActivityFormValues) =>requests.put<void>(`/Activities/${activity.id}`, activity),
    delete:(id:string) => requests.delete<void>(`/Activities/${id}`),
    attend:(id:string) => requests.post<void>(`/Activities/${id}/attend`,{})
}
const Accounts = {
    current: () =>requests.get<User>('/users/Account'),
    login:(user:UserFormValues) =>requests.post<User>('/users/Account/login',user),
    register:(user:UserFormValues) =>requests.post<User>('/users/Account/register', user)
}

const Profiles = {
    get: (username:string) => requests.get<Profile>(`/Profiles/${username}`),
    uploadPhoto:(file:Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('/Photo', formData,{
            headers:{'content-type':'multipart/form-data'}
        })
    },
    setMainPhoto: (id:string)=>requests.post<void>(`/setmain/${id}`,{}),
    deletePhoto: (id:string)=>requests.delete<void>(`/Photo/${id}`),
    updateFollowing:(username:string) =>requests.post<void>(`/followers/${username}`,{}),   
    listFollowings:(username:string, predicate:string) =>requests.get<Profile []>(`/followers/${username}?predicate=${predicate}`)
}
const agent = {
    Activities,
    Accounts,
    Profiles
}

const sleep = (delay : number) =>{
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
export default agent;
import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { history } from '../..'
import { IActivity } from '../modals/activity'
import { store } from '../stores/store'

axios.defaults.baseURL = "http://localhost:5000"
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
    create:(activity:IActivity) => requests.post<void>('/Activities', activity),
    update:(activity:IActivity) =>requests.put<void>(`/Activities/${activity.id}`, activity),
    delete:(id:string) => requests.delete<void>(`/Activities/${id}`)
}

const agent = {
    Activities
}

const sleep = (delay : number) =>{
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
export default agent;
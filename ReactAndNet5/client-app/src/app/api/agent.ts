import axios, { AxiosResponse } from 'axios'
import { IActivity } from '../modals/activity'

axios.defaults.baseURL = "http://localhost:5000"
axios.interceptors.response.use(async response =>{
    try {
        await sleep(1000)
        return response
    } catch (ee) {
        console.log(ee)
        return await Promise.reject(ee)
    }
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
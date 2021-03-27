
import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../modals/servererror";

export default class CommonStore{
    error : ServerError | null = null; 
    token: string | null = window.localStorage.getItem('utoken');
    appLoaded:boolean = false
    constructor(){

        makeAutoObservable(this);

        reaction(
            ()=> this.token,
            token => {
                if(token){
                    window.localStorage.setItem('utoken', token)
                }
                else{
                    window.localStorage.removeItem('utoken')
                }
            }
        )
    }

    setToken =(token:string) =>{
        if(token)
        {
           // window.localStorage.setItem('utoken', token);
            this.token =  token;
        }
    }

    setAppLoaded = () =>{
        this.appLoaded = true;
    }
    setServerError = (error : ServerError) =>{
        this.error = error
    }
}
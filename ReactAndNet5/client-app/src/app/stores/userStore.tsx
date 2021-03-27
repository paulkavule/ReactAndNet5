import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../modals/user";
import { store } from "./store";


export default class UserStore{
    user : User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !!this.user
    }

    login = async (creds:UserFormValues) =>{
        try {
            const _user =  await agent.Accounts.login(creds)
            store.commonStore.setToken(_user.token)
            console.log(_user)
            runInAction(() => {this.user = _user})
            history.push('/activities')
            store.modalStore.closeModal();
        } catch (error) {
            throw error
        }
    }

    getUser = async () =>{
        try {
            const _user = await agent.Accounts.current()
            runInAction(() => this.user = _user);
        } catch (error) {
            console.log(error)
        }
    }
    
    registerUser = async(creds: UserFormValues) => {

        try {
            const _user =  await agent.Accounts.register(creds)
            store.commonStore.setToken(_user.token)
            console.log(_user)
            runInAction(() => {this.user = _user})
            history.push('/activities')
            store.modalStore.closeModal();
        } catch (error) {
            throw error
        }

    }

    logout = () => {
        store.commonStore.setToken("")
        window.localStorage.removeItem('utoken')
        this.user = null
        history.push('/')
   }
}
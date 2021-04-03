
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../modals/profile";
import { store } from "./store";

export default class ProfileStore{
    profile : Profile | null = null;
    loadingProfile: boolean = false;
    uploading: boolean = false;
    loading: boolean = false;
    loadingFollowings: boolean = false;
    followings : Profile [] = [];
    activeTab = 0;
    constructor() {
       makeAutoObservable(this)

       reaction(() => this.activeTab, activeTab =>{
           if(activeTab === 4 || activeTab === 3){
               let predicate = activeTab === 3 ? "followers" : "following";
               this.loadFollowing(predicate)
           }
           else{
               this.followings = []
           }
       })
    }

    setActiveTab = (tab:any) =>{
        this.activeTab = tab;
    }
    get isCurrentUser(){
        if(store.userStore.user && this.profile){
            return store.userStore.user.userName === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) =>{
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username)
            runInAction(()=>{
                this.profile = profile
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => this.loadingProfile = false)
        }
        
    }

    uploadPhoto = async (file:Blob) =>{
        this.uploading = true;
        
        try {
           const response = await agent.Profiles.uploadPhoto(file)
           const photo = response.data;
           runInAction(()=>{
               if(this.profile){
                    this.profile.photos?.push(photo)
                    if(photo.isMain && store.userStore.user){
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url
                    }
               }
               this.uploading = false;
           })            
        } catch (error) {
            runInAction(()=> this.uploading = false)
            console.log(error)
        }
    }

    setMainPhoto = async (photo:Photo)=>{
        try{
           await agent.Profiles.setMainPhoto(photo.id)
           store.userStore.setImage(photo.url)
           if(this.profile && this.profile.photos){
               this.profile.photos.find(ph => ph.isMain)!.isMain = false
               this.profile.photos.find(ph => ph.id === photo.id)!.isMain = true;
               this.profile.image = photo.url
               this.loading = false;
           }    

        }
        catch(error){
            console.log(error)
            runInAction(() => this.loading = false)
        }
    }

    deletePhoto = async (photo:Photo) => {

        try {
            this.loading = true;
            await agent.Profiles.deletePhoto(photo.id);
            
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                    this.loading = false;
                }
            })
        } catch (error) {
            console.log(error)
            runInAction(()=>{this.loading =false})
        }
    }

    updateFollowing = async (username:string, following: boolean) =>{

        this.loading = true;
        try {
            await agent.Profiles.updateFollowing(username);
            store.activityStore.updateAttendeFollowing(username);
            runInAction(() =>{
                if(this.profile && this.profile.username !== store.userStore.user?.userName
                    && this.profile.username === username){
                    following ? this.profile.followersCount++ : this.profile.followersCount--
                    this.profile.following = !this.profile.following

                }
                if(this.profile && this.profile.username === store.userStore.user?.userName){
                    following ? this.profile.followingCount++ : this.profile.followingCount--;
                }
                this.followings.forEach(profile =>{
                    if(profile.username === username){
                        profile.following ? profile.followersCount-- : profile.followingCount++
                        profile.following = !profile.following;
                    }
                })
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => this.loading = false)
        }
    }

    loadFollowing = async (predicate:string) =>{
        this.loadingFollowings = true;
        try {
            
            const following = await agent.Profiles.listFollowings(this.profile?.username!, predicate)
            
            runInAction(()=>{
                this.followings =following;
                this.loadingFollowings = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => this.loading = false)
        }
    }
}
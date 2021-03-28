
import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { ActivityFormValues, IActivity } from "../modals/activity"
import {format} from 'date-fns'
import { store } from "./store";
import { Profile } from "../modals/profile";
// import {v4 as uuid} from 'uuid';
export default class ActivityStore{
    title='Hello from mobx store'
    // activities : IActivity [] =[];
    activitiesRegistry = new Map<string, IActivity>()
    selectedActivity : IActivity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    loadActivity = async (id: string) => {
        let activity = this.activitiesRegistry.get(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
   
    get activitiesByDate(){
        return Array.from(this.activitiesRegistry.values()).sort((a,b) => a.date!.getTime() - b.date!.getTime())
    }

    get groupedActivities(){
        // const user = store.userStore.user;

        let entries = Object.entries( this.activitiesByDate.reduce((activities, activity) =>{
            const date = format(activity.date!, 'dd MMMM yyyy')// .toISOString().split('T')[0];
            if(activities[date])
                activities[date] = [...activities[date], activity]
            else
                activities[date] = [activity]

            return activities;
        }, {} as {[key:string]:IActivity[]}))
        console.log(entries)
        return entries;
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    private setActivity = (activity: IActivity) => {
        const user = store.userStore.user;
        if (user) {
            console.log('user-',user.displayName)
            activity.isGoing = activity.attendees!.some(a => a.username === user.userName)
            activity.isHost = activity.hostUsername === user.userName;
            activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
        }
        activity.date = new Date(activity.date!);
        this.activitiesRegistry.set(activity.id, activity);
    }

    setLoadingInitial =(state:boolean) =>{
        this.loadingInitial = state
    }
     private getActivity = (id: string) => {
        return this.activitiesRegistry.get(id);
    }
  

    createActivity = async(activity:ActivityFormValues) =>{
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        try {
            await agent.Activities.create(activity)
            const newActivity = new IActivity(activity)
            newActivity.hostUsername = user!.userName;
            newActivity.attendees = [attendee];
            this.setActivity(newActivity);
            runInAction(() =>{
                this.selectedActivity =newActivity
            })
        } catch (error) {
            console.log(error)
        }
    }

    updateActivity = async(activity:ActivityFormValues) =>{
       try {
            await agent.Activities.update(activity)
            runInAction(() =>{
                if(activity.id){
                    let updatedActivity = {...this.getActivity(activity.id), ...activity}
                    this.activitiesRegistry.set(activity.id,updatedActivity as IActivity)
                    this.selectedActivity = updatedActivity as IActivity
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    deleteActivity = async (id:string) =>{
        this.loading = true;
        try {
            await agent.Activities.delete(id)
            runInAction(()=>{
               // this.activities = [...this.activities.filter(a =>a.id !== id)];
               this.activitiesRegistry.delete(id)
                this.selectedActivity = undefined;
                this.loading = false;
                this.editMode = false;

            })
        } catch (error) {
            runInAction(() =>{
                this.loading = false;
                this.editMode= false;
            })
            console.log(error)
        } 
    }

    updateAttendance = async () =>{

        try {
            const user = store.userStore.user;
            this.loading = true;
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(()=>{
                if(this.selectedActivity?.isGoing){
                    this.selectedActivity.attendees  = this.selectedActivity.attendees!.filter(us => us.username !== user?.userName)
                    this.selectedActivity.isGoing = false
                }else{
                    const attendee = new Profile(user!);
                    this.selectedActivity!.attendees!.push(attendee);
                    this.selectedActivity!.isGoing = true
                }
                this.activitiesRegistry.set(this.selectedActivity?.id!, this.selectedActivity!)
            })

        } catch (error) {
            console.log(error);
        }finally{
            runInAction(() => this.loading = false);
        }

    }

    cancelActivityToggle = () =>{
        this.loading =true;
        try {
            agent.Activities.attend(this.selectedActivity!.id)

            runInAction(()=>{
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled 
                this.activitiesRegistry.set(this.selectedActivity!.id,  this.selectedActivity!)
            })

        } catch (error) {
            console.log(error)
        }finally{
            runInAction(() => this.loading = false);  
        }
    }
    
    // setTitle = () =>{
    //     this.title = this.title+"!";
    // }
}
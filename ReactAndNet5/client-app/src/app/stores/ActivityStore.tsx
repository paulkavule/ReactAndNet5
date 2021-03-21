
import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { IActivity } from "../modals/activity"
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

    loadActivity = async (id:string) =>{
      let  activity = this.activitiesRegistry.get(id);
      if(activity){
          this.selectedActivity = activity;
          this.setLoadingInitial(false)
          return activity;
      }
      this.loadingInitial =true;
      activity = await agent.Activities.details(id);
      activity.date = activity.date.split('T')[0]
      this.activitiesRegistry.set(activity.id, activity)
      this.selectedActivity = activity;
      this.setLoadingInitial(false)
      return activity;
    }

    get activitiesByDate(){
        return Array.from(this.activitiesRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
    }

    loadActivities = async () =>{
        this.setLoadingInitial(true)
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity =>{
                activity.date = activity.date.split('T')[0]
                // this.activities.push(activity);
                this.activitiesRegistry.set(activity.id, activity)
            })  
            this.setLoadingInitial(false)
           
        }catch(e){
            this.setLoadingInitial(false)
            console.log(e)
        }
    }

    setLoadingInitial =(state:boolean) =>{
        this.loadingInitial = state
    }

    // selectActivity = (id:string) =>{
    //     //    this.selectedActivity = this.activities.find(a => a.id === id)
    //    this.selectedActivity = this.activitiesRegistry.get(id)
    // }

    // cancelSelectedAcivity = () =>{
    //     this.selectedActivity = undefined
    // }

    // openForm = (id?:string) =>{
    //     id? this.selectActivity(id) : this.cancelSelectedAcivity()
    //     this.editMode = true;
    // }

    // closeForm = () =>{
    //     this.editMode = false;
    // }

    createActivity = async(activity:IActivity) =>{
        this.loading =true;
        // activity.id = uuid();
        try {
            await agent.Activities.create(activity)
            runInAction(() =>{
                // this.activities.push(activity)
                this.activitiesRegistry.set(activity.id, activity)
                this.selectedActivity =activity
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            runInAction(()=>{
                this.selectedActivity = undefined
                this.editMode = false;
                this.loading = false;
               
            })
            console.log(error)
        }
    }

    updateActivity = async(activity:IActivity) =>{
        this.loading =true;
        try {
            await agent.Activities.update(activity)
            runInAction(() =>{
                // this.activities =  [...this.activities.filter(a => a.id !== activity.id), activity]
                this.activitiesRegistry.set(activity.id,activity)
                this.selectedActivity = activity
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            runInAction(()=>{
                this.selectedActivity = undefined
                this.editMode = false;
                this.loading = false;
               
            })
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
    // setTitle = () =>{
    //     this.title = this.title+"!";
    // }
}
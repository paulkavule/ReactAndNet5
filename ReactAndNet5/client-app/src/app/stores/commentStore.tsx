import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../modals/comment";
import { store } from "./store";

export default class CommentStore{
    comments : ChatComment [] = [];
    hubConnection : HubConnection | null = null;
    constructor(){
        makeAutoObservable(this);
    }

    createHubConnection = (activityId :string) => {
        
        if(store.activityStore.selectedActivity){
            this.hubConnection = new HubConnectionBuilder().withUrl(`http://localhost:5000/chat?activityId=${activityId}`,{
                accessTokenFactory : () =>  store.userStore.user?.token!
            })
            //.withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build()

            this.hubConnection.start().catch(error => console.log("Error connecting to the hub",error))

            this.hubConnection.on("LoadComments", (comments:ChatComment []) => {
                console.log("comments", comments);
                
                runInAction(() => {
                    comments.forEach(cmt => {
                        cmt.createdAt =  new Date(cmt.createdAt+'Z');
                    })
                    this.comments = comments
                })
            })

            this.hubConnection.on("ReceiveComment",(comment:ChatComment) => {
                console.log("comment", comment);
                runInAction(() => {
                    comment.createdAt =  new Date(comment.createdAt);
                    this.comments.unshift(comment) // places the comment at the start of the array
                })
            })


        }
    }

    clearComments = () => {
        this.comments = []
        this.stopConnection();
    }

    stopConnection =() =>{
        this.hubConnection?.stop().catch(error => console.log("Error stopping connection",error))
    }

    addComment = async (values:any) => {
        values.activityId = store.activityStore.selectedActivity?.id;
        
        console.log("values", values)
        try {
            this.hubConnection?.invoke("SendComment",values)
        } catch (error) {
            console.log(error)
        }
    }
}
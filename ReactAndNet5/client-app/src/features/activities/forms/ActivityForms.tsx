import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {  useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";

function ActivityForm(){
    const {activityStore} = useStore()
    const {loading, loadActivity, createActivity, updateActivity, loadingInitial,setLoadingInitial} = activityStore
    const history = useHistory()
    const [activity, setActivity] = useState({
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    })
    const {id} = useParams<{id:string}>();
    useEffect(()=>{
        if(id){
           loadActivity(id).then(activity =>setActivity(activity!))
        }
        else{
            setLoadingInitial(false)
        }
    },[id,loadActivity,setLoadingInitial])
   
    function handleSubmit(){
       if(activity.id.length === 0){
           let newActivity = {...activity, id: uuid()}
           createActivity(newActivity).then(()=>{
            history.push(`/activities/${newActivity.id}`)
           })
          
       }else{
            updateActivity(activity).then(()=>{
                history.push(`/activities/${activity.id}`)
            })
       } 
        // console.log(activity)
    }
    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({
            ...activity,
            [name]:value
        })
    }
    if(loadingInitial) return <LoadingComponent content='loading...'/>

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.Input placeholder='Category'value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Button loading={loading} type='Submit' floated='right' content='Submit' positive onClick={()=>handleSubmit()} />
                <Button type='button' floated='right' content='Cancel' as={Link} to='/activities' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)
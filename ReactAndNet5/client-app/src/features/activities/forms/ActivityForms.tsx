import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/modals/activity";

interface Props{
    activity:IActivity | undefined
    closeForm : ()=>void
    createOrEdit:(activity:IActivity) => void
    submitting:boolean
}
export default function ActivityForm({activity :_activity, closeForm, createOrEdit,submitting}:Props){
    const initialState = _activity ?? {
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    }
    const [activity, setActivity] = useState(initialState)
    function handleSubmit(){
        console.log(activity)
    }
    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({
            ...activity,
            [name]:value
        })
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.Input placeholder='Category'value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Button loading={submitting} type='Submit' floated='right' content='Submit' positive onClick={()=>createOrEdit(activity)} />
                <Button type='button' floated='right' content='Cancel' onClick={() =>closeForm()}/>
            </Form>
        </Segment>
    )
}
import { SyntheticEvent, useState } from "react"
import { Button, Item, Label, Segment } from "semantic-ui-react"
import { IActivity } from "../../../app/modals/activity"


interface Props{
    activities : IActivity[];
    selectActivity:(id:string) =>void;
    deleteActivity:(id:string)=>void;
    submitting: boolean;
}

export default function ActivityList({activities,selectActivity,deleteActivity, submitting}:Props){
    const [target, setTartget] =useState('')
    function handleDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTartget(e.currentTarget.name)
        deleteActivity(id)
    }
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(act =>(
                    <Item key={act.id}>
                        <Item.Content>
                            <Item.Header as='a'>{act.title}</Item.Header>
                            <Item.Meta>{act.date}</Item.Meta>
                            <Item.Description>
                                <div>{act.description}</div>
                                <div>{act.city}, {act.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                 <Button floated='right' content='View' color='blue' onClick={()=>selectActivity(act.id)} />
                                <Button name={act.id} floated='right' content='Delete' color='red'
                                 onClick={(e)=>handleDelete(e, act.id)} loading={submitting && target === act.id} />
                               
                                <Label basic content={act.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
import { observer } from "mobx-react-lite"
import { SyntheticEvent, useState } from "react"
import { Button, Item, Label, Segment } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"

function ActivityList(){
    const [target, setTartget] =useState('')
    const {activityStore} = useStore()
    const {activitiesByDate: activities, selectActivity, deleteActivity} = activityStore
    function handleDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTartget(e.currentTarget.name)
        deleteActivity(id)
    }
    return (
        <Segment>
            <Item.Group divided>
                {activities.map((activity,index) =>(
                    <Item key={index}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                 <Button floated='right' content='View' color='blue' onClick={()=>selectActivity(activity.id)} />
                                <Button name={activity.id} floated='right' content='Delete' color='red'
                                 onClick={(e)=>handleDelete(e, activity.id)} loading={activityStore.loading && target === activity.id} />
                               
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList)
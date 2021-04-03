import { SyntheticEvent, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react"
import { IActivity } from "../../../app/modals/activity"
import { useStore } from "../../../app/stores/store"
import {format} from 'date-fns'
import ActivityAttendeeItem from "./ActivityAttendeeItem"
import { observer } from "mobx-react-lite"
interface Prop{
    activity : IActivity
}

function ActivityListItem({activity}:Prop){
    const [target, setTartget] =useState('')
    const {activityStore} = useStore()
    const { deleteActivity} = activityStore

    function handleDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTartget(e.currentTarget.name)
        deleteActivity(id)
    }
    
    return (
        <Segment.Group>
            <Segment>
                {
                    activity.isCancelled && (
                        <Label content='Cancelled' 
                            attached='top'
                            color='red'
                            style={{textAlign:'Center'}}
                        />
                    )
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBottom:3}} circular size='tiny' src={activity.host?.image || '/assets/user.png'}/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}> {activity.title} </Item.Header>
                            <Item.Description>Hosted by <Link to={`/profiles/${activity.hostUsername}`}> {activity.host?.displayName} </Link> </Item.Description>
                            {
                                activity.isHost && (
                                    <Item.Description>
                                        <Label color='orange' basic>
                                            Your are hosting this activity
                                        </Label>
                                    </Item.Description>
                                )
                            }
                            {
                                activity.isGoing && !activity.isHost && (
                                    <Item.Description>
                                        <Label color='green' basic>
                                            Your are going to this activity
                                        </Label>
                                    </Item.Description>
                                )
                            }
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!,'dd MM yyyy hh:mm aa') }
                    <Icon name='marker'/> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityAttendeeItem attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button name={activity.id} floated='right' content='Delete' color='red'
                    onClick={(e)=>handleDelete(e, activity.id)} loading={activityStore.loading && target === activity.id} />
                
                <Button as={Link} to={`/activities/${activity.id}`} color='teal' floated='right' content='View' />
            </Segment>
        </Segment.Group>
        // <Item>
        //     <Item.Content>
        //         <Item.Header as='a'>{activity.title}</Item.Header>
        //         <Item.Meta>{activity.date}</Item.Meta>
        //         <Item.Description>
        //             <div>{activity.description}</div>
        //             <div>{activity.city}, {activity.venue}</div>
        //         </Item.Description>
        //         <Item.Extra>
        //             <Button floated='right' content='View' color='blue'  as={NavLink} to={`/activities/${activity.id}`} />
        //             <Button name={activity.id} floated='right' content='Delete' color='red'
        //             onClick={(e)=>handleDelete(e, activity.id)} loading={activityStore.loading && target === activity.id} />
                
        //             <Label basic content={activity.category}/>
        //         </Item.Extra>
        //     </Item.Content>
        // </Item>
    )
}

export default observer(ActivityListItem) 
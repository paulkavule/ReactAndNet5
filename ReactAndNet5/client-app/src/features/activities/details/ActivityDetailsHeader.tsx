import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/modals/activity";
import {format} from 'date-fns'
import { useStore } from "../../../app/stores/store";
interface Props {
    activity: IActivity
}
const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};
function ActivityDetailsHeader({activity}: Props){
    const {activityStore : {updateAttendance, loading,cancelActivityToggle}} = useStore()
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {
                    activity.isCancelled && (
                        <Label 
                            style={{position:'absolute', zIndex:100, left:-14, top:20}}
                            color='red'
                            content='Cancelled'
                            ribbon
                        />
                    )
                }
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle}/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(activity.date!,'dd MMMM yyyy')}</p>
                                <p>
                                    Hosted by <Link to={`/profile/${activity.hostUsername}`} color='orange'><strong> {activity.host?.displayName}</strong></Link> 
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                
               
                {
                    activity.isHost ? (
                       <>
                            <Button 
                                basic
                                color={activity.isCancelled ? 'green' : 'red' }
                                floated='left'
                                content={activity.isCancelled ? 'Activate':'Cancel'}
                                onClick={cancelActivityToggle}
                                loading={loading}
                            />
                             <Button disabled={activity.isCancelled} color='orange' floated='right' as={Link} to={`/manage/${activity.id}`}>
                                Manage Event
                            </Button>   
                       </>
                    ): activity.isGoing ? (
                        <Button loading ={loading} onClick={updateAttendance}>Cancel attendance</Button>
                    ): (
                        <Button disabled={activity.isCancelled} loading ={loading}  onClick={updateAttendance}color='teal'>Join Activity</Button>
                    )

                }
               
            </Segment>
        </Segment.Group>
    )

}

export default observer(ActivityDetailsHeader) ;
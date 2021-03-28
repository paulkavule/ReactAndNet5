import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, Item, Label, List, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/modals/activity";
interface Props{
    activity : IActivity,
}

function ActivityDetailsSideBar({activity: {attendees, host}}:Props){
    if(!attendees) return null;

    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
               {attendees.length} {attendees.length === 1 ? "Person" : "People"}
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {
                        attendees.map((att, ind) => (
                            <Item style={{ position: 'relative' }} key={ind}>
                                {
                                    att.username === host?.username && (
                                        <Label
                                            style={{ position: 'absolute' }}
                                            color='orange'
                                            ribbon='right'>Host</Label>
                                    )
                                }
                                
                                <Image size='tiny' src={ att.image || '/assets/user.png'} />
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header as='h3'>
                                        <Link to={`/profile/${att.username}`}>{att.displayName}</Link>
                                    </Item.Header>
                                    <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                                </Item.Content>
                            </Item>

                        ))
                    }
                    
                </List>
            </Segment>
        </>

    )
}

export default observer(ActivityDetailsSideBar);
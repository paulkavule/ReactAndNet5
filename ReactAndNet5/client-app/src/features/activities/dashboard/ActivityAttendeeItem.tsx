import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import { Image, List, Popup } from "semantic-ui-react"
import { Profile } from "../../../app/modals/profile"
import ProfileCard from "../../profiles/ProfileCard"


interface Props {
    attendees : Profile[]
}
function ActivityAttendeeItem({attendees}:Props){

    return (
        <List horizontal>
            {
                attendees.map(att =>(
                    <Popup hoverable 
                    key={att.username} 
                    trigger={
                        <List.Item key={att.username} as={Link} to={`/profiles/${att.username}`}>
                            <Image size='mini' circular src ={att.image || '/assets/user.png'} />
                        </List.Item>
                    }
                    >
                        <Popup.Content>
                            <ProfileCard profile={att} />
                        </Popup.Content>
                   </Popup>
                ))
            }
         </List>
    )
}

export default observer(ActivityAttendeeItem) 
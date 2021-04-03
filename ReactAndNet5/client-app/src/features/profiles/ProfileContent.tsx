import { observer } from "mobx-react-lite"
import { Tab } from "semantic-ui-react"
import { Profile } from "../../app/modals/profile"
import ProfilePhotos from "./ProfilePhotos"

interface Props{
    profile:Profile
}

function ProfileContent({profile}:Props){
    const panes = [
        {menuItem : 'About', render : () => <Tab.Pane>About  Content</Tab.Pane>},
        {menuItem : 'Photos', render : () => <ProfilePhotos photos={profile.photos!} />},
        {menuItem : 'Events', render : () => <Tab.Pane>Events  Content</Tab.Pane>},
        {menuItem : 'Followers', render : () => <Tab.Pane>Followers  Content</Tab.Pane>},
        {menuItem : 'Following', render : () => <Tab.Pane>Following  Content</Tab.Pane>},
    ]

    return(
        <Tab 
            menu={{fluid:true, vertical:true}}
            menuPosition='right'
            panes={panes}
        />
    )
}

export default observer(ProfileContent) 
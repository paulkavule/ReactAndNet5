import { observer } from "mobx-react-lite"
import { Tab } from "semantic-ui-react"
import { Profile } from "../../app/modals/profile"
import { useStore } from "../../app/stores/store"
import ProfileFollowing from "./ProfileFollowing"
import ProfilePhotos from "./ProfilePhotos"

interface Props{
    profile:Profile
}

function ProfileContent({profile}:Props){
    const panes = [
        {menuItem : 'About', render : () => <Tab.Pane>About  Content</Tab.Pane>},
        {menuItem : 'Photos', render : () => <ProfilePhotos photos={profile.photos!} />},
        {menuItem : 'Events', render : () => <Tab.Pane>Events  Content</Tab.Pane>},
        {menuItem : 'Followers', render : () => <ProfileFollowing /> },
        {menuItem : 'Following', render : () => <ProfileFollowing />},
    ]
    const {profileStore:{setActiveTab}} =useStore()

    return(
        <Tab 
            menu={{fluid:true, vertical:true}}
            menuPosition='right'
            panes={panes}
            onTabChange={(e,data) => setActiveTab(data.activeIndex) }
        />
    )
}

export default observer(ProfileContent) 
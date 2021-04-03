import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/modals/profile";
import FollowButton from "./FollowButton";

interface Props{
    profile : Profile
}

function ProfileCard({profile}:Props){
    console.log(profile)
    return (
        <Card as={Link} to={`/profile/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'}/>
            <Card.Content>
                <Card.Header content={profile.displayName} />
                <Card.Description content={profile.bio || 'Profile bio here'}/>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user'/> {profile.followersCount} Followers
            </Card.Content>
            <FollowButton profile={profile}/>
        </Card>
    )
}

export default observer(ProfileCard)

















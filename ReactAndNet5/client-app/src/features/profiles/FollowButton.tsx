import { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { Profile } from "../../app/modals/profile";
import { useStore } from "../../app/stores/store";


interface Props{
    profile:Profile
}

function FollowButton({profile}:Props){
    const {profileStore, userStore} = useStore();
    const {updateFollowing, loading} = profileStore;
    
    if(userStore.user?.userName === profile.username) return null;

    function handleFollow(e: SyntheticEvent,username:string){
        e.preventDefault();

        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }

    return(
        <Reveal animated='move'>
            <Reveal.Content style={{width:'100%'}} visible>
                <Button fluid 
                content= {profile.following ? "Following" : "Not Following"}
                color='teal' 
                
                />
            </Reveal.Content>
            <Reveal.Content style={{width:'100%'}} hidden>
                <Button fluid 
                content={profile.following ? "Unfollow":"Follow"}
                color={profile.following ? 'red':'green'}
                loading={loading}
                onClick={(e) => handleFollow(e, profile.username)}
                />
            </Reveal.Content>
        </Reveal>
    )
}

export default FollowButton
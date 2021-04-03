import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";


function UserProfile(){

    const {username} = useParams<{username: string}>();
    const {profileStore:{loadingProfile, loadProfile,profile, setActiveTab}} = useStore()

    useEffect(()=>{
     
        loadProfile(username);
        // clean up function
        return () => {
            setActiveTab(0)
        }
    }, [setActiveTab,loadProfile,username ])

    if(loadingProfile) return <LoadingComponent  content='Loading profile ...'/>

    return(
        // <p>Page</p>
        <Grid>
            <Grid.Column width='16'>
              {
                  profile && (
                      <>
                        <ProfileHeader  profile={profile}/>
                        <ProfileContent profile={profile}/>
                      </>
                  )
              }  
              
            </Grid.Column>
            
        </Grid>
    )
}

export default observer(UserProfile)


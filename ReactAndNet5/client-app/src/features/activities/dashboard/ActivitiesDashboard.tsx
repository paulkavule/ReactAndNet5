import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForms";
import ActivityList from "./AtivityList";

function ActivityDashBord(){
    const {activityStore} = useStore()
    const {loadActivities, activitiesRegistry} =activityStore
    
    useEffect(()=>{
        if(activitiesRegistry.size <= 1) activityStore.loadActivities();

    }, [activityStore]) // adding activity store as the dependency of useEffect
  
    if(activityStore.loadingInitial) return <LoadingComponent content="loading app"/>
    return(
        <Grid>
            <Grid.Column  width='10'>
               <ActivityList />
            </Grid.Column>
            {/* <Grid.Column width='6'>
                {selectedActivity && !editMode && <ActivityDetails /> }

               {editMode && <ActivityForm />} 
            </Grid.Column> */}
        </Grid>
    );
}
export default observer(ActivityDashBord)
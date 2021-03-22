import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./AtivityList";

function ActivityDashBord(){
    const {activityStore} = useStore()
    const {activitiesRegistry} =activityStore
    
    useEffect(()=>{
        if(activitiesRegistry.size <= 1) activityStore.loadActivities();

    }, [activitiesRegistry, activityStore]) // adding activity store as the dependency of useEffect
  
    if(activityStore.loadingInitial) return <LoadingComponent content="loading app"/>

    return(
        <Grid>
            <Grid.Column  width='10'>
               <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
            {/* <Grid.Column width='6'>
                {selectedActivity && !editMode && <ActivityDetails /> }

               {editMode && <ActivityForm />} 
            </Grid.Column> */}
        </Grid>
    );
}
export default observer(ActivityDashBord)
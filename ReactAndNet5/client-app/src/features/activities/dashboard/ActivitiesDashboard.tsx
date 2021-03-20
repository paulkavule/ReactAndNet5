import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/modals/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForms";
import ActivityList from "./AtivityList";

interface Props {
    activities : IActivity[];
    selectedActivity: IActivity|undefined;
    selectActivity:(id:string) =>void;
    cancelSelectActivity: ()=>void;
    editMode:boolean;
    openForm :(id:string) =>void;
    closeForm: ()=>void;
    createOrEdit : (activity:IActivity) =>void
    deleteActivity :(id:string) => void
    submitting:boolean
}
export default function ActivityDashBord({activities,selectedActivity,selectActivity,
     cancelSelectActivity, editMode, openForm, closeForm,createOrEdit,deleteActivity, submitting}:Props){
    return(
        <Grid>
            <Grid.Column  width='10'>
               <ActivityList activities={activities} selectActivity={selectActivity} 
               deleteActivity={deleteActivity} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity} 
                openForm={openForm} deleteActivity={deleteActivity} submitting={submitting} /> }
               {editMode && <ActivityForm activity={selectedActivity} createOrEdit={createOrEdit}  
               closeForm={closeForm} submitting={submitting} />} 
            </Grid.Column>
        </Grid>
    );
}
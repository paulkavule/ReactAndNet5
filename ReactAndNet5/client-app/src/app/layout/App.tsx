import React, { Fragment, useEffect, useState } from 'react';
// import { ducks } from './demo';
// import DuckItem from './duckitem';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../modals/activity';
import NavBar from './Navbar';
import ActivityDashBord from '../../features/activities/dashboard/ActivitiesDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [activities, setActivities] = useState<IActivity []>([])
  const [activity, setSelectedActivity] = useState<IActivity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(true)
  useEffect(()=>{
   
    agent.Activities.list().then(resp =>{
      // console.log(resp)
      let activities : IActivity [] = []
      resp.forEach(activity =>{
        activity.date = activity.date.split('T')[0]
        activities.push(activity);
      })
      setActivities(activities)
      setLoading(false)
      setSubmitting(false);
    })
  }, [])

  function handleSelectedActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id === id))
  }
  function handleCancelActivity(){
    setSelectedActivity(undefined)
  }
  function handleFormOpen(id?:string){ //optional parameter
    id? handleSelectedActivity(id) : handleCancelActivity();
    setEditMode(true)
    // setSubmitting(false)
  }
  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a => a.id !== id)])
      
      setSelectedActivity(undefined);
      setEditMode(false)
      setSubmitting(false);
    })
    
  }

  function handleFormClose(){
    setEditMode(false)
  }
  
  function handleCreateOrEditActivity(activity:IActivity){
    setSubmitting(true)
    if(activity.id){
      agent.Activities.update(activity).then(() =>{
        activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
        : setActivities([...activities, {...activity, id : uuid()}])
        setEditMode(false)
        setSelectedActivity(activity)
        setSubmitting(false)
      })
    }else{
      activity.id = uuid()
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity])
      })
      setSelectedActivity(activity)
      setEditMode(false)
      setSubmitting(false)
    }
    // activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    // : setActivities([...activities, {...activity, id : uuid()}])
    // setEditMode(false)
    // setSelectedActivity(activity)
  }
  if(loading) return <LoadingComponent content="loading app"/>

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashBord activities={activities}
          selectedActivity={activity}
          selectActivity={handleSelectedActivity}
          cancelSelectActivity={handleCancelActivity}
          editMode = {editMode}
          openForm ={handleFormOpen}
          closeForm ={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting ={submitting}
        />
      </Container>





      {/* {ducks.map(duck => (
          <DuckItem duck={duck}  key={duck.name}/>
        ))} */}
       
    </Fragment>
  );
}

export default App;

import { Fragment, useEffect } from 'react';
// import { ducks } from './demo';
// import DuckItem from './duckitem';
import {  Container } from 'semantic-ui-react';
import NavBar from './Navbar';
import ActivityDashBord from '../../features/activities/dashboard/ActivitiesDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore} = useStore()
  useEffect(()=>{
    activityStore.loadActivities();
  }, [activityStore]) // adding activity store as the dependency of useEffect

 


  if(activityStore.loadingInitial) return <LoadingComponent content="loading app"/>

  return (
    <Fragment>
     
      <NavBar/>
      <Container style={{marginTop:'7em'}}>
      <h1>{activityStore.title}</h1>
      {/* <Button content='add content' onClick={activityStore.setTitle} /> */}
        <ActivityDashBord />
      </Container>





      {/* {ducks.map(duck => (
          <DuckItem duck={duck}  key={duck.name}/>
        ))} */}
       
    </Fragment>
  );
}

export default observer(App) ;

import { Fragment,  } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './Navbar';
import ActivityDashBord from '../../features/activities/dashboard/ActivitiesDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation} from "react-router-dom";
import HomePage from '../../features/home/HomePage';
import ActivityForms from '../../features/activities/forms/ActivityForms';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {

  const location =useLocation();

  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={()=>(
          <>
           <NavBar/>
            <Container style={{marginTop:'7em'}}>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/activities' component={ActivityDashBord} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForms} /> 
            </Container>
          </>
        )}
      />
     
    </Fragment>
  );
}

export default observer(App) ;

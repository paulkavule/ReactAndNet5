import { Fragment,  } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './Navbar';
import ActivityDashBord from '../../features/activities/dashboard/ActivitiesDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation} from "react-router-dom";
import HomePage from '../../features/home/HomePage';
import ActivityForms from '../../features/activities/forms/ActivityForms';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { ToastContainer } from 'react-toastify';
import ErrorTesting from '../../features/errors/ErrorTesting';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {

  const location =useLocation();

  return (
    <Fragment>
      <ToastContainer position='top-right' hideProgressBar/>

      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={()=>(
          <>
           <NavBar/>
            <Container style={{marginTop:'7em'}}>
                <Switch>
                  <Route exact path='/' component={HomePage} />
                  <Route exact path='/activities' component={ActivityDashBord} />
                  <Route path='/activities/:id' component={ActivityDetails} />
                  <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForms} /> 
                  <Route path='/errors' component={ErrorTesting} />
                  <Route path='/servererror' component={ServerError} />
                  <Route component={NotFound} />
                  
                </Switch>
            </Container>
          </>
        )}
      />
     
    </Fragment>
  );
}

export default observer(App) ;

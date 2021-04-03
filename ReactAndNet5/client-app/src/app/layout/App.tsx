import { Fragment, useEffect,  } from 'react';
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
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import UserProfile from '../../features/profiles/UserProfile';

function App() {

  const location =useLocation();
  const {commonStore, userStore} = useStore()

  useEffect(() => {
      if(commonStore.token){
          userStore.getUser().finally(()=>commonStore.setAppLoaded())
      }
      else{
          commonStore.setAppLoaded()
      }
  },[commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>
  
  return (
    <Fragment>
      <ToastContainer position='top-right' hideProgressBar/>
      <ModalContainer />
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
                  <Route path='/login' component={LoginForm} />
                  <Route path='/errors' component={ErrorTesting} />
                  <Route path='/servererror' component={ServerError} />
                  <Route path='/profiles/:username' component={UserProfile} />
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

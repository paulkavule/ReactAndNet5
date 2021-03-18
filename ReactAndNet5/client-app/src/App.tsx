import React, { useEffect, useState } from 'react';
import './App.css';
import { ducks } from './demo';
import DuckItem from './duckitem';
import axios from 'axios'
import { Header, List } from 'semantic-ui-react';

function App() {

  const [activities, setActivities] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/Activities").then(resp =>{
      console.log(resp)
      setActivities(resp.data)
    })
  }, [])
  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      {ducks.map(duck => (
          <DuckItem duck={duck}  key={duck.name}/>
        ))}
        <List>
        {activities.map((act :any) =>(
          <List.Item key={act.id}>{act.title}</List.Item>
          
        ))}
        </List>
    </div>
  );
}

export default App;

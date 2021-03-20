import { observer } from "mobx-react-lite";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



function ActivityDetails(){
    const {activityStore} = useStore()
    const {selectedActivity:activity, openForm, cancelSelectedAcivity, loading, deleteActivity} = activityStore
    if(!activity) return <LoadingComponent/>;
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span className='date'>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='1' floated='right'>
                    <Button content='Edit' basic color='blue' onClick={()=>openForm(activity.id)} />
                    <Button content='Cancel' basic color='grey' onClick={()=>cancelSelectedAcivity()} />
                    <Button name={activity.id} content='Delete' basic color='red' onClick={()=>deleteActivity(activity.id)} loading={loading}/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetails)
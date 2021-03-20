import { Button, Card, Image } from "semantic-ui-react";
import { IActivity } from "../../../app/modals/activity";


interface Props{
    activity : IActivity;
    cancelSelectActivity: ()=>void;
    openForm : (id:string) =>void
    deleteActivity:(id:string)=>void
    submitting:boolean
}
export default function ActivityDetails({activity,cancelSelectActivity,openForm, deleteActivity,submitting}: Props){
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
                    <Button content='Cancel' basic color='grey' onClick={()=>cancelSelectActivity()} />
                    <Button name={activity.id} content='Delete' basic color='red' onClick={()=>deleteActivity(activity.id)} loading={submitting}/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
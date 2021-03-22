import { observer } from "mobx-react-lite"
import { Fragment } from "react"
import {  Header } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import ActivityListItem from "./ActivityListItem"

function ActivityList(){
    const {activityStore} = useStore()
    const {groupedActivities: activities} = activityStore
   
    return (
        <>
            {activities.map(([date, activities]) =>(
                <Fragment key={date}>
                    <Header color="teal">{date}</Header>
                    {activities.map((activity,index) =>(
                        <ActivityListItem key={index} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>
        
    )
}

export default observer(ActivityList)
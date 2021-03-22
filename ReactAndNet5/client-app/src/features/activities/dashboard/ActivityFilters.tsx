import Calendar from "react-calendar"
import { Header, Menu } from "semantic-ui-react"

function ActivityFilters(){
    return(
        <>
            <Menu vertical size='large' style={{width:'100%', marginTop:'33px'}}>
                <Header attached icon='filter' color='teal' content='Filters'/>

                <Menu.Item content='All activities' />
                <Menu.Item content='I am going' />
                <Menu.Item content='I am hosting' />
            </Menu>
            <Header/>
            <Calendar/>
        </>
    )

}

export default ActivityFilters
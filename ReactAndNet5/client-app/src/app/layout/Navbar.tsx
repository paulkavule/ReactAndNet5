import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar(){

    // const {activityStore} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src='/assets/logo.png' alt='Logo' style={{marginRight: 10}}></img>
                    ReactAndNet5
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
                <Menu.Item header>
                    <Button positive content='Create Activity' as={NavLink} to='/createActivity' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/errors' name='Test Errors' />
            </Container>
        </Menu>
    );
}
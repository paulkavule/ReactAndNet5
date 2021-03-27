import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

 function NavBar(){

    const {userStore:{user, logout}} = useStore();
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
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} spaced='right' avatar />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to={`/profile/${user?.username}`} 
                            text='My profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                    
                        </Dropdown.Menu>
                        
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default observer(NavBar)
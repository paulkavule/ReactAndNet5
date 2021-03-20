import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar(){

    const {activityStore} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='Logo' style={{marginRight: 10}}></img>
                    ReactAndNet5
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item header>
                    <Button positive content='Create Activity' onClick={()=> activityStore.openForm()}/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}
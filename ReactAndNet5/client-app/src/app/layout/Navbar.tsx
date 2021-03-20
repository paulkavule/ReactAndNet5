import { Button, Container, Menu } from "semantic-ui-react";
interface Props{
    openForm: () => void
}
export default function NavBar({openForm}:Props){
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='Logo' style={{marginRight: 10}}></img>
                    ReactAndNet5
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item header>
                    <Button positive content='Create Activity' onClick={()=> openForm()}/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}
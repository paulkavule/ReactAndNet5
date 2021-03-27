import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterUser from "../users/RegisterUser";

 function HomePage(){
    const {userStore, modalStore} =  useStore()
    return (
        <Segment inverted vertical textAlign='center' className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{bottomMargin:12}}/>
                    ReactAndNet5
                </Header>
                {userStore.isLoggedIn ? (
                   <>
                   <Header inverted as='h2' content='Welcome to ReactAndNet5' />
                    <Button as={Link} to='/activities' size='huge' inverted content='Go To Activities'/>
                   </>
                ):( <>
                    <Button onClick={() => modalStore.openModal(<LoginForm/>)} size='huge' inverted content='Login'/>
                    <Button onClick={() => modalStore.openModal(<RegisterUser />)} size='huge' inverted content='Register'/>
                </>)}
                
              
            </Container>
        </Segment>
    )
}

export default observer(HomePage)
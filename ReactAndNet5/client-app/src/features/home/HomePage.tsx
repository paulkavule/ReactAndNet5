import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage(){
    return (
        <Segment inverted vertical textAlign='center' className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{bottomMargin:12}}/>
                    ReactAndNet5
                </Header>
                <Header inverted as='h2' content='Welcome to ReactAndNet5' />
                <Button as={Link} to='/activities' size='huge' inverted content='Activities'/>
            </Container>
        </Segment>
        // <Container style={{marginTop:'7em'}}>
        //     <h1>Home Page</h1>
        //     <h3>Go to <Link to='/activities'>Activities</Link></h3>
        // </Container>
    )
}
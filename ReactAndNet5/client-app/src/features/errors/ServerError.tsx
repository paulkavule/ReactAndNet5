import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";


function ServerError(){
    const {commonStore} = useStore();

    return (
        <Container>
            <Header as='h1' content='Server error'/>
            <Header sub as='h5' color='red' content={commonStore.error?.message} />
            {
                commonStore.error?.description && (
                    <Segment>
                        <Header as='h4' color='teal' content='Stack Trace' />
                        <code style={{marginTop:20}}> {commonStore.error.description} </code>
                    </Segment>
                )
            }
        </Container>
    )
}

export default observer(ServerError)
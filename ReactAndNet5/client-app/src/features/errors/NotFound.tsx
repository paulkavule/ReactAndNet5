import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function (){
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>
                Ops we looked everywhere and we couldnot find what your looking for
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' content='Return' primary />
            </Segment.Inline>
        </Segment>
    )
}
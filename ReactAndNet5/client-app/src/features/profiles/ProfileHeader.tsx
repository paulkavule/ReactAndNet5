import { observer } from "mobx-react-lite";
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/modals/profile";

interface Props{
    profile:Profile
}
function ProfileHeader({profile}:Props){

    return (
        <>
            <Segment>
                <Grid>
                    <Grid.Column width={12}>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
                                <Item.Content verticalAlign='middle' >
                                    <Header as = 'h1' content={profile.displayName} />
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Statistic.Group widths={2}>
                            <Statistic label="followers" value={4} />
                            <Statistic label="following" value={14} />
                        </Statistic.Group>
                        <Divider/>
                        <Reveal animated='move'>
                            <Reveal.Content style={{width:'100%'}} visible>
                                <Button fluid content='Following' color='teal' />
                            </Reveal.Content>
                            <Reveal.Content style={{width:'100%'}} hidden>
                                <Button fluid content='Unfollow' color='red' />
                            </Reveal.Content>
                        </Reveal>
                    </Grid.Column>
                </Grid>

            </Segment>
        </>
    )
}

export default observer(ProfileHeader) 
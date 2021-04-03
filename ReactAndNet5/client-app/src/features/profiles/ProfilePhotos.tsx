import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo } from "../../app/modals/profile";
import { useStore } from "../../app/stores/store";

interface Props{
    photos : Photo[]
}

function ProfilePhotos({photos}:Props){ 
    const {profileStore:{isCurrentUser, uploading, loading, 
        uploadPhoto, setMainPhoto, deletePhoto}} = useStore()
    const [photoMode, setPhotoMode] = useState(false)
    const [target, setTarget] = useState('')
    console.log("isCurrentUser",isCurrentUser)
    function handlePhotoUpload(file:Blob){
        uploadPhoto(file).then(() =>{
            setPhotoMode (false)
        })

    }

    function handleDelete(photo:Photo, e:SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name)
        deletePhoto(photo)
    }
    function handleSetMain(photo:Photo, e:SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name)
        setMainPhoto(photo)
    }
    return(
        <Tab.Pane>
            <Grid>
                <Grid.Column width='16'>
                <Header icon='image' content='Photos' floated='left' />
                {
                    
                    isCurrentUser && (
                        <Button floated='right' content={ photoMode ? 'Cancel' : 'Add'}
                         onClick={() =>setPhotoMode(!photoMode)} />
                    )
                }
                </Grid.Column>
                <Grid.Column width='16' >
                    {photoMode ? (
                        <PhotoUploadWidget  handlePhotoUpload={handlePhotoUpload} loading={uploading} />
                    ):(
                        <Card.Group itemsPerRow='5'>
                            {
                                photos.map(ph =>(
                                    <Card key={ph.id}>
                                        <Image src={ph.url || '/assets/user.png'}/>
                                        {
                                            isCurrentUser && (
                                                <Button.Group widths={2}>
                                                    <Button icon='trash' color='red' name={'del'+ph.id} loading={target === 'del'+ph.id && loading}  disabled={ph.isMain} onClick={(ev)=>handleDelete(ph, ev)} />
                                                    <Button icon='pin' color='green' name={'set'+ph.id} loading={target === 'set'+ph.id && loading} disabled={ph.isMain}  onClick={(ev)=>handleSetMain(ph, ev)} />
                                                </Button.Group>
                                            )
                                        }
                                    </Card>
                                ))
                            }
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfilePhotos)
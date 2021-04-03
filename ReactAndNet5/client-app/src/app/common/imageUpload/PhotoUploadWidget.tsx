import { useEffect, useState } from "react";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import FileUpload from "./FileUpload";
import PhotoCropper from "./PhotoCropper";
// import { Cropper } from "react-cropper"

interface Props{
    handlePhotoUpload : (file:Blob) => void
    loading:boolean
}

function PhotoUploadWidget({handlePhotoUpload, loading}: Props){
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    useEffect(()=>{
        files.forEach((file:any) =>{
            URL.revokeObjectURL(file);
        })
    },[files])

    function  onCrop(){
        if(cropper){
            cropper.getCroppedCanvas().toBlob(blob => handlePhotoUpload(blob!))
        }
    }
     return (
        <Grid>
        <Grid.Column width={4}>
            <Header color='teal' content='Step 1 - Add photo'/>
            <FileUpload setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1}/>
        <Grid.Column width={4}>
            <Header color='teal' content='Step 2 - Resize Image'/>
            {
                files && files.length > 0 && (
                    // console.log(files[0])
                    // <Image src={files[0].preview || '/assets/user.png'} style={{height:200}} />
                    <PhotoCropper setCropper={setCropper} imgPreview={files[0].preview} />
                )
            }
        </Grid.Column>
        <Grid.Column width={1}/>
        <Grid.Column width={4}>
            <Header color='teal' content='Step 3 - Preview & Upload'/>
            {
                files && files.length > 0 && (
                    <>
                        <div className='image-preview' style={{minHeight:200, overflow:'hidden'}} />
                        <Button.Group widths='2'>
                            <Button positive loading={loading} icon='check' onClick={onCrop} />
                            <Button icon='close' disabled={loading} onClick={() =>setFiles([])} />
                        </Button.Group>
                    </>
                )
            }
            
        </Grid.Column>
    </Grid>
     )
}

export default PhotoUploadWidget;
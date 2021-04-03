import { Cropper } from "react-cropper"
import 'cropperjs/dist/cropper.css'
interface Props{
    imgPreview:string;
    setCropper:(cropper:Cropper) => void
}

function PhotoCropper({imgPreview,setCropper}:Props){
    return (
        <Cropper 
            src={imgPreview}
            style={{height:200,width:'100%'}}
            initialAspectRatio={1}
            aspectRatio={1}
            preview={'.image-preview'}
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />
    )
}

export default PhotoCropper
import { useRef, useState, useContext } from "react";
import {Spinner} from "react-bootstrap";
import { IdbContext } from "../App";

function UploadButton({addFile, addRoom}) {

    const [loadingIsShown, setLoadingIsShown] = useState(false)
    const context = useContext(IdbContext)

    const inputRef = useRef(null)

    const handleUpload = (e) => {
        inputRef.current?.click()
        doUpload()
        
    }

    async function doUpload()  {
        // Custom Items will be uploaded to uploads/items/ and the VenueModel will be uloaded to  uploads/rooms/ 
        let uploadFolder = ""
        if (addFile !== undefined){     // Custom Item
            uploadFolder = "/items/"
        } else {
            uploadFolder = "/rooms/"    // Venue Model
        }

        const selectedFile = inputRef.current.files[0];
        let formData = new FormData();
        if (addFile !== undefined){     // Custom Item
            formData.append("file", selectedFile)
        } else {
            formData.append("file", selectedFile, "VenueModel.gltf")  // VenueModel will be renamed
        }
        formData.append("folder", context.currentRoomId + uploadFolder)
        
        setLoadingIsShown(true)         // Change Upload Icon to loading icon

        const result = await fetch('/upload.php' , {
            method: "POST",
            body: formData
        })
        
        setLoadingIsShown(false)        // Change Icon to upload icon
        
        if (addFile !== undefined){     // Custom Item
            addFile(selectedFile.name)
        }

        if (addRoom !== undefined){     // Custom Item
            addRoom("VenueModel.gltf")
        }
        //ToDo: Some error handling needs to be here
        await console.log(result)
        //await alert('The file has been uploaded successfully.')        
    }

    return (
        <>
            { loadingIsShown ? (<Spinner animation="border" size="sm" />) :
            (<>            
                <input ref={inputRef} id="fileUpload" className="d-none" onChange={handleUpload} type="file" />
                <svg xmlns="http://www.w3.org/2000/svg"  onClick={e => inputRef.current && inputRef.current.click()} type="button"  width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                </svg>
            </>
            )}
        </>
        
    );
}

export default UploadButton;
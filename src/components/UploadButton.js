import { useRef, useState } from "react";
import {Spinner} from "react-bootstrap";

function UploadButton({addFile}) {

    const [loadingIsShown, setLoadingIsShown] = useState(false)

    const inputRef = useRef(null)

    const handleUpload = (e) => {
        inputRef.current?.click()
        doUpload()
        
    }

    async function doUpload()  {
        const selectedFile = inputRef.current.files[0];
        let formData = new FormData();
        formData.append("file", selectedFile)
        formData.append("folder", "0f8fad5b-d9cb-469f-a165-70867728950e/items/")
        
        setLoadingIsShown(true) // Change Upload Icon to loading icon

        const result = await fetch('/upload.php' , {
            method: "POST",
            body: formData
        })
        
        setLoadingIsShown(false) // Change Icon to upload icon
        addFile(selectedFile.name)
        //ToDo: Some error handling needs to be here
        await console.log(result)
        //await alert('The file has been uploaded successfully.')        
    }

    return (
        <div>
            { loadingIsShown ? (<Spinner animation="border" size="sm" style={{ position: 'absolute', right: 12, top: 12 }}/>) :
            (<>            
                <input ref={inputRef} id="fileUpload" className="d-none" onChange={handleUpload} type="file" />
                <svg xmlns="http://www.w3.org/2000/svg"  onClick={e => inputRef.current && inputRef.current.click()} type="button" style={{ position: 'absolute', right: 12, top: 12 }} width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                </svg>
            </>
            )}
        </div>
        
    );
}

export default UploadButton;
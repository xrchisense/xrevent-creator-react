import { useRef } from "react";

function UploadButton() {
    const inputRef = useRef(null);

    const handleUpload = () => {
        inputRef.current?.click();

        doUpload();
    }

    // FixMe: Currently the alert is fired almost immediatly when filebox opens
    async function doUpload() {
        let formData = new FormData();
        formData.append("file", inputRef.current.files[0]);
        await fetch('/upload.php', {
            method: "POST",
            body: formData
        });
        alert('The file has been uploaded successfully.');
        
    }

    return (
        <div>
            <input ref={inputRef} className="d-none" type="file" />
            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleUpload} type="button" style={{ position: 'absolute', right: 12, top: 12 }} width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
        </div>
    );
}

export default UploadButton;
import Accordion from "react-bootstrap/Accordion";
import { Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useContext, useState, useEffect } from "react";
import UploadButton from "./UploadButton";
import Items from "./Items";
import Prefab from "./Prefab";
import { IdbContext } from "../App";
import ContextAwareToggle from "./ContextAwareToggle";



function AccMenu({ unityContext }) {

    const [fileNames, setFileNames] = useState([])
    const context = useContext(IdbContext)

	useEffect(() =>{
		const getFileNames = async () =>{
			const fileNamesFromServer = await getFileListFromServer();
            if(fileNamesFromServer !== ""){
			    const responseString = await fileNamesFromServer.slice(0,-1); // remove last colon
    		    const itemArray = await responseString.split(",");
			    await setFileNames(itemArray)
			    console.log('list updated' + fileNames)
            }
		}
        getFileNames()	
        	
	}, [context])


	// Fetch Filenames from Server
	async function getFileListFromServer() {
		const response = await fetch('/upload/dir.php?UID=' + context.currentRoomId + '/items');
        const fileListString = await response.text();
       
		return fileListString
	}


    function addFile(addedFile){
        console.log("AddFile " + addedFile)

        fileNames.indexOf(addedFile) > -1 ? alert('Existing file updated.') :
        setFileNames(fileNames => [...fileNames, addedFile]) // only manipulate state (View) if file does not exist
    }


    return (
        <Accordion defaultActiveKey="">
            <Card>
                <Card.Header>
                    <ContextAwareToggle eventKey="0">Main Properties</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body {context.currentRoomId}</Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <ContextAwareToggle eventKey="1">Prefab Items</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body >
                        <Row>
                            
                            <Prefab type="Cube" unityContext={unityContext}></Prefab>
                            <Prefab type="Sphere" unityContext={unityContext}></Prefab>
                            <Prefab type="Point Light" unityContext={unityContext}></Prefab>
                            <Prefab type="Directional Light" unityContext={unityContext}></Prefab>
                            <Prefab type="Plane" unityContext={unityContext}></Prefab>
                            
                       </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <ContextAwareToggle eventKey="2">Custom Items</ContextAwareToggle>
                    <UploadButton addFile={addFile}/>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        
                        {fileNames.length > 0 ? (
                            <Items fileNames={fileNames} unityContext={unityContext}/>) : ( 'No files to show.'
                        )}
                        
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default AccMenu




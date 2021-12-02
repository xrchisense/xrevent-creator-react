import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton, Row } from "react-bootstrap";
import AccordionContext from 'react-bootstrap/AccordionContext';
import Card from "react-bootstrap/Card";
import { useContext, useState, useEffect } from "react";
import UploadButton from "./UploadButton";
import Items from "./Items";
import Prefab from "./Prefab";


function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" type="button" style={{ transform: isCurrentEventKey ? 'rotate(180deg)' : 'rotate(90deg)' }}
                onClick={decoratedOnClick} width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
            </svg>
            {'   ' + children}
        </>
    );
}




function AccMenu({ unityContext }) {

    const [fileNames, setFileNames] = useState([])

	useEffect(() =>{
		const getFileNames = async () =>{
			const fileNamesFromServer = await getFileListFromServer()
			const responseString = await fileNamesFromServer.slice(0,-1); // remove last colon
    		const itemArray = await responseString.split(",");
			await setFileNames(itemArray)
			console.log('list updated' + fileNames)
		}
		getFileNames()
	}, [])

	// Fetch Filenames from Server
	const getFileListFromServer = async () => {
		const response = await fetch('/upload/dir.php?UID=0f8fad5b-d9cb-469f-a165-70867728950e/items');
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
                    <ContextAwareToggle eventKey="0">Rooms</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body</Card.Body>
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
                            <Prefab type="Light" unityContext={unityContext}></Prefab>
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




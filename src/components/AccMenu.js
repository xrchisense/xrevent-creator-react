import Accordion from "react-bootstrap/Accordion";
import { Row, Col } from "react-bootstrap";
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
                    <Card.Body>
                        <Row>
                            <Col>XRevent ID</Col>
                        </Row>
                        <Row>
                           
                            <Col className="text-truncate" type="button" style={{ paddingLeft: "0", display: "block" }} value={null}>
                                {context.currentRoomId}
                            </Col>
                           
                        </Row>
                        
                        <Row>
                            <Col>Location Model</Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                                </svg>
                            </Col>
                            <Col className="text-truncate" type="button" onClick={null} style={{ paddingLeft: "0", display: "block" }} value={null}>
                                Filename.gltf
                            </Col>
                            <Col md="auto">
                               
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" type="button" onClick={null} className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                               
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col>Skybox</Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                                </svg>
                            </Col>
                            <Col className="text-truncate" type="button" onClick={null} style={{ paddingLeft: "0", display: "block" }} value={null}>
                                Filename.gltf
                            </Col>
                            <Col md="auto">
                               
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" type="button" onClick={null} className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                               
                            </Col>
                        </Row>

                    </Card.Body>
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
                            <Prefab type="Entrance" unityContext={unityContext}></Prefab>
                            <Prefab type="Videowall" unityContext={unityContext}></Prefab>
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




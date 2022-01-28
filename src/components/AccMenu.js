import Accordion from "react-bootstrap/Accordion";
import { Row, Col, Dropdown, DropdownType, ButtonGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useContext, useState, useEffect } from "react";
import UploadButton from "./UploadButton";
import Items from "./Items";
import Prefab from "./Prefab";
import { IdbContext } from "../App";
import ContextAwareToggle from "./ContextAwareToggle";
import SkyboxSelecter from "./SkyboxSelecter";


function AccMenu({ unityContext }) {

    const [fileNames, setFileNames] = useState([])
    const context = useContext(IdbContext)

	useEffect(() =>{
        // Get filenames from server For the File listing Tab
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
                            <Col style={{fontWeight: "lighter"}}>XRevent ID</Col>
                        </Row>
                        <Row> 
                            <Col className="text-truncate" style={{ display: "block" }}>
                                {context.currentRoomId}
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col style={{ paddingTop: "10px", fontWeight: "lighter"}}>Skybox</Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                                       <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                                </svg>
                            </Col>
                            <Col style={{ paddingLeft: "0", display: "block" }}>
                                 <SkyboxSelecter unityContext={unityContext} />
                            </Col>   
                        </Row>


                        <Row>
                            <Col style={{ paddingTop: "10px", fontWeight: "lighter"}}>Location Model</Col>
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
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
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
                            <Prefab type="VideoWall" unityContext={unityContext}></Prefab>
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




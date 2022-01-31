import Accordion from "react-bootstrap/Accordion";
import { Row, Col, Dropdown, DropdownType, ButtonGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useContext, useState, useEffect } from "react";
import UploadButton from "./UploadButton";
import Items from "./Items";
import RoomItem from "./RoomItem";
import Prefab from "./Prefab";
import { IdbContext } from "../App";
import ContextAwareToggle from "./ContextAwareToggle";
import SkyboxSelecter from "./SkyboxSelecter";


function AccMenu({ unityContext }) {

    const [fileNames, setFileNames] = useState([]) 
    const [roomNames, setRoomNames] = useState()
    const context = useContext(IdbContext)

	useEffect(() =>{
        // Get filenames from server For the File listing Tab
		const getFileNames = async () =>{
			const fileNamesFromServer = await getFileListFromServer('/items');
            
            // Convert csv String to array
            if(fileNamesFromServer.indexOf("<!DOCTYPE html>") === -1 ){
			    const responseString = await fileNamesFromServer.slice(0,-1); // remove last colon
    		    const itemArray = await responseString.split(",");
			    await setFileNames(itemArray)
			    console.log('Custom Item list updated' + fileNames)
            }
		}
        
        const getRoomNames = async () =>{
            const roomNamesFromServer = await getFileListFromServer('/rooms');
            
            if(roomNamesFromServer.indexOf("<!DOCTYPE html>") === -1){
                if(roomNamesFromServer.indexOf("VenueModel.gltf") !== -1){
                    await setRoomNames("VenueModel.gltf")
                }
            }
        }

        getFileNames()	
        getRoomNames()
        

	}, [context])

    useEffect(() =>{
        console.log("Delete called: " + roomNames)
    }, [roomNames])

	// Fetch Filenames from Server
	async function getFileListFromServer(folder) {
		const response = await fetch('/upload/dir.php?UID=' + context.currentRoomId + folder);
        const fileListString = await response.text();
       
		return fileListString
	}

    function addFile(addedFile){
        console.log("AddFile " + addedFile)

        fileNames.indexOf(addedFile) > -1 ? alert('Existing file updated.') :
        setFileNames(fileNames => [...fileNames, addedFile]) // only manipulate state (View) if file does not exist
    }

    function addRoom(addedRoom){
        setRoomNames(addedRoom)
    }

    function removeRoom(){
        setRoomNames(undefined)   
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
                            <Col style={{ paddingTop: "10px", fontWeight: "lighter"}}>Venue Model</Col>
                        </Row>
                        <Row>
                            
                            <Col className="text-truncate">
                                {roomNames !== undefined ? (
                                    <div><RoomItem itemName={roomNames} unityContext={unityContext} onDelete={removeRoom}/></div>) : ( '< Not yet uploaded >'
                                )} 
                            </Col>
                            <Col md="auto">
                                <UploadButton addRoom={addRoom}/>
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
                    <Row>
                        <Col>
                            <ContextAwareToggle eventKey="2">Custom Items</ContextAwareToggle>
                        </Col>
                        <Col md="auto">
                            <UploadButton addFile={addFile} />
                        </Col>
                    </Row>
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




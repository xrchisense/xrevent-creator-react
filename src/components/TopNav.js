
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { useContext, useEffect, useState } from "react"
import { IdbContext } from "../App";

const TopNav = ({unityContext}) => {

	const {currentRoomId, setCurrentRoomId} = useContext(IdbContext);
	const [textField, setTextField] = useState("")
	
	// This function runs only on the first render as array for dependencies is purposely left empty
	useEffect(function () {
		unityContext.on("ReportRoomID", function(roomID){
			console.log("current roomID send from Unity: " + roomID );
			setCurrentRoomId(roomID);	// To share among components
			setTextField(roomID);		// For display only
		});
	}, []);

	// Selects all in the text input field for easy copy and paste
	const handleFocus = (event) => {
		event.target.select();
	}
	
	// Used to change the value in the text input field
	function handleTextChange(value){
		//setCurrentRoomId(value)
		setTextField(value)
	}

	// Unity request functions
	function requestLoadRoom(){
		setCurrentRoomId(textField)
		console.log("Requesting to load room: " + textField);
		unityContext.send("LevelManager", "loadRoom", textField); //currentRoomId ??? 
	}

	function requestNewRoom(){
		console.log("Requesting new room ID: ");
		unityContext.send("LevelManager", "newRoom", "");
	}

	function requestSaveRoom(){
		unityContext.send("LevelManager", "SaveRoom", "");
	}
	

	return (
		<>
			<Navbar className="expand-gl bg-light border" >
				<Container fluid>
					<Navbar.Brand href="#home">
						<img src="res/icons/logo.png" alt="XRevent logo"></img> {' '}
						XRevent Creator
					</Navbar.Brand>

					<Form.Group className="justify-content-center"   >
						<InputGroup style={{ width: 450 }}>
							<Form.Control placeholder="Enter XReventId to load event room ..." value={textField} onChange={e => handleTextChange(e.target.value)} onFocus={handleFocus} onSubmit={requestLoadRoom} />
							
							<OverlayTrigger	placement="bottom" delay={{ show: 1000, hide: 250 }} overlay={ <Tooltip>Load room</Tooltip>}>
								<span className="input-group-text" >
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" type="button" onClick={requestLoadRoom} className="bi bi-save" viewBox="0 0 16 16">
										<path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
									</svg>
								</span>
							</OverlayTrigger>
							<OverlayTrigger	placement="bottom" delay={{ show: 1000, hide: 250 }} overlay={ <Tooltip>Create new empty room</Tooltip>}>
								<span className="input-group-text" >
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" type="button" onClick={requestNewRoom} className="bi bi-plus-square" viewBox="0 0 16 16">
									<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
									<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
								</svg>
								</span>
							</OverlayTrigger>
							<OverlayTrigger	placement="bottom" delay={{ show: 1000, hide: 250 }} overlay={ <Tooltip>Copy XRevent roomID</Tooltip>}>
								<span className="input-group-text" >
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" type="button" onClick={() => {navigator.clipboard.writeText(currentRoomId)}}className="bi bi-clipboard" viewBox="0 0 16 16">
										<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
										<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
									</svg>
								</span>
							</OverlayTrigger>
						</InputGroup>
					</Form.Group>

					<button className="btn btn-outline-secondary" onClick={requestSaveRoom} >Save</button>

				</Container>
			</Navbar>
		</>
	)
}

export default TopNav
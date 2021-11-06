import "./App.css";
import React,  { useState, useEffect }  from "react";
import Unity, { UnityContext } from "react-unity-webgl";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const unityContext = new UnityContext({
	loaderUrl: "AppWeb/Build/AppWeb.loader.js",
	dataUrl: "AppWeb/Build/AppWeb.data",
	frameworkUrl: "AppWeb/Build/AppWeb.framework.js",
	codeUrl: "AppWeb/Build/AppWeb.wasm",
});

const MainNav = ({ children }) => {
  return(
	<Navbar bg="light" expand="lg">
	  <Container>
		<Navbar.Brand href="#home">XRevent Creator</Navbar.Brand>
		
		  <Nav className="me-auto" >
			<NavDropdown title="File" id="basic-nav-dropdown">
			  <NavDropdown.Item href="#action/3.1">New ...</NavDropdown.Item>
			  <NavDropdown.Item href="#action/3.2">Open Bin ...</NavDropdown.Item>
			  <NavDropdown.Divider />
			  <NavDropdown.Item href="#action/3.3">Upload Room ...</NavDropdown.Item>
			  <NavDropdown.Divider />
			  <NavDropdown.Item href="#action/3.4">Upload Item ...</NavDropdown.Item>
			</NavDropdown>
			
			<NavDropdown title="Edit" id="basic-nav-dropdown">
			  <NavDropdown.Item href="#action/3.1">Room ...</NavDropdown.Item>
			  <NavDropdown.Item href="#action/3.2">Define Floor</NavDropdown.Item>
			  <NavDropdown.Item href="#action/3.3">Define Accessible Areas</NavDropdown.Item>
			  <NavDropdown.Divider />
			  <NavDropdown.Item href="#action/3.4">Insert Items ...</NavDropdown.Item>
			</NavDropdown>
			</Nav>
			
			<Nav>
			<Form>
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">Bin_ID</Form.Label>
				    <Col sm="10">
						<Form.Control />
					</Col>
				</Form.Group>
			</Form>
		  </Nav>
		
	  </Container>
	</Navbar>
  );
};


function App() {
  return (
  <div>
	  <div>
		<MainNav/>
	  </div>
	  <div className="App">
		<Unity className="Unity" unityContext={unityContext}/>
	  </div>
	  </div>
  );
}

export default App;

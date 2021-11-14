
import Nav from "react-bootstrap/Nav";
import Stack from "react-bootstrap/Stack";
import Accordion from "react-bootstrap/Accordion";

import AccMenu from "./AccMenu";

const MainNav = ({unityContext}) => {
    return (
        <>
        <Stack direction="horizontal" gap={0} >
			<div  >
            <Nav className="bg-light border flex-column vh-100">
                <Nav.Link eventKey="link-1"><img src="res/icons/icon_edit.png"></img></Nav.Link>
                <Nav.Link eventKey="link-2"><img src="res/icons/icon_settings.png"></img></Nav.Link>
                <Nav.Link eventKey="link-3"><img src="res/icons/icon_pretix.png"></img></Nav.Link>
                <Nav.Link eventKey="link-3"><img src="res/icons/icon_deploy.png"></img></Nav.Link>
            </Nav>
            </div>
            <div className="bg-light  vh-100" style={{width: 280}}>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header >Project Info</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Rooms</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Items</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>

                
                <AccMenu unityContext= {unityContext}></AccMenu>
            </div>
            
            </Stack>
        </>
    )
}

export default MainNav


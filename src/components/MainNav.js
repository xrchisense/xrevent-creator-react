import Nav from "react-bootstrap/Nav";
import Stack from "react-bootstrap/Stack";
import { Image } from "react-bootstrap";
import { useState, useEffect } from "react";

import AccMenu from "./AccMenu";
import SettingsMenu from "./SettingsMenu";
import PretixMenu from "./PretixMenu";
import LaunchMenu from "./LaunchMenu";

const MainNav = ({ unityContext }) => {
    const [composeIsShown, setComposeIsShown] = useState(true)
    const [settingsIsShown, setSettingsIsShown] = useState(false)
    const [pretixIsShown, setPretixIsShown] = useState(false)
    const [launchIsShown, setLaunchIsShown] = useState(false)
    
    // Switch to pretix menu if param exists
    useEffect(function () {
        new URLSearchParams(window.location.search).get("code") != null || new URLSearchParams(window.location.search).get("access_token") ? menuHandler('pretix') : console.log("No menu preference set.")
	}, []);


    const menuHandler = (eventKey) => {
        hideAll()
        
        switch(eventKey) {
            case 'compose':
                setComposeIsShown(true)
              break;
            case 'settings':
                setSettingsIsShown(true)
                break;
            case 'pretix':
                setPretixIsShown(true)
                break;
            case 'launch':
                setLaunchIsShown(true)
                break;
            default:
              break;
          }
    }

    function hideAll(){
        setSettingsIsShown(false)
        setComposeIsShown(false)
        setPretixIsShown(false)
        setLaunchIsShown(false)
    }


    return (
        <>
            <Stack direction="horizontal" gap={0} >
                <div>
                    <Nav className="bg-light border flex-column" style={{height: 'calc(100vh - 4rem)'}} defaultActiveKey="compose" onSelect={menuHandler}>
                        <Nav.Link eventKey="compose">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" className="bi bi-boxes" viewBox="0 0 16 16">
                                <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z" />
                            </svg>
                        </Nav.Link>
                        <Nav.Link eventKey="settings">
                            <Image src="res/logos/PrototypeFund_logo.svg"/>
                        {/*    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="grey" className="bi bi-gear-fill" viewBox="0 0 16 16">
                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                </svg> 
                        */}
                        </Nav.Link>
                        <Nav.Link eventKey="pretix">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="grey" className="bi bi-ticket-perferated" viewBox="0 0 16 16">
                                <path d="M4 4.85v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Z" />
                                <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3h-13ZM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9V4.5Z" />
                            </svg>
                        </Nav.Link>
                        <Nav.Link eventKey="launch">
                        <svg width="24" height="24" fill="gray" viewBox="10 4 24 24" ><path d="M19.86 12.19l4.057-4.057c1.586-1.586 5.289-2.896 6.568-1.617s-.058 4.955-1.644 6.54l-4.056 4.057c-.34.34-.318.895-.152 1.347.997 2.718-3.89 7.541-3.89 7.541l-1.95-1.948 1.83-2.779-1.83.83-3.896-3.897.803-1.857-2.751 1.857L11 16.26s4.8-4.91 7.514-3.917c.451.165 1.007.187 1.347-.153z" ></path><path d="M13.608 25.29a2.178 2.178 0 10-2.643-2.635L10 26.259z"></path>
                        </svg>
                        </Nav.Link>
                    </Nav>
                </div>

                <div className="bg-light" style={{ minWidth: 280, height: 'calc(100vh - 4rem)' }}>
                    {composeIsShown && <AccMenu unityContext={unityContext} />}
                    {settingsIsShown && <SettingsMenu unityContext = {unityContext} />}
                    {pretixIsShown && <PretixMenu  />}
                    {launchIsShown && <LaunchMenu  />}
                </div>

            </Stack>
        </>
    )
}

export default MainNav


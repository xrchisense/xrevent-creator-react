import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton, Row } from "react-bootstrap";
import AccordionContext from 'react-bootstrap/AccordionContext';
import Card from "react-bootstrap/Card";
import { useContext } from "react";
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


function AccMenu({ fileNames, unityContext }) {
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
                            <Prefab type="Lamp" unityContext={unityContext}></Prefab>
                       </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <ContextAwareToggle eventKey="2">Custom Items</ContextAwareToggle>
                    <UploadButton />
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




import React, { useState, useEffect } from "react";
import { Accordion, Form, Card, Row, Col } from "react-bootstrap";
import GameObjectDetails from "./GameObjectDetails";
import ContextAwareToggle from "../ContextAwareToggle";

function Inspector({ unityContext }) {

    const [isItemSelected, setIsItemSelected] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemID, setItemID] = useState(0);
    const [InfoArray, setInfoArray] = useState(new Float32Array());


    useEffect(function () {
        unityContext.on("ItemInfo", function (itemName, itemID,itemdata) {
            console.log("recieved 'ItemInfo' From Unity");
            setIsItemSelected(true);
            setItemName(itemName);
            setItemID(itemID);

            console.log(itemdata);
            //float Array with: Position, Rotation, Scale, ??
            //setInfoArray(InfoArray);
        });
    }, []);


    function componentDidMount() { }
    function componentWillUnmount() { }

    // SendMethod to trigger Unity WebGL to delete the selected model
    function DeleteItemEvent() {
        unityContext.send("LevelManager", "DeleteSelectedItem");
        console.log("Item Delete Requested");
    }

    function RefreshData() {
        unityContext.send("LevelManager", "ReportObjectInfo");
    }


    return (
        <>
            <Accordion defaultActiveKey="">
                <Card>
                    <Card.Header>Item Inspector</Card.Header>
                    <Card.Body>
                        <p>Item Name: {itemName}, {itemID}</p>
                        <button style={{ width: "100%" }} className="btn btn-outline-secondary" onClick={DeleteItemEvent}>Remove Item</button>
                        <button style={{ width: "100%" }} className="btn btn-outline-secondary" onClick={RefreshData}>RefreshData</button>
                    </Card.Body>
                    
                </Card>
                <Card>
                    <Card.Header>Transform</Card.Header>
                    <Card.Body >
                        <Row>
                            <Col>
                                <Form.Label>Position</Form.Label>
                                <Form.Control type="text" placeholder="X" />
                                <Form.Control type="text" placeholder="Y" />
                                <Form.Control type="text" placeholder="Z" />
                            </Col>
                            <Col>
                                <Form.Label>Rotation</Form.Label>
                                <Form.Control type="text" placeholder="X" />
                                <Form.Control type="text" placeholder="Y" />
                                <Form.Control type="text" placeholder="Z" />
                            </Col>
                            <Col>
                                <Form.Label>Scale</Form.Label>
                                <Form.Control type="text" placeholder="X" />
                                <Form.Control type="text" placeholder="Y" />
                                <Form.Control type="text" placeholder="Z" />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        <ContextAwareToggle eventKey="2">Prefab Properties</ContextAwareToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>

                            Custom Args may go here?

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>

    );


}

export default Inspector;
import React, { useState, useEffect } from "react";
import { Accordion, Form, Card, Row, Col } from "react-bootstrap";
import GameObjectDetails from "./GameObjectDetails";
import ContextAwareToggle from "../ContextAwareToggle";
import PopUp from "../PopUp";

function Inspector({ unityContext ,setPopUpState}) {

    const [isItemSelected, setIsItemSelected] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemID, setItemID] = useState(0);
    const [itemTransform, setItemTransform] = useState(null);
    const [InfoArray, setInfoArray] = useState(new Float32Array());

    


    useEffect(function () {
        unityContext.on("ItemInfo", function (itemName, itemID, itemdata) {
            console.log("recieved 'ItemInfo' From Unity");
            setIsItemSelected(true);
            setItemName(itemName);
            setItemID(itemID);
            setItemTransform(itemdata);
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

    function handleOpen(){
        setPopUpState(true);
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
                                <Form.Control name="x" type="text" placeholder="X" value={itemTransform == null ? null : itemTransform[0].toFixed(3)} onChange={e => unityContext.send("LevelManager", "MoveSelectedObjectX", parseFloat(e.target.value))}/>
                                <Form.Control name="y" type="text" placeholder="Y" value={itemTransform == null ? null : itemTransform[1].toFixed(3)} onChange={e => unityContext.send("LevelManager", "MoveSelectedObjectY", parseFloat(e.target.value))}/>
                                <Form.Control name="z" type="text" placeholder="Z" value={itemTransform == null ? null : itemTransform[2].toFixed(3)} onChange={e => unityContext.send("LevelManager", "MoveSelectedObjectZ", parseFloat(e.target.value))}/>
                            </Col>
                            <Col>
                                <Form.Label>Rotation</Form.Label>
                                <Form.Control name="X" type="text" placeholder="X" value={itemTransform == null ? null : itemTransform[3].toFixed(3)} onChange={e => unityContext.send("LevelManager", "RotateSelectedObjectX", e.target.value)}/>
                                <Form.Control name="Y" type="text" placeholder="Y" value={itemTransform == null ? null : itemTransform[4].toFixed(3)} onChange={e => unityContext.send("LevelManager", "RotateSelectedObjectY", e.target.value)}/>
                                <Form.Control name="Z" type="text" placeholder="Z" value={itemTransform == null ? null : itemTransform[5].toFixed(3)} onChange={e => unityContext.send("LevelManager", "RotateSelectedObjectZ", e.target.value)}/>
                            </Col>
                            <Col>
                                <Form.Label>Scale</Form.Label>
                                <Form.Control name="x" type="text" placeholder="X" value={itemTransform == null ? null : itemTransform[6].toFixed(3)} onChange={e => unityContext.send("LevelManager", "ScaleSelectedObjectX", e.target.value)}/>
                                <Form.Control name="y" type="text" placeholder="Y" value={itemTransform == null ? null : itemTransform[7].toFixed(3)} onChange={e => unityContext.send("LevelManager", "ScaleSelectedObjectY", e.target.value)}/>
                                <Form.Control name="z" type="text" placeholder="Z" value={itemTransform == null ? null : itemTransform[8].toFixed(3)} onChange={e => unityContext.send("LevelManager", "ScaleSelectedObjectZ", e.target.value)}/>
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
                <button variant="primary" onClick={handleOpen} style = {{margin: '10%',width: '80%',}}>
                    DEBUG: Launch PopUp
                </button>
            </Accordion>
        </>

    );


}

export default Inspector;
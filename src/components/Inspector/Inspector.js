import React, { useState, useEffect } from "react";
import { Accordion, Form, Card, Row, Col } from "react-bootstrap";
import GameObjectDetails from "./GameObjectDetails";
import ContextAwareToggle from "../ContextAwareToggle";
import PopUp from "../PopUp";
import InspectorTransform from "./InspectorTransform";

function Inspector({ unityContext ,setPopUpState}) {

    const [isItemSelected, setIsItemSelected] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemID, setItemID] = useState(0);
    const [itemTransform, setItemTransform] = useState([]);     

    useEffect(function () {
        unityContext.on("ItemInfo", function (itemName, itemID, itemdata) { // Do not register the same .on message twice in another component! It it becomes flakey!
            console.log("Inspector.js Component received.");                  
            if (itemName == "" && itemID == 0) { 
                setIsItemSelected(false)        
                setItemName("")
                setItemID("")
            } else {
                setIsItemSelected(true)
                setItemName(itemName)
                setItemID(itemID)
            }
            setItemTransform(itemdata);
        });
    }, []);
  
    function RefreshData() {
        unityContext.send("LevelManager", "ReportObjectInfo");
    }

    // SendMethod to trigger Unity WebGL to delete the selected model
    function DeleteItemEvent() {
        unityContext.send("LevelManager", "DeleteSelectedItem");
        console.log("Item Delete Requested");
    }

    function handleOpen(){
        setPopUpState(true);
    }

    
    return (
        <>
            {isItemSelected &&
           
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
                            <InspectorTransform unityContext={unityContext} transform={itemTransform} />
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
            }
            {!isItemSelected  &&
                 <div>
                    <h4>No Item Selected</h4>
                    <button variant="primary" onClick={handleOpen} style={{ margin: '10%', width: '80%', }}>
                        DEBUG: Launch PopUp
                    </button>
                 </div>
            }   
        </>
    );
}

export default Inspector;
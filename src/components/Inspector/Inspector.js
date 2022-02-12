import React, { useState, useEffect } from "react";
import { Accordion, Form, Card, Row, Col, Image, Carousel } from "react-bootstrap";
import GameObjectDetails from "./GameObjectDetails";
import ContextAwareToggle from "../ContextAwareToggle";
import PopUp from "../PopUp";
import InspectorTransform from "./InspectorTransform";

function Inspector({ unityContext ,setPopUpState}) {

    const [isItemSelected, setIsItemSelected] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemID, setItemID] = useState(0);
    const [itemTransform, setItemTransform] = useState([]);
    const [itemCustomArgs, setItemCustomArgs] = useState("");

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
            setItemCustomArgs("");
        });
    }, []);

    useEffect(function() {
        unityContext.on("ItemInfoCustomArgs", function (customArgList){
            setItemCustomArgs(customArgList);
        });
    }, []);
        
    
  
    
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
                            <Row>
                                <Col style={{fontWeight: "lighter"}}>Item Name</Col>
                            </Row>
                            <Row> 
                                <Col className="text-truncate" style={{ display: "block" }}>
                                {itemName}, {itemID}
                                </Col>
                            </Row>  
                            <Row>
                                <Col>  
                                      
                                    <button style={{ marginTop: "10px", width: "100%" }} className="btn btn-outline-secondary" onClick={DeleteItemEvent}>Remove Item</button>
                                   
                                </Col>    
                            </Row>  
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
                                {itemCustomArgs}

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    
                </Accordion>
            }
            {!isItemSelected  &&
                 <div>
                    <Card style={{ width: '277px' }}>
                    <Card.Body>
                        <Card.Title>Controls</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">XRevent Creator</Card.Subtitle>
                        <Card.Text style={{fontSize: '10pt'}}>
                            <Image src="res/icons/Rotate.png"/> 
                            <Image src="res/icons/Translate.png"/> 
                        </Card.Text>
                    </Card.Body>
                    </Card>

                    {/*
                    <button variant="primary" onClick={handleOpen} style={{ margin: '10%', width: '80%', }}>
                        DEBUG: Launch PopUp
                    </button>
                    */}
                    

                    <Card style={{ width: '277px' }}>
                    <Card.Body>
                        <Card.Title>Funded & Sponsored by</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <Card.Text style={{fontSize: '10pt', height: "100px"}}>

                            <Carousel indicators={false} controls={false} style={{ marginTop: "20px"}}>
                            <Carousel.Item>
                                <img
                                className="d-block"
                                src="res/logos/BMBF_logo.svg"
                                alt="BMBF Logo"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="res/logos/Open_Knowledge_Foundation_Deutschland_Logo.svg"
                                alt="OKF Logo"
                                />

                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block "
                                src="res/logos/Prototype2_logo.svg"
                                alt="Prototype Fund Logo"
                                />

                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="res/logos/haw-hamburg_logo.svg"
                                alt="HAW Hamburg Logo"
                                /> 
                            </Carousel.Item>
                            </Carousel>
                            
                        </Card.Text>
                    </Card.Body>
                    </Card>

                    

                 </div>
            }   
        </>
    );
}

export default Inspector;
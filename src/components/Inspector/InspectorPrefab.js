import { Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function InspectorPrefab({ unityContext })  {
    
    // key, value structure used here
    const[prefabData, setPrefabData] = useState({});

    useEffect(function () {
        unityContext.on("ItemInfoCustomArgs", function (custonmArgs) { // Do NOT register the same .on message twice in another component! It it becomes flakey!
            console.log("InspectorPrefab.js Args received.");   
            
            setPrefabData({})

            const responseString =  custonmArgs.slice(0,-1); // remove last colon
            const kvPairArray =  responseString.split(";");
            
            kvPairArray.forEach(element => {
                console.log(element)
                const kvItem = element.split(",");
                
                setPrefabData(prefabData => ({...prefabData, [kvItem[0]]: kvItem[1]}))
            });
            
        });
        
    }, []);





    function handleTextChange(event){
        console.log(event.target.name)
        
    }

  
    // Selects all in the text input field for easy copy and paste
    const handleFocus = (event) => {
      event.target.select();
    }

    return (
        <>
         { Object.entries(prefabData).map((item) => (
            <Row>
                <Col md="auto" className="text-truncate" style={{ width: "80px"}}>
                    <Form.Label>{item[0]}</Form.Label>
                </Col>
                <Col  style={{ paddingLeft: "0", display: "block" }}>
                    <Form.Control name={item[0]} size="sm" type="text" placeholder="[value]" value={item[1]} onFocus={handleFocus} onChange={e => handleTextChange(e)} style={{ boxShadow: "none"}}/>
                </Col>
            </Row>
         ))}
        </>
    );
}

export default InspectorPrefab;
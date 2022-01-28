import { Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function InspectorTransform({ unityContext, transform })  {
    
    
    const [posX, setPosX] = useState();
    const [posY, setPosY] = useState();
    const [posZ, setPosZ] = useState();

    const [rotX, setRotX] = useState();
    const [rotY, setRotY] = useState();
    const [rotZ, setRotZ] = useState();

    const [scaleX, setScaleX] = useState();
    const [scaleY, setScaleY] = useState();
    const [scaleZ, setScaleZ] = useState();


    useEffect(function () {
          console.log("InspectorTransform.js Component received.");  
           if(transform instanceof Array ) {   
                if(transform.length === 9)  
                    setTransformData(transform); 
           }
        
    }, [transform]);

    function handleTextChange(event){
        console.log(event.target.name)
        
        switch(event.target.name) {
            case 'posX':
                setPosX(event.target.value)
              break;
            case 'posY':
                setPosY(event.target.value)
              break;
            case 'posZ':
                setPosZ(event.target.value)
              break;
            case 'rotX':
                setRotX(event.target.value)
              break;
            case 'rotY':
                setRotY(event.target.value)
              break;
            case 'rotZ':
                setRotZ(event.target.value)
              break;
            case 'scaleX':
                setScaleX(event.target.value)
              break;
            case 'scaleY':
                setScaleY(event.target.value)
              break;
            case 'scaleZ':
                setScaleZ(event.target.value)
              break;  
            default:
              break;
          }
        
    }

    function setTransformData(data){
       
        
        setPosX(data[0].toFixed(2))
        setPosY(data[1].toFixed(2))
        setPosZ(data[2].toFixed(2))

        setRotX(data[3].toFixed(2))
        setRotY(data[4].toFixed(2))
        setRotZ(data[5].toFixed(2))

        setScaleX(data[6].toFixed(2))
        setScaleY(data[7].toFixed(2))
        setScaleZ(data[8].toFixed(2))
    }


    return (
        <>
            <Row>
                <Col>
                    <Form.Label>Position</Form.Label>
                    <Form.Control name="posX" type="text" placeholder="X" value={ posX } onChange={e => handleTextChange(e)} onKeyUp={ e => {if(isFinite(e.key) || e.key === 'Enter' ){ unityContext.send("LevelManager", "MoveSelectedObjectX", parseFloat(posX))}}} style={{ boxShadow: "none"}}/>
                    <Form.Control name="posY" type="text" placeholder="Y" value={ posY } onChange={e => handleTextChange(e)} onKeyUp={ e => {if(isFinite(e.key) || e.key === 'Enter' ){ unityContext.send("LevelManager", "MoveSelectedObjectY", parseFloat(posY))}}} style={{ boxShadow: "none"}}/>
                    <Form.Control name="posZ" type="text" placeholder="Z" value={ posZ } onChange={e => handleTextChange(e)} onKeyUp={ e => {if(isFinite(e.key) || e.key === 'Enter' ){ unityContext.send("LevelManager", "MoveSelectedObjectZ", parseFloat(posZ))}}} style={{ boxShadow: "none"}}/>  
                </Col>
                <Col>
                    <Form.Label>Rotation</Form.Label>
                    <Form.Control name="rotX" type="text" placeholder="X" value={ rotX } onChange={e => handleTextChange(e)} onKeyUp={ e => {if(isFinite(e.key) || e.key === 'Enter' ){ unityContext.send("LevelManager", "RotateSelectedObjectX", parseFloat(rotX))}}} style={{ boxShadow: "none"}}/>  
                    <Form.Control name="rotY" type="text" placeholder="Y" value={ rotY } onChange={e => handleTextChange(e)} onKeyUp={ e => {if(isFinite(e.key) || e.key === 'Enter' ){ unityContext.send("LevelManager", "RotateSelectedObjectY", parseFloat(rotY))}}} style={{ boxShadow: "none"}}/>  
                    <Form.Control name="rotZ" type="text" placeholder="Z" value={ rotZ } onChange={e => handleTextChange(e)} onKeyUp={ e => {if(isFinite(e.key) || e.key === 'Enter' ){ unityContext.send("LevelManager", "RotateSelectedObjectZ", parseFloat(rotZ))}}} style={{ boxShadow: "none"}}/>  
                </Col>
                <Col>
                    <Form.Label>Scale</Form.Label>
                    <Form.Control name="scaleX" type="text" placeholder="X" value={ scaleX } onChange={e => handleTextChange(e)} onKeyUp={ e => {if(isFinite(e.key) || e.key === 'Enter' ){ unityContext.send("LevelManager", "ScaleSelectedObjectX", parseFloat(scaleX))}}} style={{ boxShadow: "none"}}/>  
                    <Form.Control name="scaleY" type="text" placeholder="Y" value={ scaleY } onChange={e => handleTextChange(e)} onKeyUp={ e => {if(isFinite(e.key) || e.key === 'Enter' ){ unityContext.send("LevelManager", "ScaleSelectedObjectY", parseFloat(scaleY))}}} style={{ boxShadow: "none"}}/>  
                    <Form.Control name="scaleZ" type="text" placeholder="Z" value={ scaleZ } onChange={e => handleTextChange(e)} onKeyUp={ e => {if(isFinite(e.key) || e.key === 'Enter' ){ unityContext.send("LevelManager", "ScaleSelectedObjectZ", parseFloat(scaleZ))}}} style={{ boxShadow: "none"}}/>  
                </Col>
            </Row>
        </>
    );
}

export default InspectorTransform;
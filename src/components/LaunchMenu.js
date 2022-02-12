import React from 'react'
import { Row, Col, Card, Button, ToggleButton, ButtonGroup } from 'react-bootstrap'
import { useState } from 'react';


function LaunchMenu({unityContext}){

    const [radioValue, setRadioValue] = useState('1');

    const showGrid = [
        { name: 'On', value: '1' },
        { name: 'Off', value: '2' },
      ];

    function handleSelection(value){
        setRadioValue(value)
        
        if(value === '1'){
            unityContext.send("LevelManager", "SetGridVisibilty", "true");
        } else if (value === '2'){
            unityContext.send("LevelManager", "SetGridVisibilty", "false");
        }
    }

    return (
        <div>
            These Components are in development:
            <Card style={{ width: '260px' }}>
            <Card.Body>
                <Card.Title>Settings</Card.Title>
                <Card.Text style={{fontSize: '10pt'}}>
                    <Row>
                        <Col>
                            <ButtonGroup size="sm" style={{width: '100%'}}>
                                <Button variant="outline-dark" disabled >World Grid</Button>
                                {showGrid.map((radio, idx) => (
                                    <ToggleButton 
                                        key={idx} 
                                        id={`radio-${idx}`}
                                        type='radio' 
                                        value={radio.value}
                                        variant={ 'outline-secondary' }
                                        checked={radioValue === radio.value}
                                        onChange={(e) => handleSelection(e.currentTarget.value)}
                                        style={{ boxShadow: "none"}
                                    }>

                                        {radio.name}

                                    </ToggleButton>
                                ))}
                                
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    )
}

export default LaunchMenu


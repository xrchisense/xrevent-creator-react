import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Image, Card } from 'react-bootstrap'

function SettingsMenu({unityContext}){


// Unity request functions
function requestLoadRoom(id){
    console.log(id)
    unityContext.send("LevelManager", "loadRoom", id); //currentRoomId ??? 
}



    return (
        <div style={{  height: 'calc(100vh - 4rem)', overflowY: "scroll", overflowX: "hidden" }} >
            <Row>
                <Col>
                    <Image src="res/logos/Demo_Week-300x150.png"/>
                
                </Col>
            </Row>

            <Card style={{ width: '260px' }}>
            <Card.Body>
                <Card.Title>Description</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">XRevent Creator</Card.Subtitle>
                <Card.Text style={{fontSize: '10pt'}}>
                    The XRevent Creator is intended to help users of the XRchitecture platform to build a virtual venue location.
                    Rooms built with this tool can be dynamically loaded by the client software. 
                </Card.Text>
                Download Demo Clients <br/>
                <Card.Link href="../download/Quest/xrevent.apk">Occulus Quest</Card.Link>
                <Card.Link href="../download/Win/XRevent_Win.zip">Win</Card.Link>
                <Card.Link href="../download/Mac/AppMac.app.zip">Mac</Card.Link>
            </Card.Body>
            </Card>

            <Card style={{ width: '260px' }}>
                <Card.Img variant="top" src="/upload/8dae3688-6cf7-46ca-8362-329f088b61b0/preview.jpg" type="button" onClick={() => requestLoadRoom("8dae3688-6cf7-46ca-8362-329f088b61b0")} />
                <Card.Body>
                    <Card.Title>DJ Room</Card.Title>
                    <Card.Text style={{fontSize: '10pt'}}>
                        This is one of our first rooms created in Blender and composed is this editor.
                    </Card.Text>
                    
                </Card.Body>
            </Card>

            <Card style={{ width: '260px' }}>
                <Card.Img variant="top" src="/upload/15e6ec8e-7b78-4dfa-96ed-a345cf2e3247/preview.jpg" type="button" onClick={() => requestLoadRoom("15e6ec8e-7b78-4dfa-96ed-a345cf2e3247")}/>
                <Card.Body>
                    <Card.Title>DJ Room</Card.Title>
                    <Card.Text style={{fontSize: '10pt'}}>
                        This is one of our first rooms created in Blender and composed is this editor.
                    </Card.Text>
                    
                </Card.Body>
            </Card>

            <Card style={{ width: '260px' }}>
                <Card.Img variant="top" src="/upload/1f20992f-acba-4074-8e4c-7868afaccbc6/preview.jpg" type="button" onClick={() => requestLoadRoom("1f20992f-acba-4074-8e4c-7868afaccbc6")}/>
                <Card.Body>
                    <Card.Title>DJ Room</Card.Title>
                    <Card.Text style={{fontSize: '10pt'}}>
                        This is one of our first rooms created in Blender and composed is this editor.
                    </Card.Text>
                    
                </Card.Body>
            </Card>

            <Card style={{ width: '260px' }}>
                <Card.Img variant="top" src="/upload/1a03ac6b-d6b5-4c2d-9f1a-c80068311396/preview.jpg" type="button" onClick={() => requestLoadRoom("1a03ac6b-d6b5-4c2d-9f1a-c80068311396")}/>
                <Card.Body>
                    <Card.Title>DJ Room</Card.Title>
                    <Card.Text style={{fontSize: '10pt'}}>
                        This is one of our first rooms created in Blender and composed is this editor.
                    </Card.Text>
                    
                </Card.Body>
            </Card>

            <Card style={{ width: '260px' }}>
                <Card.Img variant="top" src="/upload/37afe154-6f83-47ba-b63e-f8192af25e87/preview.jpg" type="button" onClick={() => requestLoadRoom("37afe154-6f83-47ba-b63e-f8192af25e87")}/>
                <Card.Body>
                    <Card.Title>DJ Room</Card.Title>
                    <Card.Text style={{fontSize: '10pt'}}>
                        This is one of our first rooms created in Blender and composed is this editor.
                    </Card.Text>
                    
                </Card.Body>
            </Card>

            <Card style={{ width: '260px' }}>
                <Card.Img variant="top" src="/upload/0f8fad5b-d9cb-469f-a165-70867728950e/preview.jpg" type="button" onClick={() => requestLoadRoom("0f8fad5b-d9cb-469f-a165-70867728950e")}/>
                <Card.Body>
                    <Card.Title>DJ Room</Card.Title>
                    <Card.Text style={{fontSize: '10pt'}}>
                        This is one of our first rooms created in Blender and composed is this editor.
                    </Card.Text>
                    
                </Card.Body>
            </Card>

        </div>
    )
}

export default SettingsMenu


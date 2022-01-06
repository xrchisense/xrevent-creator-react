import { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { Card, Row, Col, Form, Button } from 'react-bootstrap'


function PretixEventSelectButton({ organizerSlug }) {
    const [pretixData, setPretixData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState(null)

    // Retrieve some info on first render
    useEffect(function () {
        window.sessionStorage.getItem('access_token') != null ? getRessources('&endpoint=organizers/' + organizerSlug + '/events/') : console.log("[PretixInfo] There seems to be no token in session storage.")
    }, []);

    // Fetches some infos from pretix as token should be available in session storage
    async function getRessources(endpoint) {
        // Retrieve the access_token from the session storage
        let access_token = window.sessionStorage.getItem('access_token')

        await fetch('/oauth.php?access_token=' + access_token + endpoint
        )
            .then(function (response) {
                if (response.ok) {
                    console.log(response)
                    return response.json()
                }
                throw response // if not response ok throw error that we will catch
            })
            .then(function (pretixJson) {
                console.log(pretixJson)
                setPretixData(pretixJson)
            })
            .catch(function (error) {
                console.error("Error fetching data: ", error)
                setError(error)
            })
            .finally(function () {
                setLoading(false)
            });

    }


    return (

        <div className="text-center">
            <Card border="gray" className="mx-auto"  >
                <Card.Img className="mx-auto" style={{ width: "150px", margin: "1rem" }} src="res/logos/pretix_logo.svg" altText="pretix logo"></Card.Img>
                <Card.Body className="d-grid">
                    {loading &&
                        <p>Loading...</p>
                    }

                    {!loading && pretixData.count > 0 &&

                        <div style={{width:"250px"}}>1. Select the Pretix Event you wish to add your XRevent room to.
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ background: "#7f5a91", boxShadow: "none", border: "none", marginTop: "1rem", width:"100%" }}>
                                    Pretix Event
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    {pretixData.results.map((event, index) => (
                                        <Dropdown.Item onClick={() => setSelectedEvent(index)}>{Object.values(event.name)[0].toString()}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>

                            {selectedEvent != null &&
                                <>
                                <p>
                                <Row>
                                    <Col style={{ textAlign: "left", maxWidth: "110px"  }}>Eventname</Col>
                                    <Col style={{ textAlign: "left" }}>{Object.values(pretixData.results[selectedEvent].name)[0].toString()}</Col>
                                </Row>
                                <Row>
                                    <Col auto style={{ textAlign: "left", maxWidth: "110px"  }}>Live</Col>
                                    <Col style={{ textAlign: "left" }}>{pretixData.results[selectedEvent].live.toString()}</Col>
                                </Row>
                                <Row>                                
                                    <Col style={{ textAlign: "left", maxWidth: "110px"  }}>Testmode</Col>
                                    <Col style={{ textAlign: "left" }}>{pretixData.results[selectedEvent].testmode.toString()}</Col>
                                </Row>
                                <Row>                                
                                    <Col style={{ textAlign: "left", maxWidth: "110px"  }}>Timezone</Col>
                                    <Col style={{ textAlign: "left" }}>{pretixData.results[selectedEvent].timezone.toString()}</Col>
                                </Row>
                                <Row>                                
                                    <Col style={{ textAlign: "left", maxWidth: "110px" }}>Event start</Col>
                                    <Col className="text-truncate" style={{ textAlign: "left" }}>{pretixData.results[selectedEvent].date_from.toString()}</Col>
                                </Row>
                                <Row>                                 
                                    <Col style={{ textAlign: "left", maxWidth: "110px" }}>Event end</Col>
                                    <Col className="text-truncate" style={{ textAlign: "left" }}>{pretixData.results[selectedEvent].date_to.toString()}</Col>
                                </Row>
                                <Row>                                
                                    <Col style={{ textAlign: "left", maxWidth: "110px" }}>Presale start</Col>
                                    <Col className="text-truncate" style={{ textAlign: "left" }}>{pretixData.results[selectedEvent].presale_start.toString()}</Col>
                                </Row>
                                <Row>                                
                                    <Col style={{ textAlign: "left", maxWidth: "110px" }}>Presale end</Col>
                                    <Col className="text-truncate" style={{ textAlign: "left" }}>{pretixData.results[selectedEvent].presale_end.toString()}</Col>
                                </Row>

                                <a href="https://pretix.eu/control/" className="mx-auto" style={{ color: "#563d62", textDecoration: "none", marginTop: "5px", fontSize: "12px" }} >Change Event Settings via Pretix &gt;&gt;</a>
                                </p>
                               
                                <p>
                                    <div>2. Your room can only go live on XRevent Platform, if the XRevent Team is invited as team member to your Pretix event.</div>
                                    <Form action="/oauth.php">
                                        <Button style={{ background: "#7f5a91", boxShadow: "none", border: "none", marginTop: "1rem", width:"100%"}} type="submit">Invite XRevent Team</Button>
                                    </Form>
                                </p>
                                
                                <p>
                                    <div>3. Add the XRevent Room ID to your Pretix Event Settings. The room will then be available on the XRevent Platform.</div>
                                    <Form action="/oauth.php">
                                        <Button style={{ background: "#7f5a91", boxShadow: "none", border: "none", marginTop: "1rem", width:"100%" }} type="submit">Add XRevent Room ID</Button>
                                    </Form>
                                </p>
                                </>
                                
                            }
                        </div>
                    }

                    {!loading &&
                        <div>
                            <p>{pretixData.details}</p>
                        </div>
                    }
                </Card.Body>
            </Card>
            <a href="https://pretix.eu/about/de/" style={{ color: "#563d62", textDecoration: "none", fontSize: "10px" }}>Event-Ticketing-Software powered by pretix</a>

        </div>

    );
}

export default PretixEventSelectButton;
import { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { Card } from 'react-bootstrap'

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

                        <div style={{width:"230px"}}>1. Select the Pretix Event you wish to add your XRevent room to.
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ background: "#7f5a91", boxShadow: "none", border: "none", marginTop: "1rem", width:"100%" }}>
                                    Pretix Event
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    {pretixData.results.map((event, index) => (
                                        <Dropdown.Item onClick={() => setSelectedEvent(index)}>{event.slug.toString()}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            {selectedEvent != null ? JSON.stringify(pretixData.results[selectedEvent]) : ''

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
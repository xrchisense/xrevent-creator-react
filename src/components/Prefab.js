import { Card, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function DefaultPrefab({ unityContext, type }) {
    function SpawnItemEvent() {
        unityContext.send("LevelManager", "SpawnPrefab", type);

    }

    return (
        <Col style={{padding: "0.5rem 0.7rem"}}>
            <Card border="gray" style={{width: "6.9rem", minHeight: "100%", marginBottom: "0rem"}} type="button" onClick={SpawnItemEvent}>
                { type === "Point Light" &&
                <OverlayTrigger	placement="right" delay={{ show: 1000, hide: 250 }} overlay={ <Tooltip>Point Lights emit light in all directions from their position in the world.</Tooltip>}>
                    <Card.Img className="card-img-top"  src="res/icons/icon_point_light.png" style={{maxHeight: "100px"}} altText=""></Card.Img>
                </OverlayTrigger>
                } 
                { type === "Directional Light" &&
                <OverlayTrigger	placement="right" delay={{ show: 1000, hide: 250 }} overlay={ <Tooltip>Light rays emitted from Directional Lights are parallel to one another and do not diverge like those from other light types. As a result, shadows cast by Directional Lights look the same, regardless of their position relative to the source.</Tooltip>}>
                    <Card.Img className="card-img-top"  src="res/icons/icon_directional_light.png" style={{maxHeight: "100px"}} altText=""></Card.Img>
                </OverlayTrigger>
                }
                { type === "Cube" &&
                <Card.Img className="card-img-top"  src="res/icons/icon_cube.png" style={{maxHeight: "100px"}} altText=""></Card.Img>
                }  
                { type === "Sphere" &&
                <Card.Img className="card-img-top"  src="res/icons/icon_sphere.png" style={{maxHeight: "100px"}} altText=""></Card.Img>
                }  
                { type === "Plane" &&
                <Card.Img className="card-img-top"  src="res/icons/icon_plane.png" style={{maxHeight: "100px"}} altText=""></Card.Img>
                }  
                { type === "Entrance" &&
                <OverlayTrigger	placement="right" delay={{ show: 1000, hide: 250 }} overlay={ <Tooltip>Use this to define where visitors will enter the venue.</Tooltip>}>
                    <Card.Img className="card-img-top"  src="res/icons/icon_event_entrance.png" style={{maxHeight: "100px"}} altText=""></Card.Img>
                </OverlayTrigger>
                }
                { type === "Exit to Lobby" &&
                <OverlayTrigger	placement="right" delay={{ show: 1000, hide: 250 }} overlay={ <Tooltip>This is where visitors can exit your venue back to the XRevent Lobby.</Tooltip>}>
                    <Card.Img className="card-img-top"  src="res/icons/icon_event_exit.png" style={{maxHeight: "100px"}} altText=""></Card.Img>
                </OverlayTrigger>
                }
                { type === "VideoWall" &&
                <OverlayTrigger	placement="right" delay={{ show: 1000, hide: 250 }} overlay={ <Tooltip>Used to diplay a Http Live Stream (HLS).</Tooltip>}>
                    <Card.Img className="card-img-top"  src="res/icons/icon_videowall.png" style={{maxHeight: "100px"}} altText=""></Card.Img>
                </OverlayTrigger>
                }
                <Card.Body style={{padding: "0rem 0.5rem"}}>{type}</Card.Body>
            </Card>
        </Col>
    )
}

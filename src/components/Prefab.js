import { Card, Col } from "react-bootstrap";

export default function DefaultPrefab({ unityContext, type }) {
    function SpawnItemEvent() {
        unityContext.send("LevelManager", "SpawnPrefab", type);

    }

    return (
        <Col style={{padding: "0.5rem 0.7rem"}}>
            <Card border="gray" style={{width: "6.9rem", minHeight: "100%", marginBottom: "0rem"}} type="button" onClick={SpawnItemEvent}>
                { type === "Point Light" &&
                <Card.Img className="card-img-top"  src="res/icons/icon_point_light.png" style={{maxHeight: "100px"}} altText=""></Card.Img>
                } 
                { type === "Directional Light" &&
                <Card.Img className="card-img-top"  src="res/icons/icon_directional_light.png" style={{maxHeight: "100px"}} altText=""></Card.Img>
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
                <Card.Body style={{padding: "0rem 0.5rem"}}>{type}</Card.Body>
            </Card>
        </Col>
    )
}

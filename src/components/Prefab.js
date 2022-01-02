import { Card, Col } from "react-bootstrap";

export default function DefaultPrefab({ unityContext, type }) {
    function SpawnItemEvent() {
        unityContext.send("LevelManager", "SpawnPrefab", type);

    }

    return (
        <Col>
            <Card border="gray" style={{width: "6.9rem", marginBottom: "1rem"}} type="button" onClick={SpawnItemEvent}>
                <Card.Img className="card-img-top"  src="res/icons/icon_edit.png"  altText=""></Card.Img>
                <Card.Body style={{padding: "0rem 1rem"}}>{type}</Card.Body>
            </Card>
        </Col>
    )
}

import { style } from "dom-helpers";
import { Card, CardImg } from "react-bootstrap";
import Unity, { UnityContext } from "react-unity-webgl";

export default function DefaultItem({unityContext,type}) {


    function SpawnItemEvent() {
        unityContext.send("WebGLConnector", "SpawnItemEvent", type);
        
      }
    return (
        <Card>
        <Card.Img className="card-img-top" src="res/icons/icon_edit.png" onClick={SpawnItemEvent} altText=""></Card.Img>
        <Card.Body>{type}</Card.Body>
        </Card>
    )
}

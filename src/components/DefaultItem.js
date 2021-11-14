import Unity, { UnityContext } from "react-unity-webgl";

export default function DefaultItem({type,unityContext}) {


    function SpawnItemEvent() {
        unityContext.send("WebGLConnector", "SpawnItemEvent", type);
        console.log("spawing Cube");
      }
    return (
        <>
        <img src="res/icons/icon_edit.png" onClick={SpawnItemEvent}></img>
        <p>{type}</p>
        </>
    )
}

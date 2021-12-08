import React, { useState, useEffect } from "react";
import GameObjectDetails from "./Inspector/GameObjectDetails";

export default function Inspector({ unityContext }) {

    const [isItemSelected, setisItemSelected] = useState(false);
    const [itemName, setitemName] = useState("");
    const [itemID, setitemID] = useState(0);
    const [InfoArray,setInfoArray]= useState(new Float32Array());


    useEffect(function () {
        unityContext.on("ItemInfo", function (itemName, itemID) {
            console.log("recieved 'ItemInfo' From Unity");
            setisItemSelected(true);
            setitemName(itemName);
            setitemID(itemID);
            //float Array with: Position, Rotation, Scale, ??
            //setInfoArray(InfoArray);
        });
    }, []);


    function componentDidMount() { }
    function componentWillUnmount() { }

    //if (isItemSelected) {
        return (
            <>
                <GameObjectDetails GameObjectInfoArray= {InfoArray}></GameObjectDetails>
            </>
        )
    //}
    return null;

}
import React, { useState, useEffect } from "react";

export default function Inspector({ unityContext }) {

    const [isItemSelected, setisItemSelected] = useState(false);
    const [itemName, setitemName] = useState("");
    const [itemID, setitemID] = useState(0);


    useEffect(function () {
        unityContext.on("ItemInfo", function (itemName, itemID) {
            console.log("recieved 'ItemInfo' From Unity");
            setisItemSelected(true);
            setitemName(itemName);
            setitemID(itemID);
        });
    }, []);

    if(isItemSelected){
        return (
            <>
                <p>{itemName},{itemID}</p>
            </>
        )
    }
    return null;
    
}

import { Row, Col } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { IdbContext } from "../App";

export default function DefaultItem({ itemName, unityContext}) {
    const [deleteIsShown, setDeleteIsShown] = useState(false)
    const [rowIsShown, setRowIsShown] = useState(true)
    
    // This context contains the current RoomID to take the assets from
    const context = useContext(IdbContext)

    // SendMethod to trigger Unity WebGL to load the selected model
    function SpawnItemEvent() {
        unityContext.send("LevelManager", "SpawnGltf", itemName );
        console.log(itemName);
    }
    
    async function doDelete(){
        console.log(itemName);
        unityContext.send("LevelManager", "CustomItemDeletedFromServer", itemName)
        const response = await fetch('/delete.php?filepath=' + context.currentRoomId + '/items/' + itemName);
        console.log(response);         
    }

    return (
        <>
           {rowIsShown &&
                <Row>
                    <Col md="auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                            <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                        </svg>
                    </Col>
                    <Col className="text-truncate" type="button" onClick={SpawnItemEvent} style={{ paddingLeft: "0", display: "block" }} value={itemName}>
                        {itemName}
                    </Col>
                    <Col md="auto" onMouseEnter={() => setDeleteIsShown(true)}  onMouseLeave={() => setDeleteIsShown(false)}>
                        {deleteIsShown && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" type="button" onClick={doDelete} className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        )}
                    </Col>
                </Row>
            }
        </>
    )
}

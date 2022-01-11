import { Button, Form } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { IdbContext } from "../App";

function PretixInviteButton({organizerSlug, eventSlug}) {
    const context = useContext(IdbContext)

    const [roomIsPresent, setRoomIsPresent] = useState(false)
    const [pretixData, setPretixData] = useState(null)
    const [callerType, setCallerType] = useState("");
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
      

    // Retrieve some info on first render
    useEffect(function () {
        window.sessionStorage.getItem('access_token') != null ? getRessources("&endpoint=organizers/" + organizerSlug +"/events/" + eventSlug + "/", "init") : console.log("[PretixInfo] There seems to be no token in session storage.")
                 
      }, [eventSlug]);


    // Retrieve some info on first render
    useEffect(function () {
      //  window.sessionStorage.getItem('access_token') != null ? getRessources('&endpoint=organizers/' + organizerSlug + '/teams/') : console.log("[PretixInfo] There seems to be no token in session storage.")
        checkRoomIsPresent()
    }, [pretixData]);

    function addRoomId(){
        getRessources("&endpoint=organizers/" + organizerSlug +"/events/" + eventSlug + "/&prop=item_meta_properties&key=XRevent&value=" + context.currentRoomId, "add" )
    }

    function removeRoomId(){
        getRessources("&endpoint=organizers/" + organizerSlug +"/events/" + eventSlug + "/&prop=item_meta_properties&key=&value=", "remove" )
    }

    function checkRoomIsPresent(){
        if(JSON.stringify(pretixData).includes("XRevent") && JSON.stringify(pretixData).includes("item_meta_properties")){ // ToDo: implement this on object basis properly.
            setRoomIsPresent(true)
        } else{
            setRoomIsPresent(false)
        }
    }

    // Fetches some infos from pretix as token should be available in session storage
    async function getRessources(endpoint, cType) {
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
                setCallerType(cType)
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
        <>
            {roomIsPresent === true &&
                <Button style={{ background: "#afafaf", boxShadow: "none", border: "none", marginTop: "1rem", width:"100%" }} onClick={removeRoomId}>Delete XRevent Room ID</Button>
            }
            {roomIsPresent === false &&
                <Button style={{ background: "#Af5a91", boxShadow: "none", border: "none", marginTop: "1rem", width:"100%" }} onClick={addRoomId}>Add XRevent Room ID</Button>
            }
        </>
    )
}

export default PretixInviteButton;

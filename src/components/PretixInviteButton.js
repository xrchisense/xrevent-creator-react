import { Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { IdbContext } from "../App";

function PretixInviteButton({organizerSlug, eventSlug}) {
    const [teamIsPresent, setTeamIsPresent] = useState(false)
    const [teamId, setTeamId] = useState("")
    const [pretixTeamData, setPretixTeamData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
      
    // Retrieve some info on first render
    useEffect(function () {
        window.sessionStorage.getItem('access_token') != null ? getRessources('&endpoint=organizers/' + organizerSlug + '/teams/') : console.log("[PretixInfo] There seems to be no token in session storage.")
        
    }, [eventSlug, organizerSlug]);

    useEffect(function(){
        console.log("Entering useEffect pretixTeam")
        setTeamIsPresent(false)
        setTeamId("")
        if(pretixTeamData != null){ 
            for (const teamItem of pretixTeamData.results) {
                if(teamItem.name === "XRevent Support Team" && teamItem.limit_events[0] === eventSlug){
                    setTeamId(teamItem.id.toString()) 
                    setTeamIsPresent(true)  
                }
            }
        }
    }, [pretixTeamData])

    useEffect(function(){
        console.log("Setting TeamId: " + teamId)
    },  [teamId])
    
    function requestTeamDelete(){
        getRessources('&endpoint=organizers/' + organizerSlug + '/teams/' + teamId + '/&action=delete')
        setPretixTeamData(null)
       // const response = await fetch('/delete.php?filepath=' + context.currentRoomId + '/items/' + itemName);
       // console.log(response);         
    }

    async function requestMemberAdd(urlPostParams) {
        // Retrieve the access_token from the session storage
        let access_token = window.sessionStorage.getItem('access_token')

        await fetch('/oauth.php?access_token=' + access_token + urlPostParams
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
                setTeamIsPresent(true)     
            })
            .catch(function (error) {
                console.error("Error fetching data: ", error)
                setError(error)
            })
            .finally(function () {
                setLoading(false)
            });

    }



    async function requestTeamAdd() {
        // Retrieve the access_token from the session storage
        let access_token = window.sessionStorage.getItem('access_token')

        await fetch('/oauth.php?access_token=' + access_token + "&endpoint=organizers/" + organizerSlug + "/teams/&content=name%3DXRevent Support Team%26all_events%3Dfalse%26limit_events%3D" + eventSlug + "%26can_change_event_settings%3Dtrue"
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
                requestMemberAdd("&endpoint=organizers/" + organizerSlug + "/teams/" + pretixJson.id + "/invites/&content=email%3Dmail%40fischerkinder.de")
                setTeamId(pretixJson.id)
            })
            .catch(function (error) {
                console.error("Error fetching data: ", error)
                setError(error)
            })
            .finally(function () {
                setLoading(false)
            });

    }


   

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
                setPretixTeamData(pretixJson)
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
            {teamIsPresent &&
                
                <Button style={{ background: "#afafaf", boxShadow: "none", border: "none", marginTop: "1rem", width:"100%" }} onClick={requestTeamDelete}>Remove XRevent Support Team</Button>
              
            }
            {!teamIsPresent &&
               
                <Button style={{ background: "#Af5a91", boxShadow: "none", border: "none", marginTop: "1rem", width:"100%" }} onClick={requestTeamAdd}>Invite XRevent Support Team</Button>
               
            }
        </>
    )
}

export default PretixInviteButton;

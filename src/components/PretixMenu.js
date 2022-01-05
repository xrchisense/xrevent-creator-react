import React from "react";
import {decode as atob, encode as btoa} from 'base-64'
import {useState, useEffect} from "react"
import PretixConnect from "./PretixConnect";
import PretixAccess from "./PretixAccess";
import PretixInfo from "./PretixInfo";

function PretixMenu(){
    
    
    const [connectIsShown, setConnectIsShown] = useState(true)
    const [accessIsShown, setAccessIsShown] = useState(false)
    const [infoIsShown, setInfoIsShown] = useState(false)


    
    useEffect(function () {
        // Check the session storage for an access_token from pretix first
        window.sessionStorage.getItem('access_token') != null ? menuHandler("info") : console.log('There is no token in session storage.') 

        // Check if there is an access_token in der URL params. If true store it to session storage.
		// new URLSearchParams(window.location.search).get("access_token") != null ? menuHandler("access") : console.log("There is no access_token in url params.");
	
        // If there is a code param in the URL than go on and fetch the access_token 
        new URLSearchParams(window.location.search).get("code") != null ? getToken() : console.log("There is no code in url params.")
        //	new URLSearchParams(window.location.search).get("code") != null ? menuHandler("access") : console.log("There is no code.");
	}, []);



    const menuHandler = (eventKey) => {
        hideAll()
        
        switch(eventKey) {
            case 'connect':
                setConnectIsShown(true)
              break;
            case 'access':
              //  window.sessionStorage.setItem('access_token', new URLSearchParams(window.location.search).get("access_token"))
              //  window.history.replaceState(null, null, window.location.pathname);
              //  setInfoIsShown(true)
                break;
            case 'info':
                setInfoIsShown(true)
                break;
            default:
              break;
          }
    }

    function hideAll(){
        setConnectIsShown(false)
        setAccessIsShown(false)
        setInfoIsShown(false)
    }
 

    // Fetches the access_token when code is present in uri params
    async function getToken(){
        
        let params = new URLSearchParams(window.location.search)
        let currentBaseUrl =  window.location.origin  // Should be "http://xrchitecture.de"

        try{            
            const result = await fetch( currentBaseUrl + '/oauth.php?code=' + params.get("code")
            )
            .then(function(response){
                console.log(response)

                // ToDo: Validate response. Check if the returned text is a token or a html reply. HTML Reply might 
                // come in, if something went wrong with the token request.
                return response.text()  
            })
            .then(function(myToken){
                // store to session storage
                window.sessionStorage.setItem('access_token', myToken)
                window.history.replaceState(null, null, window.location.pathname); //remove param from uri
                menuHandler('info')
            });
            /*
            if(result.status !== 200) {
                console.log("Fetching token failed. Status code: " + result.status)
            } else {    // store to session storage
                window.sessionStorage.setItem('access_token', result.text())
                window.history.replaceState(null, null, window.location.pathname); //remove param from uri
                menuHandler('info')
            }
            console.log(result)
*/
        } catch (error){
            console.log("Fetching token with code failed: " + error)
        }
    }
    

    async function requestToken(props)  {
       
        let params = new URLSearchParams(window.location.search)
        let code = params.get("code")

        try{
            const result = await fetch('https://pretix.eu/api/v1/oauth/token', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;text/javascript',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    //'Authorization': 'Basic ' + btoa('1jMmI9bqw6MsUCzeIw3QhBuSFucnvsKJIe8eW8By:3TciTvJycQxRCtEgzdlp4UZjTyL9fdhzLR5PRojPm8sdbkEVekSeCg5yO4dlo7zjZNeWIU1Lw7HFfdAF9j1Qg4JFIn3B5xWZpnD4oJc27VjFanmJwiryu2BU0EteKWYM')
                },
                body: 'grant_type=authorization_code&client_id=1jMmI9bqw6MsUCzeIw3QhBuSFucnvsKJIe8eW8By&client_secret=3TciTvJycQxRCtEgzdlp4UZjTyL9fdhzLR5PRojPm8sdbkEVekSeCg5yO4dlo7zjZNeWIU1Lw7HFfdAF9j1Qg4JFIn3B5xWZpnD4oJc27VjFanmJwiryu2BU0EteKWYM&redirect_uri=https://xrchitecture.de/xrevent-creator/&code='  + code
                
                /*
                mode: 'cors',
                withCredentials: 'true',
                auth: {
                    username: '1jMmI9bqw6MsUCzeIw3QhBuSFucnvsKJIe8eW8By',
                    password: '3TciTvJycQxRCtEgzdlp4UZjTyL9fdhzLR5PRojPm8sdbkEVekSeCg5yO4dlo7zjZNeWIU1Lw7HFfdAF9j1Qg4JFIn3B5xWZpnD4oJc27VjFanmJwiryu2BU0EteKWYM'
                }*/

                // "WWW-Authenticate: Basic” message in the HTTP header.
            });
           console.log(result.status)
        } catch (error){
            console.log("Fetching failed: " + error)
        }
        
        //await alert('The file has been uploaded successfully.')        
    }


    return (
        <>
            {connectIsShown && <PretixConnect  />}
            {accessIsShown && <PretixAccess />}
            {infoIsShown && 
                <>
                    <PretixInfo />
                </>
            }
        </>
    )
}

export default PretixMenu


import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import {decode as atob, encode as btoa} from 'base-64'
import {useState, useEffect} from "react"

function PretixMenu(){
    const [access_token, setaccess_token] = useState("")
    const [refresh_token, setrefresh_token] = useState("")
    const [pretix_credentials, setpretix_credentials] = useState([])

    /*
    useEffect(function () {
		new URLSearchParams(window.location.search).get("code") != null ? requestToken() : console.log("There is no code.");
		
	}, []);
*/
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
        <div className="text-center">
            <Card border="gray" className="mx-auto"  >
                <Card.Img className="mx-auto" style={{width: "150px", margin: "1rem"}} src="res/logos/pretix_logo.svg" type="submit" onClick={requestToken} altText="pretix logo"></Card.Img>
                <Card.Body className="d-grid">
                    <Form.Control size="sm" type="text" placeholder="E-Mail" />
                    <Form.Control size="sm" style={{ marginTop: "1rem"}} type="password" placeholder="Password" />
                    <Button size="sm" style={{background:"#7f5a91", boxShadow: "none", border: "none", marginTop: "1rem"}} type="submit" onClick={requestToken}>Login</Button>
                    <a  href="https://pretix.eu/control/forgot" className="mx-auto" style={{color: "#563d62", textDecoration: "none", marginTop: "1rem", fontSize: "12px"}}>Forgot your password?</a>
                    <a  href="https://pretix.eu/control/register" className="mx-auto" style={{color: "#563d62",textDecoration: "none", marginTop: "5px", fontSize: "12px"}} >Register</a>
                </Card.Body>  
            </Card>
            <a  href="https://pretix.eu/about/de/" style={{color: "#563d62", textDecoration: "none", fontSize: "10px"}}>Event-Ticketing-Software powered by pretix</a>
            <p> 
                <a  href="https://pretix.eu/api/v1/oauth/authorize?client_id=1jMmI9bqw6MsUCzeIw3QhBuSFucnvsKJIe8eW8By&response_type=code&scope=read+write&redirect_uri=https://xrchitecture.de/xrevent-creator/" style={{color: "#563d62", textDecoration: "none", fontSize: "10px"}}>Request Code</a>
            </p>
            <p>
                <form action="https://pretix.eu/api/v1/oauth/token" method="post">
                    <label>
                        Code:
                        <input type="text" name="code" />                        
                    </label>
                    <label>
                        Grant Type:
                        <input type="text" name="grant_type" value="authorization_code"/>                        
                    </label>
                    <label>
                        Redirect URI:
                        <input type="text" name="redirect_uri" value="https://xrchitecture.de/xrevent-creator/" />                        
                    </label>
                    <label>
                        Client_Id:
                        <input type="text" name="client_id" value="1jMmI9bqw6MsUCzeIw3QhBuSFucnvsKJIe8eW8By" />                    
                    </label>
                    <label>
                        Secret:
                        <input type="text" name="client_secret" value="3TciTvJycQxRCtEgzdlp4UZjTyL9fdhzLR5PRojPm8sdbkEVekSeCg5yO4dlo7zjZNeWIU1Lw7HFfdAF9j1Qg4JFIn3B5xWZpnD4oJc27VjFanmJwiryu2BU0EteKWYM"/>                        
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </p>
        </div>
    )
}

export default PretixMenu


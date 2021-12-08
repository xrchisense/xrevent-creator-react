import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import {decode as atob, encode as btoa} from 'base-64'

function PretixMenu(){

    async function requestToken(props)  {
        console.log(props)
        let code = new URLSearchParams(window.location.search).get("code")

        const result = await fetch('https://pretix.eu/api/v1/oauth/token?grant_type=authorization_code&redirect_uri=https://xrchitecture.de/xrevent-creator/&code=' + code, {
            method: 'POST',
            headers: {
                'Accept': 'application/json;text/javascript',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Basic ' + btoa('1jMmI9bqw6MsUCzeIw3QhBuSFucnvsKJIe8eW8By:3TciTvJycQxRCtEgzdlp4UZjTyL9fdhzLR5PRojPm8sdbkEVekSeCg5yO4dlo7zjZNeWIU1Lw7HFfdAF9j1Qg4JFIn3B5xWZpnD4oJc27VjFanmJwiryu2BU0EteKWYM')
              },
              /*
            mode: 'cors',
            withCredentials: 'true',
            auth: {
                username: '1jMmI9bqw6MsUCzeIw3QhBuSFucnvsKJIe8eW8By',
                password: '3TciTvJycQxRCtEgzdlp4UZjTyL9fdhzLR5PRojPm8sdbkEVekSeCg5yO4dlo7zjZNeWIU1Lw7HFfdAF9j1Qg4JFIn3B5xWZpnD4oJc27VjFanmJwiryu2BU0EteKWYM'
            }*/
        })
        
       
        //ToDo: Some error handling needs to be here
        await console.log(result)
        //await alert('The file has been uploaded successfully.')        
    }


    return (
        <div className="text-center">
            <Card border="gray" className="mx-auto"  >
                <Card.Img className="mx-auto" style={{width: "150px", margin: "1rem"}} src="res/logos/pretix_logo.svg"  altText="pretix logo"></Card.Img>
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
        </div>
    )
}

export default PretixMenu


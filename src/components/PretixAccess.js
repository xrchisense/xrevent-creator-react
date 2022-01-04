import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react"

function PretixAccess(){
    const [access_token, setaccess_token] = useState("")

    // Fetches the user profile from pretix
    async function getRessource(){
        // Retrieve the access_token from the uri params and store it in a react state
        let params = new URLSearchParams(window.location.search)
        setaccess_token( params.get("access_token") )

        try{
            const result = await fetch('/oauth.php?access_token=' + params.get("access_token"));

            console.log(result)

        } catch (error){
            console.log("Fetching failed: " + error)
        }
    }

    return(
        <div className="text-center">


        <Card border="gray" className="mx-auto"  >
            <Card.Img className="mx-auto" style={{width: "150px", margin: "1rem"}} src="res/logos/pretix_logo.svg" altText="pretix logo"></Card.Img>
            <Card.Body className="d-grid">
                <p>You successfully connected pretix with XRevent Creator. Click below to view ressources.</p>
                
                <Button style={{background:"#7f5a91", boxShadow: "none", border: "none", marginTop: "1rem"}} type="submit" onClick={getRessource} >Proceed</Button>
               
            </Card.Body>  
        </Card>
        <a  href="https://pretix.eu/about/de/" style={{color: "#563d62", textDecoration: "none", fontSize: "10px"}}>Event-Ticketing-Software powered by pretix</a>     


    </div>
    );
}

export default PretixAccess;
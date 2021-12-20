import { Card, Form, Button } from "react-bootstrap";

function PretixConnect(){


    return(
        <div className="text-center">


        <Card border="gray" className="mx-auto"  >
            <Card.Img className="mx-auto" style={{width: "150px", margin: "1rem"}} src="res/logos/pretix_logo.svg" altText="pretix logo"></Card.Img>
            <Card.Body className="d-grid">
                <p>XRevents are supported by pretix event ticketing software. To manage your ticketing, please register with pretix and connect.</p>
                <Form action="https://xrchitecture.de/oauth.php">
                    <Button style={{background:"#7f5a91", boxShadow: "none", border: "none", marginTop: "1rem"}} type="submit">Connect Pretix Account</Button>
                </Form>
                <a  href="https://pretix.eu/control/register" className="mx-auto" style={{color: "#563d62",textDecoration: "none", marginTop: "5px", fontSize: "12px"}} >Register</a>
            </Card.Body>  
        </Card>
        <a  href="https://pretix.eu/about/de/" style={{color: "#563d62", textDecoration: "none", fontSize: "10px"}}>Event-Ticketing-Software powered by pretix</a>
        <p> 
            <a  href="https://pretix.eu/api/v1/oauth/authorize?client_id=1jMmI9bqw6MsUCzeIw3QhBuSFucnvsKJIe8eW8By&response_type=code&scope=read+write&redirect_uri=https://xrchitecture.de/xrevent-creator/" style={{color: "#563d62", textDecoration: "none", fontSize: "10px"}}>Request Code</a>
        </p>
     


    </div>
    );
}

export default PretixConnect;
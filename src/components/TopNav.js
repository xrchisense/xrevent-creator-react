
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";

const TopNav = () => {
	return (
		<>
			<Navbar className="expand-gl bg-light border" >
				<Container fluid>
					<Navbar.Brand href="#home">
						<img src="/res/icons/logo.png"></img> {' '}
						XRevent Creator
					</Navbar.Brand>
					<Nav className="justify-content-center "  >
						<Form>
							<Form.Control className="form-control form-control-sm" style={{width: 400}}/>
						</Form>
					</Nav>
					<Nav>
						<button className="btn btn-outline-secondary btn-sm">Save</button>
					</Nav>
				</Container>
			</Navbar>
		</>
	)
}

export default TopNav
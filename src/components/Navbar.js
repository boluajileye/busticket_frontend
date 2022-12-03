import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const NavBar = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }
    
    return (
        <Navbar collapseOnSelect expand="lg" className='card-color'>
            <Container>
                <Navbar.Brand><Link to="/" className="no-underline text-white">DANFO</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto text-white">
                        <Nav.Link as={Link} to="/bus"><span className="no-underline text-white">Bus List</span></Nav.Link>
                        <Nav.Link as={Link} to="/schedule"><span className="no-underline text-white">Schedule List</span></Nav.Link>
                        <Nav.Link as={Link} to="/scan_ticket"><span className="no-underline text-white">Scan Ticket</span></Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item to="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item to="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item to="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item to="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <Button variant="secondary" onClick={logout}>
                                Log Out
                            </Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
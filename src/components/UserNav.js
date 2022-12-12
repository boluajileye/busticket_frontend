import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const UserNav = () => {
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

export default UserNav
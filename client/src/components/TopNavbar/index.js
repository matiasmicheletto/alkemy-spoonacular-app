import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import classes from './style.module.css';

const TopNavbar = props => {
    return (
        <Navbar bg="dark" variant="dark" fixed="top" className={classes.Navbar}>      
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />   
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link title="Logout" onClick={props.onLogout}>
                        <p>Logout</p>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>      
        </Navbar>  
    );
};

export default TopNavbar;
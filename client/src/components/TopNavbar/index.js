import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { FaInfo, FaPowerOff, FaQuestion } from 'react-icons/fa';
import { logout, useAuthDispatch } from '../../context';
import classes from './style.module.css';

const TopNavbar = props => {
    const [showInfo, setShowInfo] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const handleLogout = async e => {
		e.preventDefault();
		try {
			logout(dispatch).then(()=>navigate('/login'));
		} catch (error) {
			console.log(error);
		}
	};

    return (
        <Navbar bg="dark" variant="dark" fixed="top" className={classes.Navbar}>      
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />   
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link title="About" onClick={()=>setShowInfo(true)}>
                        <FaInfo />
                    </Nav.Link>
                    <Nav.Link title="Help" onClick={()=>setShowHelp(true)}>
                        <FaQuestion />
                    </Nav.Link>
                    <Nav.Link title="Logout" onClick={handleLogout}>
                        <FaPowerOff />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>      
            
            <Modal centered show={showInfo} onHide={()=>setShowInfo(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>About this software</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowInfo(false)}>
                        Ok
                    </Button>                    
                </Modal.Footer>
            </Modal>

            <Modal centered show={showHelp} onHide={()=>setShowHelp(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Help</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowHelp(false)}>
                        Ok
                    </Button>                    
                </Modal.Footer>
            </Modal>

        </Navbar>  
    );
};

export default TopNavbar;
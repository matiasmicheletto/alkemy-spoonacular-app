import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FaInfo, FaPowerOff, FaQuestion } from 'react-icons/fa';
import { InfoModal, HelpModal } from '../../modals';
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
                <Nav className={classes.Nav}>
                    <Nav.Link title="About" onClick={()=>setShowInfo(true)}>
                        <FaInfo size={25}/>
                    </Nav.Link>
                    <Nav.Link title="Help" onClick={()=>setShowHelp(true)}>
                        <FaQuestion size={25}/>
                    </Nav.Link>
                    <Nav.Link title="Logout" onClick={handleLogout}>
                        <FaPowerOff size={25}/>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>      
            <InfoModal show={showInfo} onHide={()=>setShowInfo(false)}/>
            <HelpModal show={showHelp} onHide={()=>setShowHelp(false)}/>
        </Navbar>  
    );
};

export default TopNavbar;
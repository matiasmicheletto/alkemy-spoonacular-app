import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, useAuthDispatch } from '../context';

const Home = props => {

    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const handleLogout = async e => {
		e.preventDefault();
		try {
			logout(dispatch).then(()=>navigate('/home'));
		} catch (error) {
			console.log(error);
		}
	};

    return (
        <div>
            <h1>This is the home page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;

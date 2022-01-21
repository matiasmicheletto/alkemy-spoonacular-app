import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ItemCard from '../components/ItemCard';
import { logout, useAuthDispatch } from '../context';
import api_response from './api_response.json';
//import axios from 'axios';

const Home = props => {

    const dispatch = useAuthDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const handleLogout = async e => {
		e.preventDefault();
		try {
			logout(dispatch).then(()=>navigate('/login'));
		} catch (error) {
			console.log(error);
		}
	};

    useEffect(() => {
        /* 
        axios({ url:`${process.env.REACT_APP_API_URL}?apiKey=${process.env.REACT_APP_API_KEY}`}).then(res => {
            if(process.env.NODE_ENV === "development")
                console.log(data);
            setData(res?.data);
        });
        */
       setTimeout(() => {
           setData(api_response);
        }, 1000);
    }, []);

    return (
        <Container>
            <h1>This is the home page</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {data && data?.results?.map(item => <ItemCard item={item}/>)}
            </div>
        </Container>
    );
};

export default Home;

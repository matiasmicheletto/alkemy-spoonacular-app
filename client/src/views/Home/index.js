import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemCard from '../../components/ItemCard';
import Preloader from '../../components/Preloader';
import SearchModal from '../../components/SearchModal';
import FloatingButton from '../../components/FloatingButton';
import { logout, useAuthDispatch, LoadingContext, MiddlewareContext } from '../../context';
import TopNavbar from '../../components/TopNavbar';
import classes from './style.module.css';

const Home = props => {

    const dispatch = useAuthDispatch();
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const { loading, setLoading } = useContext(LoadingContext);
    const middleware  = useContext(MiddlewareContext);
    const [menu, setMenu] = useState(middleware.getMenu());

    const handleLogout = async e => {
		e.preventDefault();
		try {
			logout(dispatch).then(()=>navigate('/login'));
		} catch (error) {
			console.log(error);
		}
	};


    return (
        <Container className={classes.Container}>
            {loading && <Preloader />}
            <TopNavbar onLogout={handleLogout}/>
            <FloatingButton onClick={()=>setShowSearch(true)} />
            
            <div className={classes.GridContainer}>
                {menu.length > 0 ?
                    menu.map(item => <ItemCard key={item.id} item={item}/>)
                    :
                    <center style={{margin:"50px 0px 50px 0px"}}>
                        <h2 style={{color:"rgb(100,100,100)"}}><i>No recipes added to menu yet</i></h2>
                    </center>
                }
            </div>

            <SearchModal show={showSearch} setShow={setShowSearch}/>
        </Container>
    );
};

export default Home;

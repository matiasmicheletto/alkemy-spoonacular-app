import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemCard from '../../components/ItemCard';
import Preloader from '../../components/Preloader';
import SearchModal from '../../components/SearchModal';
import { LoadingContext, MiddlewareContext } from '../../context';
import TopNavbar from '../../components/TopNavbar';
import classes from './style.module.css';

const Home = props => {

    const [showSearch, setShowSearch] = useState(false);
    const { loading, setLoading } = useContext(LoadingContext);
    const middleware  = useContext(MiddlewareContext);
    const [ menu, setMenu ] = useState(middleware.getMenu());    

    return (
        <Container className={classes.Container}>
            {loading && <Preloader />}
            <TopNavbar />            
            <Row className={classes.TableContainer}>
                <Card className={classes.TableCard}>
                    <Card.Body>
                        <Card.Title>
                            <h3>Current menu</h3>
                        </Card.Title>
                        <Table hover className={classes.Table}>
                            <tbody>
                                <tr>
                                    <td><b>Total price</b></td>
                                    <td>{menu.totalPrice}</td>
                                </tr>
                                <tr>
                                    <td><b>Average health score</b></td>
                                    <td>{menu.averageHealthScore}</td>
                                </tr>
                                <tr>
                                    <td><b>Vegan dishes</b></td>
                                    <td>{menu.veganDishesCnt}</td>
                                </tr>
                            </tbody>
                        </Table>                        
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                {menu.length > 0 && menu.map(item => 
                    <Col xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <ItemCard item={item}/>
                    </Col>
                )}
            </Row>
            <SearchModal show={showSearch} setShow={setShowSearch}/>
        </Container>
    );
};

export default Home;

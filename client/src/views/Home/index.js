import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import ItemCard from '../../components/ItemCard';
import { MiddlewareContext } from '../../context';
import TopNavbar from '../../components/TopNavbar';
import classes from './style.module.css';
import swal from 'sweetalert';

const Home = () => {
    
    const navigate = useNavigate();

    // Menu manager
    const middleware  = useContext(MiddlewareContext);        
    const [menu, setMenu] = useState(middleware.getMenu());

    const handleItemView = id => {
        navigate(`/details/${id}`);
    };

    const handleClearRecipe = index => {
        swal("Are you sure you want to clear this recipe?", {
            buttons: [false, true],
        }).then(value => {
            if(value){
                const res = middleware.clearRecipe(index);
                if(res.status === "success")
                    setMenu([...middleware.getMenu()]);
                else 
                    swal("Error", res.message, "error");
            }
        });
    };

    return (
        <Container className={classes.Container}>            
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
                                    <td style={{textAlign:"right"}}>$ {middleware.getTotalPrice(2)}</td>
                                </tr>
                                <tr>
                                    <td><b>Average health score</b></td>
                                    <td style={{textAlign:"right"}}>{middleware.getAvgHealthScore(2)}</td>
                                </tr>
                                <tr>
                                    <td><b>Vegan dishes</b></td>
                                    <td style={{textAlign:"right"}}>{middleware.getVeganDishesCnt()}</td>
                                </tr>
                            </tbody>
                        </Table>                        
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                {menu.length > 0 && menu.map((item, index) => 
                    <Col xs={12} sm={6} md={4} lg={3} key={index}>
                        <ItemCard 
                            item={item} 
                            onSearch={()=>navigate(`/search/${index}`)}
                            onView={()=>handleItemView(item.id)}
                            onClear={()=>handleClearRecipe(index)}/>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Home;

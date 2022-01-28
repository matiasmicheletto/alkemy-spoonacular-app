import { Button, Card, Row, Col, Table } from 'react-bootstrap';
import { FaCartPlus, FaDollarSign, FaEye, FaHeart, FaRedo, FaSearch, FaTrashAlt } from 'react-icons/fa';
import dishImage from '../../img/dish.png';
import classes from './style.module.css';

const ItemCard = props => {

    const {title, image, pricePerServing, healthScore, vegan} = props.item? props.item : {};

    return (
        <Card className={classes.Card}>
            <Card.Header className={classes.CardHeader}>
                <p className={classes.CardTitle} style={{color: title ? vegan ? 'green':'darkred' : 'black' }}>
                    {title || 'Empty dish'}
                </p>
            </Card.Header>
            <Card.Img variant="top" src={image || dishImage} className={title ? "" : classes.EmptyCardImg}/>
            <Card.Body className={classes.CardBody}>            
                {pricePerServing && healthScore && <Table hover className={classes.ItemData}>
                    <tbody>
                        <tr title="Price">
                            <td><FaDollarSign/></td>
                            <td style={{textAlign:"right"}}>${pricePerServing}</td>
                        </tr>
                        <tr title="Health score">
                            <td><FaHeart/></td>
                            <td style={{textAlign:"right"}}>{healthScore}</td>
                        </tr>
                    </tbody>
                </Table>}
            </Card.Body>
            <Card.Footer className={classes.CardFooter}>
                <Row>
                    {props.onView && <Col>
                        <Button  
                            title="View details"                        
                            className={classes.ActionButton} 
                            variant="primary" 
                            disabled={!title}
                            onClick={props.onView}>
                            <FaEye size={25} />
                        </Button>
                    </Col>}
                    {props.onSearch && <Col>
                        <Button 
                            title={title ? "Search recipe" : "Replace recipe"}
                            className={classes.ActionButton} 
                            variant="success"
                            onClick={props.onSearch}>
                            {title ? 
                                <FaRedo size={25} />
                            :
                                <FaSearch size={25} />
                            }
                        </Button>
                    </Col>}
                    {props.onClear && <Col>
                        <Button 
                            title="Delete recipe"
                            className={classes.ActionButton} 
                            variant="danger"
                            disabled={!title}
                            onClick={props.onClear}>
                            <FaTrashAlt size={25} />    
                        </Button>
                    </Col>}
                    {props.onAdd && <Col>
                        <Button 
                            title="Add this recipe to the menu"
                            className={classes.ActionButton} 
                            variant="success"                        
                            onClick={props.onAdd}>
                            <FaCartPlus size={25} />    
                        </Button>
                    </Col>}
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default ItemCard;
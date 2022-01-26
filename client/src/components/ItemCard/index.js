import { Button, Card, Row, Col, Table } from 'react-bootstrap';
import { FaEye, FaPlus, FaRedo, FaTrashAlt } from 'react-icons/fa';
import classes from './style.module.css';

const ItemCard = props => (
    <Card className={classes.Card}>
        <Card.Img variant="top" src={props.item.image} className={classes.CardImg}/>
        <Card.Body className={classes.CardBody}>
            <Card.Title>{props.item.title}</Card.Title>            
            <Table hover className={classes.ItemData}>
                <tbody>
                    <tr>
                        <td><b>Price:</b></td>
                        <td>{props.item.price}</td>
                    </tr>
                    <tr>
                        <td><b>Health Score:</b></td>
                        <td>{props.item.healthScore}</td>
                    </tr>
                </tbody>
            </Table>
        </Card.Body>
        <Card.Footer className={classes.CardFooter}>
            <Row>
                <Col xs={4}>
                    <Button  
                        title="View details"
                        className={classes.ActionButton} 
                        variant="primary" 
                        disabled={!props.item.defined}>
                        <FaEye size={25} />
                    </Button>
                </Col>
                <Col xs={4}>
                    <Button 
                        title={props.item.defined ? "Search recipe" : "Replace recipe"}
                        className={classes.ActionButton} 
                        variant="success">
                        {props.item.defined ? 
                            <FaRedo size={25} />
                        :
                            <FaPlus size={25} />
                        }
                    </Button>
                </Col>
                <Col xs={4}>
                    <Button 
                        title="Delete recipe"
                        className={classes.ActionButton} 
                        variant="danger"
                        disabled={!props.item.defined}>
                        <FaTrashAlt size={25} />    
                    </Button>
                </Col>
            </Row>
        </Card.Footer>
    </Card>
);

export default ItemCard;
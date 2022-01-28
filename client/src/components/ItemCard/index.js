import { Card, Badge } from 'react-bootstrap';
import { FaCartPlus, FaDollarSign, FaHeart, FaSearch, FaTrashAlt, FaLeaf, FaEdit } from 'react-icons/fa';
import dishImage from '../../img/dish.png';
import classes from './style.module.css';

const ItemCard = props => {

    const {title, image, pricePerServing, healthScore, vegan} = props.item? props.item : {};

    const handleItemView = () => {
        if(title) 
            props.onView();
        else 
            props.onSearch();
    };

    return (
        <Card className={classes.Card}>
            <Card.Header className={classes.CardHeader} >
                <div title={title}
                    className={classes.CardTitle} 
                    style={{color: title ? vegan ? 'green':'darkred' : 'black' }}
                    onClick={handleItemView}>
                    {title || 'Empty dish'}
                </div>
            </Card.Header>
            <Card.Img 
                variant="top" 
                src={image || dishImage} 
                className={title ? classes.CardImg : classes.EmptyCardImg}
                onClick={handleItemView} />    
            <Card.Body className={classes.CardBody}>            
                {pricePerServing && healthScore && 
                    <div className={classes.BadgesContainer}>
                        <Badge title="Price per serving" pill bg="primary">
                            <FaDollarSign />{pricePerServing}
                        </Badge>
                        <Badge title="Health score" pill bg="danger">
                            <FaHeart /> {healthScore}
                        </Badge>
                        {vegan && <Badge title="Vegan recipe" pill bg="success"><FaLeaf /></Badge>}
                    </div>
                }
                <div className={classes.ActionButtonContainer}>
                    {title && props.onClear && 
                        <Badge
                            className={classes.ClearBadge}
                            title="Clear recipe"                            
                            onClick={props.onClear}>
                            <FaTrashAlt /> Clear
                        </Badge>
                    }
                    {props.onSearch && 
                        <Badge 
                            className={classes.ActionBadge}
                            title={title ? "Edit recipe" : "Add recipe"}                                
                            onClick={props.onSearch}>
                            {title ? 
                                <><FaEdit /> Edit</>
                            :
                                <><FaSearch /> Browse</>
                            }
                        </Badge>}
                    {props.onAdd && 
                        <Badge 
                            className={classes.ActionBadge}
                            title="Add this recipe to the menu"                                                            
                            onClick={props.onAdd}>
                            <FaCartPlus /> Add to menu    
                        </Badge>}
                </div>
            </Card.Body>

        </Card>
    );
};

export default ItemCard;
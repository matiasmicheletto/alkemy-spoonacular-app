import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Card, Badge } from 'react-bootstrap';
import { FaCartPlus, FaDollarSign, FaHeart, FaLeaf } from 'react-icons/fa';
import swal from 'sweetalert';
import { MiddlewareContext } from '../../context';
import TopNavbar from '../../components/TopNavbar';
import classes from './style.module.css';

const Details = () => {
    
    const { recipeId } = useParams();
    const middleware  = useContext(MiddlewareContext);
    const recipe = middleware.getRecipe(recipeId);
    const navigate = useNavigate();

    const handleAddToMenu = () => {
        const res = middleware.setMenuRecipe(recipe, middleware.getSelected());
        if(res.status === "success")
            navigate("/home/");
        else
            swal("Error", res.message, "error");
    };

    return (
        <Container className={classes.Container}>            
            <TopNavbar />            
            {recipe && 
            <Card className={classes.Card}>
                <Card.Body>
                    <img className={classes.Image} src={recipe.image} />                    
                    <h3 className={classes.Title}>{recipe.title}</h3>
                    <div className={classes.Stats}>
                        <div className={classes.BadgesContainer}>
                            <Badge pill bg="primary"><FaDollarSign />{recipe.pricePerServing}</Badge>
                            <Badge pill bg="danger"><FaHeart /> {recipe.healthScore}</Badge>
                            {recipe.vegan && <Badge pill bg="success"><FaLeaf /></Badge>}
                        </div>
                        {recipe.source !== "currentMenu" && <div className={classes.ActionBadgeContainer}>
                            <Badge pill bg="secondary" onClick={handleAddToMenu}>
                                <FaCartPlus /> Add to menu
                            </Badge>
                        </div>}
                    </div>
                    <div className={classes.Description} dangerouslySetInnerHTML={{ __html: recipe.summary }} />                    
                </Card.Body>
            </Card>}
        </Container>
    );
};

export default Details;

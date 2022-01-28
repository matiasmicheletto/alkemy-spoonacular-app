import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Card } from 'react-bootstrap';
import { MiddlewareContext } from '../../context';
import TopNavbar from '../../components/TopNavbar';
import classes from './style.module.css';

const Details = () => {
    
    const { recipeId } = useParams();
    const middleware  = useContext(MiddlewareContext);
    const recipe = middleware.getRecipe(recipeId);

    console.log(recipe);

    return (
        <Container className={classes.Container}>            
            <TopNavbar />            
            {recipe && <Card>
                <Card.Header>
                    <Card.Title>{recipe.title}</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src={recipe.image} />
                <Card.Body>
                </Card.Body>
            </Card>}
        </Container>
    );
};

export default Details;

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

    return (
        <Container className={classes.Container}>            
            <TopNavbar />            
            <Row className={classes.CardContainer}>
                <Card>{JSON.stringify(recipe)}</Card>
            </Row>
        </Container>
    );
};

export default Details;

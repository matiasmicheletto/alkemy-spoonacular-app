import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import classes from './style.module.css';

// Specific to add recipes, but easily extensible
const FloatingButton = props => {
    return (
        <div className={classes.BtnContainer}>
            <Button 
                title="Add a new recipe" 
                variant="success"
                className={classes.BtnRnd} 
                {...props}
            >
                <FaPlus />
            </Button>             
        </div>
    );
};

export default FloatingButton;
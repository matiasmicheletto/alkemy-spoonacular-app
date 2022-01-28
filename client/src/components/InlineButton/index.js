import { Button } from 'react-bootstrap';
import { FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa';
import classes from './style.module.css';

const types = {
    view: {
        color: 'primary',
        icon: <FaEye size={12}/>
    },
    search: {
        color: 'success',
        icon: <FaPlus size={12}/>
    },
    clear: {
        color: 'danger',
        icon: <FaTrashAlt size={12}/>
    }
};

const InlineButton = props => (
    <Button className={classes.Button} variant={types[props.type].color}>
        {types[props.type].icon}
    </Button>
);

export default InlineButton;
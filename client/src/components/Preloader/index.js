import React from 'react';
import { Spinner } from 'react-bootstrap';
import classes from './style.module.css';

// Full screen preloader
const Preloader = () => (
    <div className={classes.Container}>
        <div className={classes.SpinnerContainer}>
            <Spinner className={classes.Spinner} animation="grow" variant="light" />
            <Spinner className={classes.Spinner} animation="grow" variant="light" />
            <Spinner className={classes.Spinner} animation="grow" variant="light" />
        </div>
    </div>
);

export default Preloader;
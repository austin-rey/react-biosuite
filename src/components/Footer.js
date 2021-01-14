import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import { Container, Grid, Button, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: '50px',
        backgroundColor: theme.palette.green.main,
        color: "white",
        textAlign: "center"
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

        </div>
    )
}

export default Footer

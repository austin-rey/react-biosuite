import React from 'react'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.green.dark,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        color: "#fff"
    }
}));
const Loading = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1 className={classes.heading}>Loading...</h1>
        </div>
    )
}

export default Loading

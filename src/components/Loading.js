import React from 'react'
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.green.light,
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '99999'
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

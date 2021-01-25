import React from 'react'

import { Paper,Grid,Typography } from '@material-ui/core';

import RoomIcon from '@material-ui/icons/Room';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '10px'
    },
    paper: {
        padding: '10px',
        background: 'rgb(0,180,216)',
        background: 'linear-gradient(90deg, rgba(0,180,216,1) 0%, rgba(82,183,136,1) 15%, rgba(252,191,73,1) 50%, rgba(242,149,89,1) 80%, rgba(0,212,255,1) 100%)'
    },
    markerContainer: {
        position: 'relative',
        height: '70px'
    },
    marker: {
        position: 'absolute',
        left: '20%',
        textAlign: 'center'
    }
}));

const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

const OccurrenceEvent = ({day,month,year}) => {
    const classes = useStyles();

    let totalDays = day
    let curMonth = 1;

    while(curMonth < month) {
        totalDays = totalDays + daysInMonth(curMonth, year)
        curMonth++;
    }
    console.log(totalDays)

    let leftProperty = (totalDays/365)*100;
    console.log(leftProperty)
    return (
        <Paper elevation={0}>
            <div className={classes.root}>
                <div className={classes.markerContainer}>
                    <div className={classes.marker} style={{left: `${leftProperty}%`}}>
                        <Typography variant="h6">{month}/{day}</Typography>
                        <RoomIcon/>
                    </div>
                </div>
                <Paper elevation={0} className={classes.paper}>
                    <Grid container direction="row" justify="space-between">
                        <Grid item><Typography variant="h3">January</Typography></Grid>
                        <Grid item><Typography variant="h3">December</Typography></Grid>
                    </Grid>
                </Paper>
            </div>
        </Paper>
    )
}

export default OccurrenceEvent

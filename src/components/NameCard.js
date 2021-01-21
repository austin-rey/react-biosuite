import React from 'react'

import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles';

import { Grid,Paper,Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    nameContainer: {
        textAlign: 'center',
        height: '100%'
    },
}));

const NameCard = ({leftCol,rightCol,leftLabel,rightLabel}) => {
    const classes = useStyles();
    return (
        <Paper elevation={0}>
            <Grid container direction="row" alignItems="flex-start" justify="space-around" spacing={2}>
                <Grid item className={classes.nameContainer}>
                    <Typography variant="h6">{leftLabel}</Typography>
                    {leftCol?.map((item,i) => (
                        <Typography variant="body1" key={i}>{item}</Typography>
                    ))}
                </Grid>
                <Grid item className={classes.nameContainer}>
                    <Typography variant="h6">{rightLabel}</Typography>
                    {rightCol?.map((item,i) => (
                        <Typography variant="body1" key={i}>{item}</Typography>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    )
}

NameCard.propTypes = {
    leftCol: PropTypes.array,
    rightCol: PropTypes.array,
    leftLabel: PropTypes.string,
    rightLabel: PropTypes.string
}

export default NameCard

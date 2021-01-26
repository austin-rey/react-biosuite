import React from 'react'

import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles';

import { Grid,Paper,Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    nameContainer: {
        textAlign: 'center',
        width: '50%',
        padding: '0px !important'
    },
    root: {
        marginTop: '10px'
    },
    colHeader1: {
        borderBottom: theme.border.light,
        backgroundColor: theme.palette.brown.main,
        borderTopLeftRadius: '5px',
        padding: '10px'
    },
    colHeader2: {
        borderBottom: theme.border.light,
        backgroundColor: theme.palette.brown.main,
        borderTopRightRadius: '5px',
        padding: '10px'

    },
    row: {
        borderBottom: theme.border.light,
        padding: '5px'
    }
}));

const NameCard = ({leftCol,rightCol,leftLabel,rightLabel}) => {
    const classes = useStyles();
    return (
        <Paper elevation={0} className={classes.root}>
            <Grid container direction="row" alignItems="flex-start" justify="space-around">
                <Grid item className={classes.nameContainer}>
                    <Grid container direction="column">
                        <Grid item className={classes.colHeader1}>
                            <Typography variant="h4">{leftLabel}</Typography>
                        </Grid>  
                        <Grid item className={classes.colBody}>
                            {(!leftCol)? leftCol.map((item,i) => (<Typography variant="body1" className={classes.row} key={i}>{item}</Typography>
                            )):<Typography variant="body1" className={classes.row}>No record found</Typography>}
                        </Grid>  
                    </Grid>
                </Grid>
                <Grid item className={classes.nameContainer}>
                    <Grid container direction="column">
                        <Grid item className={classes.colHeader2}>
                            <Typography variant="h4">{rightLabel}</Typography>
                        </Grid>  
                        <Grid item className={classes.colBody}>
                            {(!rightCol)? rightCol.map((item,i) => (<Typography variant="body1" className={classes.row} key={i}>{item}</Typography>
                            )):<Typography variant="body1" className={classes.row}>No record found</Typography>}
                        </Grid>  
                    </Grid>
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

import React from 'react'

import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles';

import { Grid,Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    headerBG: {
        backgroundColor: theme.palette.brown.light,
    },
    headerContainer: {
        padding: '20px 40px',
        maxWidth: '1600px'
    }
}));

const PageHeader = ({heading,HeadingBody}) => {
    const classes = useStyles();
    return (
        <Grid item className={classes.headerBG}>
            <Grid container direction="column" justify="space-between" alignItems="stretch" className={classes.headerContainer}>
                <Grid item>
                    <Typography variant="h1">{heading}</Typography>
                </Grid>
                <Grid item>
                    {/* <Grid container direction="row" spacing={2} justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h6">English Common Name: <b>{vernacularName}</b></Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">{totalOccurrences} occurrences found</Typography>
                        </Grid>
                    </Grid> */}
                    <HeadingBody/>
                </Grid>
            </Grid>
        </Grid>
    )
}

PageHeader.propTypes = {
    heading: PropTypes.string,
    HeadingBody: PropTypes.element,
}

export default PageHeader

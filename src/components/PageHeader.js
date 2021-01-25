import React from 'react'

import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles';

import { Grid,Typography,Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        padding: '20px 40px',
        maxWidth: '1600px'
    }
}));

const PageHeader = ({heading,HeadingBody}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="space-between" alignItems="stretch" className={classes.headerContainer}>
            <Grid item>
                <Typography variant="h1">{heading}</Typography>
            </Grid>
            <Grid item>
                {HeadingBody && <HeadingBody/>}
            </Grid>
        </Grid>
    )
}

PageHeader.propTypes = {
    heading: PropTypes.string,
    HeadingBody: PropTypes.element,
}

export default PageHeader

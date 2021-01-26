import React from 'react'

import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '12px'
    },
}));

const SectionHeader = ({heading, subtext}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h3">{heading}</Typography>
            <Typography variant="body2"><i>{subtext}</i></Typography>
        </div>
    )
}

SectionHeader.propTypes = {
    heading: PropTypes.string,
    subtext: PropTypes.string,
}

export default SectionHeader

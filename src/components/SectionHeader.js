import React from 'react'

import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core';

const SectionHeader = ({heading, subtext}) => {
    return (
        <>
            <Typography variant="h3">{heading}</Typography>
            <Typography variant="body2"><i>{subtext}</i></Typography>
        </>
    )
}

SectionHeader.propTypes = {
    heading: PropTypes.string,
    subtext: PropTypes.string,
}

export default SectionHeader

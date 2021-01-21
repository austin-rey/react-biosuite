import React from 'react'

import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   
}));

const ClassificationCard = ({title,subtext,list}) => {
    return (
        <>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body2"><i>{subtext}</i></Typography>
            <ul>
                {list?.map((parent,i) => (
                    <li key={i}><Typography variant="body1">{parent.canonicalName}</Typography></li>
                ))}
            </ul>
        </>
    )
}

ClassificationCard.propTypes = {
    title: PropTypes.string,
    subtext: PropTypes.string,
    list: PropTypes.array,
}

export default ClassificationCard

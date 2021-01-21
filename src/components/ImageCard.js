import React from 'react'

import {Link} from "react-router-dom";

import Moment from 'react-moment';

import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles';

import { Button,Card,CardMedia,CardContent,CardActions,Typography } from '@material-ui/core';

// Component css styles
const useStyles = makeStyles((theme) => ({
    viewMoreButton: {
        backgroundColor: theme.palette.green.dark,
        width: '100%'
    },
    card: {
        width: 280,
        boxShadow: 'none',
        textAlign: 'center',
        border: '1px solid #efefef',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    media: {
        height: 200,
    },
    link: {
        color: "#fff",
        textDecoration: 'none'
    }
}));


const ImageCard = ({image,title,created,link}) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={image}
                title={title}
            />
            <CardContent>
                <Typography variant="h4">{title}</Typography>
                <Typography variant="body2">
                    Published: {" "} <Moment format="MMM DD, YYYY">{created}</Moment>
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" className={classes.viewMoreButton} disableElevation>
                    <Link className={classes.link} to={link}>view occurrence</Link>
                </Button>
            </CardActions>
        </Card>
    )
}

ImageCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    created: PropTypes.string,
    link: PropTypes.string,

}

export default ImageCard


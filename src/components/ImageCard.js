import React, {useState} from 'react'

import {Link} from "react-router-dom";

import Moment from 'react-moment';

import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles';

import { Button,Card,CardMedia,CardContent,CardActions,Typography } from '@material-ui/core';

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
    },
    cardContent: {
        padding: '0px',
        paddingBottom: '0px !important'
    },
    placeHolder: {
        position: 'absolute',
        backgroundColor: theme.palette.yellow.main,
        color: '#fff',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '2px'
    }
}));


const ImageCard = ({image,title,created,link,place}) => {

    const [open, setOpen] = useState(false)
    const handleOpen = () => {setOpen(true);}
    const handleClose = () => {setOpen(false);}

    const classes = useStyles();
    return (
        <>
            <Card className={classes.card}>
                <a href={image} target="_blank">
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title={title}
                        onClick={handleOpen}
                    />
                </a>
                <CardContent className={classes.cardContent}>
                    {title && <Typography variant="h4">{title}</Typography>}
                    {created && <Typography variant="body2">Published: {" "} <Moment format="MMM DD, YYYY">{created}</Moment></Typography>}
                </CardContent>
                {link && 
                    <CardActions>
                        <Button variant="contained" className={classes.viewMoreButton} disableElevation>
                            <Link className={classes.link} to={link}>view occurrence</Link>
                        </Button>
                    </CardActions>
                }         
                {place && <div className={classes.placeHolder}><Typography variant="body1"><b>{place}</b></Typography></div>}
            </Card>
        </>
    )
}

ImageCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    created: PropTypes.string,
    link: PropTypes.string,

}

export default ImageCard


import React from 'react'

import PropTypes from 'prop-types'

import {BrowserRouter as Router,Link} from "react-router-dom";

import { Grid,Button,Paper,Typography,Chip  } from '@material-ui/core';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import {makeStyles} from '@material-ui/core/styles';

import MapboxGLMap from '../components/MapboxGLMap'

const useStyles = makeStyles((theme) => ({
    viewSpeciesButton: {
        backgroundColor: theme.palette.green.light,
        color: '#fff',
        height: '100%'
    },
    card: {
        marginBottom: '10px',
        padding: '10px',
        border: theme.border.light
    },
    link: {
        color: "#fff",
        textDecoration: 'none',
        height: '100%'
    },
    cardListText: {
        borderLeft: '2px solid #D2D2C6',
        margin: '0px 0px 10px 10px',
        color: "#4F5837"
    },
    height100: {
        height: '100%'
    },
    chip: {
        borderRadius: '5px',
        color: '#fff'
    },
    white: {
        color: "#fff"
    }
}));

const ResultCard = ({result,key,loading}) => {
    const classes = useStyles();

    let commonName = "";

    for(const vName of result.vernacularNames) {
        if(vName.language === "eng") {
            commonName = `"${vName.vernacularName}"`;
            break;
        }
    }

    console.log(commonName)
    return (
        <Paper key={key} elevation={0} className={classes.card}>
            <Grid container direction="row" justify="space-between" alignItems="stretch">
                <Grid item>
                    <Grid container spacing={4}>
                        <Grid item>
                            <MapboxGLMap taxonKey={result.key} width={512} height={168}/>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" justify="space-evenly" alignItems="flex-start" className={classes.height100}>
                                <Grid item>
                                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Typography variant="h3">{result.scientificName}</Typography>
                                            <Typography variant="body1"><i>{commonName}</i></Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" wrap="wrap" spacing={2}>
                                        {result.rank && <Grid item>
                                            <Chip className={classes.chip} color="secondary" label={<Typography variant="h6" className={classes.white}>{result.rank.toUpperCase()}</Typography>} />
                                        </Grid>}
                                        {result.taxonomicStatus && <Grid item>
                                            <Chip className={classes.chip} color="secondary" label={<Typography variant="h6" className={classes.white}>{result.taxonomicStatus.toUpperCase()}</Typography>}/>
                                        </Grid>} 
                                        {result.kingdom && <Grid item>
                                            <Chip className={classes.chip} color="secondary" label={<Typography variant="h6" className={classes.white}>{result.kingdom.toUpperCase()}</Typography>}/>
                                        </Grid>}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Link className={classes.link} to={`/species/${result.key}`}>
                        <Button disabled={loading} variant="contained" className={classes.viewSpeciesButton} disableElevation>
                            <ArrowForwardIosIcon/>
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Paper>
    )
}

ResultCard.propTypes = {
    result: PropTypes.object,
    key: PropTypes.number,
    loading: PropTypes.bool
}

export default ResultCard


// Scientific name
// English Common Name
// Tags - Status - Rank - Higher Taxon
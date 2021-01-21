import React from 'react'

import PropTypes from 'prop-types'

import {BrowserRouter as Router,Link} from "react-router-dom";

import { Grid,Button,Paper,Typography } from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

import MapboxGLMap from '../components/MapboxGLMap'

const useStyles = makeStyles((theme) => ({
    filterButton: {
        backgroundColor: theme.palette.brown.dark,
        color: '#fff'
    },
    card: {
        marginBottom: '10px',
        padding: '10px',
        border: theme.border.light
    },
    link: {
        color: "#fff",
        textDecoration: 'none'
    },
    cardListText: {
        borderLeft: '2px solid #D2D2C6',
        margin: '0px 0px 10px 10px',
        color: "#4F5837"
    },
    height100: {
        height: '100%'
    }
}));

const ResultCard = ({result,key,loading}) => {
    const classes = useStyles();

    return (
        <Paper key={key} elevation={0} className={classes.card}>
            <Grid container direction="row" justify="space-between" alignItems="stretch">
                <Grid item>
                    <Grid container direction="column" justify="space-between" alignItems="flex-start" className={classes.height100}>
                        <Grid item>
                            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                                <Grid item><Typography variant="h3">{result.scientificName}</Typography></Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" wrap="wrap" spacing={2} className={classes.cardListText}>
                                {Object.keys(result.higherClassificationMap).length !== 0 &&
                                    <Grid item>
                                        <Typography variant="body2">Taxon Classes: 
                                            {Object.values(result.higherClassificationMap).map((item) => (
                                                ' / '+ item))}
                                        </Typography>
                                    </Grid>
                                }
                                {result.rank && <Grid item><Typography variant="body2">Rank: {result.rank}</Typography></Grid>}
                                {result.taxonomicStatus && <Grid item><Typography variant="body2">Status: {result.taxonomicStatus}</Typography></Grid>}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button disabled={loading} variant="contained" className={classes.filterButton} disableElevation>
                                <Link className={classes.link} to={`/species/${result.key}`}>View this {result.rank}</Link>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    {/* <MapboxGLMap taxonKey={result.key} width={512} height={168}/> */}
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

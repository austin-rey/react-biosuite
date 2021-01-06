import React from 'react'

import {useGetSpecies} from '../hooks/useGetSpecies'

import PropTypes from 'prop-types'

import { Grid,Button,Paper } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Dashboard from '../components/Dashboard'

// Component css styles
const useStyles = makeStyles((theme) => ({
    contentHeader: {
        backgroundColor: theme.palette.brown.light,
        padding: '40px'
    },
    resultsHeader: {
        padding: '10px 40px',
    },
    results: {
        padding: '0px 40px',
        // overflow: 'auto',
        flexGrow: 1,
        height: '100%',
    },
    filterButton: {
        backgroundColor: theme.palette.brown.dark,
        color: '#fff'
    },
    pageTitle: {
        marginTop: '0px'
    },
    card: {
        marginBottom: '10px',
        padding: '10px'
    }
}));

// Left side of the dashboard
const Sidebar = () => {
    return (
        <h1>Sidebar</h1>
    )
}

// Right side of the dashboard
const MainContent = ({count,results}) => {
    console.log(results);
    const classes = useStyles();
    return (
        <Grid direction="column" justify="flex-start" alignItems="stretch">
            <Grid item className={classes.contentHeader}>
                <h1 className={classes.pageTitle}>Main Content</h1>
                <p>Searching for species with the following filters:</p>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
                    <Grid item><Button variant="contained" className={classes.filterButton} disableElevation>Filter</Button></Grid>
                    <Grid item><Button variant="contained" className={classes.filterButton} disableElevation>Filter</Button></Grid>
                    <Grid item><Button variant="contained" className={classes.filterButton} disableElevation>Filter</Button></Grid>
                    <Grid item><Button variant="contained" className={classes.filterButton} disableElevation>Filter</Button></Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.resultsHeader}>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item><p>Results: {count}</p></Grid>
                    <Grid item><Button variant="contained" className={classes.filterButton} disableElevation>Sort</Button></Grid>
                   
                </Grid>
            </Grid>
            <Grid item className={classes.results}>
                {results.map((result) => (
                    <Paper elevation={0} className={classes.card}>
                        <Grid container direction="row" justify="space-between" alignItems="flex-start">
                            <Grid item>
                                <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                                    <Grid item>
                                        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                                            <Grid item><h2>{result.scientificName}</h2></Grid>
                                            <Grid item><p>class/class/class/class/class</p></Grid>
                                            <Grid item><p>species</p></Grid>
                                            <Grid item><p>accepted</p></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <p>Occurrences: {result.numOccurrences}</p>
                                    </Grid>
                                    <Grid item><Button variant="contained" className={classes.filterButton} disableElevation>view this species</Button></Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <img src="https://via.placeholder.com/250x150.png" alt=""/>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Grid>
        </Grid>
    )
}

MainContent.propTypes = {
    count: PropTypes.number,
    results: PropTypes.array   
}

const Search = ({type}) => {
    const classes = useStyles();

    const { data, loading, error } = useGetSpecies(
        'species/search',
        []
    );

    return ((loading) 
                ? <h1>Loading</h1>
                : <Dashboard 
                    sidebar={
                        <Sidebar/>
                    } 
                    mainContent={
                        <MainContent count={data.count} results={data.results}/>
                    }
                />
    )
}

Search.propTypes = {
    type: PropTypes.string
}

export default Search

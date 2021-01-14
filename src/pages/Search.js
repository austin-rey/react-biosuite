import React, {useState, useEffect} from 'react'

import {useFetchSearch} from '../hooks/useFetchSearch'

import {BrowserRouter as Router,Link} from "react-router-dom";

import PropTypes from 'prop-types'

import { Grid,Button,Paper,TextField,FormGroup,FormControlLabel,Checkbox,Divider } from '@material-ui/core';
import {Pagination} from '@material-ui/lab'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import {makeStyles} from '@material-ui/core/styles';

import Dashboard from '../components/Dashboard'
import Loading from '../components/Loading'
import MapboxGLMap from '../components/MapboxGLMap'

// Component css styles
const useStyles = makeStyles((theme) => ({
    contentHeader: {
        backgroundColor: theme.palette.brown.light,
        padding: '20px 40px'
    },
    resultsHeader: {
        padding: '10px 40px',
    },
    results: {
        padding: '0px 40px',
        flexGrow: 1,
        height: '100%',
    },
    filterButton: {
        backgroundColor: theme.palette.brown.dark,
        color: '#fff'
    },
    card: {
        marginBottom: '10px',
        padding: '10px'
    },
    filterContainer: {
        backgroundColor: '#fff',
        border: '1px solid #F0E9E1',
        borderRadius: '5px',
        margin: '10px 0px',
        padding: '10px'
    },
    textfield: {
        width: '100%',
        backgroundColor: '#fff',
        border: '1px solid #F0E9E1',
        borderRadius: '5px',
    },
    link: {
        color: "#fff",
        textDecoration: 'none'
    }
}));

let PaginationControlled = ({totalPages,currentPage,pageChange}) => {
    return (
        <Pagination count={totalPages} page={currentPage} variant="outlined" shape="rounded" onChange={pageChange}  />
    )
}

PaginationControlled.defaultProps = {
    limit: 20,
    offset: 20,
}

// Left side of the dashboard
const Sidebar = ({facets,onChange,selectedFilters}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item>
                <h3>Filters</h3>
                <TextField className={classes.textfield} id="outlined-basic" label="Name, description, class" variant="outlined" />
            </Grid>
            {facets.map((facet,facetIndex) => (
                <Grid key={facetIndex} item className={classes.filterContainer}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item><h4>{facet.field.split('_').join(' ')}</h4></Grid>
                        <Grid item><ArrowDropDownIcon/></Grid>
                    </Grid>
                    <Divider/>
                    <FormGroup>
                    {facet.counts.map((fieldOptions, fieldIndex) => (
                        <FormControlLabel
                            key={fieldIndex}
                            onChange={onChange}
                            control={<Checkbox checked={Object.values(selectedFilters[facetIndex])[1]?.includes(fieldOptions.name)}/>}
                            label={fieldOptions.name.split('_').join(' ').toLowerCase()}
                            value={fieldOptions.name}
                            name={facet.field}
                        />
                    ))}
                    </FormGroup>
                </Grid>
            ))}
        </Grid>
    )
}

Sidebar.propTypes = {
    facets: PropTypes.array,
    onChange: PropTypes.number,
    selectedFilters: PropTypes.array,
}

// Right side of the dashboard
const MainContent = ({count,results,pageChange,currentPage,totalPages}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item className={classes.contentHeader}>
                <h1 className={classes.pageTitle}>Species</h1>
                <p>Searching for species with the following filters:</p>
            </Grid>
            <Grid item className={classes.resultsHeader}>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item><p>Results: {count}</p></Grid>
                    <Grid item><Button variant="contained" className={classes.filterButton} disableElevation>Sort</Button></Grid>
                   
                </Grid>
            </Grid>
            <Grid item className={classes.results}>
                {results.map((result,i) => (
              
                    <Paper key={i} elevation={0} className={classes.card}>
                        <Grid container direction="row" justify="space-between" alignItems="flex-start">
                            <Grid item>
                                <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                                    <Grid item>
                                        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                                            <Grid item><h2>{result.scientificName}</h2></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="row" spacing={2}>
                                            <Grid item>
                                                <p>
                                                    {Object.keys(result.higherClassificationMap).length !== 0 && Object.values(result.higherClassificationMap).map((item) => (
                                                        ' / '+ item))}
                                                </p>
                                            </Grid>
                                            <Grid item><p>{result.rank}</p></Grid>
                                            <Grid item><p>{result.taxonomicStatus}</p></Grid>
                                            <Grid item><p>{result.numOccurrences}</p></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item><Button variant="contained" className={classes.filterButton} disableElevation><Link className={classes.link} to={`/species/${result.key}`}>View this Species</Link></Button></Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                {console.log(result.key)}
                                <MapboxGLMap taxonKey={result.key} width={512} height={168}/>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                <Paper elevation={0} className={classes.card}>
                 <PaginationControlled currentPage={currentPage} totalPages={totalPages} pageChange={pageChange} />
                </Paper>
            </Grid>
        </Grid>
    )
}

MainContent.propTypes = {
    count: PropTypes.number,
    results: PropTypes.array,
    offset: PropTypes.number,
    limit: PropTypes.number,
    pageChange: PropTypes.func
}

const Search = ({type}) => {
    const classes = useStyles();

    const [selectedFilter, setSelectedFilter] = useState({});
    let filterSelect = (e) => {
        let group = e.target.name;
        let selectedValue = e.target.value;
        setSelectedFilter({[group]:selectedValue})
    }

    const [currentPage, setCurrentPage] = useState(1);
    const pageChange = (event, value) => {
        setCurrentPage(value);
    } 

    const { data, loading, error, filters, totalPages, densityMaps} = useFetchSearch(
        selectedFilter,
        currentPage,
        []
    );

    return ((loading) 
        ? <Loading/>
        : <Dashboard 
            sidebar={
                <Sidebar 
                    facets={data.facets} 
                    onChange={filterSelect}
                    selectedFilters={filters}
                />
            } 
            mainContent={
                <MainContent 
                    count={data.count} 
                    results={data.results} 
                    pageChange={pageChange} 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    densityMaps={densityMaps}
                />
            }
        />
    )
}

Search.propTypes = {
    type: PropTypes.string
}

export default Search

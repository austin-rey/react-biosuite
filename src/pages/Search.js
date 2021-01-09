import React, {useState, useEffect} from 'react'

import {useGetSpecies} from '../hooks/useGetSpecies'

import PropTypes from 'prop-types'

import { Grid,Button,Paper,TextField,FormGroup,FormControlLabel,Checkbox,Divider  } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
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

    }
}));

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
                            control={<Checkbox checked={true}/>}
                            label={fieldOptions.name.split('_').join(' ').toLowerCase()}
                            value={facet.field}
                        />
                         /* <FormControlLabel
                            key={fieldIndex}
                            control={<Checkbox checked={(selectedFilters[facetIndex] === undefined)
                                ? Object.values(selectedFilters[facetIndex])[1]?.includes(fieldOptions.name)
                                : false} onChange={onChange} name={fieldOptions.name} />}
                            label={fieldOptions.name.split('_').join(' ').toLowerCase()}
                            value={facet.field}
                        /> */
                   
                    ))}
                    </FormGroup>
                </Grid>
            ))}
        </Grid>
    )
}

// Right side of the dashboard
const MainContent = ({count,results}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item className={classes.contentHeader}>
                <h1 className={classes.pageTitle}>Species</h1>
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
                {results.map((result,i) => (
                    <Paper key={i} elevation={0} className={classes.card}>
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
    let endpointPath = '/search/species/';

    // Custom hook to fetch species
    const { data, loading, error } = useGetSpecies(
        'species/search?advanced=true&facet=rank&facet=dataset_key&facet=constituent_key&facet=highertaxon_key&facet=name_type&facet=status&facet=issue&facet=origin&facetMultiselect=true&issue.facetLimit=100&locale=en&name_type.facetLimit=100&rank.facetLimit=100&status.facetLimit=100',
        []
    );

    const [filters, setFilters] = useState([{"ORIGIN": ["PROPARTE"]}]);
        console.log(filters)
        
    useEffect(() => {
        if(!loading) {
            // Initialize local state for managing filter changes (User selecting a filter option)
            setFilters(data.facets.map((facet)=> {
                return {[facet.field]: []}
            }))
        }
    }, [])

    let filterSelect = (e) => {
        let group = e.target.value;
        let selectedValue = e.target.name;

        setFilters([...filters].map(filter => {
            if(Object.keys(filter)[0] == group){
                if(Object.values(filter)[0].length == 0){
                    console.log('hi')
                    return {
                        ...filter,
                        [group]: [selectedValue]
                    }
                }
                else if(Object.values(filter)[0].includes(selectedValue)){
                    return {
                        ...filter,
                        [group]: Object.values(filter)[0].filter((value) => selectedValue !== value)
                    }
                } 
                else {
                    return {
                        ...filter,
                        [group]: [...Object.values(filter)[0], selectedValue]
                    }
                }
            }
            return filter;
        }))

        // Reconstruct endpoint to update results shown
        // Update browser url to reflect filters selected
    }

    let composeEndpoint = (parameters) => {

        console.log(`${endpointPath}${parameters.join('/')}`)
    }

    composeEndpoint.propTypes = {
        path: PropTypes.string,
        parameters: PropTypes.array
    }
    

    // console.log(initialFilters);
    // console.log(data);
    return ((loading) 
        ? <h1>Loading</h1>
        : <Dashboard 
            sidebar={
                <Sidebar facets={data.facets} onChange={filterSelect} selectedFilters={filters}/>
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

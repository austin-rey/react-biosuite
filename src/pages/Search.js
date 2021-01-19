import React, {useState, useEffect} from 'react'

import { useFetchSearch } from '../hooks/useFetchSearch'

import {BrowserRouter as Router,Link} from "react-router-dom";

import PropTypes from 'prop-types'

import { Grid,Button,Paper,TextField,FormGroup,FormControlLabel,Checkbox,Divider,Typography } from '@material-ui/core';
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
        borderRadius: '5px',
        margin: '0px'
    },
    link: {
        color: "#fff",
        textDecoration: 'none'
    },
    span: {
        margin: '0px 0px 0px 30px',
        display: 'flex',
        justifySelf: 'center',
        padding: '5px',
        borderLeft: '2px solid #D2D2C6',
        color: "#4F5837"
    },
    cardListText: {
        // padding: '5px',
        borderLeft: '2px solid #D2D2C6',
        margin: '0px 0px 10px 10px',
        color: "#4F5837"
    },
    formLabel: {
        display: 'flex',
        fontFamily: 'Khula, Raleway, sans-serif',
        fontSize: '1rem',
    },
    height100: {
        height: '100%'
    }
}));

let PaginationControlled = ({totalPages,currentPage,pageChange}) => {
    return (
        <Pagination count={totalPages} page={currentPage} shape="rounded" onChange={pageChange}  />
    )
}

PaginationControlled.defaultProps = {
    limit: 20,
    offset: 20,
}

// Left side of the dashboard
const Sidebar = ({facets,onChange,onSearchChange,selectedFilters,loading}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item>
                <Typography variant="h3">Filters</Typography>
                <TextField className={classes.textfield} onChange={onSearchChange} id="outlined-basic" label="Name, description, class" variant="outlined" />
            </Grid>
            {facets && facets.map((facet,facetIndex) => (
                <Grid key={facetIndex} item className={classes.filterContainer}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item><Typography variant="h4">{facet.field.split('_').join(' ')}</Typography></Grid>
                        <Grid item><ArrowDropDownIcon/></Grid>
                    </Grid>
                    <Divider/>
                    <FormGroup>
                    {facet.counts.map((fieldOptions, fieldIndex) => (
                        <>
                            <FormControlLabel
                                className={classes.formLabel}
                                labelPlacement="end"
                                disabled={loading}
                                key={fieldIndex}
                                onChange={onChange}
                                control={<Checkbox checked={Object.values(selectedFilters[facetIndex])[1]?.includes(fieldOptions.name)}/>}
                                label={fieldOptions.name.split('_').join(' ').toLowerCase()}
                                value={fieldOptions.name}
                                name={facet.field}
                            />
                            <Typography variant="body2" className={classes.span}>{fieldOptions.count} results</Typography>
                        </>
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
const MainContent = ({count,results,pageChange,currentPage,totalPages,loading}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item className={classes.contentHeader}>
            <Typography variant="h1">Species</Typography>
                <Typography variant="body1">Searching for species with the following filters:</Typography>
            </Grid>
            {(loading)?<Loading/>:<>
                <Grid item className={classes.resultsHeader}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item><Typography variant="body2">Page: {currentPage} of {totalPages}</Typography></Grid>
                        <Grid item><Typography variant="body2">Results: {count}</Typography></Grid>
                    </Grid>
                </Grid>
                    <Grid item className={classes.results}>
                        {results.map((result,i) => (
                            <Paper key={i} elevation={0} className={classes.card}>
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
                                                    {/* {result.numOccurrences.length !== 0 && <Grid item><Typography variant="body2">{result.numOccurrences}</Typography></Grid>} */}
                                                </Grid>
                                            </Grid>
                                            <Grid item><Button disabled={loading} variant="contained" className={classes.filterButton} disableElevation><Link className={classes.link} to={`/species/${result.key}`}>View this {result.rank}</Link></Button></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <MapboxGLMap taxonKey={result.key} width={512} height={168}/>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    <Paper elevation={0} className={classes.card}>
                        <PaginationControlled currentPage={currentPage} totalPages={totalPages} pageChange={pageChange} />
                    </Paper>
                </Grid>
            </> }
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

    const { 
        isLoading,
        data,
        error,
        execute
    } = useFetchSearch();
   
    const [paginationOptions, setPaginationOptions] = useState({
        page: 0,
        limit: 10
      });

    // Component state of filters selected
    const [filters, setFilters] = useState([
        {"ISSUE": []},
        {"STATUS": []},
        {"NAME_TYPE": []},
        {"RANK": []},
    ]);  
    
    // Processed "filters" state, array of param strings
    const [filterStrings, setFilterStrings] = useState([]);  

    const [searchQuery, setSearchQuery] = useState('');

    const pageChange = (e,value) => {
        setPaginationOptions((prevOptions) => ({
            ...prevOptions,
            page:value
        }));
        execute({
            paginationOptions,
            filters,
            searchQuery,
            page: value
        })
    }
    
    const filterSelect = (e) => {
        let group = e.target.name;
        let selectedValue = e.target.value;

        // Create an array of strings per each filter ('&[GROUP]=[VALUE]') 
        let filterStrings = filters.map((filter) => {
            if(Object.values(filter)[0].length != 0) {
                return Object.values(filter)[0].map((option) => {
                    return `&${Object.keys(filter)[0]}=${option}`
                })
            }}).flat().filter(item => item!=null)

        // Update component state of selected filters on user selection and adjust filterStrings
        setFilters(filters.map((filter,i) => {
            if(Object.keys(filter)[0] == group){
                if(Object.values(filter)[0].length == 0){
                    filterStrings.push(`&${group}=${selectedValue}`)
                    return {
                        ...filter,
                        [group]: [selectedValue]
                    }
                }
                else if(Object.values(filter)[0].includes(selectedValue)){
                    filterStrings.filter((value)=> value !== `${group}=${selectedValue}`)
                    return {
                        ...filter,
                        [group]: Object.values(filter)[0].filter((value) => selectedValue !== value)
                    }
                } 
                else {
                    filterStrings.push(`&${group}=${selectedValue}`)
                    return {
                        ...filter,
                        [group]: [...Object.values(filter)[0], selectedValue]
                    }
                }
            }
            return filter;
        }))

        setFilterStrings(filterStrings)

        try {
            execute({
                paginationOptions,
                filterStrings: filterStrings.join(''),
                searchQuery});
        } catch (error) {}
    }

    const searchChange = (e)=> {
        e.persist();
        setSearchQuery(e.target.value)
        let searchQuery = e.target.value;
        execute({
            paginationOptions,
            filterStrings,
            searchQuery});
    }

    useEffect(() => {
        try {
          execute({
            paginationOptions,
            filterStrings,
            searchQuery});
        } catch (error) {}
      }, [execute]);

      return (
        <>
            {!data && <Loading/>}
            {data && <Dashboard 
                sidebar={
                    <Sidebar 
                        loading={isLoading}
                        facets={data.facets} 
                        onChange={filterSelect}
                        onSearchChange={searchChange}
                        selectedFilters={filters}
                    />
                } 
                mainContent={
                    <MainContent 
                        loading={isLoading}
                        count={data.count} 
                        results={data.results} 
                        pageChange={pageChange} 
                        currentPage={paginationOptions.page+1}
                        totalPages={Math.ceil(data.count/paginationOptions.limit)}
                    /> 
                }
            />
            }
        </>
    )
}

Search.propTypes = {
    type: PropTypes.string
}

export default Search

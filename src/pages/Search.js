import React, {useState, useEffect} from 'react'

import { useFetchSearch } from '../hooks/useFetchSearch'

import PropTypes from 'prop-types'

import { Grid,Paper,TextField,FormGroup,FormControlLabel,Checkbox,Divider,Typography } from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

import Dashboard from '../components/Dashboard'
import Loading from '../components/Loading'
import ResultCard from '../components/ResultCard'
import PaginationControlled from '../components/Pagination'
import PageHeader from '../components/PageHeader'
import FilterCard from '../components/FilterCard'

const useStyles = makeStyles((theme) => ({
    results: {
        padding: '0px 40px',
        flexGrow: 1,
        height: '100%',
        marginTop: '40px'
    },
    card: {
        marginBottom: '10px',
        padding: '10px',
        border: theme.border.light

    },
    textfield: {
        width: '100%',
        borderRadius: '5px',
        margin: '0px'
    },
    input: {
        backgroundColor: "#fff"
    },
    headerBG: {
        backgroundColor: theme.palette.brown.light,
    },
    mw1600: {
        maxWidth: '1600px'
    }
}));

// Left side of the dashboard
const Sidebar = ({facets,onChange,onSearchChange,selectedFilters,loading}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item>
                <Typography variant="h3">Filters</Typography>
                <TextField className={classes.textfield} onChange={onSearchChange} id="outlined-basic" placeholder="Name, description, class" label="Search" variant="outlined" />
            </Grid>
            {facets && facets.map((facet,facetIndex,) => (
                <FilterCard facet={facet} facetIndex={facetIndex} onChange={onChange} selectedFilters={selectedFilters} loading={loading}/>
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
            <Grid item className={classes.headerBG}>
                <div className={classes.mw1600}>
                    <PageHeader heading="Species Search"/>            
                </div>
            </Grid>
            {!loading && 
            <div className={classes.mw1600}>
                    <Grid item className={classes.results}>
                        {results.map((result,i) => (
                            <ResultCard result={result} key={i} loading={loading}/>
                        ))}
                    <Paper elevation={0} className={classes.card}>
                    <Grid container direction="row" justify="space-between" alignItems="center" className={classes.pagination}>
                        <Grid item><PaginationControlled currentPage={currentPage} totalPages={totalPages} onChange={pageChange} /></Grid>
                        <Grid item>{count} Results</Grid>
                        </Grid>
                    </Paper>
                </Grid>
           </div>}
           
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

const Search = () => {
    const classes = useStyles();

    const { 
        isLoading,
        data,
        error,
        execute
    } = useFetchSearch();
   
    // Component state and event handler for pagination ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [paginationOptions, setPaginationOptions] = useState({
        page: 0,
        limit: 10
    });

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

    // Processed "filters" state, array of param strings~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [filterStrings, setFilterStrings] = useState([]);  
    
    // Component state and event handler for filters ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [filters, setFilters] = useState([
        {"ISSUE": []},
        {"STATUS": []},
        {"NAME_TYPE": []},
        {"RANK": []},
    ]);  

    const filterSelect = (e) => {
        let group = e.target.name;
        let selectedValue = e.target.value;

        // Create an updated array of selected filters
        let updatedFilters = filters.map((filter,i) => {
            if(Object.keys(filter)[0] == group){
                if(Object.values(filter)[0].length == 0){
                    console.log('No items in this group are selected')
                    return {
                        ...filter,
                        [group]: [selectedValue]
                    }
                }
                else if(Object.values(filter)[0].includes(selectedValue)){
                    console.log('This item has been selected')
                    return {
                        ...filter,
                        [group]: Object.values(filter)[0].filter((value) => selectedValue !== value)
                    }
                } 
                else {
                    console.log('Add this item to the group')
                    return {
                        ...filter,
                        [group]: [...Object.values(filter)[0], selectedValue]
                    }
                }
            }
            return filter;
        })

        // Create an array of strings per each filter in updatedFilters ('&[GROUP]=[VALUE]') 
        let filterStrings = updatedFilters.map((filter) => {
            if(Object.values(filter)[0].length != 0) {
                return Object.values(filter)[0].map((option) => {
                    return `&${Object.keys(filter)[0]}=${option}`
                })
        }}).flat().filter(item => item!=null)

        setFilters(updatedFilters)
        setFilterStrings(filterStrings)

        try {
            execute({
                paginationOptions,
                filterStrings: filterStrings.join(''),
                searchQuery});
        } catch (error) {}
    }

    // Component state and event handler for search component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [searchQuery, setSearchQuery] = useState('');
    const searchChange = (e)=> {
        e.persist();
        setSearchQuery(e.target.value)
        let searchQuery = e.target.value;
        execute({
            paginationOptions,
            filterStrings,
            searchQuery});
    }

    console.log(data)
    // Initial fetching of data for the search page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

export default Search

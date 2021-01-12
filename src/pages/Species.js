import React from 'react'

import PropTypes from 'prop-types'

import {useParams} from "react-router-dom";

import {useFetch} from '../hooks/useFetch'

import {makeStyles} from '@material-ui/core/styles';

import { Grid,Button,Paper,Divider,Card,CardMedia,CardContent } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
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
        flexGrow: 1,
        height: '100%',
    },
    alignFE: {
        alignSelf: 'flex-end'
    },
    textCenter: {
        textAlign: 'center'
    },
    card: {
        maxWidth: 280,
        boxShadow: 'none',
        textAlign: 'center'
    },
    media: {
        height: 200,
    },
    pagination: {
        padding: '10px'
    },
    cardContainer: {
        padding: '10px'
    },
    mapContainer: {
        minWidth: '400px',
        minHeight: '400px',
    },
    sidebarContainer: {
        backgroundColor: '#fff',
        border: '1px solid #F0E9E1',
        borderRadius: '5px',
        margin: '10px 0px',
        padding: '10px'
    }
}));

// Right side of the dashboard
const MainContent = ({metadata,images,datasets,vernacularNames,synonyms,children,parents}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item className={classes.contentHeader}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <Grid container direction="row" spacing={2} justify="flex-start" alignItems="center">
                            <Grid item><h1 className={classes.pageTitle}>{metadata.scientificName}</h1></Grid>
                            <Grid item><h5>{metadata.class}</h5></Grid>
                            <Grid item><h5>{metadata.taxonomicStatus}</h5></Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.alignFE}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item><Button variant="contained" className={classes.filterButton} disableElevation>{children.results?.length}</Button></Grid>
                            <Grid item><Button variant="contained" className={classes.filterButton} disableElevation>{datasets.count} Occurences</Button></Grid>
                        </Grid>
                    </Grid>
                </Grid>
       
            </Grid>
            <Grid item className={classes.resultsHeader}>
                <Grid container direction="column" >
                    <h2>Overview</h2>
                    <p>Published images, locations and datasets associated with this species.</p>
                </Grid>
            </Grid>
            <Grid item className={classes.results}>
                <Grid container direction="column">
                    <Grid item>
                    <p><i>Note: Click image for larger view.</i></p>
                        <Paper elevation={0}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container direction="row" spacing={2} className={classes.cardContainer}>
                                        {images.results?.map((image,i) => (
                                            <Grid item key={i}>
                                                <Card className={classes.card}>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={image.media[0].identifier}
                                                        title={image.datasetName}
                                                    />
                                                    <CardContent>
                                                        <h4>{image.datasetName}</h4>
                                                        <span>Created: {image.media[0].created}</span>
                                                        <Button variant="contained" className={classes.filterButton} disableElevation>view occurrence</Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                       
                                    </Grid>
                                    <Divider/>
                                </Grid>
                                <Grid item>
                                    <Pagination className={classes.pagination} count={10} variant="outlined" shape="rounded" /></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <p><i>Geolocation data mapping for recorded coordinates</i></p>
                        <Paper elevation={0} className={classes.mapContainer}>
                            {/* <img src="https://via.placeholder.com/800x600.png"/> */}
                        </Paper>
                    </Grid>
                    {/* <Grid item>
                        <p><i>Occurrence Datasets</i></p>
                        <Paper elevation={0}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container direction="row" spacing={2} className={classes.cardContainer}>
                                        {datasets.results?.map((dataset) => (
                                            <Grid item>
                                                <Card className={classes.card}>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image="https://via.placeholder.com/300x200.png"
                                                        title="Paella dish"
                                                    />
                                                    <CardContent>
                                                        <h3>Publisher Name</h3>
                                                        <p>Created: Date</p>
                                                        <Button variant="contained" className={classes.filterButton} disableElevation>view dataset</Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                 
                                    </Grid>
                                    <Divider/>
                                </Grid>
                                <Grid item>
                                    <Pagination className={classes.pagination} count={10} variant="outlined" shape="rounded" />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid> */}
                    <Grid item>
                        <Grid container direction="row" spacing={2} wrap="wrap" justify="flex-start" alignItems="flex-start">
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <p><i>Vernacular Names (Common Names) </i></p>
                                <Paper elevation={0}>
                                    <Grid container direction="row" alignItems="flex-start" justify="space-around" spacing={2}>
                                        <Grid item className={classes.textCenter}>
                                            <h5>Name</h5>
                                            {vernacularNames?.map((item,i) => (
                                                <p key={i}>{item.vernacularName}</p>
                                            ))}
                                        </Grid>
                                        <Grid item className={classes.textCenter}>
                                            <h5>Source</h5>
                                            {vernacularNames?.map((item,i) => (
                                                <p key={i}>{item.source}</p>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <p><i>Synonyms</i></p>
                                <Paper elevation={0}>
                                    <Grid container direction="row" alignItems="flex-start" justify="space-around" spacing={2}>
                                    <Grid item className={classes.textCenter}>
                                            <h5>Name</h5>
                                            {synonyms?.map((item,i) => (
                                                <p key={i}>{item.scientificName}</p>
                                            ))}
                                        </Grid>
                                        <Grid item className={classes.textCenter}>
                                            <h5>Author</h5>
                                            {synonyms?.map((item,i) => (
                                                <p key={i}>{item.authorship}</p>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <p><i>Geolocation data mapping for recorded coordinates</i></p>
                        <Paper elevation={0}>
                            <Grid container>
                                <p>Some citation</p>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const Sidebar = ({metadata,children,parents}) => {
    const classes = useStyles();
console.log(metadata);
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
        <Grid item>
            <h3>Classification</h3>
        </Grid>
        <Grid item className={classes.sidebarContainer}>
            <h4>Parents</h4>
            <span><i>Click each to explore the children species.</i></span>
            <ul>
                {parents?.map((parent,i) => (
                    <li key={i}>{parent.rank} - {parent.canonicalName}</li>
                ))}
            </ul>
        </Grid>
        <Grid item className={classes.sidebarContainer}>
            <h4>{metadata.scientificName}</h4>
            <span><i>{metadata.rank}</i></span>
        </Grid>
        <Grid item className={classes.sidebarContainer}>
            <h4>Children</h4>
            <span><i>Click each to view more details.</i></span>
            <ul>
                {children.results?.map((child,i) => (
                    <li key={i}>{child.rank} - {child.canonicalName}</li>
                ))}
            </ul>
        </Grid>
    </Grid>
    )
}

const Species = props => {

    let { id } = useParams();

    const { 
        data: metadata, 
        loading:metadataLoading, 
        error:metadataError 
        } = useFetch(
        `species/${id}`,
        []
    );

    const { 
        data:occurrenceImages, 
        loading:occurrenceImagesLoading, 
        error:occurrenceImagesError 
        } = useFetch(
        `occurrence/search?limit=8&media_type=stillImage&taxon_key=${id}`,
        []
    );

    const { 
        data:occurrenceDatasets, 
        loading:occurrenceDatasetsLoading, 
        error:occurrenceDatasetsError 
        } = useFetch(
        `/occurrence/search?limit=8&taxon_key=${id}`,
        []
    );

    const { 
        data:speciesVernacularNames, 
        loading:speciesVernacularNamesLoading, 
        error:speciesVernacularNamesError 
        } = useFetch(
        `species/${id}/vernacularNames`,
        []
    );

    const { 
        data:speciesSynonyms, 
        loading:speciesSynonymsLoading, 
        error:speciesSynonymsError 
        } = useFetch(
        `/species/${id}/synonyms?limit=10`,
        []
    );

    const { 
        data:speciesChildren, 
        loading:speciesChildrenLoading, 
        error:speciesChildrenError 
        } = useFetch(
        `/species/${id}/children?limit=100`,
        []
    );

    const { 
        data:speciesParent, 
        loading:speciesParentLoading, 
        error:speciesParentError 
        } = useFetch(
        `/species/${id}/parents`,
        []
    );


    return ((metadataLoading,occurrenceImagesLoading,occurrenceDatasetsLoading,speciesVernacularNamesLoading,speciesSynonymsLoading,speciesChildrenLoading,speciesParentLoading) 
        ? <h1>Loading</h1>
        : <Dashboard 
            sidebar={
                <Sidebar 
                    metadata={metadata}
                    children={speciesChildren}
                    parents={speciesParent}
                />
            } 
            mainContent={
               <MainContent 
                    metadata={metadata}
                    images={occurrenceImages} 
                    datasets={occurrenceDatasets} 
                    vernacularNames={speciesVernacularNames.results} 
                    synonyms={speciesSynonyms.results}
                    children={speciesChildren}
                    parents={speciesParent}
               />
            }
        />
    )
}

export default Species

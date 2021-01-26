import React, {useEffect,useState} from 'react'

import PropTypes from 'prop-types'

import {Link,useParams} from "react-router-dom";

import Moment from 'react-moment';

import {useFetchSpecies} from '../hooks/useFetchSpecies'

import {makeStyles} from '@material-ui/core/styles';

import { Grid,Paper,Divider,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Chip } from '@material-ui/core';

import Dashboard from '../components/Dashboard'
import Loading from '../components/Loading'
import MapboxGLMap from '../components/MapboxGLMap'
import PaginationControlled from '../components/Pagination'
import ImageCard from '../components/ImageCard'
import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import NameCard from '../components/NameCard'
import SidebarCard from '../components/ClassificationCard'

const useStyles = makeStyles((theme) => ({
    results: {
        padding: '40px',
        flexGrow: 1,
        height: '100%',
    },
    section: {
        marginBottom: '20px'
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
    },
    link: {
        color: "#fff",
        textDecoration: 'none'
    },
    table: {
        borderRadius: '5px',
    },
    tableHead: {
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px',
        backgroundColor: theme.palette.brown.main,

    },
    headerBG: {
        backgroundColor: theme.palette.brown.light,
    },
    mw1600: {
        maxWidth: '1600px'
    },
    chip: {
        borderRadius: '5px',
        color: '#fff',
        margin: '5px'
    },
    white: {
        color: "#fff"
    },
    borderRadius: {
        borderRadius: '5px'
    }
}));

const OccurrenceTable = ({occurrences}) => {
    const classes = useStyles();
    return (
        <Paper elevation={0}>
            <TableContainer className={classes.table}>
                <Table aria-label="Occurrence table" size="">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell align="left"><Typography variant="h4">Scientific Name</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h4">Rank</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h4">Record Date</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h4">Country</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h4">Basis of Record</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h4">Source</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {occurrences.results.map((result) => (
                    <TableRow key={result.key}>
                        <TableCell align="left"><Typography variant="body2"><b>{(result.acceptedScientificName)?result.acceptedScientificName:"No record"}</b></Typography></TableCell>
                        <TableCell align="center"><Typography variant="body2">{(result.taxonRank)?result.taxonRank:"No record"}</Typography></TableCell>
                        <TableCell align="center"><Typography variant="body2">{(result.eventDate)?<Moment format="MMM DD, YYYY">{result.eventDate}</Moment>:"No record"}</Typography></TableCell>
                        <TableCell align="center"><Typography variant="body2">{(result.country)?result.country:"No record"}</Typography></TableCell>
                        <TableCell align="center"><Typography variant="body2">{(result.basisOfRecord)?result.basisOfRecord:"No record"}</Typography></TableCell>
                        <TableCell align="center"><Typography variant="body2">{(result.datasetName)?result.datasetName:"No record"}</Typography></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

// Right side of the dashboard
const MainContent = ({data,imagePageChange,occurrencePageChange,imagePaginationOptions,occurrencePaginationOptions,isLoading}) => {
    const classes = useStyles();
    const {metadata,occurrenceImages,occurrences,speciesVernacularNames,speciesSynonyms} = data;

    const HeadingBody = () => {
        return (
            <Grid container direction="row" spacing={2} justify="space-between" alignItems="center">
                <Grid item>
                    {(metadata.vernacularName)?
                    <Typography variant="h6">English Common Name: <i>"{metadata.vernacularName}"</i></Typography>:
                    <Typography variant="h6"><i>English Common Name Not Found</i></Typography>}
                </Grid>
                <Grid item>
                    <Typography variant="h6">{occurrences.count} occurrences found</Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item className={classes.headerBG}>
                <div className={classes.mw1600}>
                    <PageHeader heading={metadata.scientificName} HeadingBody={HeadingBody}/>
                </div>
            </Grid>
            {!isLoading && 
            <div className={classes.mw1600}>
                <Grid item className={classes.results}>
                    <Grid container direction="column" wrap="nowrap">
                        <Grid item className={classes.section}>
                            <SectionHeader heading="Published Images" subtext="Note: Click image for larger view."/>
                            <Paper elevation={0}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container direction="row" spacing={2} className={classes.cardContainer}>
                                            {occurrenceImages.results?.map((image,i) => (
                                                <Grid item key={i}>
                                                    <ImageCard image={image.media[0].identifier} title={image.acceptedScientificName} created={image.media[0].created} link={`/occurrence/${image.key}`}/>
                                                </Grid>
                                            ))}   
                                        </Grid>
                                        <Divider/>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="row" justify="space-between" alignItems="center" className={classes.pagination}>
                                            <Grid item> 
                                                <PaginationControlled currentPage={imagePaginationOptions.page+1} totalPages={Math.ceil(occurrenceImages.count/imagePaginationOptions.limit)} onChange={imagePageChange} />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">{occurrenceImages.count} results</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item className={classes.section}>
                            <SectionHeader heading="Geolocation Records" subtext="Occurrences of this species with recorded location data."/>
                            <Paper elevation={0} className={classes.mapContainer}>
                                <MapboxGLMap taxonKey={metadata.key} width={1024} height={400}/>
                            </Paper>
                        </Grid>
                        <Grid item className={classes.section}>
                            <SectionHeader heading="Recorded Occurrences" subtext="Click the name to view additional information per occurrence."/>
                            <Paper elevation={0} className={classes.borderRadius}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <OccurrenceTable occurrences={occurrences}/>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="row" justify="space-between" alignItems="center" className={classes.pagination}>
                                            <Grid item> 
                                                <PaginationControlled currentPage={occurrencePaginationOptions.page+1} totalPages={Math.ceil(occurrences.count/occurrencePaginationOptions.limit)} onChange={occurrencePageChange} />
                                            </Grid>
                                            <Grid item><Typography variant="body1">{occurrences.count} results</Typography></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item className={classes.section}>
                            <SectionHeader heading="Vernacular Names" subtext="Common Names"/>
                            <NameCard 
                                leftCol={speciesVernacularNames?.results.map((item)=>{return item.vernacularName})} rightCol={speciesVernacularNames?.results.map((item)=>{return item.source})} 
                                leftLabel={'Name'} 
                                rightLabel={'Source'}
                            />
                        </Grid>
                        <Grid item className={classes.section}>
                            <SectionHeader heading="Synonyms" subtext="Related names"/>
                            <NameCard 
                                leftCol={speciesSynonyms?.results.map((item)=>{return item.scientificName})} 
                                rightCol={speciesSynonyms?.results.map((item)=>{return item.authorship})} 
                                leftLabel={'Name'} 
                                rightLabel={'Author'}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>}
        </Grid>
    )
}

// Left Side of dashboard
const Sidebar = ({data}) => {
    const classes = useStyles();
    const {metadata,speciesParent,speciesChildren} = data;
    
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item>
                <Link to="/search/species/">Back to Search</Link>
            </Grid>
            <Grid item>
                <Typography variant="h3">Classification</Typography>
            </Grid>
            <Grid item className={classes.sidebarContainer}>
                <SidebarCard title={'Higher Taxon'} subtext={'Click each to search for children.'} list={speciesParent}/>
            </Grid>
            <Grid item className={classes.sidebarContainer}>
               <Typography variant="h4">{metadata.scientificName}</Typography>
               {metadata.rank && <Grid item>
                    <Chip className={classes.chip} color="secondary" label={<Typography variant="h6" className={classes.white}>{metadata.rank.toUpperCase()}</Typography>} />
                </Grid>}
                {metadata.taxonomicStatus && <Grid item>
                    <Chip className={classes.chip} color="secondary" label={<Typography variant="h6" className={classes.white}>{metadata.taxonomicStatus.toUpperCase()}</Typography>}/>
                </Grid>} 
            </Grid>
            <Grid item className={classes.sidebarContainer}>
                <SidebarCard title={'Children'} subtext={'Click each to view more details.'} list={speciesChildren.results}/>
            </Grid>
        </Grid>
    )
}

const Species = props => {
    let { id } = useParams();

    const { 
        isLoading,
        data,
        error,
        execute
    } = useFetchSpecies();

    // Component state and event handler for species children ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [childrenPagination, setChildrenPagination] = useState({page: 0, limit: 100})
    const childrenPageChange = (e,value) => {}

    // Component state and event handler for vernacular names ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [vernacularPagination, setVernacularPagination] = useState({page: 0, limit: 20})
    const vernacularPageChange = (e,value) => {}

    // Component state and event handler for synonyms ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [synonymsPagination, setSynonymsPagination] = useState({page: 0, limit: 20})
    const synonymsPageChange = (e,value) => { }

    // Component state and event handler for occurrence images ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [imagePaginationOptions, setImagePaginationOptions] = useState({page: 0, limit: 8});
    const imagePageChange = (e,value) => {
        setImagePaginationOptions((prevOptions) => ({...prevOptions,page:value-1}));
        execute({
            id,
            imagePaginationOptions,
            occurrencePaginationOptions,
            imagePage: value-1,
            occurrencePage:occurrencePaginationOptions.page
        })
    }

    // Component state and event handler for occurrences ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [occurrencePaginationOptions, setOccurrencePaginationOptions] = useState({page: 0,limit: 10});
    const occurrencePageChange = (e,value) => {
        setOccurrencePaginationOptions((prevOptions) => ({...prevOptions,page:value-1}));
        execute({
            id,
            imagePaginationOptions,
            occurrencePaginationOptions,
            imagePage: imagePaginationOptions.page,
            occurrencePage: value-1
        })
    }
    // Initial fetching of data for the species page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        try {
            execute({
                id,
                imagePaginationOptions,
                occurrencePaginationOptions
            });
        } catch (error) {}
        }, [execute]);

    return (
        <>
            {isLoading && <Loading/>}
            {data && <Dashboard
                sidebar={
                    <Sidebar 
                    data={data}
                    loading={isLoading}
                />
                } 
                mainContent={
                    <MainContent 
                        imagePageChange={imagePageChange}
                        occurrencePageChange={occurrencePageChange}
                        imagePaginationOptions={imagePaginationOptions}
                        occurrencePaginationOptions={occurrencePaginationOptions}
                        data={data}
                        loading={isLoading}
                    />
                }
            />}
        </>
    )
}

export default Species

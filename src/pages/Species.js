import React, {useEffect,useState} from 'react'

import PropTypes from 'prop-types'

import {BrowserRouter as Router,Link,useParams} from "react-router-dom";

import Moment from 'react-moment';

import {useFetchSpecies} from '../hooks/useFetchSpecies'

import {makeStyles} from '@material-ui/core/styles';

import { Grid,Button,Paper,Divider,Card,CardMedia,CardContent,CardActions,Table,TableBody,TableCell,TableContainer,TableHead,TableRow } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Dashboard from '../components/Dashboard'
import Loading from '../components/Loading'

import MapboxGLMap from '../components/MapboxGLMap'
// Component css styles
const useStyles = makeStyles((theme) => ({
    headerBG: {
        backgroundColor: theme.palette.brown.light,
    },
    headerContainer: {
        padding: '20px 40px',
        maxWidth: '1600px'
    },
    headerButton: {
        backgroundColor: theme.palette.brown.dark
    },
    viewMoreButton: {
        backgroundColor: theme.palette.green.dark,
        width: '100%'
    },
    resultsHeader: {
        padding: '10px 40px',
        borderBottom: '1px solid #efefef'
    },
    results: {
        padding: '40px',
        flexGrow: 1,
        height: '100%',
    },
    section: {
        marginBottom: '20px'
    },
    nameContainer: {
        textAlign: 'center',
        height: '100%'
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
    }
}));

const PaginationControlled = ({totalPages,currentPage,onChange}) => {
    return (
        <Pagination count={totalPages} page={currentPage} shape="rounded" onChange={onChange}  />
    )
}

const ImageCard = ({image,title,created,link}) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={image}
                title={title}
            />
            <CardContent>
                <h4>{title}</h4>
                <span>Published: {" "} <Moment format="MMM DD, YYYY">{created}</Moment>
                    </span>
                
            </CardContent>
            <CardActions>
                <Button variant="contained" className={classes.viewMoreButton} disableElevation>
                    <Link className={classes.link} to={link}>view occurrence</Link>
                </Button>
            </CardActions>
        </Card>
    )
}

ImageCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    created: PropTypes.string,
    link: PropTypes.string,

}

ImageCard.defaultProps = {
    image: 'https://via.placeholder.com/300x200.png',
    title: 'Recorded Occurrence',
    created: 'No date found',
    link: '/'
}

const PageHeader = ({name,rank,status,totalOccurrences,occurrenceLink}) => {
    const classes = useStyles();
    return (
        <Grid item className={classes.headerBG}>
            <Grid container direction="column" justify="space-between" alignItems="stretch" className={classes.headerContainer}>
                <Grid item>
                    <h1 className={classes.pageTitle}>{name}</h1>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={2} justify="space-between" alignItems="flex-start">
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item><h5>{rank}</h5></Grid>
                                <Grid item><h5>{status}</h5></Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" className={classes.headerButton} disableElevation><Link className={classes.link} to={occurrenceLink}>{totalOccurrences} occurrences found</Link></Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

PageHeader.propTypes = {
    name: PropTypes.string,
    rank: PropTypes.string,
    status: PropTypes.string,
    totalOccurrences: PropTypes.string,
    occurrenceLink: PropTypes.string,
}

PageHeader.defaultProps = {
    name: 'No Scientific Name Found',
    rank: 'No rank found',
    status: 'No status found',
    totalOccurrences: '0',
    occurrenceLink: '/',
}

const NameContainer = ({leftCol,rightCol,leftLabel,rightLabel}) => {
    const classes = useStyles();
    return (
        <Paper elevation={0}>
            <Grid container direction="row" alignItems="flex-start" justify="space-around" spacing={2}>
                <Grid item className={classes.nameContainer}>
                    <h5>{leftLabel}</h5>
                    {leftCol?.map((item,i) => (
                        <p key={i}>{item}</p>
                    ))}
                </Grid>
                <Grid item className={classes.nameContainer}>
                    <h5>{rightLabel}</h5>
                    {rightCol?.map((item,i) => (
                        <p key={i}>{item}</p>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    )
}

NameContainer.propTypes = {
    leftCol: PropTypes.array,
    rightCol: PropTypes.array,
    leftLabel: PropTypes.string,
    rightLabel: PropTypes.string
}

NameContainer.defaultProps = {

}

const OccurrenceTable =({occurrences}) => {
    const classes = useStyles();
    return (
        <Paper elevation={0}>
            <TableContainer>
                <Table className={classes.table} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"><p><b>Scientific Name</b></p></TableCell>
                        <TableCell align="left"><p><b>Rank</b></p></TableCell>
                        <TableCell align="left"><p><b>Record Date</b> <i></i></p></TableCell>
                        <TableCell align="left"><p><b>Country</b></p></TableCell>
                        <TableCell align="left"><p><b>Basis of Record</b></p></TableCell>
                        <TableCell align="left"><p><b>Source</b></p></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {occurrences.results.map((result) => (
                    <TableRow key={result.key}>
                        <TableCell align="left"><span><b>{(result.acceptedScientificName)?result.acceptedScientificName:"No record"}</b></span></TableCell>
                        <TableCell align="left"><span>{(result.taxonRank)?result.taxonRank:"No record"}</span></TableCell>
                        <TableCell align="left"><span>{(result.eventDate)?<Moment format="MMM DD, YYYY">{result.eventDate}</Moment>:"No record"}</span></TableCell>
                        <TableCell align="left"><span>{(result.country)?result.country:"No record"}</span></TableCell>
                        <TableCell align="left"><span>{(result.basisOfRecord)?result.basisOfRecord:"No record"}</span></TableCell>
                        <TableCell align="left"><span>{(result.datasetName)?result.datasetName:"No record"}</span></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
// Right side of the dashboard
const MainContent = ({data,imagePageChange,occurrencePageChange,imagePaginationOptions,occurrencePaginationOptions}) => {
    const classes = useStyles();
    const {metadata,occurrenceImages,occurrences,speciesVernacularNames,speciesSynonyms} = data;

    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <PageHeader name={metadata.scientificName} rank={metadata.rank} status={metadata.taxonomicStatus} totalOccurrences={occurrences.count} occurrenceLink={'/'}/>
            <Grid item className={classes.results}>
                <Grid container direction="column" wrap="nowrap">
                    <Grid item className={classes.section}>
                    <h3>Published Images</h3>
                    <p><i>Note: Click image for larger view.</i></p>
                    <Paper elevation={0}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container direction="row" spacing={2} className={classes.cardContainer}>
                                    {occurrenceImages.results?.map((image,i) => (
                                        <Grid item key={i}>
                                            <ImageCard image={image.media[0].identifier} title={image.acceptedScientificName} created={image.media[0].created} link={'/'}/>
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
                                    <Grid item>{occurrenceImages.count} results</Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.section}>
                        <h3>Geolocation Records</h3>
                        <p><i>Occurrences of this species with recorded location data</i></p>
                        <Paper elevation={0} className={classes.mapContainer}>
                            {/* <MapboxGLMap taxonKey={metadata.key} width={1024} height={400}/> */}

                        </Paper>
                    </Grid>
                    <Grid item className={classes.section}>
                        <h3>Recorded Occurrences</h3>
                        <p><i>Click the name to view additional information per occurrence.</i></p>
                        <Paper elevation={0}>
                            <Grid container direction="column">
                                <Grid item>
                                    <OccurrenceTable occurrences={occurrences}/>
                                </Grid>
                                <Grid item>
                                    <Grid  container direction="row" justify="space-between" alignItems="center" className={classes.pagination}>
                                        <Grid item> 
                                            <PaginationControlled currentPage={occurrencePaginationOptions.page+1} totalPages={Math.ceil(occurrences.count/occurrencePaginationOptions.limit)} onChange={occurrencePageChange} />
                                        </Grid>
                                        <Grid item>{occurrences.count} results</Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        
                    </Grid>
                    <Grid item className={classes.section}>
                        <Grid container direction="row" spacing={2} justify="flex-start" wrap="nowrap" alignItems="stretch">
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <h3>Vernacular Names</h3>
                                <p><i>Common Names</i></p>  
                                <NameContainer 
                                leftCol={speciesVernacularNames?.results.map((item)=>{return item.vernacularName})} rightCol={speciesVernacularNames?.results.map((item)=>{return item.source})} 
                                leftLabel={'Name'} 
                                rightLabel={'Source'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <h3>Synonyms</h3>
                                <p><i>Related names</i></p>
                                <NameContainer 
                                    leftCol={speciesSynonyms?.results.map((item)=>{return item.scientificName})} 
                                    rightCol={speciesSynonyms?.results.map((item)=>{return item.authorship})} 
                                    leftLabel={'Name'} 
                                    rightLabel={'Author'}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
            </Grid>
        </Grid>
    </Grid>
    )
}

const ClassificationItem = ({title,subtext,list}) => {
    return (
        <>
            <h4>{title}</h4>
            <span><i>{subtext}</i></span>
            <ul>
                {list?.map((parent,i) => (
                    <li key={i}>{parent.canonicalName}</li>
                ))}
            </ul>
        </>
    )
}

ClassificationItem.propTypes = {
    title: PropTypes.string,
    subtext: PropTypes.string,
    list: PropTypes.array,

}

ClassificationItem.defaultProps = {
    title: 'No Scientific Name Found',
    subtext: '',
    list: ['No Results found'],
}


const Sidebar = ({data}) => {
    const classes = useStyles();
    const {metadata,speciesParent,speciesChildren} = data;
    
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item>
                <Link to="/search/species/">Back to Search</Link>
            </Grid>
            <Grid item>
                <h3>Classification</h3>
            </Grid>
            <Grid item className={classes.sidebarContainer}>
                <ClassificationItem title={'Higher Taxon'} subtext={'Click each to explore the children species.'} list={speciesParent}/>
            </Grid>
            <Grid item className={classes.sidebarContainer}>
                <ClassificationItem title={metadata.scientificName} subtext={metadata.rank} list={[]}/>
            </Grid>
            <Grid item className={classes.sidebarContainer}>
                <ClassificationItem title={'Children'} subtext={'Click each to view more details.'} list={speciesChildren.results}/>
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

    const [imagePaginationOptions, setImagePaginationOptions] = useState({
        page: 0,
        limit: 10
    });
    const imagePageChange = (e,value) => {
        console.log(value)
        setImagePaginationOptions((prevOptions) => ({
            ...prevOptions,
            page:value-1
        }));
        execute({
            id,
            imagePaginationOptions,
            occurrencePaginationOptions,
            imagePage: value-1,
            occurrencePage:occurrencePaginationOptions.page
        })
    }

    const [occurrencePaginationOptions, setOccurrencePaginationOptions] = useState({
        page: 0,
        limit: 10
    });
    const occurrencePageChange = (e,value) => {
        console.log(value)

        setOccurrencePaginationOptions((prevOptions) => ({
            ...prevOptions,
            page:value-1
        }));
        execute({
            id,
            imagePaginationOptions,
            occurrencePaginationOptions,
            imagePage: imagePaginationOptions.page,
            occurrencePage: value-1
        })
    }

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
            />
            }
        </>
    )
}

export default Species

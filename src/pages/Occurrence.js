import React, {useEffect} from 'react'

import PropTypes from 'prop-types'

import Moment from 'react-moment';

import {BrowserRouter as Router,Link,useParams} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';

import { Grid,Paper,Typography,Container,Divider } from '@material-ui/core';

import {useFetchOccurrence} from '../hooks/useFetchOccurrence'

import LocationOnIcon from '@material-ui/icons/LocationOn';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import AssignmentIcon from '@material-ui/icons/Assignment';

import OccurrenceTable from '../components/OccurrenceTable'
import ImageTable from '../components/ImageTable'
import OccurrenceEvent from '../components/OccurrenceEvent'
import Loading from '../components/Loading'
import SectionHeader from '../components/SectionHeader'
import ImageCard from '../components/ImageCard'
import PageHeader from '../components/PageHeader'
import MapboxGLMap from '../components/MapboxGLMap'

const useStyles = makeStyles((theme) => ({
    headerBG: {
        backgroundColor: theme.palette.brown.light,
    },//
    headerContainer: {
        padding: '20px 40px',
        maxWidth: '1600px'
    },//
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
    },//
    section: {
        marginBottom: '20px'
    },//
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
        border: theme.border.light,
        marginBottom: '10px'

    },
    sidebarContainer: {
        backgroundColor: '#fff',
        border: '1px solid #F0E9E1',
        borderRadius: '5px',
        margin: '10px 0px',
        padding: '10px'
    },//
    link: {
        color: "#fff",
        textDecoration: 'none'
    },
    paper :{
        backgroundColor: theme.palette.brown.light,
        width: '100%',
        height: 'calc(33% - 5px)',
        border: theme.border.light,
        marginBottom: '5px',
        padding: '32px 15px',
        borderRadius: '5px'
    },
    w33 : {
        width: '33%'
    },
    w66 : {
        width: '66%'
    },    
    w50 : {
        width: '50%'
    }
}));

// Right side of the dashboard
const MainContent = ({data}) => {

    const recordTableData = [
        {"Dataset Name":data.datasetName},
        {"Institution Code":data.institutionCode},
        {"Basis of Record":data.basisOfRecord},
        {"Date Identified":data.dateIdentified},
        {"Identification ID":data.identificationID},
        {"Recorded By":data.recordedBy},
        {"Identified By":data.identifiedBy},
    ]

    const eventTableData = [
        {"Day":data.day},
        {"Month":data.month},
        {"Year":data.year},
        {"Event Date":data.eventDate},
        {"Event Time":data.eventTime},
        {"Verbatim Event Date":data.verbatimEventDate},
    ]

    const taxonTableData = [
        {"Kingdom":data.kingdom},
        {"Phylum":data.phylum},
        {"Class":data.class},
        {"Order":data.order},
        {"Family":data.family},
        {"Genus":data.genus},
        {"Specific Epithet":data.specificEpithet},
        {"Infraspecific Epithet":data.infraspecificEpithet},
        {"Scientific Name":data.scientificName},
        {"Taxon ID":data.taxonID},
        {"Rank":data.taxonRank},
        {"Taxonomic Status":data.taxonomicStatus},
    ]

    const locationTableData = [
        {"Coordinate Uncertainty In Meters":data.coordinateUncertaintyInMeters},
        {"Country or Area":data.country},
        {"Country Code":data.countryCode},
        {"Decimal Latitude":data.decimalLatitude},
        {"Decimal Longitude":data.decimalLongitude},
        {"Geodetic Datum":data.geodeticDatum},
        {"State Province":data.stateProvince},
        {"Verbatim Locality":data.verbatimLocality},
    ];

    const otherTableData = [
        {"Identifier":data.identifier},
        {"Record License":data.license},
        {"Modified":data.modified},
        {"References":data.references},
        {"Rights":data.rights},
        {"Rights Holder":data.rightsHolder},
    ];

    const classes = useStyles();

    const HeadingBody = () => {
        return (
            <Typography variant="body1">English Common Name: <b>{data.vernacularName}</b></Typography>
        )
    }

    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <PageHeader heading={data.scientificName} HeadingBody={HeadingBody}/> 
            <Grid item className={classes.results}>
                <Container maxWidth="xl">
                    <Grid container direction="column" wrap="nowrap">
                        <Grid item className={classes.section}>
                            <SectionHeader heading="Overview" subtext="General information for this record."/>
                            <Grid container direction="row" justify="space-evenly" alignItems="stretch" spacing={2}>
                                <Grid item className={classes.w33}>
                                    <Grid container direction="column" justify="space-evenly" alignItems="stretch">
                                        <Grid className={classes.paper} item>
                                            <Grid container direction="row" alignItems="center" spacing={2} >
                                                <Grid item><AssignmentIcon/> </Grid>
                                                <Grid item><Typography variant="h4">{data.taxonRank}</Typography></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className={classes.paper} item>
                                            <Grid container direction="row" alignItems="center" spacing={2} >
                                                <Grid item><LocationOnIcon /></Grid>
                                                <Grid item><Typography variant="h4">{data.country}</Typography></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className={classes.paper} item>
                                            <Grid container direction="row" alignItems="center" spacing={2} >
                                                <Grid item><WatchLaterIcon/></Grid>
                                                <Grid item><Typography variant="h4"><Moment format="MMM DD, YYYY">{data.eventDate}</Moment></Typography></Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.w66}>
                                    <OccurrenceTable data={recordTableData}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.section}>
                            <SectionHeader heading="Location" subtext="Location recorded by the publisher of this occurrence."/>
                            <Paper elevation={0} className={classes.mapContainer}>
                                <MapboxGLMap taxonKey={data.taxonKey} width={1024} height={400}/>
                            </Paper>
                            <OccurrenceTable data={locationTableData}/>
                        </Grid>
                        <Grid item className={classes.section}>
                            <SectionHeader heading="Published Images" subtext="Note: Click each image for a larger view."/>
                            <Paper elevation={0}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container direction="row" spacing={2} className={classes.cardContainer}>
                                            {data.media?.map((image,i) => (
                                                <Grid item key={i}>
                                                    <ImageCard image={image.identifier} place={i+1}/>
                                                </Grid>
                                            ))}   
                                        </Grid>
                                        <Divider/>
                                    </Grid>
                                    <Grid item>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <ImageTable data={data.media}/>
                        </Grid>
                        <Grid item className={classes.section}>
                            <SectionHeader heading="Event" subtext="Information regarding the time of the occurrence."/>
                            <OccurrenceEvent day={data.day} month={data.month} year={data.year}/>
                            <OccurrenceTable data={eventTableData}/>
                        </Grid>                    
                        <Grid item className={classes.section}>
                            <SectionHeader heading="Taxon" subtext=""/>
                            <OccurrenceTable data={taxonTableData}/>
                        </Grid>
                        <Grid item className={classes.section}>
                            <SectionHeader heading="Other" subtext=""/>
                            <OccurrenceTable data={otherTableData}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    )
}

const Occurrence = () => {
    let { id } = useParams();

    const { 
        isLoading,
        data,
        error,
        execute
    } = useFetchOccurrence();

    useEffect(() => {
        try {
            execute({id});
        } catch (error) {}
    }, [execute]);

    console.log(data);
    return (
        <>
            {data && <MainContent data={data}/>}
        </>
    )
}

export default Occurrence

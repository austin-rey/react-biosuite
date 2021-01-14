import React from 'react'
import PropTypes from 'prop-types'
import { Container, Grid, Button, Paper } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.brown.light,
    },
    showcase: {
       minHeight: '400px',
       marginBottom: '10px'
    },
    headerBG: {
        backgroundColor: theme.palette.brown.main,
    },
    contentHeader: {
        padding: '20px 40px'
    },
    contentBody: {
        padding: '20px 60px',
        backgroundColor: theme.palette.brown.light,
    }
}));

const Landing = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
             <div className={classes.headerBG}>
                <Container maxWidth="xl" >
                    <Grid container direction="column" className={classes.contentHeader}>
                        <h1>BIOSUITE</h1>
                        <p>An application for <b>researchers, students and professionals</b> to explore published data on all living organisms across the world. Our data is sourced from GBIF (Global Biodiversity Information Facility), a data infrastructure whos purpose is to provide anyone, anywhere, open access to data about all types of life on Earth. Below you can see what kind of information is contained in this application and how it can be accessed.</p>
                    </Grid>
                </Container>
            </div>
            <Container maxWidth="xl">
                <Grid container direction="column" className={classes.contentBody}>
                    <Grid item>
                        <h2>Species Data</h2>
                        <p>Biosuite provides a search tool to access recorded species and explore associated occurrences and datasets per each result. We categorize information along taxonomic, geographic, and thematic lines, or some combination of the three.</p>
                        <Paper elevation={0} className={classes.showcase}></Paper>
                        <Button variant="contained" color="primary" disableElevation>explore species</Button>
                    </Grid>
                    <Grid item>
                        <h2>Occurrence Data</h2>
                        <p>Most of the data accessible on this website includes recorded occurrences, which can be general locality information or precise coordinates in which the species was observed.</p>
                        <Paper elevation={0} className={classes.showcase}></Paper>
                        <Button variant="contained" color="primary" disableElevation>explore occurrences</Button>
                    </Grid>
                    <Grid item>
                        <h2>Creditable Publishers</h2>
                        <p>The data for this website is published by credible organizations who maintain datasets on species which follow imposed standards outlined by GBIF. We provide a robust searching tool that allows you to explore species recorded in each of these datasets.</p>
                        <Paper elevation={0} className={classes.showcase}></Paper>
                        <Button variant="contained" color="primary" disableElevation>explore publishers</Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

Landing.propTypes = {

}

export default Landing

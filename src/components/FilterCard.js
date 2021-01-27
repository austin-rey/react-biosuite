import React from 'react'

import PropTypes from 'prop-types'

import { Grid,Accordion,AccordionSummary,AccordionDetails,FormGroup,FormControlLabel,Checkbox,Divider,Typography } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    filterContainer: {
        borderRadius: '5px',
        margin: '10px 0px',
        border: theme.border.brown
    },
    accordionSummary: {
        borderBottom: theme.border.light
    },
    accordion: {
        boxShadow: 'none'
    },
    formLabel: {
        display: 'flex',
        fontFamily: 'Khula, Raleway, sans-serif',
        fontSize: '1rem',
    },
    resultsCount: {
        margin: '0px 0px 0px 25px',
        display: 'flex',
        justifySelf: 'center',
        padding: '5px',
        color: "#4F5837"
    },
}));

const FilterCard = ({facet,facetIndex,onChange,selectedFilters,loading,highertaxonNames}) => {
    const classes = useStyles();
    console.log(highertaxonNames)
    console.log(facet)
    return (
        <Grid key={facetIndex} item className={classes.filterContainer}>
            <Accordion className={classes.accordion} defaultExpanded={facetIndex==2}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="filter-accordion"
                    className={classes.accordionSummary}
                >
                    <Typography variant="h4">{facet.field.split('_').join(' ')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {facet.counts.map((fieldOptions, fieldIndex) => (
                            <>
                            {console.log(highertaxonNames[fieldOptions.name])}
                                <FormControlLabel
                                    className={classes.formLabel}
                                    labelPlacement="end"
                                    disabled={loading}
                                    key={fieldIndex}
                                    onChange={onChange}
                                    control={<Checkbox checked={Object.values(selectedFilters[facetIndex])[1]?.includes(fieldOptions.name)}/>}
                                    label={(facet.field !== "HIGHERTAXON_KEY")
                                    ?<Typography variant="h6">{fieldOptions.name.split('_').join(' ').toLowerCase()}</Typography>
                                    :<Typography variant="h6">{highertaxonNames[fieldOptions.name].toLowerCase()}</Typography>
                                    }
                                    value={fieldOptions.name}
                                    name={facet.field}
                                />
                                <Typography variant="body2" className={classes.resultsCount} >{fieldOptions.count} Results</Typography>
                            </>
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </Grid>
       
    )
}

FilterCard.propTypes = {

}

export default FilterCard

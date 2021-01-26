import React from 'react'

import {makeStyles} from '@material-ui/core/styles';

import { Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        border: theme.border.light,
    },
    w50: {
        width: '50%'
    },
    table: {
        borderRadius: '5px',
    },
    tableHead: {
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px',
        backgroundColor: theme.palette.brown.light,
    },
}));

const OccurrenceTable = ({data}) => {
    const classes = useStyles();
    return (
        <Paper elevation={0} className={classes.root}>
            <TableContainer className={classes.table}>
                <Table aria-label="Occurrence table" size="small">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell variant="head" align="center"><Typography variant="h4">Record</Typography></TableCell>
                        <TableCell variant="head" align="center"><Typography variant="h4">Value</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row,i) => (
                        <TableRow key={i}>
                            <TableCell className={classes.w50} variant="body" align="center"><Typography variant="body2">{Object.keys(row)}</Typography></TableCell>
                            <TableCell className={classes.w50} variant="body" align="center"><Typography variant="body2">{Object.values(row)}</Typography></TableCell>
                        </TableRow>
                    ))}

                </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default OccurrenceTable

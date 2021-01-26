import React from 'react'

import {makeStyles} from '@material-ui/core/styles';

import { Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '10px',
        border: theme.border.light,
    },
    w50: {
        width: '50%'
    },
    placeHolder: {
        backgroundColor: theme.palette.yellow.main,
        margin: 'auto',
        color: '#fff',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '2px'
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

const ImageTable = ({data}) => {
    const classes = useStyles();
    return (
        <Paper elevation={0} className={classes.root}>
            <TableContainer className={classes.table}>
                <Table aria-label="simple table" size="small">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell variant="head" align="center"><Typography variant="h6">ID</Typography></TableCell>
                        <TableCell variant="head" align="center"><Typography variant="h6">Creator</Typography></TableCell>
                        <TableCell variant="head" align="center"><Typography variant="h6">Publisher</Typography></TableCell>
                        <TableCell variant="head" align="center"><Typography variant="h6">Record License</Typography></TableCell>
                        <TableCell variant="head" align="center"><Typography variant="h6">References</Typography></TableCell>
                        <TableCell variant="head" align="center"><Typography variant="h6">Created</Typography></TableCell>
                        <TableCell variant="head" align="center"><Typography variant="h6">Rights Holder</Typography></TableCell>
                        <TableCell variant="head" align="center"><Typography variant="h6">Identifier</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row,i) => (
                        <TableRow key={i}>
                            <TableCell variant="body" align="center"><div className={classes.placeHolder}><Typography variant="body1"><b>{i+1}</b></Typography></div></TableCell>
                            <TableCell variant="body" align="center"><Typography variant="body2">{row.creator}</Typography></TableCell>
                            <TableCell variant="body" align="center"><Typography variant="body2">{row.publisher}</Typography></TableCell>
                            <TableCell variant="body" align="center"><Typography variant="body2"><a href={row.license} target="_blank">License</a></Typography></TableCell>
                            <TableCell variant="body" align="center"><Typography variant="body2"><a href={row.references} target="_blank">License</a></Typography></TableCell>
                            <TableCell variant="body" align="center"><Typography variant="body2">{row.created}</Typography></TableCell>
                            <TableCell variant="body" align="center"><Typography variant="body2">{row.rightsHolder}</Typography></TableCell>
                            <TableCell variant="body" align="center"><Typography variant="body2"><a href={row.identifier} target="_blank">View Image</a></Typography></TableCell>
                        </TableRow>
                    ))}

                </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default ImageTable

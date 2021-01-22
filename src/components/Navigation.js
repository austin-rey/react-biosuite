import {makeStyles} from '@material-ui/core/styles';

import { AppBar,Toolbar,Button,Typography,Container } from '@material-ui/core';

import {BrowserRouter as Router,Link} from "react-router-dom";

import EcoIcon from '@material-ui/icons/Eco';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.green.dark,
    },
    appBar: {
      boxShadow: 'none',
      backgroundColor: theme.palette.green.dark,

    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none'
    },
    icon: {
      marginRight: '5px'
    }
}));

const Navigation = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <Container maxWidth="xl">
            <Router>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <EcoIcon className={classes.icon}/>
                        <Typography variant="h5" className={classes.title}>
                        BioSuite
                        </Typography>
                        <Link className={classes.navLink} to="/"><Button color="inherit">Home</Button></Link>
                        <Link className={classes.navLink} to="/search/species/"><Button color="inherit">Species</Button></Link>
                        <Link className={classes.navLink} to="/search/publisher/"><Button color="inherit">Publishers</Button></Link>
                    </Toolbar>
                </AppBar>
            </Router>
          </Container>
      
      </div>
    )
}

export default Navigation;
import {makeStyles} from '@material-ui/core/styles';

import { AppBar,Toolbar,Button,Typography,Container } from '@material-ui/core';

import {BrowserRouter as Router,Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.green.main,
    },
    appBar: {
      boxShadow: 'none',
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
                        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <span>o</span>
                        </IconButton> */}
                        <Typography variant="h6" className={classes.title}>
                        BioSuite
                        </Typography>
                        <Button color="inherit"><Link className={classes.navLink} to="/search/species/">Species</Link></Button>
                        <Button color="inherit"><Link className={classes.navLink} to="/search/occurrence/">Occurrences</Link></Button>
                        <Button color="inherit"><Link className={classes.navLink} to="/search/publisher/">Publishers</Link></Button>
                    </Toolbar>
                </AppBar>
            </Router>
          </Container>
      
      </div>
    )
}

export default Navigation;
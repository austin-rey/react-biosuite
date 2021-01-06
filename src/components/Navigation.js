import {makeStyles} from '@material-ui/core/styles';

import { AppBar,Toolbar,Button,Typography,IconButton } from '@material-ui/core';

import {BrowserRouter as Router,Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
      navLink: {}
}));

const Navigation = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <span>o</span>
                        </IconButton> */}
                        <Typography variant="h6" className={classes.title}>
                        BioSuite
                        </Typography>
                        <Button color="inherit"><Link className={classes.navLink} to="/search/species/1">Species</Link></Button>
                        <Button color="inherit"><Link className={classes.navLink} to="/search/occurrence/1">Occurrences</Link></Button>
                        <Button color="inherit"><Link className={classes.navLink} to="/search/publisher/1">Publishers</Link></Button>
                    </Toolbar>
                </AppBar>
            </Router>
      
      </div>
    )
}

export default Navigation;
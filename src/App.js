import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Container,CssBaseline,createMuiTheme,ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Navigation from './components/Navigation'
import Footer from './components/Footer'

import Landing from './pages/Landing'
import Search from './pages/Search'
import Occurrence from './pages/Occurrence'
import Publisher from './pages/Publisher'
import Species from './pages/Species'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7B8167"
    },
    secondary: {
      main: "#ffa500"
    },
    brown: {
      light: "#F0E9E1",
      main: "#E6DFD6",
      dark: "#6F6255"
    },
    grey: {
      light: "#F5F6F8"
    },
    green: {
      light: "#B5B7A6",
      main: "#898E77",
      dark: "#5E6647"
    }
  },
  typography: {
    h1: {
      fontFamily: 'Assistant, Alegreya Sans, sans-serif',
      fontSize: '3rem',
      margin: '1rem 0rem',
    },
    h2: {
      fontFamily: 'Mukta Vaani, Work Sans, Raleway',
      letterSpacing: '0.5px',
      fontSize: '2rem',
      margin: '0.66rem 0rem',
    },
    h3: {
      fontFamily: 'Mukta Vaani, Raleway sans-serif',
      letterSpacing:' 0.5px',
      fontSize: '1.7rem',
      margin: '0.56rem 0rem',
    },
    h4: {
      fontFamily: 'Raleway, sans-serif',
      letterSpacing: '0.5px',
      fontSize: '1.3rem',
      margin: '0.42rem 0rem',
    },
    h5: {
      fontFamily: 'Raleway, sans-serif',
      letterSpacing: '0.5px',
      fontSize: '1.1rem',
      margin: '0.36rem 0rem',
    },
    h6: {
      fontFamily: 'Raleway, sans-serif',
      letterSpacing: '0.5px',
      fontSize: '1rem',
      margin: '0.33rem 0rem',
    },
    body1: {
      fontFamily: 'Khula, Raleway, sans-serif',
      fontSize: '1.2rem',
    }, //<p>
    body2: {
      fontFamily: 'Khula, Raleway, sans-serif',
      fontSize: '1rem',
    }, //<li>
    button: {
      fontFamily: 'Mukta Vaani,Raleway, sans-serif',
      // fontWeight: 'bold',
      fontSize: '1rem',
    }
  }
});

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
  container: {
    padding: '10px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Navigation />
        <Router>
          <Route exact path='/'>
            <Landing/>
          </Route>
          <Route exact path='/search/species/'>
            <Search type="species"/>
          </Route>
          <Route exact path='/search/occurrence/'>
            <Search type="occurrence"/>
          </Route>
          <Route exact path='/search/publisher/'>
            <Search type="publisher"/>
          </Route>

          <Route exact path='/species/:id'>
            <Species/>
          </Route>
          <Route exact path='/occurrence/:id'>
            <Occurrence/>
          </Route>
          <Route exact path='/publisher/:id'>
            <Publisher/>
          </Route>
        </Router>
        <Footer/>
      </div>
    </ThemeProvider>
  );
}

export default App;

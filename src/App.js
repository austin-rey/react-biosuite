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
      main: "#5E6647"
    },
    secondary: {
      main: "#6F6255"
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
    },
    yellow: {
      main: "#ffa500"
    }
  },
  typography: {
    h1: {
      fontFamily: 'Assistant, Alegreya Sans, sans-serif',
      fontSize: '3rem',
      margin: '1rem 0rem',
      color: "#51473D"
    },
    h2: {
      fontFamily: 'Mukta Vaani, Work Sans, Raleway',
      letterSpacing: '0.5px',
      fontSize: '2rem',
      margin: '0.66rem 0rem',
      color: "#51473D"

    },
    h3: {
      fontFamily: 'Mukta Vaani, Raleway sans-serif',
      letterSpacing:' 0.5px',
      fontSize: '1.7rem',
      margin: '0.56rem 0rem',
      color: "#51473D"

    },
    h4: {
      fontFamily: 'Mukta Vaani, Raleway, sans-serif',
      letterSpacing: '0.5px',
      fontSize: '1.3rem',
      margin: '0.42rem 0rem',
      color: "#51473D"

    },
    h5: {
      fontFamily: 'Raleway, sans-serif',
      letterSpacing: '0.5px',
      fontSize: '1.1rem',
      margin: '0.36rem 0rem',
    },
    h6: {
      fontFamily: 'Work Sans, sans-serif',
      fontSize: '1rem',
      margin: '0.33rem 0rem',
      color: "#51473D"

    },
    body1: {
      fontFamily: 'Khula, Raleway, sans-serif',
      fontSize: '1rem',
      margin: '0.33rem 0rem',
    },
    body2: {
      fontFamily: 'Khula, Work Sans, sans-serif',
      fontSize: '.8rem',
      margin: '0.26rem 0rem',
    },
    button: {
      fontFamily: 'Mukta Vaani,Raleway, sans-serif',
      // fontWeight: 'bold',
      fontSize: '1rem',
    }
  },
  border: {
    brown: '1px solid #D8CFC6',
    green: '1px solid #989C86',
    light: '1px solid #E9ECEF',
    dark: '1px solid #343A40'
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

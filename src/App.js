import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Container,CssBaseline,createMuiTheme,ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Navigation from './components/Navigation'

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
    }
  }
});

const useStyles = makeStyles({
  root: {},
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
      </div>
    </ThemeProvider>
  );
}

export default App;

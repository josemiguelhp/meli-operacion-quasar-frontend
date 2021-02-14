import React, { Component } from 'react';
import {Route,Switch, Redirect} from 'react-router-dom';
import Home from './components/Home';
import About from './components/TopSecret';
import Messages from './components/TopSecretSplit';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './components/ProTip';
import NavBar from './components/topbar/NavBar'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Jose Miguel Hernandez Perez
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class App extends Component {
  render() {
    return (
      <div>
      <NavBar/>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography align='center' variant="h3" component="h1" gutterBottom>
          Servicio de inteligencia Rebelde
          </Typography>
          <div className="App-intro">
            <Switch> 
              <Route exact path="/" component={Home}/>
              <Route path="/topsecret" component={Messages}/>
              <Route path="/topsecret-split" component={About}/>
              <Redirect to="/" />
            </Switch>  
        </div>
          <ProTip align='center'/>
          <Copyright />
        </Box>
      </Container>
      </div>
    );
  }
}
export default App;
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home'
import TopSecret from './components/top-secret/TopSecret'
import TopSecretSplit from './components/top-secret-split/TopSecretSplit'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import ProTip from './components/ProTip'
import NavBar from './components/topbar/NavBar'
import { Grid, makeStyles } from '@material-ui/core'
import Monitor from './components/monitor/Monitor'
import MyProvider from './utils/MyProvider'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">Jose Miguel Hernandez Perez</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function App() {
  const classes = useStyles()
  return (
    <MyProvider>
      <NavBar />
      <Container maxWidth="lg">
        <Box marginY={10}>
          <Typography align="center" variant="h3" component="h1" gutterBottom>
            Servicio de inteligencia Rebelde
          </Typography>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Monitor />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/topsecret" component={TopSecret} />
                  <Route path="/topsecret-split" component={TopSecretSplit} />
                  <Redirect to="/" />
                </Switch>
              </Grid>
            </Grid>
          </div>
          <ProTip align="center" />
          <Copyright />
        </Box>
      </Container>
    </MyProvider>
  )
}

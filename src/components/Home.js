import { makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
}))

export default function Home() {
  const classes = useStyles()
  return (
    <div>
      <Paper elevation={3} className={classes.root}>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          Home
        </Typography>
        <Typography align="center" gutterBottom>
          Han Solo ha sido recientemente nombrado General de la Alianza Rebelde
          y busca dar un gran golpe contra el Imperio Galáctico para reavivar la
          llama de la resistencia. El servicio de inteligencia rebelde ha
          detectado un llamado de auxilio de una nave portacarga imperial a la
          deriva en un campo de asteroides. El manifiesto de la nave es ultra
          clasificado, pero se rumorea que transporta raciones y armamento para
          una legión entera.
        </Typography>
      </Paper>
    </div>
  )
}

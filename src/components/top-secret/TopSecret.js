import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Box, Button, makeStyles, TextField } from '@material-ui/core'

import swal from 'sweetalert'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  input: {
    margin: '4px',
  },
}))

const TopSecret = () => {
  const classes = useStyles()
  const [disableSend, setDisableSend] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const names = ['kenobi', 'skywalker', 'sato']
    //load distances
    const distances = [
      event.target[0].value,
      event.target[2].value,
      event.target[4].value,
    ]
    const messages = [
      event.target[1].value,
      event.target[3].value,
      event.target[5].value,
    ]
    //validamos
    for (let n of distances) {
      if (n === '') {
        swal({
          text: `Todas las distancias son requeridas!`,
          icon: 'warning',
        })
        return
      } else if (!Number(+n)) {
        swal({
          text: `${n} no es una distancia valida!`,
          icon: 'warning',
        })
        return
      }
    }

    for (let s of messages) {
      if (s === '') {
        swal({
          text: `Todas los mensajes son requeridos!`,
          icon: 'warning',
        })
        return
      }
      for (let split of s.split(',')) {
        if (!/\".*?\"/.test(split)) {
          swal({
            text: `${s} Los mensajes deben ser de la forma "","",""`,
            icon: 'warning',
          })
          return
        }
      }
    }
    //hacemos el request
    const satellites = []
    for (let i = 0; i < distances.length; i++) {
      satellites.push({
        name: names[i],
        distances: distances[i],
        message: messages[i].split(',').map((text) => JSON.parse(text)),
      })
    }
    //disableamos el boton
    setDisableSend(true)
    //enviamos
    axios
      .post(
        `https://meli-operacion-quarsar.azurewebsites.net/api/v1/topsecret`,
        {
          satellites: satellites,
        },
      )
      .then((res) => {
        setDisableSend(false)
        console.log(res)
        swal({
          text: `Se ha triangulado la nave en la posicion
                   (${res.data.positon.x},${res.data.positon.y})
                   y se ha obtenido el siguiente mensaje => ${res.data.message}`,
          icon: 'success',
        })
      })
      .catch((error) => {
        console.log(error)
        setDisableSend(false)
        let message = 'Fallo al intentar cargar las observaciones'
        if (error.response) {
          message = error.response.data.message
        }
        swal({
          text: message,
          icon: 'error',
        })
      })
  }

  const getFormSet = (name) => {
    return (
      <div>
        <Typography align="center" component="h4" gutterBottom>
          {name}
        </Typography>
        <Box marginY={4} align="center">
          <TextField
            id="standard-basic"
            className={classes.input}
            label="Distancia"
            name={`distance${name}`}
          />
          <TextField
            id="standard-basic"
            className={classes.input}
            label='Mensaje ("","","")'
          />
        </Box>
      </div>
    )
  }

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Cargar observaciones conjuntas
      </Typography>
      <form onSubmit={handleSubmit}>
        {getFormSet('Kenobi')}
        {getFormSet('Skywalker')}
        {getFormSet('sato')}
        <Box marginY={4} align="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={disableSend}
          >
            Enviar!
          </Button>
        </Box>
      </form>
    </Paper>
  )
}

export default TopSecret

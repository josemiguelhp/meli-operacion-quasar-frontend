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

const TopSecretSplit = () => {
  const classes = useStyles()
  const [disableSend, setDisableSend] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    //load distances
    const name = event.target[0].value
    const distance = event.target[1].value
    const message = event.target[2].value

    //validamos
    if (name === '') {
      swal({
        text: `el nombre es requerido!`,
        icon: 'warning',
      })
      return
    }
    if (distance === '') {
      swal({
        text: `la distancia es requerida!`,
        icon: 'warning',
      })
      return
    } else if (!Number(+distance)) {
      swal({
        text: `${distance} no es una distancia valida!`,
        icon: 'warning',
      })
      return
    }

    if (message === '') {
      swal({
        text: `El mensaje es requerido!`,
        icon: 'warning',
      })
      return
    }
    for (let split of message.split(',')) {
      if (!/\".*?\"/.test(split)) {
        swal({
          text: `${message} Los mensajes deben ser de la forma "","",""`,
          icon: 'warning',
        })
        return
      }
    }
    //disableamos el boton
    setDisableSend(true)
    //enviamos
    axios
      .post(
        `https://meli-operacion-quarsar.azurewebsites.net/api/v1/topsecret_split/${name}`,
        {
          distance: distance,
          message: message.split(',').map((text) => JSON.parse(text)),
        },
      )
      .then((res) => {
        setDisableSend(false)
        console.log(res)
        swal({
          text: `Observacion actualizada correctamente!`,
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
    event.target[0].value = ''
    event.target[1].value = ''
    event.target[2].value = ''
  }

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Cargar una observacion de un solo Satelite
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box marginY={4} align="center">
          <TextField
            id="standard-basic"
            className={classes.input}
            label="Nombre"
          />
          <TextField
            id="standard-basic"
            className={classes.input}
            label="Distancia"
          />
          <TextField
            id="standard-basic"
            className={classes.input}
            label='Mensaje ("","","")'
          />
        </Box>
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

export default TopSecretSplit

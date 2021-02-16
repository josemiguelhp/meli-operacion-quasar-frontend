import React from 'react'
import { Typography, Button, Box } from '@material-ui/core'
import axios from 'axios'

export default class Clock extends React.Component {
  FETCH_EVERY = 30

  constructor(props) {
    super(props)
    this.setSatellites = props.setSatellites
    this.setErrorMessage = props.setErrorMessage
    this.state = { counter: this.FETCH_EVERY }
    this.isRequestDone = true
    //hacemos esto porque cuando se llame desde el boton el this va a ser el del componente boton!
    this.updateSatellites = this.updateSatellites.bind(this)
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    //actualiza este componente
    this.setState({ counter: this.state.counter - 1 })
    //verificamos que ya no haya llegado al tiempo para hacer el fetch
    if (this.state.counter <= 0) {
      this.updateSatellites()
    }
  }

  updateSatellites() {
    //reiniciamos el contador
    this.setState({ counter: this.FETCH_EVERY })
    //hacemos el fetch
    if (this.isRequestDone) {
      this.isRequestDone = false
      axios
        .get(
          `https://meli-operacion-quarsar.azurewebsites.net/api/v1/satellites`,
        ) //se deberia parametrizar
        .then((res) => {
          let satellitesCurated = res.data.map((satellite) => {
            return {
              id: satellite.id,
              name: satellite.name,
              position: `(${satellite.position.x},${satellite.position.y})`,
              distance:
                satellite.distance === -1
                  ? 'Sin Observacion'
                  : satellite.distance,
              message: !satellite.message
                ? 'Sin Observacion'
                : JSON.stringify(satellite.message),
            }
          })
          this.setSatellites(satellitesCurated)
          this.setErrorMessage('')
          this.isRequestDone = true
        })
        .catch((error) => {
          console.log(error)
          this.isRequestDone = true
          this.setErrorMessage(
            'Ha ocurrido un error en la ultima vez que se intento actualizar la tabla..',
          )
        })
    }
  }

  render() {
    return (
      <Box textAlign="center" marginY={3}>
        <Typography {...this.props} component="h3" gutterBottom>
          Quedan {this.state.counter} segundos para actualizar el estado de los
          satelites!
        </Typography>
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={this.updateSatellites}
          >
            Actualizar ahora!
          </Button>
        </Box>
      </Box>
    )
  }
}

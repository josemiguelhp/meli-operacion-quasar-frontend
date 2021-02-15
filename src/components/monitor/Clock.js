import React from 'react';
import { Typography, Button,Box } from '@material-ui/core';

export default class Clock extends React.Component {
    
    FETCH_EVERY = 30;

    constructor(props) {
      super(props);
      this.state = {counter: this.FETCH_EVERY};
      //hacemos esto porque cuando se llame desde el boton el this va a ser el del componente boton!
      this.updateSatellites = this.updateSatellites.bind(this);
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() { 
      //actualiza este componente  
      this.setState({counter: this.state.counter-1});  
      //verificamos que ya no haya llegado al tiempo para hacer el fetch
      if(this.state.counter<=0){
          this.updateSatellites();
      }  
    }

    updateSatellites(){
        //reiniciamos el contador
        this.setState({counter: this.FETCH_EVERY});
    }

    render() {
      return (
        <Box textAlign='center' marginY={3}>
          <Typography {...this.props} component="h3" gutterBottom>
              Quedan {this.state.counter} segundos para actualizar el estado de los satelites!
          </Typography>
          <Box textAlign='center'>
          <Button variant="contained" color="primary" onClick={this.updateSatellites}>
            Actualizar ahora!
          </Button>
          </Box>
        </Box>
      );
    }
  }
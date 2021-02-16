import { Component } from 'react'
import MyContext from './MyContext'

export default class MyProvider extends Component {
  //podriamos pasar el estado desde la raiz App.js pero tendriamos que ir pasandolo componente a componente a traves de las props
  //con el contexto cada componente puede directamente obtenerlo
  state = {}

  render() {
    return (
      <MyContext.Provider value={{}}>{this.props.children}</MyContext.Provider>
    )
  }
}

import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export default function SimpleMenu() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleGetShip = () => {
    axios
      .get(
        `https://meli-operacion-quarsar.azurewebsites.net/api/v1/topsecret_split`,
      )
      .then((res) => {
        console.log(res)
        swal({
          text: `Observacion actualizada correctamente!`,
          icon: 'success',
        })
      })
      .catch((error) => {
        let message = 'Fallo al intentar cargar las observaciones'
        if (error.response) {
          message = error.response.data.message
        }
        swal({
          text: message,
          icon: 'error',
        })
      })
    handleClose()
  }

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/">
          Home
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/topsecret">
          Cargar observaciones conjuntas
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/topsecret-split">
          Cargar observacion de un solo satelite
        </MenuItem>
        <MenuItem onClick={handleGetShip} component={Link}>
          Obtener Nave con ultimas observaciones
        </MenuItem>
      </Menu>
    </div>
  )
}

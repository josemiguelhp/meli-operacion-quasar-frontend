import {
  makeStyles,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Box,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import NameIcon from '@material-ui/icons/Satellite'
import PositionIcon from '@material-ui/icons/LocationSearching'
import DistanceIcon from '@material-ui/icons/UnfoldLess'
import MessageIcon from '@material-ui/icons/Mail'
import Clock from './Clock'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 340,
  },
  tableHeader: {
    paddingRight: 4,
    paddingLeft: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
    textAlign: 'center',
    whiteSpace: 'normal',
  },
}))

export default function Monitor() {
  const classes = useStyles()
  const [satellites, setSatellites] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const getSatellitesCells = () => {
    return satellites.map((n) => {
      return (
        <TableRow>
          <TableCell component="th" scope="row" className={classes.TableCell}>
            {n.name}
          </TableCell>
          <TableCell numeric className={classes.tableCell}>
            {n.position}
          </TableCell>
          <TableCell numeric className={classes.tableCell}>
            {n.distance}
          </TableCell>
          <TableCell numeric className={classes.tableCell}>
            {n.message}
          </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <Paper className={classes.root}>
      <Box component="div" display="block">
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>
                <div>
                  <NameIcon />
                </div>
                Nombre
              </TableCell>
              <TableCell numeric className={classes.tableHeader}>
                <div>
                  <PositionIcon />
                </div>
                Posicion
              </TableCell>
              <TableCell numeric className={classes.tableHeader}>
                <div>
                  <DistanceIcon />
                </div>
                Distancia (Observada)
              </TableCell>
              <TableCell numeric className={classes.tableHeader}>
                <div>
                  <MessageIcon />
                </div>
                Mensaje Detectado
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{getSatellitesCells()}</TableBody>
        </Table>
        <Clock
          align="center"
          marginTop={3}
          setSatellites={setSatellites}
          setErrorMessage={setErrorMessage}
        />
        <Typography align="center" gutterBottom>
          {errorMessage}
        </Typography>
      </Box>
    </Paper>
  )
}

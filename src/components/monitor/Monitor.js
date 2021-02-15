import { makeStyles, Paper, Table, TableCell, TableHead, TableRow, TableBody, Box } from '@material-ui/core';
import React, { useState } from 'react';
import NameIcon from '@material-ui/icons/Satellite';
import PositionIcon from '@material-ui/icons/LocationSearching';
import DistanceIcon from '@material-ui/icons/UnfoldLess';
import MessageIcon from '@material-ui/icons/Mail';
import Clock from './Clock';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        fontWeight: 'bold'
      },
      tableCell: {
        paddingRight: 4,
        paddingLeft: 5,
        textAlign: 'center', 
        whiteSpace: "normal"
    }
  }));
  
  let id = 0;
  function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
  }
  
  const data = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0,  'anita lava la tina en toallas blancas'),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];  

export default function Monitor() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
        <Box component="div" display="block">
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}><div><NameIcon/></div>Nombre</TableCell>
            <TableCell numeric className={classes.tableHeader}><div><PositionIcon/></div>Posicion</TableCell>
            <TableCell numeric className={classes.tableHeader}><div><DistanceIcon/></div>Distancia (Observada)</TableCell>
            <TableCell numeric className={classes.tableHeader}><div><MessageIcon/></div>Mensaje Detectado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row" className={classes.TableCell}>
                  {n.name}
                </TableCell>
                <TableCell numeric className={classes.tableCell}>{n.calories}</TableCell>
                <TableCell numeric className={classes.tableCell}>{n.fat}</TableCell>
                <TableCell numeric className={classes.tableCell}>{n.carbs}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Clock align='center' marginTop={3} />
      </Box>
    </Paper>
  );
}
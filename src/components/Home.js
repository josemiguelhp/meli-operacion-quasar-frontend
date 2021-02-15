import { Paper, Typography } from '@material-ui/core';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Paper elevation={3}>
        <Typography align='center' variant="h4" component="h1" gutterBottom>
          Bienvenido!
        </Typography>
      </Paper>
    </div>
  );
}
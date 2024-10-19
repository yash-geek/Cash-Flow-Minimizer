import React from 'react';
import DataTabelVariable from './array';
import './home.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff7366',
    },
    secondary: {
      main: '#ff9b00',
    },
  },
});

const Home = () => {
  return (
    <div className='body'>
      <ThemeProvider theme={theme}>
        <h1>Cash Flow Minimizer</h1>
        <h3>
          Given a number of friends who have to give or take some amount of money from one another.
          Design an algorithm by which the total cash flow among all the friends is minimized.
        </h3>
        <DataTabelVariable />
      </ThemeProvider>
    </div>
  );
};

export default Home;

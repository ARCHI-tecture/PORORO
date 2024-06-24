import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
4;
import { createTheme, PaletteOptions } from '@mui/material/styles';
import { CustomPalette } from './components/type';

declare module '@mui/material/styles' {
  interface Palette {
    customPalette: CustomPalette;
  }
  interface PaletteOptions {
    customPalette?: CustomPalette;
  }
}

const theme = createTheme({
  palette: {
    customPalette: {
      mainYellow: { main: '#FFD812' },
      mainBlue: { main: '#2C4493' },
      mainOrange: { main: '#EE7005' },
      // subColor3: { main: '#654039' },
      // subColor4: { main: '#817F82' },
    },
  } as PaletteOptions,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

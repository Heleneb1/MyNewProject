import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ConfirmationProvider } from './context/ConfirmationContext';
import './styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/MyNewProject">
      <ConfirmationProvider>
        <App />
      </ConfirmationProvider>
    </BrowserRouter>
  </React.StrictMode>
);

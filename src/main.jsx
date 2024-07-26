import React from 'react';
import ReactDOM from 'react-dom/client';
import { Providers } from './providers/Providers';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Providers>
    <App />
  </Providers>,
);

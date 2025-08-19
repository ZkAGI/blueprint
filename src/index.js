import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import EcoluxuryPage from './pages/EcoLuxury';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  { path: '/', element: <App /> },                 // root just shows App (GalaxyGlobe)
  { path: '/ecoluxury', element: <EcoluxuryPage /> },
  { path: '*', element: <div style={{ padding: 24 }}>Not Found</div> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';

// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import App from './App';
// import EcoluxuryPage from './pages/EcoLuxury';
// import ListingsPage from './pages/ListingPage';
// import reportWebVitals from './reportWebVitals';

// const router = createBrowserRouter([
//   { path: '/', element: <App /> },                 // root just shows App (GalaxyGlobe)
//   { path: '/ecoluxury', element: <EcoluxuryPage /> },
//   { path: '/ecoluxury/listing', element: <ListingsPage /> },  // New listings page
//   { path: '*', element: <div style={{ padding: 24 }}>Not Found</div> },
// ]);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import EcoluxuryPage from './pages/EcoLuxury';
import ListingsPage from './pages/ListingPage';
import PropertyDetailPage from './pages/PropertyDetail';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  { path: '/', element: <App /> },                             
  { path: '/ecoluxury', element: <EcoluxuryPage /> },
  { path: '/ecoluxury/listing', element: <ListingsPage /> },            
  

  { path: '/property/:slug', element: <PropertyDetailPage /> },
  { path: '/property/:slug/:id', element: <PropertyDetailPage /> },
  
  { path: '*', element: <div style={{ padding: 24, color: 'white', backgroundColor: 'black', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Page Not Found</div> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
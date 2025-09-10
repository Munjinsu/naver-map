import React from 'react';
import { BrowserRouter, HashRouter  } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
       
        <HashRouter>
            <App />
        </HashRouter>
        
    </CookiesProvider>
);

reportWebVitals();

import RootRoutes from './routes';
import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import './assets/font/font.css';
import './assets/css/common.css';
import './assets/css/ag-theme-material.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import SplashScreen from './components/splashscreen/SplashScreen';
import { LoadingProvider, useLoading } from './constants/LoadingContext';
import { setLoadingHandler } from './assets/js/comm';
import LoadingModal from './components/comm/LoadingModal';

function App() {
    const { setLoading } = useLoading();

    const [splashComplete, setSplashComplete] = useState(() => {
        if (typeof window === 'undefined') return false;
        return !!sessionStorage.getItem('splashShown');
    });

    useEffect(() => {
        setLoadingHandler(setLoading);
    }, [setLoading]);

    return (
         <RootRoutes />
       
    );
}

export default function Root() {
    return (
        <LoadingProvider>
            <App />
        </LoadingProvider>
    );
}

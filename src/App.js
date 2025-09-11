import RootRoutes from './routes/RootRoutes';
import './App.css';
import './index.css';
import './assets/font/font.css';
import './assets/css/common.css';
import './assets/css/ag-theme-material.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
    
    return (
         <RootRoutes />
    );
}

export default function Root() {
    return (
            <App />
    );
}

import React from 'react';
import './LoadingModal.css';
import { useLoading } from '../../constants/LoadingContext';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingModal({ message = "로딩 중입니다..." }) {
    const { loading } = useLoading();
    if (!loading) return null;
    return (
        <div className="loading-modal-backdrop">
            <div>
                {/* <div className="loading-spinner" /> */}
                <CircularProgress size="5rem"/>
                <div className="loading-message">{message}</div>
            </div>
        </div>
    );
}
export default LoadingModal;

import React, { useEffect } from 'react';


const ToastPopup = ( {message, setToast, position, opacity} ) => {

    // 3초 뒤 toast를 false로 변경합니다.
    useEffect(() => {
        const timer = setTimeout(() => {
        setToast(false);
        }, 2000);

        return () => {
        clearTimeout(timer);
        };
    }, [setToast]);

    return (
        <>
            <div className='toast-popup' data-position={position} data-opacity={opacity}>
                <div className='animation-3 toast-box'>
                    <p className="text-box">{message}</p>
                </div>
            </div>

        </>
    );
};

export default ToastPopup;

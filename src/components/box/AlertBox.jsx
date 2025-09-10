import React from 'react';
import Modal from '../../components/comm/Modal';
const AlertBox = ({ isOpen, onClose, message, btnTxt, callback }) => {
    if (!isOpen) return null;

    const handleClicBtn = () => {
        if(callback) callback();

        onClose();
    }

    return (
        <Modal isOpen={isOpen} >
            <div className='modal-box' data-type="a">
                <div className='modal-top-box'>
                    <div className='title-box'>
                        <p>{message}</p>
                    </div>
                </div>

                <div className="modal-bottom-box">
                    <div className='btn-layout'>
                        <button className="btn" data-btn-type="fill-gray" data-btn-size="md"
                                onClick={handleClicBtn}> 
                            <span>{btnTxt}</span>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
)
}

export default AlertBox;

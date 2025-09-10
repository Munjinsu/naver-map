import React from 'react';
import Modal from '../../components/comm/Modal';
const ConfirmBox = ({ isOpen, setIsOpen, onCloseCallback, message, leftBtnTxt, rightBtnTxt }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <div className='modal-box' data-type="a">
                <div className='modal-top-box'>
                    <div className='title-box'>
                        <p>{message}</p>
                    </div>
                </div>

                <div className="modal-bottom-box">
                    <div className='btn-layout'>
                        <button className="btn" data-btn-type="fill-gray" data-btn-size="md"
                                onClick={() => onCloseCallback(false)}> {/* 부정 .. */}
                            <span>{leftBtnTxt}</span>
                        </button>
                        <button className="btn" data-btn-type="fill-main" data-btn-size="md"
                                onClick={() => onCloseCallback(true)}> {/* 긍정 .. */}
                            <span>{rightBtnTxt}</span>
                        </button>

                    </div>
                </div>
            </div>
        </Modal>
)
}

export default ConfirmBox;

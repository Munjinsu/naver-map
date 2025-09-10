import React from 'react';
import { motion, AnimatePresence } from "framer-motion"
import styled from 'styled-components';


const Dialog = styled.div`
    display: flex; 
    align-items: center; 
    justify-content: center; 
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    padding: 0 var(--sp-16);
    background-color: rgba(0,0,0,0.7);
    & .in-layout{
        display: flex; 
        align-items: center; 
        justify-content: center; 
        width: 100%;
        max-width: 30rem;
        height: auto;
        border-radius: var(--radius-20);
        background-color: var(--color-white);
        
    }
`;

 const Modal = ({ isOpen, setIsOpen, children}) => {


	return (
		<AnimatePresence>
			{isOpen && (
				<Dialog
					open={isOpen}
					onClose={setIsOpen}
				>
                    
                    <motion.div
                        className="in-layout"
                        initial={{
                            opacity: 0,
                            scale: 0.75,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                ease: "easeOut",
                                duration: 0.15,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.75,
                            transition: {
                                ease: "easeIn",
                                duration: 0.15,
                            },
                        }}
                    >

                        {children}
                         
                    </motion.div>
					
				</Dialog>
			)}
		</AnimatePresence>
	)
}

export default Modal;
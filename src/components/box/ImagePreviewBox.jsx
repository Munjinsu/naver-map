import styled from "styled-components";
import React, {useRef} from "react";

const StyledDiv = styled.div`
        flex: 1; 
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ccc; 
        margin-bottom: 5px; 
        padding: 10px; 
        background-color: #f0f0f0; 
    `;

const ImagePreviewBox = ({image, setImage, index, onFileListChange}) => {

    const inputRef = useRef(null);

    const handleImageChange = (event) => {

        console.log(" =============> handleImageChange : ", event);

        const file = event.target.files[0];
        console.log("================> handleImageChange index " + index + " file : ", file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage((prevState) => {
                    const newImageStates = [...prevState];
                    newImageStates[index] = {
                        image   : e.target.result,
                        fileName: file.name,
                        fileData: file,
                    };
                    return newImageStates;
                })
            };
            onFileListChange(file, index);
            reader.readAsDataURL(file);
        } else {
            setImage((prevState) => {
                const newImageStates = [...prevState];
                newImageStates[index] = {
                    image   : "",
                    fileName: "",
                    fileData: "",
                };
                return newImageStates;
            })
        }
    };

    const handleImageClick = () => {
        inputRef.current.click();
    };

    return (
        <StyledDiv onClick={handleImageClick}>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{display: 'none'}}
                onChange={handleImageChange}
            />
            {
                image ?
                    <img src={image} alt="Preview" className="preview"
                         style={{
                             maxWidth : '100%',
                             maxHeight: '100%',
                             objectFit: 'contain'
                         }}/>
                    : <p> 클릭하여 이미지를 추가해주세요 </p>
            }
        </StyledDiv>
    );
}

export default ImagePreviewBox;
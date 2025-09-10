import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';

const ImageFileAttach = forwardRef((props, ref) => {
    const [showImages, setShowImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [countImages, setCountImages] = useState(0);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useImperativeHandle(ref, () => ({
        getImages: () => {
            return imageFiles;
        }
    }));

    // 권한 결과 리스너 등록
    useEffect(() => {
        const handleMessage = (event) => {
            try {
                // React Native WebView에서 오는 메시지 처리
                let data;
                if (typeof event.data === 'string') {
                    data = JSON.parse(event.data);
                } else {
                    data = event.data;
                }

                if (data.type === 'MEDIA_PERMISSION_RESULT') {
                    setPermissionGranted(data.granted);
                    if (data.granted) {
                        // 권한이 있으면 파일 선택 트리거
                        document.getElementById('input-file').click();
                    } else {
                        alert('사진 접근 권한이 필요합니다.');
                    }
                }
            } catch (error) {
                console.log('메시지 파싱 에러:', error);
            }
        };

        // React Native WebView 전용 이벤트 리스너
        if (window.ReactNativeWebView) {
            window.addEventListener('message', handleMessage);
            document.addEventListener('message', handleMessage);
        }

        return () => {
            window.removeEventListener('message', handleMessage);
            document.removeEventListener('message', handleMessage);
        };
    }, []);

    const handleFileInputClick = (event) => {
        
         if (window.ReactNativeWebView) {
            event.preventDefault(); // 웹뷰에서는 기본 동작 막고 앱으로 메시지 전송
            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'REQUEST_MEDIA_PERMISSION'
            }));
        }
    };

    const handleAddImages = (event) => {
        const files = Array.from(event.target.files); 
        let newImageFiles = [...imageFiles];
        let newShowImages = [...showImages];

        for (let i = 0; i < files.length; i++) {
            const currentImageUrl = URL.createObjectURL(files[i]);
            newShowImages.push(currentImageUrl);
            newImageFiles.push(files[i]);
        }

        // 이미지 갯수 제한
        if (newImageFiles.length > 10) { 
            alert('10개 까지만 올릴 수 있습니다.');
            newImageFiles = newImageFiles.slice(0, 10);
            newShowImages = newShowImages.slice(0, 10);
        }

        setShowImages(newShowImages);
        setImageFiles(newImageFiles);
        setCountImages(newImageFiles.length);
    };

    // 이미지 삭제
    const handleDeleteImage = (id) => {
        URL.revokeObjectURL(showImages[id]);
        setShowImages(showImages.filter((_, index) => index !== id));
        setImageFiles(imageFiles.filter((_, index) => index !== id));
        setCountImages(imageFiles.length - 1);
    };

    return (
        <>
            <div className='image-file-attach-box'>
                <div className='img-attach-btn-box'>
                    <label htmlFor="input-file" onClick={handleFileInputClick} />
                    <input
                        type="file"
                        id="input-file"
                        accept='image/*'
                        multiple
                        onChange={handleAddImages}
                        style={{ display: 'none' }}
                    />
                    <span>{countImages}/10</span>
                </div>

                {/* 이미지 출력 */}
                <div className='img-attach-view-box scroll-hidden'>
                    {showImages.map((image, id) => (
                        <div className="imageContainer" key={id}>
                            <img src={image} alt={`${image}-${id}`} />
                            <button onClick={() => handleDeleteImage(id)} className='img-attach-del-btn'>
                                <span className='blind'>삭제</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
});

export default ImageFileAttach;
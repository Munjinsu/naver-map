import React, { useRef, useState, useEffect } from "react";
import styled, {keyframes } from 'styled-components';
import closeIcon from '../../images/common/i_back_arrow_btn_white.svg';


const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ImgViewBox = styled.div`
    animation: ${fadeIn} 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 1);
      & img {
      display: block; object-fit: cover; touch-action: manipulation;user-select: none;
      }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 999999;
  width: 32px;
  height: 32px;
  background: url(${closeIcon}) no-repeat center;
  background-size: contain;
  border: none;
`;


const LocationImageView = ({imgUrl, visible,  onClose}) => {
   
  const containerRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const lastTouchDistance = useRef(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTouchCenter = useRef(null);

  const lastPanPosition = useRef(null);

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;

  // 화면 크기 저장 (이미지 확대/이동 제한용)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 두 점 사이 거리 계산
  const getDistance = (touches) => {
    const [touch1, touch2] = touches;
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // 두 점 사이 중심점 좌표 계산
  const getCenter = (touches) => {
    const [touch1, touch2] = touches;
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };

  // 위치 제한 (이미지가 너무 많이 벗어나지 않도록)
  const clampPosition = (x, y, scale) => {
    if (!containerRef.current) return { x, y };

    const { width, height } = containerSize;

    // 이미지가 확대된 상태에서 허용하는 최대 이동 범위
    const maxX = (width * (scale - 1)) / 2;
    const maxY = (height * (scale - 1)) / 2;

    // clamp 해서 제한
    const clampedX = Math.min(maxX, Math.max(-maxX, x));
    const clampedY = Math.min(maxY, Math.max(-maxY, y));

    return { x: clampedX, y: clampedY };
  };

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      lastTouchDistance.current = getDistance(e.touches);
      lastTouchCenter.current = getCenter(e.touches);
    } else if (e.touches.length === 1) {
      lastPanPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const onTouchMove = (e) => {
    e.preventDefault();

    if (e.touches.length === 2) {
      const newDistance = getDistance(e.touches);
      const center = getCenter(e.touches);

      if (lastTouchDistance.current) {
        // 확대 배율 변화량 계산
        let scaleChange = newDistance / lastTouchDistance.current;
        let newScale = scale * scaleChange;

        // 확대 제한
        if (newScale < MIN_SCALE) newScale = MIN_SCALE;
        if (newScale > MAX_SCALE) newScale = MAX_SCALE;

        // 중심점을 기준으로 위치 보정
        // 현재 위치 + (기존 중심점 - 현재 중심점) * (스케일 변화율)
        const dx = center.x - lastTouchCenter.current.x;
        const dy = center.y - lastTouchCenter.current.y;

        let newX = position.x + dx;
        let newY = position.y + dy;

        // 확대 시 위치 보정
        const offsetX = (center.x - containerSize.width / 2);
        const offsetY = (center.y - containerSize.height / 2);

        newX = newX - offsetX * (scaleChange - 1);
        newY = newY - offsetY * (scaleChange - 1);

        // 위치 제한
        const clamped = clampPosition(newX, newY, newScale);

        setScale(newScale);
        setPosition(clamped);

        lastTouchDistance.current = newDistance;
        lastTouchCenter.current = center;
      }
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];

      if (lastPanPosition.current) {
        const dx = touch.clientX - lastPanPosition.current.x;
        const dy = touch.clientY - lastPanPosition.current.y;

        let newX = position.x + dx;
        let newY = position.y + dy;

        const clamped = clampPosition(newX, newY, scale);

        setPosition(clamped);

        lastPanPosition.current = { x: touch.clientX, y: touch.clientY };
      }
    }
  };

  const onTouchEnd = (e) => {
    if (e.touches.length < 2) {
      lastTouchDistance.current = null;
      lastTouchCenter.current = null;
    }
    if (e.touches.length === 0) {
      lastPanPosition.current = null;
    }
  };


  return (
    <>
      
      <ImgViewBox>
      <CloseButton onClick={onClose}/>
      
        <div
          className="inner-wrap"
          style={{ height: '100%' }}
          ref={containerRef}
        >
          <div 
            className="view-box" 
            style={{ height: '100%', overflow: 'hidden', position: 'relative' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
          >
            {imgUrl ? (
              <img
                src={imgUrl}
                alt="병원 위치 이미지"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: "center center",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    userSelect: "none",
                    touchAction: "none",
                }}
                draggable={false}
                />
            ) : (
              <p style={{ color: "#999", textAlign: "center" }}>
                이미지가 존재하지 않습니다.
              </p>
            )}
          </div>
        </div>
      </ImgViewBox>      
    </>
  );
};

export default LocationImageView;

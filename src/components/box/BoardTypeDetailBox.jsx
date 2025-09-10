import React, { Children } from 'react';
import styled from 'styled-components';

// 게시판 카드 박스 상세세 컴퍼넌트

const CardContent = styled.div`
    display: block;
    margin-top: var(--sp-10);
`;

const InnerBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--sp-02);
    padding: 0 var(--sp-16) var(--sp-100);
    border-radius: var(--radius-16);
    background-color: var(--color-white);
`;

const VideoFrame = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 0;
    margin-bottom: var(--sp-06);
    padding-bottom: 56.25%;
    border-radius: var(--radius-8);
    & iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;


const BoardTypeDetailBox = ({ type }) => {



    return (
        <CardContent>
            <InnerBox>
                 
                <VideoFrame>
                    <iframe
                        width="859"
                        height="621"
                        src="https://www.youtube.com/embed/o9csAaEl5fI"
                        title="[건강 매거진] 탕후루 자주 먹으면 젊은 당뇨병 오나요?"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                </VideoFrame>
                
            </InnerBox>
        </CardContent>
    );
};

export default BoardTypeDetailBox;

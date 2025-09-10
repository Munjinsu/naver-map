import React, { useState, useEffect, useRef } from 'react';
import ImgBarcode from '../../images/common/img_sample_barcode.svg';

import { Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Barcodes from 'react-barcode';


const Barcode = ({onClose}) => {

        /* swiper */
        const [swiper, setSwiper] = useState(null);
        const paginationRef = useRef(null);

        /* 세션스토리지  */
        const [userName, setUserName] = useState('');
        const [hospInfoList, setHospInfoList] = useState([]);

        useEffect(()=> {
            
            try {
                const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
                if (loginUser) {
                    setUserName(loginUser.usrNm || '');
                    setHospInfoList(loginUser.usrHsptlMap || []);
                }
            } catch (e) {
                console.error('세션스토리지 파싱 에러:', e);
            }
        },[]);

        

        /* 페이징 커스텀 */
        const pagination = {
            el: paginationRef.current,
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + '<i class="blind">' + (index + 1) + '</i>' + '</span>';
            },
        };


        const hospitalName= (val)=> {
        var hosName = "";
        switch (val){
            case "011":
            hosName = "여의도성모병원";
            break;
            case "012":
            hosName ="서울성모병원";
            break;
            case "013":
            hosName ="의정부성모병원";
            break;
            case "014":
            hosName ="부천성모병원";
            break;
            case "015":
            hosName ="은평성모병원";
            break;
            case "016":
            hosName ="인천성모병원";
            break;
            case "017":
            hosName ="성빈센트성모병원";
            break;
            case "018":
            hosName ="대전성모병원";
            break;
            default:
            hosName ="성모병원"; 
            break;
        }
        return hosName;
    } 

    console.log(hospInfoList.length)

    return (
        <div className='barcode' data-type={hospInfoList.length === 0 ? "empty" : ""}>
            <div className='inner'>

                
                {hospInfoList.length === 0 ? (
                    
                    <div className='no-collect-box'>
                        <div className='object-box'>
                            <object data={ImgBarcode}></object>
                        </div>
                        <strong>아직 연결된 성모병원이 없습니다.</strong>
                        <p>내가 내원하는 성모병원을 연결 후 <br />
                            서비스 사용이 가능합니다.
                        </p>
                    </div>   
                ): 
                    <>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={1}
                        onBeforeInit={(swipper) => setSwiper(swipper)} //초기화 직후 이벤트가 시작
                        pagination={pagination}
                        //scrollbar={{ draggable: true }}
                        >

                        {hospInfoList.map((item, idex)=> (
                            <SwiperSlide key={idex}>
                                <div className='barcoder-box'>
                                    <strong>{hospitalName(item.cnncHsptlCd)}</strong>
                                    <p><span>{userName}</span>님의 빠른 쾌유를 기원합니다.</p>
                                    <div className='barcods-box'>
                                        <Barcodes
                                            value={item.cnncPatntNo}
                                            displayValue={false}
                                            lineColor="#10141A"
                                            height={60} 
                                        />
                                    </div>
                                    <p className='barcode-num'>{item.cnncPatntNo}</p>
                                </div>
                            </SwiperSlide>
                        ))}  
                        
                    </Swiper>   
                    <div className="swiper-custom-pagination" ref={paginationRef}></div>
                    </> 
                }
                

                <button className='close-btn' onClick={onClose}>
                        <span className='blind'>팝업 닫기</span>
                </button>
                
            </div>
        </div>
    );
};

export default Barcode;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";


import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

const HeadSub = ({title, rightBtn, rightTitle, recordNum, hospitalName, myData, theme, onBack, iconClose}) => {

  const navigate = useNavigate();

  const location = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
        setOpen(false);
  }, []);

  function onDismiss() {
      setOpen(false);
  }




  return (
    <>
      <div className={
        "header header-sub " +
        (hospitalName !== undefined ? "header-hospital-name" : "") +
        (myData !== undefined ? "header-mydata-box" : "") +
        (theme !== undefined ? theme : "")
        }
        >
         <div className='left' onClick={onBack || (() => navigate(-1))}>
          <button data-icon= {iconClose ? 'close' : undefined}> <span className='blind'>뒤로가기</span> </button>
          <h3>{title}</h3>
        </div>

        {hospitalName !== undefined ?
          (<div className='hospital-namebox'> <p><b>{hospitalName} </b>  {title}입니다.</p></div>) : ""
        }

        {myData !== undefined ?
          (<div className='my-databox' data-type="a"> <p>내 정보의 <b> 각 항목별 노출 여부</b>를 설정할 수 있습니다.</p></div>) : ""
        }


        {rightBtn === "yes" ?
          (<button className='btn' data-btn-size="sm" data-btn-type="fill-main-sub" onClick={() => setOpen(true)} >{rightTitle}</button>) : ""
        }


        <BottomSheet
                scrollLocking={false} // 내부 스크롤을 위해 BottomSheet 스크롤 잠금 해제
                expandOnContentDrag={false} // 내용 드래그로 확장 방지
                open={open}
                onDismiss={onDismiss}
                snapPoints={({ minHeight }) => minHeight}
                blocking={false}
            >

                
                
        </BottomSheet>


      </div>
    </>
  )
}

export default HeadSub

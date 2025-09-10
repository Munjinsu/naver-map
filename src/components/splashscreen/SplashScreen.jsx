import { memo, useCallback, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './SplashScreen.module.css';
import SplashLogo from '../../images/common/splash_logo.svg';
import axiosApi from '../../api/daonAxios';
import CODE from '../../constants/code';

const SplashScreen = memo(function SplashScreen({ fadeOutTime = 4000, onComplete }) {

  const splashScreenElement = typeof document !== 'undefined'
    ? document.getElementById('splash-screen')
    : null;

  const shouldShowSplash = typeof window !== 'undefined' && !sessionStorage.getItem('splashShown');

  const [loadingComplete, setLoadingComplete] = useState(false);
  const [todayWord, setTodayWord] = useState("");

  const isSendingRef = useRef(false);

  const getTodayWord = useCallback(async () => {
    if (isSendingRef.current) return;
    isSendingRef.current = true;

    try {
      const res = await axiosApi.post("/guide/missa/todayMissa");
      if (res.data.resultCode === CODE.RCV_SUCCESS) {
        setTodayWord(res.data.result.todayMissa);
      }
    } catch (err) {
      console.log('API 실패:', err);
      setTodayWord("내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라.");
    } finally {
      isSendingRef.current = false;
      setLoadingComplete(true);
    }
  }, []);

  useEffect(() => {
    getTodayWord();
  }, [getTodayWord]);

  useEffect(() => {
    if (!shouldShowSplash || !loadingComplete) {
      return;
    }

    sessionStorage.setItem('splashShown', 'true');

    const timer = setTimeout(() => {

      // 스플래시 화면 숨기기
      if (splashScreenElement) {
        splashScreenElement.style.display = 'none';
      }

      // 완료 콜백 호출
      if (onComplete) {
        onComplete();
      }
    }, fadeOutTime);

    return () => {
      clearTimeout(timer);
    };
  }, [shouldShowSplash, loadingComplete, fadeOutTime, onComplete, splashScreenElement]);

  if (!splashScreenElement || !shouldShowSplash) {
    console.log('splash 표시 안함 - element:', !!splashScreenElement, 'shouldShow:', shouldShowSplash);
    return null;
  }

  console.log('SplashScreen 렌더링 중...');

  return createPortal(
    <div>
      <div className={style['splash-bg']}>
        <div className={style['splash-center']}>
          <div className={style['img-box']}>
            <img src={SplashLogo} alt="CMC 로고" />
          </div>
          <div className={style['txt-box']}>
            <p>오늘의 말씀</p>
            <span>{todayWord}</span>
          </div>
        </div>
        <div className={style['splash-bottom']}>
          <strong>CMC 케어플러스</strong>
          <p>가톨릭대학교 성모병원</p>
        </div>
      </div>
    </div>,
    splashScreenElement
  );
});

export default SplashScreen;

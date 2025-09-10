/**
 * 네이티브 알림 권한 요청
 * @param {Function} onGranted - 권한 허용 시 콜백
 * @param {Function} onDenied - 권한 거부 시 콜백
 */
export const requestNativeNotificationPermission = (onGranted, onDenied) => {
  if (window.requestNativeNotificationPermission) {
    // 네이티브 권한 요청 및 결과 리스너
    window.requestNativeNotificationPermission();
    window.addEventListener('nativePermissionResult', (event) => {
      if (event.detail.granted) {
        console.log('알림 권한 허용됨');
        onGranted && onGranted();
      } else {
        console.log('알림 권한 거부됨');
        onDenied && onDenied();
      }
    }, { once: true });
  } else {
    // 웹 환경에서는 브라우저 알림 권한 요청
    // if ('Notification' in window) {
    //   Notification.requestPermission().then(permission => {
    //     if (permission === 'granted') {
    //       onGranted && onGranted();
    //     } else {
    //       onDenied && onDenied();
    //     }
    //   });
    // } else {
    //   console.log('알림을 지원하지 않는 브라우저');
    //   onDenied && onDenied();
    // }
  }
};

/**
 * 네이티브로 라우트 변경 알림
 * @param {string} route - 라우트 경로
 * @param {string} params - 쿼리 파라미터
 */
export const sendRouteToNative = (route, params = '') => {
  if (window.sendRouteToNative) {
    window.sendRouteToNative(route, params);
  }
};


/**
 * 네이티브로 전화번호 전송
 * @param {string} phoneNumber - 휴대폰 번호
 */
export const handlePhoneCall = (phoneNumber) => {
    const cleanPhoneNumber = phoneNumber.split('~')[0].replace(/[^0-9]/g, '');

    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'PHONE_CALL',
            phoneNumber: cleanPhoneNumber
        }));
    }
};
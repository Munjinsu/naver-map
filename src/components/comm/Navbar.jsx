import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import classnames from 'classnames';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

import img_home from '../../../src/images/common/i_bot_nav_01.svg';
import img_home_on from '../../../src/images/common/i_bot_nav_01_on.svg';
import img_hospitalCare from '../../../src/images/common/i_bot_nav_02.svg';
import img_hospitalCare_on from '../../../src/images/common/i_bot_nav_02_on.svg';
import img_alarm from '../../../src/images/common/i_bot_nav_03.svg';
import img_alarm_on from '../../../src/images/common/i_bot_nav_03_on.svg';
import img_mypage from '../../../src/images/common/i_bot_nav_04.svg';
import img_mypage_on from '../../../src/images/common/i_bot_nav_04_on.svg';
import img_fullmenu from '../../../src/images/common/i_bot_nav_05.svg';
import img_fullmenu_on from '../../../src/images/common/i_bot_nav_05_on.svg';

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const [value, setValue] = React.useState(1);

    //새로운 알림 여부 
    const [newAlarm, setNewAlarm] = useState(true);

    useEffect(() => {
        switch (currentPath) {
            case '/HomeCareMain':
                setValue(1);
                break;
            case '/hospitalCare':
                setValue(2);
                break;
            case '/Alarm':
                setValue(3);
                break;
            case '/MyPageMain':
            case '/MyPageMain/summary':
            case '/MyPageMain/detail':
                setValue(4);
                break;
            case '/totalMenu':
                setValue(5);
                break;
            default:
                setValue(0);
        }
    }, [currentPath]);

    return (
        <>
            <Paper
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    height: 58,
                }}
                elevation={5}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        label="홈케어"
                        icon={
                            currentPath === '/HomeCareMain' ? (
                                <img src={img_home_on} className='animation-4'/>
                            ) : (
                                <img src={img_home} />
                            )
                        }
                        component={Link}
                        to="/HomeCareMain"
                        value={1}
                        className={value === 1 ? 'on' : ''}
                        
                    />

                    <BottomNavigationAction
                        label="병원케어"
                        icon={
                            currentPath === '/hospitalCare' ? (
                                <img src={img_hospitalCare_on} className='animation-4'/>
                            ) : (
                                <img src={img_hospitalCare} />
                            )
                        }
                        component={Link}
                        to="/hospitalCare"
                        value={2}
                        className={value === 2 ? 'on' : ''}
                    />
                    
                    <BottomNavigationAction
                        label="알림"
                        icon={
                            currentPath === '/Alarm' ? (
                                <img src={img_alarm_on} className='animation-4'/>
                            ) : (
                                <img src={img_alarm} />
                            )
                        }
                        component={Link}
                        to="/Alarm"
                        value={3}
                        className={classnames({ on: value === 3, /*new: newAlarm*/ })}

                    >
                    </BottomNavigationAction>
                    
                    <BottomNavigationAction
                        label="내정보"
                        icon={
                            currentPath === '/MyPageMain' || currentPath === '/MyPageMain/summary' || currentPath === '/MyPageMain/detail'? (
                                <img src={img_mypage_on} className='animation-4' />
                            ) : (
                                <img src={img_mypage} />
                            )

                        }
                        component={Link}
                        to="/MyPageMain"
                        value={4}
                        className={value === 4 ? 'on' : ''}
                    />

                    <BottomNavigationAction
                        label="전체메뉴"
                        icon={
                            currentPath === '/totalMenu' ? (
                                <img src={img_fullmenu_on} className='animation-4'/>
                            ) : (
                                <img src={img_fullmenu} />
                            )
                        }
                        component={Link}
                        to="/totalMenu"
                        value={5}
                        className={value === 5 ? 'on' : ''}
                    />
                </BottomNavigation>
            </Paper>
        </>
    );
};

export default Navbar;

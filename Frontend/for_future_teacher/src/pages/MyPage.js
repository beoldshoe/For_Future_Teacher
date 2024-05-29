import React from 'react';
import MainTopNavBar from "../components/MainTopNavBar";
import SideBar from '../components/SideBar';

const MyPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <MainTopNavBar />
            <div style={{ display: 'flex', flex: 1 }}>
                <SideBar />
                <div style={{ flex: 1, padding: '20px' }}>
                    <h1>내 정보 수정</h1>
                    {/* 여기에 내 정보 수정 폼을 추가할 수 있습니다 */}
                </div>
            </div>
        </div>
    );
};

export default MyPage;

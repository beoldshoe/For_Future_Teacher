import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
    const location = useLocation(); // 현재 위치를 알아내기 위해 useLocation 훅 사용

    // 선택된 링크에 대한 스타일을 결정하는 함수
    const getLinkStyle = (path) => ({
        textDecoration: 'none',
        color: location.pathname === path ? '#333' : '#888',
        fontWeight: location.pathname === path ? 'bold' : 'normal', // 선택된 페이지일 경우 볼드체로 바뀜
        padding: '10px 0', // 링크별 상하 패딩 추가
    });

    return (
        <div style={{
            width: '200px', 
            padding: '15px', 
            borderRight: '1px solid #ddd',
            borderBottom : '1px solid #ddd',
            display: 'flex', // Flexbox 사용
            flexDirection: 'column', // 항목을 수직 방향으로 정렬
            justifyContent: 'center', // 항목을 컨테이너의 중앙에 위치시킴
            height: '80vh', // 전체 높이 사용
            fontSize: '20px'
        }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '20px 0' }}> {/* 여기에 margin 추가 */}
                    <Link to="/MyPage" style={getLinkStyle('/MyPage')}>내 정보 수정</Link>
                </li>
                <li style={{ margin: '20px 0' }}> {/* 여기에 margin 추가 */}
                    <Link to="/CorrectQ" style={getLinkStyle('/CorrectQ')}>맞힌 문제</Link>
                </li>
                <li style={{ margin: '20px 0' }}> {/* 여기에 margin 추가 */}
                    <Link to="/NotCorrectQ" style={getLinkStyle('/NotCorrectQ')}>틀린 문제</Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;

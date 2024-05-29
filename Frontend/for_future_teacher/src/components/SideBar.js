import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #ddd' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>
                    <Link to="/MyPage">내 정보 수정</Link>
                </li>
                <li>
                    <Link to="/correctq">맞힌 문제</Link>
                </li>
                <li>
                    <Link to="/notcorrectq">틀린 문제</Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;

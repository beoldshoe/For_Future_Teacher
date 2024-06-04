import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
    const location = useLocation(); 
    const userid = localStorage.getItem('userid');
    console.log(userid);
    const getLinkStyle = (path) => ({
        textDecoration: 'none',
        color: location.pathname === path ? '#333' : '#888',
        fontWeight: location.pathname === path ? 'bold' : 'normal', 
        padding: '10px 0', 
    });

    return (
        <div style={{
            width: '200px', 
            padding: '15px', 
            borderRight: '1px solid #ddd',
            borderBottom : '1px solid #ddd',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            height: '80vh',
            fontSize: '20px'
        }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '20px 0' }}> 
                    <Link to={`/MyPage/${userid}`} style={getLinkStyle(`/MyPage/${userid}`)}>내 정보 수정</Link>
                </li>
                <li style={{ margin: '20px 0' }}> 
                    <Link to={`/CorrectQ/${userid}`} style={getLinkStyle(`/CorrectQ/${userid}`)}>맞힌 문제</Link>
                </li>
                <li style={{ margin: '20px 0' }}> 
                    <Link to={`/NotCorrectQ/${userid}`} style={getLinkStyle(`/NotCorrectQ/${userid}`)}>틀린 문제</Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;

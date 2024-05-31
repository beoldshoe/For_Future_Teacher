import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const MainTopNavBar = () => {
    const userid = localStorage.getItem('userid');
    console.log(userid);
    const navigate = useNavigate();
    const location = useLocation(); // 현재 위치를 알아내기 위해 useLocation 훅 사용
    const styles = {
        navBar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 30px',
            backgroundColor: '#333',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
        },
        linkContainer: {
            display: 'flex',
            gap: '40px',
        },
        link: {
            color: '#fff',
            textDecoration: 'none',
            fontSize: '20px',
        },
        activeLink: {
            color: '#fff',
            textDecoration: 'none',
            fontSize: '20px',
            fontWeight: 'bold', // 굵은 글씨체로 변경
        },
        buttonContainer: {
            display: 'flex',
            gap: '10px',
        },
        button: {
            padding: '5px 10px',
            backgroundColor: '#555',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
        }
    };

    // 선택된 링크에 대한 스타일을 결정하는 함수
    const getLinkStyle = (path) => {
        return location.pathname === path ? styles.activeLink : styles.link;
    };

    const handleLogout = () => {
        // '로그아웃 하시겠습니까?' 물음
        const confirmLogout = window.confirm('로그아웃 하시겠습니까?');

        if (confirmLogout) {
            // '예'를 선택한 경우, 홈으로 이동
            navigate('/');
        }
        // '아니오'를 선택한 경우, 아무 동작도 하지 않음
    };

    return (
        <div style={styles.navBar}>
            <div style={styles.linkContainer}>
                <Link to={`/Main/${userid}`} style={getLinkStyle(`/Main/${userid}`)}>홈</Link> 
                <Link to={`/QnA/${userid}`} style={getLinkStyle(`/QnA/${userid}`)}>질의응답 게시판</Link>
                <Link to={`/PrevExam/${userid}`} style={getLinkStyle(`/PrevExam/${userid}`)}>기출문제</Link>
                <Link to={`/ShareQ/${userid}`} style={getLinkStyle(`/ShareQ/${userid}`)}>문제 공유</Link>
            </div>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => navigate(`/MyPage/${userid}`)}>My Page</button>
                <button style={styles.button} onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
};

export default MainTopNavBar;

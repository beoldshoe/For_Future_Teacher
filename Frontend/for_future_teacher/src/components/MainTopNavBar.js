import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const MainTopNavBar = () => {
    const userid = localStorage.getItem('userid');
    console.log(userid);
    const navigate = useNavigate();
    const location = useLocation(); 
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
            fontWeight: 'bold', 
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

    const getLinkStyle = (path) => {
        return location.pathname === path ? styles.activeLink : styles.link;
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm('로그아웃 하시겠습니까?');

        if (confirmLogout) {
            navigate('/');
        }
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

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MainTopNavBar = () => {
    const navigate = useNavigate();
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
            gap: '20px',
        },
        link: {
            color: '#fff',
            textDecoration: 'none',
            fontSize: '16px',
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

    return (
        <div style={styles.navBar}>
            <div style={styles.linkContainer}>
                <Link to="/Main" style={styles.link}>홈</Link> 
                <Link to="/QnA" style={styles.link}>질의응답 게시판</Link>
                <Link to="/PrevExam" style={styles.link}>기출문제</Link>
                <Link to="/ShareQ" style={styles.link}>문제 공유</Link>
            </div>
            <div style={styles.buttonContainer}>
                <button 
                    style={styles.button}
                    onClick={() => navigate('/MyPage')}>My Page</button>
                <button style={styles.button}>로그아웃</button>
            </div>
        </div>
    );
};

export default MainTopNavBar;

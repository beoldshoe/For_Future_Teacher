import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    // 스타일 객체 정의
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
        },
        inputContainer: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
        },
        input: {
            margin: '5px 0',
            padding: '10px',
            width: '200px',
        },
        button: {
            marginTop: '10px',
            padding: '10px',
            width: '220px',
        },
        linkContainer: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
        },
        link: {
            margin: '5px 0',
            textDecoration: 'none',
            color: 'blue',
            cursor: 'pointer',
        }
    };

    return (
        <div style={styles.container}>
            <h1>For Future Teacher</h1>
            <div style={styles.inputContainer}>
                <input type="text" placeholder="아이디" style={styles.input} />
                <input type="password" placeholder="비밀번호" style={styles.input} />
                <button style={styles.button}>확인</button>
            </div>
            <div style={styles.linkContainer}>
                <Link to="/SignUp" style={styles.link}>회원가입</Link>
                <Link to="/FindIdPw" style={styles.link}>아이디/비밀번호 찾기</Link>
            </div>
        </div>
    );
}

export default HomePage;

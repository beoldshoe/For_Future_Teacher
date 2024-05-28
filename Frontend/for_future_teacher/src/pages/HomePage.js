import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    // 상태 추가
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

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

    // 로그인 버튼 클릭 이벤트 처리
    const handleLoginClick = () => {
        if (!userId || !password) {
            alert('모든 정보를 입력해주세요.');
            return;
        }
        // 로그인 로직 처리
    };

    return (
        <div style={styles.container}>
            <h1>For Future Teacher</h1>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleLoginClick} style={styles.button}>로그인</button>
            </div>
            <div style={styles.linkContainer}>
                <Link to="/SignUp" style={styles.link}>회원가입</Link>
                <Link to="/FindIdPw" style={styles.link}>아이디/비밀번호 찾기</Link>
            </div>
        </div>
    );
}

export default HomePage;

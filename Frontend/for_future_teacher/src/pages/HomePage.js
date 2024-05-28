import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useHistory를 import 합니다.

const HomePage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useHistory 훅을 사용해서 history 객체를 생성합니다.

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

    const handleLoginClick = () => {
        if (!userId || !password) {
            alert('모든 정보를 입력해주세요.');
            return;
        }
        // 로그인 로직 처리 후 성공적으로 로그인이 되었다면 MainPage로 이동
        navigate('/Main'); // 여기에서 /MainPage로 이동합니다.
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

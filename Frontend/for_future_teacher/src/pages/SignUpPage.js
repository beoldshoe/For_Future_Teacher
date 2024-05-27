import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
        },
        goBackButton: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px',
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
        }
    };

    const handleSignUp = () => {
        if (!name || !userId || !password || !confirmPassword) {
            alert('모든 정보를 입력해주세요');
            return;
        }
    };

    return (
        <div style={styles.container}>
            <button onClick={() => navigate('/')} style={styles.goBackButton}>로그인 하러가기</button>
            <h1>회원가입</h1>
            <div style={styles.inputContainer}>
                <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
                <input type="text" placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} style={styles.input} />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
                <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.input} />
                <button onClick={handleSignUp} style={styles.button}>가입하기</button>
            </div>
        </div>
    );
}

export default SignUpPage;

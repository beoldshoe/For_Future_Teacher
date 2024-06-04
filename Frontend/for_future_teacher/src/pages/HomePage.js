import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { ApiAddress } from '../constants';

const HomePage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

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
            backgroundColor: 'blue', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
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
            fontWeight: 'bold', 
            fontSize: '16px', 
        }
    };
    
    

    const handleLoginClick = () => {
        if (!userId || !password) {
            alert('모든 정보를 입력해주세요.');
            return;
        }
    
        const loginUrl = `${ApiAddress}/auth/login`;
    
        const loginData = {
            email: userId,
            password: password,
        };
        console.log(loginData)
        fetch(loginUrl, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(loginData), 
        })
        
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.text().then(data => {
                    console.log('Success:', data);
                    localStorage.setItem('userid', data);
                    alert('로그인에 성공하였습니다.');
                    navigate(`/Main/${data}`)
                });
            } else {
            throw new Error('로그인 실패하였습니다.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('로그인 실패하였습니다.');
        });
    };

    return (
        <div style={styles.container}>
            <h1>For Future Teacher</h1>
            <h3>임용고시생들을 위한 문제 은행 사이트</h3>
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

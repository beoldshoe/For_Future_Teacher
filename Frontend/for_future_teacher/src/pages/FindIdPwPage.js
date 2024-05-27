import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const FindIdPwPage = () => {
    const navigate = useNavigate(); 

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
            padding: '20px',
        },
        section: {
            marginTop : '20vh',
        },
        input: {
            margin: '5px',
        },
        button: {
            margin: '5px',
        },
        goBackButton: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px',
        }
    };

    return (
        <div style={styles.container}>
            <button onClick={() => navigate(-1)} style={styles.goBackButton}>
                로그인 하러 가기
            </button>
            <div style={styles.section}>
                <h2>아이디 찾기</h2>
                <input type="text" placeholder="이름" style={styles.input} />
                <input type="text" placeholder="전화번호" style={styles.input} />
                <button style={styles.button}>확인</button>
            </div>
            <div style={styles.section}>
                <h2>비밀번호 찾기</h2>
                <input type="text" placeholder="이름" style={styles.input} />
                <input type="text" placeholder="아이디" style={styles.input} />
                <button style={styles.button}>확인</button>
            </div>
        </div>
    );
}

export default FindIdPwPage;

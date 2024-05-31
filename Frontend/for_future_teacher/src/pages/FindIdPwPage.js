import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiAddress } from '../constants';

const FindIdPwPage = () => {
    const navigate = useNavigate();
    const [nameForId, setNameForId] = useState('');
    const [phone, setPhone] = useState('');
    const [nameForPw, setNameForPw] = useState('');
    const [userId, setUserId] = useState('');

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
            marginTop: '20vh',
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

    const handleIdCheck = () => {
        if (!nameForId || !phone) {
            alert('모든 정보를 입력해주세요.');
            return;
        }
    
        const data = {
            name: nameForId,
            phoneNumber: phone
        };
    
        fetch(`${ApiAddress}/auth/findEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok){
                return response.text().then(data =>{
                    console.log(data)
                    alert(`아이디는 ${data} 입니다.`);
                })
        }else {
            throw new Error('찾으시는 정보의 아이디가 없습니다.');
        }
    })
        .catch((error) => {
            console.error('Error:', error);
            alert('아이디 찾기에 실패하였습니다.');
        });
    }
    

    const handlePwCheck = () => {
        if (!nameForPw || !userId) {
            alert('모든 정보를 입력해주세요.');
            return;
        }
        // 비밀번호 찾기 로직 추가
    };

    return (
        <div style={styles.container}>
            <button onClick={() => navigate(-1)} style={styles.goBackButton}>
                로그인 하러 가기
            </button>
            <div style={styles.section}>
                <h2>아이디 찾기</h2>
                <input
                    type="text"
                    placeholder="이름"
                    value={nameForId}
                    onChange={(e) => setNameForId(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="전화번호"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleIdCheck} style={styles.button}>확인</button>
            </div>
            <div style={styles.section}>
                <h2>비밀번호 찾기</h2>
                <input
                    type="text"
                    placeholder="이름"
                    value={nameForPw}
                    onChange={(e) => setNameForPw(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="아이디"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handlePwCheck} style={styles.button}>확인</button>
            </div>
        </div>
    );
}

export default FindIdPwPage;

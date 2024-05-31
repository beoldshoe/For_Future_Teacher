import React, { useState, useEffect } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";
import SideBar from '../components/SideBar';
import { ApiAddress } from '../constants';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const navigate = useNavigate();
    const userid = localStorage.getItem('userid');
    console.log(userid);
    // 사용자 정보를 위한 상태
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const url = `${ApiAddress}/users/${userid}`;

        fetch(url, {
            method: 'GET', // HTTP 메소드
            headers: {
                'Content-Type': 'application/json', // 컨텐츠 타입
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setName(data.name);
                setNickname(data.nickname);
                setUserId(data.email); // 이 예제에서는 userId가 이미 알려져 있음을 가정합니다.
                setPassword(data.password);
                setPhone(data.phoneNumber); // API 응답의 필드명이 "phonenumber"라고 가정합니다.
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleUpdate = async () => {
        // 입력 값 검증
        if (!name || !nickname || !userId || !password || !phone) {
          alert('모든 정보를 입력하세요.');
          return;
        }
      
        // 정보 수정 로직
        try {
          const response = await fetch(`${ApiAddress}/users/${userid}`, {
            method: 'PUT', // HTTP 메소드 지정
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nickname: nickname,
              password: password,
              phoneNumber: phone,
              email: userId, // 이메일은 예시에 없으므로 빈 문자열로 처리, 필요시 수정
              name: name,
            }),
          });
      
          if (response.ok) {
            // 성공적으로 처리됨
            alert('회원 정보가 수정되었습니다.');
          } else {
            // 서버에서 오류 응답
            alert('회원 정보 수정을 실패했습니다.');
          }
        } catch (error) {
          // 네트워크 오류 등
          console.error('에러가 발생했습니다:', error);
          alert('회원 정보 수정을 실패했습니다.');
        }
      };
      

    // 회원 탈퇴 핸들러
    const handleUnsubscribe = async () => {
        // 사용자에게 회원 탈퇴 의사를 확인
        const isConfirmed = window.confirm('정말 회원 탈퇴하시겠습니까?');
    
        if (isConfirmed) {
            try {
                const response = await fetch(`${ApiAddress}/users/${userid}`, {
                    method: 'DELETE',
                    // 필요한 경우, 인증 헤더 등 추가 설정
                });
                console.log(response)
                if (response.ok) {
                    // 성공적으로 처리된 경우, 사용자에게 완료 메시지를 보여주고 홈으로 이동
                    alert('회원 탈퇴가 완료되었습니다.');
                    navigate('/');
                } else {
                    // 실패한 경우, 사용자에게 실패 메시지를 보여줌
                    alert('회원 탈퇴 처리에 실패했습니다.');
                }
            } catch (error) {
                // 네트워크 오류 등의 이유로 요청 자체가 실패한 경우
                alert('회원 탈퇴 처리에 실패했습니다.');
            }
        }
    };

    // 스타일 객체
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px', // 입력 필드 간격
        marginBottom: '30px', // 폼 하단 간격
    };

    const buttonStyle = {
        marginLeft: '10px', // 버튼 상단 간격
        fontSize: '20px', // 버튼 폰트 크기
        borderRadius : '10px'
    };

    const inputStyle = {
        marginLeft:'10px',
        width : '200px'
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <MainTopNavBar />
            <div style={{ display: 'flex', flex: 1 }}>
                <SideBar />
                <div style={{ flex: 1, marginLeft: '20px' }}>
                    <h1>내 정보 수정</h1>
                    <form style={formStyle}>
                    <div>
                            <label>이름</label>
                            <input style ={{...inputStyle, color : '#808080'}} type="text" value={name} readOnly />
                        </div>
                        <div>
                            <label>닉네임</label>
                            <input style ={inputStyle} type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                        </div>
                        <div>
                            <label>아이디</label>
                            <input style ={{...inputStyle, color : '#808080'}} type="text" value={userId} readOnly />
                        </div>
                        <div>
                            <label>비밀번호</label>
                            <input style ={inputStyle} type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label>전화번호</label>
                            <input style ={{...inputStyle, color : '#808080'}} type="text" value={phone} readOnly />
                        </div>

                        <div
                            style={{
                                display : 'flex',
                                flexDirection : 'row'
                            }}>
                            <button type="button" onClick={handleUpdate} style={buttonStyle}>수정</button>
                            <button type="button" onClick={handleUnsubscribe} style={{...buttonStyle, backgroundColor: 'red', color: 'white'}}>회원 탈퇴</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyPage;

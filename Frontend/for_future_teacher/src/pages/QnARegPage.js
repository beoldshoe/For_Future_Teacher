import React, { useState } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";
import { useNavigate } from 'react-router-dom';
import { ApiAddress } from '../constants';

const QnARegPage = () => {
    const userid = localStorage.getItem('userid');
    console.log(userid);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleReset = () => {
        setTitle('');
        setContent('');
    };

    const handleSubmit = async () => {
        // 제목과 내용이 비어있는지 확인
        if (!title.trim() || !content.trim()) {
            alert('모든 내용을 입력하세요');
            return;
        }
    
        // 사용자에게 게시물 등록 여부를 확인
        const isConfirmed = window.confirm('게시물을 등록하시겠습니까?');
        if (!isConfirmed) {
            return; // 사용자가 취소를 누른 경우
        }
    
        // 게시물 데이터
        const postData = {
            userId: userid, 
            title: title,
            content: content,
        };
    
        try {
            // API 요청
            const response = await fetch(`${ApiAddress}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
    
            // 응답 확인
            if (response.ok) {
                alert('게시물이 등록되었습니다.');
                navigate(`/QnA/${userid}`)
            } else {
                // 서버 에러 처리
                alert('게시물 등록에 실패했습니다.');
            }
        } catch (error) {
            // 네트워크 에러 처리
            console.error('An error occurred:', error);
            alert('네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };
    

    return(
        <div>
            <MainTopNavBar />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <h1 style={{ marginLeft: '20px' }}>질의응답 등록하기</h1>
                <button
                    style={{
                        marginLeft: '30px',
                        width: '80px',
                        height: '30px'
                    }}
                    onClick={() => navigate(-1)}
                >
                    돌아가기
                </button>
            </div>
            <div style={{ margin: '20px', marginLeft : '20px' }}>
                <div>
                    <input
                        style={{ width: '40%', padding: '10px', marginBottom: '10px' }}
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <textarea
                        style={{ width: '80%', padding: '10px', height: '300px' }}
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', width : '80%', marginTop: '20px' }}>
                    <button
                        style={{ marginRight: '10px', width: '100px', height: '40px' }}
                        onClick={handleReset}
                    >
                        초기화
                    </button>
                    <button
                        style={{ width: '100px', height: '40px' }}
                        onClick={handleSubmit}
                    >
                        등록하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QnARegPage;

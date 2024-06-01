import React, { useState, useEffect } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";
import { useNavigate, useParams } from 'react-router-dom'; // useParams를 import 합니다.
import { ApiAddress } from '../constants';

const QnADetailUpdatePage = () => {
    const userid = localStorage.getItem('userid');
    const navigate = useNavigate();
    const { postId } = useParams(); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await fetch(`${ApiAddress}/posts/${postId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('게시물을 가져오는데 실패했습니다.');
                }
                const data = await response.json();
                console.log(data)
                setTitle(data.title);
                setContent(data.content);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPostDetails();
    }, [postId]); 

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${ApiAddress}/posts/${postId}/${userid}`, {
                method: 'PUT', // PUT 요청
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title : title, // 수정할 제목
                    content: content// 수정할 내용
                })
            });

            if (response.ok) {
                alert('수정되었습니다'); // 성공 알림
                navigate(-1); // 이전 페이지로 돌아가기
            } else {
                // 에러 처리
                alert('수정에 실패했습니다');
            }
        } catch (error) {
            console.error('수정 요청 중 에러 발생:', error);
            alert('수정 요청 중 문제가 발생했습니다');
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
                <h1 style={{ marginLeft: '20px' }}>질의응답 게시물 수정하기</h1>
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
                        onClick={handleUpdate}
                    >
                        수정하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QnADetailUpdatePage
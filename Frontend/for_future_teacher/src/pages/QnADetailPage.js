import React, { useState, useEffect } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";
import { useNavigate, useParams } from 'react-router-dom'; // useParams를 import 합니다.
import { ApiAddress } from '../constants';

const QnADetailPage = () => {
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
    }, [postId]); // postId가 변경될 때마다 useEffect를 다시 실행합니다.

    return(
        <div>
            <MainTopNavBar />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <h1 style={{ marginLeft: '20px' }}>질의응답 게시판</h1>
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
                        readOnly
                    />
                </div>
                <div>
                    <textarea
                        style={{ width: '80%', padding: '10px', height: '300px' }}
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        readOnly
                    />
                </div>
                <div style={{ display: 'flex', width : '80%', marginTop: '20px' }}>
                    <button
                        style={{ marginRight: '10px', width: '100px', height: '40px' }}
                    >
                        수정하기
                    </button>
                    <button
                        style={{ width: '100px', height: '40px' }}
                    >
                        삭제하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QnADetailPage

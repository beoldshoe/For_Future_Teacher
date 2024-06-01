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
    }, [postId]); 

    const goToUpdatePage = () => {
        navigate(`/QnADetailUpdate/${userid}/${postId}`)
    }

    const handleDelete = async () => {
        // confirm 대화 상자를 사용하여 사용자의 선택을 받습니다.
        const isConfirmed = window.confirm('게시물을 삭제하시겠습니까?');
        
        // 사용자가 '예'를 선택한 경우에만 삭제 로직을 실행합니다.
        if (isConfirmed) {
            try {
                const response = await fetch(`${ApiAddress}/posts/${postId}`, {
                    method: 'DELETE', // DELETE 요청
                });
    
                if (response.ok) {
                    alert('게시물이 삭제되었습니다.'); // 성공 알림
                    navigate(-1); // 이전 페이지로 돌아가기
                } else {
                    // 에러 처리
                    alert('게시물 삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('게시물 삭제 요청 중 에러 발생:', error);
                alert('게시물 삭제 요청 중 문제가 발생했습니다.');
            }
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
                        onClick={goToUpdatePage}
                    >
                        수정하기
                    </button>
                    <button
                        style={{ width: '100px', height: '40px' }}
                        onClick={handleDelete}
                    >
                        삭제하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QnADetailPage

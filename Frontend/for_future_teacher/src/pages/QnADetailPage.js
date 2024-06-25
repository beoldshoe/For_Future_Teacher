import React, { useState, useEffect } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";
import { useNavigate, useParams } from 'react-router-dom';
import { ApiAddress } from '../constants';

const QnADetailPage = () => {
    const userid = localStorage.getItem('userid');
    const navigate = useNavigate();
    const { postId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]); // 댓글 목록 상태 추가
    const [isEditing, setIsEditing] = useState(false);
    const [postuserid, setPostuserid] = useState(null)


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
                setPostuserid(data.userId)
                console.log(data.userId)
            } catch (error) {
                console.error(error);
            }
        };

        fetchPostDetails();
    }, [postId]);

    useEffect(() => {
        const fetchCommentDetails = async () => {
            try {
                const response = await fetch(`${ApiAddress}/comment/${postId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('게시물을 가져오는데 실패했습니다.');
                }
                const data = await response.json();
                setComments(data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchCommentDetails();
    }, [postId]);

    // const handleContentChange = (event) => {
    //     setContent(event.target.value);
    //   };
    
    //   // 수정 모드를 활성화하는 함수입니다.
    // const enableEditing = () => {
    //     setIsEditing(true);
    //     console.log(isEditing)
    //   };
    
    //   // 수정을 완료하고 수정 모드를 비활성화하는 함수입니다.
    // const disableEditing = () => {
    //     setIsEditing(false);
    //   };
    
    const goToUpdatePage = () => {
        if (String(userid) === String(postuserid)) {
            console.log(userid);
            navigate(`/QnADetailUpdate/${userid}/${postId}`);
        } else {
            console.log(userid);
            alert('수정 권한이 없습니다');
        }
    };
    

    const handleDelete = async () => {
        const isConfirmed = window.confirm('게시물을 삭제하시겠습니까?');
        if (isConfirmed) {
            try {
                const response = await fetch(`${ApiAddress}/posts/${postId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('게시물이 삭제되었습니다.');
                    navigate(-1);
                } else {
                    alert('게시물 삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('게시물 삭제 요청 중 에러 발생:', error);
                alert('게시물 삭제 요청 중 문제가 발생했습니다.');
            }
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await fetch(`${ApiAddress}/comment/${userid}/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: comment}),
            });

            if (response.ok) {
                alert('댓글을 작성했습니다.')
                window.location.reload()
            } else {
                alert('댓글 작성에 실패했습니다.');
            }
        } catch (error) {
            console.error('댓글 작성 요청 중 에러 발생:', error);
            alert('댓글 작성 요청 중 문제가 발생했습니다.');
        }
    };
    const handleCommentDelete = async (comment_id) => {
        const response = await fetch(`${ApiAddress}/comment/${userid}/${comment_id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          // 서버로부터 성공적인 응답을 받으면, 댓글을 삭제합니다.
            alert('댓글이 삭제되었습니다')
            window.location.reload()
        } else {
          // 오류가 발생하면 콘솔에 오류를 출력합니다.
          console.error('댓글 삭제에 실패했습니다.');
        }
      };

    return (
        <div>
            <MainTopNavBar />
            <div style={{ display: 'flex', margin: '20px' }}>
                <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <h1>질의응답 게시판</h1>
                <button
                    style={{ marginLeft: '30px', width: '80px', height: '30px' }}
                    onClick={() => navigate(-1)}
                >
                    돌아가기
                </button>
            </div>

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
                    <div style={{ display: 'flex', marginTop: '20px' }}>
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

                <div style={{ flex: 1, marginLeft: '20px' }}>
                    <h2>댓글</h2>
                    <div>
                        <textarea
                            style={{ width: '80%', padding: '10px', marginBottom: '10px', height: '20px' }}
                            placeholder="댓글을 입력하세요"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <button
                            style={{ width: '80%', height: '40px' }}
                            onClick={handleCommentSubmit}
                        >
                            댓글 작성
                        </button>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        {comments.map((comment, index) => (
                            <div key={comment.comment_id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                                <div style={{
                                    display : 'flex',
                                    flexDirection : 'row'
                                }}>
                                    {/* {isEditing ? (
                                        <input
                                        type="text"
                                        value={comment.content}
                                        onChange={handleContentChange}
                                        onBlur={disableEditing} // 입력 필드를 벗어나면 수정을 완료합니다.
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter') {
                                            disableEditing(); // Enter 키를 누르면 수정을 완료합니다.
                                            }
                                        }}
                                        autoFocus
                                        />
                                    ) : ( */}
                                        <p>{comment.content}</p>
                                    {/* )}
                                    {!isEditing && (
                                        <p
                                        style={{
                                            marginLeft: '3vw',
                                            color: 'grey',
                                            fontSize: '1.5vh',
                                            justifyContent: 'flex-end',
                                            cursor: 'pointer', // 마우스 커서를 포인터로 변경합니다.
                                        }}
                                        onClick={enableEditing} // 수정하기를 클릭하면 수정 모드로 전환합니다.
                                        >
                                        수정하기
                                        </p>
                                    )} */}
                                </div>
                                <small style={{
                                    color : 'grey'
                                }}>{comment.author}</small>
                                {/* <button style={{
                                    marginLeft : '1vw'
                                }}>수정</button> */}
                            <button
                                style={{
                                    marginLeft: '1vw',
                                }}
                                onClick={() => handleCommentDelete(comment.comment_id)} // 삭제 버튼을 클릭하면 handleCommentDelete 함수가 호출되며, comment.comment_id가 인자로 전달됩니다.
                            >
                                삭제
                            </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QnADetailPage;

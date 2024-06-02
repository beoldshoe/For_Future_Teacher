import React, { useState, useEffect } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";
import { useNavigate } from 'react-router-dom';
import { ApiAddress } from '../constants';

const QnAPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    
    const navigate = useNavigate();
    const userid = localStorage.getItem('userid');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${ApiAddress}/posts`); 
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (error) {
            console.error("게시물을 불러오는데 실패했습니다.", error);
            setLoading(false);
        }
    };

    // 현재 페이지의 게시물 가져오기
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 번호를 클릭했을 때 실행될 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <MainTopNavBar />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <h1 style={{ marginLeft: '20px' }}>질의응답 게시판</h1>
                <button
                    style={{ marginLeft: '30px', width: '80px', height: '30px' }}
                    onClick={() => navigate(`/QnAReg/${userid}`)}
                >
                    게시물 등록
                </button>
            </div>
            {loading ? (
                <div style={{ marginLeft: '20px' }}>게시물을 불러오는 중...</div>
            ) : (
                <div>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>제목</th>
                                <th style={thStyle}>작성자</th>
                                <th style={thStyle}>작성 시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((post, index) => (
                                <tr
                                    key={post.postId}
                                    style={{ ...trStyle, backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}
                                    onClick={() => navigate(`/QnADetail/${userid}/${post.postId}`)}
                                >
                                    <td style={tdStyle}>{post.title}</td>
                                    <td style={tdStyle}>{post.nickname}</td>
                                    <td style={tdStyle}>{new Date(post.updatedAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* 페이지네이션 버튼 */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
                            <button key={i} onClick={() => paginate(i + 1)} style={{ margin: '0 5px' }}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


const tableStyle = {
    marginLeft: '20px',
    width: '95%',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
    fontSize: '16px'
};

const thStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center'
};

const trStyle = {
    cursor: 'pointer',
    borderBottom: '1px solid #ddd'
};

const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center'
};

export default QnAPage;

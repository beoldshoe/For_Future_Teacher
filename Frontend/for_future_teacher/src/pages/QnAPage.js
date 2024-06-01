import React, { useState, useEffect } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";
import { useNavigate } from 'react-router-dom';
import { ApiAddress } from '../constants';

const QnAPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userid = localStorage.getItem('userid');
    console.log(userid);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${ApiAddress}/posts`); 
            const data = await response.json();
            setPosts(data.slice(0, 10));
            setLoading(false);
        } catch (error) {
            console.error("게시물을 불러오는데 실패했습니다.", error);
            setLoading(false);
        }
    };

    return (
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
                    onClick={() => navigate(`/QnAReg/${userid}`)}
                >
                    게시물 등록
                </button>
            </div>
            {loading ? (
                <div style={{ marginLeft: '20px' }}>게시물을 불러오는 중...</div>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>제목</th>
                            <th style={thStyle}>작성자</th>
                            <th style={thStyle}>작성 시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) => (
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

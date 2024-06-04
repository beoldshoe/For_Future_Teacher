import React, { useState, useEffect } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";
import { useNavigate } from 'react-router-dom';
import { ApiAddress } from '../constants';

const ShareQPage = () => {
    const navigate = useNavigate();
    const userid = localStorage.getItem('userid');
    const [loading, setLoading] = useState(true);
    console.log(userid);
    // 게시판 데이터를 저장할 상태
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 번호를 클릭했을 때 실행될 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${ApiAddress}/questions`); 
            const data = await response.json();
            console.log(data)
            setPosts(data);
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
                <h1 style={{marginLeft : '20px'}}>문제 공유 게시판</h1>
                <button
                    style={{
                        marginLeft: '30px',
                        width: '80px',
                        height: '30px'
                    }}
                    onClick={() => navigate(`/ShareQReg/${userid}`)}
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
                            <th style={thStyle}>문제 제목</th>
                            <th style={thStyle}>작성자</th>
                            <th style={thStyle}>작성 시간</th>
                            <th style={thStyle}>문제 난이도</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((post, index) => (
                            <tr
                                key={post.postId}
                                style={{ ...trStyle, backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}
                                onClick={() => navigate(`/ShareQDetail/${userid}/${post.question_id}`)}
                            >
                                <td style={tdStyle}>{post.question_id} - {post.title}</td>
                                <td style={tdStyle}>{post.nickname}</td>
                                <td style={tdStyle}>{new Date(post.updatedAt).toLocaleString()}</td>
                                <td style={tdStyle}>
                                    {post.totalPeopleNum === 0 ? '신규' :
                                        post.totalCorrectPeopleNum / post.totalPeopleNum > 0.7 ? '하' :
                                        0.7 >= post.totalCorrectPeopleNum / post.totalPeopleNum && post.totalCorrectPeopleNum / post.totalPeopleNum > 0.3 ? '중' :
                                        '상'
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
                                {/* 페이지네이션 버튼 */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
                            <button key={i} onClick={() => paginate(i + 1)} style={{ margin: '0 5px' }}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
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

export default ShareQPage;

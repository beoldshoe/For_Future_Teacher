import React, { useState, useEffect } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";
import { useNavigate } from 'react-router-dom';
import { ApiAddress } from '../constants';


const PrevExamPage = () => {
    const posts = [
        {
            postId : '2014',
            title : '2014년 교육학 기출문제',
            nickname : '관리자',
            imageUrl1 : 'images/2014_prevQ_1.jpg',
            imageUrl2 : 'images/2014_prevQ_2.jpg'
    
        },
        {
            postId : '2015',
            title : '2015년 교육학 기출문제',
            nickname : '관리자',
            imageUrl1 : 'images/2015_prevQ_1.jpg',
            imageUrl2 : 'images/2015_prevQ_2.jpg'
    
        },
        {
            postId : '2016',
            title : '2016년 교육학 기출문제',
            nickname : '관리자',
            imageUrl : 'images/2016_prevQ_1.jpg'
    
        },
        {
            postId : '2017',
            title : '2017년 교육학 기출문제',
            nickname : '관리자',
            imageUrl : 'images/2017_prevQ_1.jpg'
    
        },
        {
            postId : '2018',
            title : '2018년 교육학 기출문제',
            nickname : '관리자',
            imageUrl : 'images/2018_prevQ_1.jpg'
    
        },
        {
            postId : '2019',
            title : '2019년 교육학 기출문제',
            nickname : '관리자',
            imageUrl : 'images/2019_prevQ_1.jpg'
    
        },
        {
            postId : '2020',
            title : '2020년 교육학 기출문제',
            nickname : '관리자',
            imageUrl : 'images/2020_prevQ_1.jpg'
    
        },
        {
            postId : '2021',
            title : '2021년 교육학 기출문제',
            nickname : '관리자',
            imageUrl : 'images/2021_prevQ_1.jpg'
    
        },
        {
            postId : '2022',
            title : '2022년 교육학 기출문제',
            nickname : '관리자',
            imageUrl : 'images/2022_prevQ_1.jpg'
    
        },
        {
            postId : '2023',
            title : '2023년 교육학 기출문제',
            nickname : '관리자',
            imageUrl : 'images/2023_prevQ_1.jpg'
    
        },

    ]

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    
    const navigate = useNavigate();
    const userid = localStorage.getItem('userid');


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
                <h1 style={{ marginLeft: '20px' }}>기출문제 게시판</h1>
                {/* <button
                    style={{ marginLeft: '30px', width: '80px', height: '30px' }}
                    onClick={() => navigate(`/QnAReg/${userid}`)}
                >
                    게시물 등록
                </button> */}
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
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((post, index) => (
                                <tr
                                    key={post.postId}
                                    style={{ ...trStyle, backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}
                                    onClick={() => navigate(`/PrevExamDetail/${userid}/${post.postId}`)}
                                >
                                    <td style={tdStyle}>{post.title}</td>
                                    <td style={tdStyle}>{post.nickname}</td>
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

export default PrevExamPage;

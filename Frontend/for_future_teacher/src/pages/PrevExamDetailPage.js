import React from 'react';
import { useParams } from 'react-router-dom';
import MainTopNavBar from "../components/MainTopNavBar";
import { useNavigate } from 'react-router-dom';

const PrevExamDetailPage = () => {
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

    const navigate = useNavigate()
    const { postId } = useParams();
    const post = posts.find(post => post.postId === postId);

    // post가 존재하지 않는 경우, 적절한 메시지를 표시합니다.
    if (!post) {
        return <div>해당 문제를 찾을 수 없습니다.</div>;
    }

    return (
        <div>
            <MainTopNavBar />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
            <h1 style={{
                marginLeft : '20px'
            }}>{post.title}</h1>
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
            {/* 이미지가 여러 개일 수 있으므로, 배열로 처리합니다. */}
            <div>
                {post.imageUrl1 && <img src={post.imageUrl1} alt={post.title} style={{width: "40%", height : "40%"}} />}
                {post.imageUrl2 && <img src={post.imageUrl2} alt={post.title} style={{width: "40%", height : "40%"}} />}
                {/* 2016년 이후는 imageUrl을 사용합니다. */}
                {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{width: "40%", height : "40%"}} />}
            </div>
        </div>
    );
}

export default PrevExamDetailPage;
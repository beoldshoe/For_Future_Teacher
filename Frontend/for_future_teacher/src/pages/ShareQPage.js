import React, { useState, useEffect } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";

const ShareQPage = () => {
    // 게시판 데이터를 저장할 상태
    const [posts, setPosts] = useState([]);

    // 컴포넌트가 마운트될 때 API 호출
    useEffect(() => {
        fetch('API_ENDPOINT') // 'API_ENDPOINT' 부분을 실제 API 엔드포인트 주소로 대체하세요.
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <MainTopNavBar />
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1 style={{marginLeft : '20px'}}>문제 공유 게시판</h1>
                <div style={{flexGrow: 1}}>
                    {posts.map((post, index) => (
                        <div key={index} style={{border: '1px solid #ccc', padding: '10px', margin: '10px'}}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShareQPage;

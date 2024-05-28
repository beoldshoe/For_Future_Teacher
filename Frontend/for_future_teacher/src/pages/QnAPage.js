import React, { useState, useEffect } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";

const QnAPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('your-api-endpoint');
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
            <h1 style={{ marginLeft: '20px' }}>질의응답 게시판</h1>
            {loading ? (
                <div style={{ marginLeft: '20px' }}>게시물을 불러오는 중...</div>
            ) : (
                <ul>
                    {posts.map(post => (
                        <li key={post.id} style={{ marginLeft: '20px' }}>
                            {post.title} - {post.body}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QnAPage;

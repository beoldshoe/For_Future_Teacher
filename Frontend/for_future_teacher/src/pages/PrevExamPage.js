import React from 'react';
import MainTopNavBar from "../components/MainTopNavBar"

// 게시판 컴포넌트 예시
const Board = () => {
    return (
        <div style={{ float: 'right', width: '70%', backgroundColor: '#f0f0f0', padding: '20px' }}>
            {/* 게시판 내용이 나중에 여기에 추가됩니다. */}
            게시판 내용이 여기 표시됩니다.
        </div>
    );
}


const PrevExamPage = () => {
    return(
        <div>
            <MainTopNavBar />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '30%' }}>
                    {/* 왼콘 상단에 "기출문제" 문구 추가 */}
                    <h1 style={{marginLeft : '20px'}}>기출문제</h1>
                </div>
                <Board />
            </div>
        </div>
    )
}

export default PrevExamPage;

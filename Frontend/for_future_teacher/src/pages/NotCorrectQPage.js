import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainTopNavBar from "../components/MainTopNavBar";
import SideBar from "../components/SideBar";
import { ApiAddress } from "../constants";

const NotCorrectQPage =() => {
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const navigate = useNavigate();
    const userid = localStorage.getItem('userid');
    console.log(userid);

    useEffect(() => {
        const fetchCorrectAnswers = async () => {
            try {
                const response = await fetch(`${ApiAddress}/users/answers/${userid}`);
                const data = await response.json();
                setCorrectAnswers(data.incorrect);
            } catch (error) {
                console.error("Error fetching correct answers:", error);
            }
        };

        fetchCorrectAnswers();
    }, [userid]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <MainTopNavBar />
            <div style={{ display: 'flex', flex: 1 }}>
                <SideBar />
                <div style={{ flex: 1, marginLeft: '20px' }}>
                    <h1>내가 틀린 문제</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {correctAnswers.map((answer) => (
                            <div
                                key={answer}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    borderRadius: '100px',
                                    cursor: 'pointer',
                                    width: '100px',
                                    height: '100px',
                                    textAlign: 'center' // 텍스트가 여러 줄인 경우 중앙 정렬을 위해 추가
                                }}
                                onClick={() => navigate(`/ShareQDetail/${userid}/${answer}`)}
                            >
                                <h2 style={{ margin: 0 }}>{answer}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotCorrectQPage;
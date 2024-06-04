import MainTopNavBar from "../components/MainTopNavBar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiAddress } from "../constants";

const ShareQDetail = () => {
    const userid = localStorage.getItem('userid');
    const { question_id } = useParams(); 
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const [option, setOption] = useState([]);
    const [nickname, setNickName] = useState('')
    const [selectedOption, setSelectedOption] = useState(null);
    const [commentary, setCommentary] = useState('');

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await fetch(`${ApiAddress}/questions/${question_id}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('게시물을 가져오는데 실패했습니다.');
                }
                const data = await response.json();
                console.log(data)
                setTitle(data.title)
                setContent(data.content)

                if (data.questionType === 'Choices4') {
                    setOption(new Array(4).fill(''));
                } else if (data.questionType === 'Choices5') {
                    setOption(new Array(5).fill(''));
                }
    
                const options = data.options.map(option => option.content);
                setOption(options);
                setNickName(data.nickname)
            } catch (error) {
                console.error(error);
            }
        };

        fetchPostDetails();
    }, [question_id]); 

    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };

    const handleSubmit = async () => {
        if (selectedOption === null) {
            alert('답을 선택해주세요.');
            return;
        }

        console.log("Selected option:", selectedOption + 1);

        try {
            const response = await fetch(`${ApiAddress}/questions/${question_id}/${userid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answers: selectedOption })
            });

            const data = await response.json();

            if (data.correct) {
                alert('정답입니다!');
            } else {
                alert('오답입니다. 다시 시도해주세요');
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    useEffect(() => {
        const fetchCommentary = async () => {
            try {
                const response = await fetch(`${ApiAddress}/questions/answer/${question_id}`);
                const data = await response.json();
                setCommentary(data.commentary);
                console.log(data)
            } catch (error) {
                console.error('Error fetching commentary:', error);
            }
        };

        fetchCommentary();
    }, [question_id, setCommentary]);

    return (
        <div>
            <MainTopNavBar />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <h1 style={{ marginLeft: '20px' }}>문제 풀기</h1>
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
            <div style={{ margin: '20px' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center', 
            }}>
                <h2>{title}</h2>
                <p style={{ fontSize: '14px', color: 'gray', marginLeft: '10px' }}>{nickname}</p>
            </div>
                <p>{content}</p>
                {option.map((opt, index) => (
                    <div key={index}>
                        <input 
                            type="radio" 
                            name="option" 
                            value={index} 
                            checked={selectedOption === index}
                            onChange={() => handleOptionChange(index)} 
                        />
                        <label>{opt}</label>
                    </div>
                ))}
                <button 
                    style={{
                        marginTop: '20px',
                        width: '80px',
                        height: '30px',
                        marginBottom : '10px'
                    }}
                    onClick={handleSubmit}
                >
                    확인
                </button>
                <div
                    style={{
                        display : 'flex',
                        flexDirection : 'row'
                    }}>
                        <button style={{
                            width : '80px',
                            height : '30px'
                        }}>수정</button>
                        <button style={{marginLeft : '10px', width : '80px', height : '30px'}}>삭제</button>
                </div>
            </div>
        </div>
    );
}

export default ShareQDetail;

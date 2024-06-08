import React, { useState } from 'react';
import MainTopNavBar from "../components/MainTopNavBar";
import { useNavigate } from 'react-router-dom';
import { ApiAddress } from '../constants';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ShareQDetailUpdate = () => {
    const userid = localStorage.getItem('userid');
    console.log(userid);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [choiceCount, setChoiceCount] = useState('Choices4');
    const [choices, setChoices] = useState(['', '', '', '']);
    const [choiceid, setChoiceid] = useState(['','','',''])
    const [isPreviousQuestion, setIsPreviousQuestion] = useState(false);
    const [answer, setAnswer] = useState('');
    const [explanation, setExplanation] = useState('');
    const { question_id } = useParams();
    

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
                    setChoices(new Array(4).fill(''));
                } else if (data.questionType === 'Choices5') {
                    setChoices(new Array(5).fill(''));
                }

                if (data.questionType === 'Choices4') {
                    setChoiceid(new Array(4).fill(''));
                } else if (data.questionType === 'Choices5') {
                    setChoiceid(new Array(5).fill(''));
                }
    
                const options = data.options.map(option => option.content);
                const optionid = data.options.map(option => option.optionId);
                setChoices(options);
                setChoiceid(optionid)
                console.log(choices)
        
            } catch (error) {
                console.error(error);
            }
        };

        fetchPostDetails();
    }, [question_id]); 

    useEffect(() => {
        const fetchCommentary = async () => {
            try {
                const response = await fetch(`${ApiAddress}/questions/answer/${question_id}`);
                const data = await response.json();
                setExplanation(data.commentary);
                setAnswer(data.answers)
                console.log(data)
            } catch (error) {
                console.error('Error fetching commentary:', error);
            }
        };

        fetchCommentary();
    }, [question_id, setExplanation]);

    const handleChoiceChange = (index, value) => {
        const updatedChoices = choices.map((choice, idx) => idx === index ? value : choice);
        setChoices(updatedChoices);
      };
    
    const addChoice = () => {
        if (choices.length >=5){
            alert("선지를 더 이상 추가 할 수 없습니다.")
        }
        else{
        const newChoices = [...choices, ''];
        setChoices(newChoices);
        setChoiceCount(`Choices${newChoices.length}`);
        }
      };
    
    const removeChoice = (index) => {
        if (choices.length > 4) {
          const newChoices = choices.filter((_, idx) => idx !== index);
          setChoices(newChoices);
          setChoiceCount(`Choices${newChoices.length}`);
          console.log(choiceCount)
        }
      };
    
    const handleImageChange = (e) => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
        }
    
        reader.readAsDataURL(file);
      }

    const handleReset = () => {
        setTitle('');
        setContent('');
    };

    const handleSubmit = async () => {
        // 제목과 내용이 비어있는지 확인
        if (!title.trim() || !content.trim()) {
            alert('모든 내용을 입력하세요');
            return;
        }
    
        // 사용자에게 게시물 등록 여부를 확인
        const isConfirmed = window.confirm('문제를 수정하시겠습니까?');
        if (!isConfirmed) {
            return; // 사용자가 취소를 누른 경우
        }
    
        const optionDtos = choices.map((choice, index) => ({
            number: index + 1,
            content: choice,
            optionId: choiceid[index] // choiceid 배열의 해당 index 값을 optionId로 추가
        }));
        console.log(choiceid)
        console.log(optionDtos.number)
    
        // 게시물 데이터
        const postData = {
            questionDto: {
                title: title,
                content: content,
                questionType: choiceCount,
                image: imagePreviewUrl, // 이미지 URL이 빈 문자열이면 ''를 사용
                pastExam : isPreviousQuestion
            },
            optionDtos: optionDtos,
            answerDto: {
                answers: answer,
                subjectiveAnswer: "",
                image: "",
                commentary: explanation
            }
        };
        console.log(postData.optionDtos)
        try {
            // API 요청
            const response = await fetch(`${ApiAddress}/questions/${question_id}/${userid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
    
            // 응답 확인
            if (response.ok) {
                alert('문제가 수정되었습니다.');
                navigate(-1)
            } else {
                // 서버 에러 처리
                alert('문제 수정에 실패했습니다.');
            }
        } catch (error) {
            // 네트워크 에러 처리
            console.error('An error occurred:', error);
            alert('네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };
    

    return(
        <div>
            <MainTopNavBar />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <h1 style={{ marginLeft: '20px' }}>문제 공유 수정하기</h1>
                <button
                    style={{
                        marginLeft: '30px',
                        width: '80px',
                        height: '30px'
                    }}
                    onClick={() => navigate(`/ShareQDetail/${userid}/${question_id}`)}
                >
                    돌아가기
                </button>
            </div>
            <div style={{ margin: '20px', marginLeft : '20px' }}>
                <div style={{
                    display : 'flex',
                    flexDirection : 'row'
                }}>
                <div style={{
                    display : 'flex',
                    flexDirection : 'column'
                }}>
                <div>
                    <input
                    style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
                    type="text"
                    placeholder="문제 제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    style={{ width: '300px', padding: '10px', height: '40px', marginBottom: '10px'  }}
                    placeholder="문제를 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    style={{marginBottom: '10px'  }}
                    type="file"
                    onChange={handleImageChange} 
                    />
                </div>
                <div>
                    <input
                    style={{
                        width: '300px', padding: '10px', height: '10px', marginBottom: '10px' 
                    }}
                    type="text"
                    placeholder="답을 입력하세요"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>
                <div>
                    <textarea
                    style={{
                        width: '300px', padding: '10px', height: '200px', marginBottom: '10px' 
                    }}
                    type="text"
                    placeholder="해설을 입력하세요"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    />
                </div>
                </div>
                <div style={{
                    display : 'flex',
                    flexDirection : 'column',
                    marginLeft : '10vw'
                }}>
                {choices.map((choice, index) => (
                    <div 
                        key={index}
                        style={{
                            display : 'flex',
                            flexDirection : 'row'
                        }}
                        >
                    <input
                        style={{ width: '300px', height: '50px', marginBottom: '1vh' }}
                        type="text"
                        placeholder={`선지 ${index + 1}`}
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                    />
                    <div 
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            marginLeft :'2vw'
                        }}
                    >
                        {choices.length > 4 && (
                            <button
                                type="button"
                                onClick={() => removeChoice(index)}
                                style={{
                                    width: '5vw',
                                    height: '3vh',
                                    display: 'flex', // 버튼 내부를 flex 컨테이너로 만듭니다.
                                    justifyContent: 'center', // 수평 중앙 정렬
                                    alignItems: 'center', // 수직 중앙 정렬
                                    textAlign: 'center', // 텍스트 중앙 정렬
                                }}
                            >
                            Delete
                            </button>
                        )}
                    </div>
                    </div>
                ))}
                <button 
                    type="button" 
                    onClick={addChoice}
                    style={{
                        width : '5vw',
                        height : '3vh'
                    }}>
                    Add
                </button>
                <div
                    style={{
                        marginTop : '5vh'
                    }}
                    >
                    <span>기출</span>
                        <input
                        type="checkbox"
                        name="isPreviousQuestion"
                        value="yes"
                        checked={isPreviousQuestion === true}
                        onChange={(e) => setIsPreviousQuestion(e.target.checked)}
                        />
                </div>
                </div>
                <div style={{
                    marginLeft : '10vw'
                }}> 
                    <h2>이미지 미리보기</h2>
                    {imagePreviewUrl && (
                    <img src={imagePreviewUrl} alt="Image preview" style={{ width: '200px', height: '200px', objectFit: 'contain' }} />
                    )}
                </div>
                </div>
                <div style={{ display: 'flex', width : '80%', marginTop: '20px' }}>
                    <button
                        style={{ marginRight: '10px', width: '100px', height: '40px' }}
                        onClick={handleReset}
                    >
                        초기화
                    </button>
                    
                    <button
                        style={{ width: '100px', height: '40px' }}
                        onClick={handleSubmit}
                    >
                        등록하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShareQDetailUpdate
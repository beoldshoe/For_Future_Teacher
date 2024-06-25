import MainTopNavBar from "../components/MainTopNavBar";
import { ApiAddress } from "../constants";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/MainPage.css'

const teller = [
    {
        tid: 0,
        sen: '“성공은 우연이 아니다. 노력, 인내, 배움, 공부, 희생, 그리고 무엇보다 자신이 하고 있는 일에 대한 사랑, 하는 법을 배우는 것이다.” – 펠레'
    },
    {
        tid: 1,
        sen: '“지식에 대한 투자는 최고의 보상을 가져다 줄 것이다.”- 벤자민 프랭클린'
    },
    {
        tid: 2,
        sen: '“많은 실패자들은 포기하기 때문에 성공이 얼마나 가까웠는지 깨닫지 못합니다.” – 토마스 에디슨'
    },
    {
        tid: 3,
        sen: '“미루는 것은 쉬운 일을 어렵게 만들고 어려운 일을 더 어렵게 만든다.” – 메이슨 쿨리'
    },
    {
        tid: 4,
        sen: '“노력을 대신할 수 있는 것은 없습니다.” – 토마스 에디슨'
    },
    {
        tid: 5,
        sen: '“더 이상 상황을 바꿀 수 없을 때 우리는 스스로를 변화시켜야 합니다.” – 빅터 프랭클'
    },
    {
        tid: 6,
        sen: '“훌륭한 사람은 레이저 같은 집중력을 가진 평범한 사람입니다.” – 브루스 리'
    },
    {
        tid: 7,
        sen: '“진짜 어려움은 극복할 수 있습니다. 정복할 수 없는 것은 상상 속의 것들뿐이다.” – 시어도어 N. 베일'
    },
    {
        tid: 8,
        sen: '“탁월함은 기술이 아니다. 태도입니다.” – 랄프 마스턴'
    },
    {
        tid: 9,
        sen: '“성적이나 결과는 행동이 아니라 습관입니다.” – 아리스토텔레스'
    }
];

const MainPage = () => {
    const userid = localStorage.getItem('userid');
    const [posts, setPosts] = useState([]);
    const [randomId, setRandomId] = useState(null);
    const [randomQuote, setRandomQuote] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
        randomteller();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${ApiAddress}/questions`); 
            const data = await response.json();
            const ids = data.map(data => data.question_id);
            console.log(data);
            console.log(ids);
            setPosts(ids);
            if (ids.length > 0) {
                const randomIndex = Math.floor(Math.random() * ids.length);
                setRandomId(ids[randomIndex]);
                console.log(ids[randomIndex]);
            }
        } catch (error) {
            console.error("게시물을 불러오는데 실패했습니다.", error);
        }
    };

    const randomteller = () => {
        const randomIndex = Math.floor(Math.random() * teller.length);
        setRandomQuote(teller[randomIndex].sen);
    }

    const goToPage = () => {
        window.open('https://www.kice.re.kr/boardCnts/list.do?boardID=1500212&searchStr=&m=030306&s=kice')
    }

    return(
        <div>
            <MainTopNavBar />
            <div style={{
                display : 'flex',
                flexDirection : 'row'
            }}>
                <div>
                    <button className="randomShareQbutton"
                        onClick={() => navigate(`/ShareQDetail/${userid}/${randomId}`)}>
                        추천 문제 풀러가기
                    </button>
                </div>
                <div style={{
                    display : 'flex',
                    flexDirection : 'column'
                }}>
                    <div>
                        {randomQuote && <p className="randomQuote">{randomQuote}</p>}
                    </div>
                    <div>
                        <button className="goToPage" onClick={goToPage}>기출문제 보러가기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;

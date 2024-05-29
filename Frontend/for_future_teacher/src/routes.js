import FindIdPwPage from './pages/FindIdPwPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import QnAPage from './pages/QnAPage';
import PrevExamPage from './pages/PrevExamPage';
import ShareQPage from './pages/ShareQPage';
import MyPage from './pages/MyPage';

const routes = [
    {
        path :'/',
        component : HomePage
    },
    {
        path : '/SignUp',
        component : SignUpPage
    },
    {
        path : '/FindIdPw',
        component : FindIdPwPage
    },
    {
        path : '/Main',
        component : MainPage
    },
    {
        path : '/QnA',
        component : QnAPage
    },
    {
        path : 'PrevExam',
        component : PrevExamPage
    },
    {
        path : 'ShareQ',
        component : ShareQPage
    },
    {
        path : 'MyPage',
        component : MyPage
    }
   
]

export default routes;
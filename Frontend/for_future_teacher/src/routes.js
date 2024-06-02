import FindIdPwPage from './pages/FindIdPwPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import QnAPage from './pages/QnAPage';
import PrevExamPage from './pages/PrevExamPage';
import ShareQPage from './pages/ShareQPage';
import MyPage from './pages/MyPage';
import CorrectQPage from './pages/CorrectQPage';
import NotCorrectQPage from './pages/NotCorrectQPage';
import QnARegPage from './pages/QnARegPage';
import QnADetailPage from './pages/QnADetailPage';
import QnADetailUpdatePage from './pages/QnADetailUpdatePage';
import ShareQRegPage from './pages/ShareQRegPage';

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
        path : '/Main/:id',
        component : MainPage
    },
    {
        path : '/QnA/:id',
        component : QnAPage
    },
    {
        path : '/QnAReg/:id',
        component : QnARegPage
    },
    {
        path : 'QnADetail/:id/:postId',
        component : QnADetailPage
    },
    {
        path : 'QnADetailUpdate/:id/:postId',
        component : QnADetailUpdatePage
    },
    {
        path : 'PrevExam/:id',
        component : PrevExamPage
    },
    {
        path : 'ShareQ/:id',
        component : ShareQPage
    },
    {
        path : 'ShareQReg/:id',
        component : ShareQRegPage
    },
    {
        path : 'MyPage/:id',
        component : MyPage
    },
    {
        path : 'CorrectQ/:id',
        component : CorrectQPage
    },
    {
        path : 'NotCorrectQ/:id',
        component : NotCorrectQPage
    }
   
]

export default routes;
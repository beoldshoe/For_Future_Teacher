import FindIdPwPage from './pages/FindIdPwPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import QnAPage from './pages/QnAPage';

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
    }
   
]

export default routes;
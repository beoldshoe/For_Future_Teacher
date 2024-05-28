import FindIdPwPage from './pages/FindIdPwPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';

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
        path : '/MainPage',
        component : MainPage
    }
   
]

export default routes;
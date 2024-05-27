import FindIdPwPage from './pages/FindIdPwPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';

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
    }
   
]

export default routes;
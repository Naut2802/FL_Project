import Contact from '~/pages/Contact';
import Home from '~/pages/Home';
import News from '~/pages/News';
import LoginForm from '~/Components/Account/Login/LoginForm';
import AddStudent from '~/Components/Layout/AddStudets/AddStudets';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/news', component: News },
    { path: '/contact', component: Contact },
    { path: '/login', component: LoginForm },
    { path: '/add', component: AddStudent },
];

//Private routes
const privateRoutes = [];

export { privateRoutes, publicRoutes };

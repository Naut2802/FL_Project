import Contact from '~/pages/Contact';
import Home from '~/pages/Home';
import News from '~/pages/News';
import LoginForm from '~/Components/Account/LoginForm';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/news', component: News },
    { path: '/contact', component: Contact },
    { path: '/login', component: LoginForm },
];

//Private routes
const privateRoutes = [];

export { privateRoutes, publicRoutes };

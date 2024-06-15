import Contact from '~/pages/Contact';
import Home from '~/pages/Home';
import News from '~/pages/News';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/news', component: News },
    { path: '/contact', component: Contact },
];

//Private routes
const privateRoutes = [];

export { privateRoutes, publicRoutes };

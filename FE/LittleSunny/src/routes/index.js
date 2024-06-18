import Contact from '~/pages/Contact';
import Home from '~/pages/Home';
import News from '~/pages/News';
import LoginForm from '~/Components/Account/Login/LoginForm';
import AddStudent from '~/Components/Layout/AddStudets/AddStudets';
import DSHocVien from '~/Components/Layout/DSHocVien/DSHocVien';
import DSLopKhoaHoc from '~/Components/Layout/DSLop_KhoaHoc/DSLopKhoaHoc';
import ThongKe from '~/Components/Layout/ThongKe/ThongKe';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/news', component: News },
    { path: '/contact', component: Contact },
    { path: '/login', component: LoginForm },
    { path: '/add', component: AddStudent },
    { path: '/hocvien', component: DSHocVien },
    { path: '/khoahoc', component: DSLopKhoaHoc },
    { path: '/thongke', component: ThongKe },
];

//Private routes
const privateRoutes = [];

export { privateRoutes, publicRoutes };

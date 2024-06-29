import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginForm from './Components/Account/Login';
import DSHocVien from './Components/Layout/DSHocVien';
import DSLopKhoaHoc from './Components/Layout/DSLopKhoaHoc';
import DSHocVienLop from './Components/Layout/HocVienLop';
import ThongKe from './Components/Layout/ThongKe';
import Home from './pages/Home';
import News from './pages/News';

const ProtectedRoute = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user) {
        toast.error('Vui lòng đăng nhập để sử dụng được chức năng!');
        return <Navigate to="/login" replace={true} />;
    }
    return <Outlet />;
};

const UnauthorizedRoute = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) return <Navigate to="/home" replace={true} />;
    return <Outlet />;
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route path="/home" element={<Home />}>
                <Route path="student" element={<DSHocVien />} />
                <Route path="course" element={<DSLopKhoaHoc />} />
                <Route path="classes" element={<DSHocVienLop />} />
                <Route path="thongke" element={<ThongKe />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/news" element={<News />} />
            </Route>

            <Route element={<UnauthorizedRoute />}>
                <Route path="/login" element={<LoginForm />} />
            </Route>
        </Routes>
    );
}

export default App;

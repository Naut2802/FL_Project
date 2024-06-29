import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/Account/Login';
import DSHocVien from './Components/Layout/DSHocVien';
import DSKhoaHoc from './Components/Layout/DSKhoaHoc';
import DSLop from './Components/Layout/DSLop';
import HomeAdmin from './Components/Layout/HomeAdmin';
import ThongKe from './Components/Layout/ThongKe';
import Home from './pages/Home';
import News from './pages/News';

const ProtectedRoute = () => {
    const user = localStorage.getItem('userId');
    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }
    return <Outlet />;
};

const UnauthorizedRoute = () => {
    const user = localStorage.getItem('userId');
    if (user) return <Navigate to="/home" replace={true} />;
    return <Outlet />;
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route path="/home" element={<Navigate to="/page-admin" replace={true} />} />
            <Route element={<Home />}>
                <Route path="student" element={<DSHocVien />} />
                <Route path="course" element={<DSKhoaHoc />} />
                <Route path="classes" element={<DSLop />} />
                <Route path="thongke" element={<ThongKe />} />
                <Route path="page-admin" element={<HomeAdmin />} />
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

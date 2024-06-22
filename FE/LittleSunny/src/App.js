import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/Account/Login/LoginForm';
import AddStudent from './Components/Layout/AddStudets/AddStudets';
import DSHocVien from './Components/Layout/DSHocVien/DSHocVien';
import DSLopKhoaHoc from './Components/Layout/DSLop_KhoaHoc/DSLopKhoaHoc';
import ThongKe from './Components/Layout/ThongKe/ThongKe';
import Home from './pages/Home';
import News from './pages/News';

const ProtectedRoute = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user) return <Navigate to="/login" replace={true} />;
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
            <Route path="/home" element={<Home />} />
            <Route path="/student" element={<DSHocVien />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/classes" element={<DSLopKhoaHoc />} />
            <Route path="/thongke" element={<ThongKe />} />

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

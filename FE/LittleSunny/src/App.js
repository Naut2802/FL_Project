import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/Account/Login/LoginForm';
import AddStudent from './Components/Layout/AddStudets/AddStudets';
import DSHocVien from './Components/Layout/DSHocVien/DSHocVien';
import DSLopKhoaHoc from './Components/Layout/DSLop_KhoaHoc/DSLopKhoaHoc';
import ThongKe from './Components/Layout/ThongKe/ThongKe';
import Contact from './pages/Contact';
import Home from './pages/Home';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/student" element={<DSHocVien />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/classes" element={<DSLopKhoaHoc />} />
            <Route path="/thongke" element={<ThongKe />} />
        </Routes>
    );
}

export default App;

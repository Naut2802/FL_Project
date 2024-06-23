import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import GlobalStyles from '~/Components/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import News from './pages/News';
import LoginForm from './Components/Account/Login/LoginForm';
import Contact from './pages/Contact';
import DSHocVien from './Components/Layout/DSHocVien/DSHocVien';
import AddStudent from './Components/Layout/AddStudets/AddStudets';
import DSLopKhoaHoc from './Components/Layout/DSLop_KhoaHoc/DSLopKhoaHoc';
import DSHocVienLop from './Components/Layout/HocVienLop/HocVien_Lop';
import ThongKe from './Components/Layout/ThongKe/ThongKe';
import App from './App';
// import Home from './pages/Home';
// import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <GlobalStyles>
            <React.StrictMode>
                {/* <App /> */}
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace={true} />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/home" element={<App />}>
                        <Route path="news" element={<News />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="student" element={<DSHocVien />} />
                        <Route path="addS" element={<AddStudent />} />
                        <Route path="course" element={<DSLopKhoaHoc />} />
                        <Route path="classes" element={<DSHocVienLop />} />
                        <Route path="thongke" element={<ThongKe />} />
                    </Route>
                </Routes>
            </React.StrictMode>
        </GlobalStyles>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

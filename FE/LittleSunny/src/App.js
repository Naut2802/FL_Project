import { Outlet } from 'react-router-dom';
import Home from './pages/Home';
// import LoginForm from './Components/Account/Login/LoginForm';
// import AddStudent from './Components/Layout/AddStudets/AddStudets';
// import Contact from './pages/Contact';
// import News from './pages/News';
// import DSHocVien from './Components/Layout/DSHocVien/DSHocVien';
// import DSLopKhoaHoc from './Components/Layout/DSLop_KhoaHoc/DSLopKhoaHoc';
// import ThongKe from './Components/Layout/ThongKe/ThongKe';

function App() {
    return (
        <>
            <div className="row">
                <div className="col-auto col-md-2">
                    <Home />
                </div>
                <div className="col-auto col-md-10">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default App;

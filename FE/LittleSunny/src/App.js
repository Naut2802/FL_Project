import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
// import './App.css';
// import logo from './logo.svg';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </Router>

        // <div className="wrapper">
        //     <header>
        //         <div className="row h-50 me-0">
        //             <div className="img col">
        //                 <img src={logo} className="App-logo" alt="logo" />
        //             </div>
        //         </div>
        //     </header>
        //     <nav className="navbar navbar-expand-lg bg-body-tertiary w-100 ">
        //         <div className="container-fluid d-flex justify-content-center">
        //             <div className="collapse navbar-collapse " id="navbarNav">
        //                 <ul className="navbar-nav text-center">
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="/">
        //                             Trang Chủ
        //                         </a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link " href="/">
        //                             Giới Thiệu
        //                         </a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link " href="/">
        //                             Tin Tức
        //                         </a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="/">
        //                             Khóa Học
        //                         </a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="/">
        //                             Cảm Nhận Học Viên
        //                         </a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="/">
        //                             {' '}
        //                             Liên Hệ{' '}
        //                         </a>
        //                     </li>
        //                 </ul>
        //             </div>
        //             <div className="account float-end">
        //                 <i className="bi bi-facebook mx-2"></i>
        //                 <i className="bi bi-google mx-2"></i>
        //                 <i className="bi bi-person-circle mx-2"></i>
        //             </div>
        //         </div>
        //     </nav>
        //     <div className="d-flex justify-content-center">
        //         <nav className="navbar navbar-expand-lg bg-danger ">
        //             <div className="nav container-fluid float-end">
        //                 <div className="collapse navbar-collapse " id="navbarNav">
        //                     <ul className="navbar-nav text-center">
        //                         <li className="nav-item w-100">
        //                             <a className="nav-link" href="/">
        //                                 Tiếng Anh Giao Tiếp
        //                             </a>
        //                         </li>
        //                         <li className="nav-item dropdown border-start w-75">
        //                             <a
        //                                 className="nav-link dropdown-toggle "
        //                                 href="/"
        //                                 role="button"
        //                                 data-bs-toggle="dropdown"
        //                                 aria-expanded="false"
        //                             >
        //                                 Luyện Thi
        //                             </a>
        //                             <ul className="dropdown-menu bg-danger">
        //                                 <li>
        //                                     <a className="dropdown-item" href="/">
        //                                         TOEIC
        //                                     </a>
        //                                 </li>
        //                                 <li>
        //                                     <hr className="dropdown-divider" />
        //                                 </li>
        //                                 <li>
        //                                     <a className="dropdown-item" href="/">
        //                                         IELT
        //                                     </a>
        //                                 </li>
        //                             </ul>
        //                         </li>
        //                         <li className="nav-item border-start w-100">
        //                             <a className="nav-link " href="/">
        //                                 Lịch Khai Giảng
        //                             </a>
        //                         </li>
        //                         <li className="nav-item border-start w-100">
        //                             <a className="nav-link" href="/">
        //                                 Bí Quyết Học Tiếng Anh
        //                             </a>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </nav>
        //     </div>
        // </div>
    );
}

export default App;

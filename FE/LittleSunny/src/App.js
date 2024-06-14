import './App.css';
import logo from './logo.svg';

function App() {
    return (
        <div className="container">
            <header>
                <div className="row h-50">
                    <div className="img col">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                </div>
            </header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary w-100 ">
                <div className="container-fluid d-flex justify-content-center">
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav text-center">
                            <li className="nav-item">
                                <a className="nav-link" href="abc">
                                    Trang Chủ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="abc">
                                    Giới Thiệu
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="abc">
                                    Tin Tức
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="abc">
                                    Khóa Học
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="abc">
                                    Cảm Nhận Học Viên
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="abc">
                                    {' '}
                                    Liên Hệ{' '}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="account float-end">
                        <i className="bi bi-facebook mx-2"></i>
                        <i className="bi bi-google mx-2"></i>
                        <i className="bi bi-person-circle mx-2"></i>
                    </div>
                </div>
            </nav>
            <div className="d-flex justify-content-center">
                <nav className="navbar navbar-expand-lg bg-danger ">
                    <div className="nav container-fluid float-end">
                        <div className="collapse navbar-collapse " id="navbarNav">
                            <ul className="navbar-nav text-center">
                                <li className="nav-item w-100">
                                    <a className="nav-link" href="abc">
                                        Tiếng Anh Giao Tiếp
                                    </a>
                                </li>
                                <li className="nav-item dropdown border-start w-75">
                                    <a
                                        className="nav-link dropdown-toggle "
                                        href="abc"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        Luyện Thi
                                    </a>
                                    <ul className="dropdown-menu bg-danger">
                                        <li>
                                            <a className="dropdown-item" href="abc">
                                                TOEIC
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="abc">
                                                IELT
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item border-start w-100">
                                    <a className="nav-link " href="abc">
                                        Lịch Khai Giảng
                                    </a>
                                </li>
                                <li className="nav-item border-start w-100">
                                    <a className="nav-link" href="abc">
                                        Bí Quyết Học Tiếng Anh
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default App;

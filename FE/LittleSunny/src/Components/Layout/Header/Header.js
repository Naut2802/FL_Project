import logo from '~/LittleSunny.png';
import { AiOutlineLogin } from 'react-icons/ai';
import './Header.css';

function Header() {
    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-2">
                <div className="container-fluid">
                    <div className="w-25">
                        <img src={logo} alt="" className="img img-fluid rounded mx-auto d-block w-50" />
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="a">
                                    TRANG CHỦ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="a">
                                    KHÓA HỌC
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="a">
                                    TIN TỨC
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="a"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    LUYỆN THI
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="a">
                                            TOEIC
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="a">
                                            IELT
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="a">
                                            Something else here
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-outline-primary">
                        <AiOutlineLogin />
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Header;

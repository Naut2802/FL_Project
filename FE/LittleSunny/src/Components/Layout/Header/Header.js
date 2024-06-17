import logo from '~/LittleSunny.png';
import { FaUserCircle } from 'react-icons/fa';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Header() {
    return (
        <div className={cx('css')}>
            <nav className={cx('nav', 'navbar navbar-expand-lg bg-body-tertiary')}>
                <div className={cx('container-fluid')}>
                    <a className={cx('navbar-brand')} href="a">
                        <img src={logo} alt="" className={cx('logo', 'img-fluid rounded mx-auto d-block')} />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={cx('collapse navbar-collapse justify-content-center')} id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">
                                    TRANG CHỦ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="a">
                                    KHÓA HỌC
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="a">
                                    TIN TỨC
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="A"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    LUYỆN THI
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="A">
                                            IELT
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="A">
                                            TOEIC
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="A">
                                            ORTHER
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <a className={cx('nav-link active', 'cssa')} aria-current="page" href="login">
                        <FaUserCircle />
                    </a>
                </div>
            </nav>
        </div>
    );
}

export default Header;

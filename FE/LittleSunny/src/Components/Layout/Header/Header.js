
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import logo from '~/LittleSunny.png';

const cx = classNames.bind(styles);
function Header() {
    return (
        <div className={cx('css')}>
            <nav className={cx('nav', 'navbar navbar-expand-lg bg-body-tertiary')}>
                <div className={cx('container-fluid')}>
                    <Link className={cx('navbar-brand')} to="/">
                        <img src={logo} alt="" className={cx('logo', 'img-fluid rounded mx-auto d-block')} />
                    </Link>
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
                                <Link className="nav-link active mx-2" aria-current="page" to="hocvien">
                                    DANH SÁCH HỌC VIÊN
                                </Link>
                            </li>
                            <li className="nav-item border-start border-3">
                                <Link className="nav-link active mx-2" aria-current="page" to="add">
                                    ĐĂNG KÝ
                                </Link>
                            </li>
                            <li className="nav-item border-start border-3">
                                <Link className="nav-link active  mx-2" aria-current="page" to="khoahoc">
                                    DANH SÁCH LỚP
                                </Link>
                            </li>
                            <li className="nav-item border-start border-3">
                                <Link className="nav-link active  mx-2" aria-current="page" to="thongke">
                                    THỐNG KÊ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link className={cx('nav-link active', 'cssa')} aria-current="page" to="login">
                        <FaUserCircle />
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Header;

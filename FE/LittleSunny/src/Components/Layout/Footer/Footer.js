import classNames from 'classnames/bind';
import { FaHome, FaPhoneAlt } from 'react-icons/fa';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className="row w-100">
                <div className={cx('title-footer', 'col-6 ')}>
                    <ul className={cx('ulCss')}>
                        <h3 className={cx('title-name')}>Little Sunny Education Center </h3>
                        <li className={cx('liCss')}>
                            <FaHome />
                            <span> 186A Bình Quới, Bình Thạnh, TP Hồ Chí Minh</span>
                        </li>
                        <li className={cx('liCss')}>
                            <FaPhoneAlt />
                            <span> 093 1427048 - Ms.Nguyên</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('title-col4', 'col-4')}>
                    <ul>
                        <li className={cx('liCss')}>
                            <a className={cx('aCss')} href="a">
                                Tin Tức
                            </a>
                        </li>
                        <li className={cx('liCss')}>
                            <a className={cx('aCss')} href="a">
                                Khóa Học
                            </a>
                        </li>
                        <li className={cx('liCss')}>
                            <a className={cx('aCss')} href="a">
                                Liên Hệ
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={cx('title-col2', 'col-2')}>
                    <ul className={cx('ulCss')}>
                        <h4>Kết nối với chúng tôn</h4>
                        <li className={cx('liCss')}>
                            <FaHome />
                            <a className={cx('aCss')} href="https://www.facebook.com/Famyly77sin">
                                <span> Facebook</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

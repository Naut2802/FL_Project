import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LoginForm() {
    return (
        <div className={cx('wrapper')}>
            <form action="">
                <h1>Login</h1>
                <div className={cx('input-box')}>
                    <input type="text" placeholder="Username" required />
                    <FaUser className={cx('icon')} />
                </div>
                <div className={cx('input-box')}>
                    <input type="password" placeholder="Password" required />
                    <FaLock className={cx('icon')} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;

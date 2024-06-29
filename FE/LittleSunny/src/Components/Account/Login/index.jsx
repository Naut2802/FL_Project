import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleGetMyInfoAPI } from '~/apis';
import authorizedAxiosInstance from '~/utils/authorizedAxios';
import { API_ROOT } from '~/utils/constants';
import styles from './LoginForm.module.scss';

const cx = classNames.bind(styles);

function LoginForm() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submitLogIn = async (data) => {
        const res = await authorizedAxiosInstance.post(`${API_ROOT}/api/v1/auth/sign-in`, data);
        localStorage.setItem('accessToken', res.data.result.accessToken);
        localStorage.setItem('userId', res.data.result.userId);

        const res2 = handleGetMyInfoAPI();
        const roleInfo = res2.data.result.roles[0].roleName;
        if (roleInfo === 'ADMIN') {
            navigate('/page-admin');
        } else {
            navigate('/home');
        }
        toast.success('Đăng nhập thành công');
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit(submitLogIn)}>
                <h1>Đăng Nhập</h1>
                <div className={cx('input-box')}>
                    <input
                        type="text"
                        autoComplete="username"
                        placeholder="Username"
                        {...register('username')}
                        required
                    />
                    <FaUser className={cx('icon')} />
                </div>
                <div className={cx('input-box')}>
                    <input
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        {...register('password')}
                        required
                    />
                    <FaLock className={cx('icon')} />
                </div>

                <button type="submit">Đăng Nhập</button>
                <div className={cx('register-link')}>
                    <span className="fw-light">
                        Chưa có tài khoản? <a href="a">Đăng ký</a>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;

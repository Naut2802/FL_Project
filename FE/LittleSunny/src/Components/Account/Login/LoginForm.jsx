import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authorizedAxiosInstance from '~/utils/authorizedAxios';
import { API_ROOT } from '~/utils/constants';
import styles from './LoginForm.module.scss';

const cx = classNames.bind(styles);

function LoginForm() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submitLogIn = async (data) => {
        const res = await authorizedAxiosInstance.post(`${API_ROOT}/api/v1/auth/login`, data);
        localStorage.setItem('accessToken', res.data.result.accessToken);
        localStorage.setItem('refreshToken', res.data.result.refreshToken);

        const res2 = await authorizedAxiosInstance.get(`${API_ROOT}/api/v1/user/my-info`);
        const userInfo = {
            id: res2.data.result.id,
            email: res2.data.result.email,
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        const roleInfo = res2.data.result.roles[0].roleName;
        if (roleInfo === 'ADMIN') {
            navigate('/news');
        } else {
            navigate('/home');
        }
        toast.success('Đăng nhập thành công');
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit(submitLogIn)}>
                <h1>Login</h1>
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

                <button type="submit">Login</button>
                <div className={cx('register-link')}>
                    <span className="fw-light">
                        Don't have an account? <a href="a">Register</a>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;

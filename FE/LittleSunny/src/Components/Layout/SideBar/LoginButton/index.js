import { useNavigate } from 'react-router-dom';

function LoginButton() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <button onClick={handleLogin} className="dropdown-item" type="button">
            <i className="bi bi-door-open"></i>
            <span className="ms-2 d-none d-sm-inline">Đăng Nhập</span>
        </button>
    );
}

export default LoginButton;

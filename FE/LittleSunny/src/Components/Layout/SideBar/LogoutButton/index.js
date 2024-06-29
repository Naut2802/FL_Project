import { toast } from 'react-toastify';
import { handleLogoutAPI } from '~/apis';

function LogoutButton() {
    const handleLogut = async () => {
        await handleLogoutAPI();
        toast.info('Bạn đã đăng xuất!!!');
    };

    return (
        <button onClick={handleLogut} className="dropdown-item" type="button">
            <i className="bi bi-door-open"></i>
            <span className="ms-2 d-none d-sm-inline">Đăng Xuất</span>
        </button>
    );
}

export default LogoutButton;

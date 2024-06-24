import { Breadcrumbs, Link } from '@mui/material';
import styles from './AddStudets.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AddStudent() {
    // const dateInput = document.getElementById('registrationDate');
    // const today = new Date();
    // const formattedDate = today.toISOString().substr(0, 10);
    // dateInput.value = formattedDate;

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" className="mt-5 fs-4">
                <Link underline="hover" color="inherit" href="/home">
                    Trang Chủ
                </Link>
                <Link underline="hover" color="inherit" href="/home/addS">
                    Đăng Ký Học Viên
                </Link>
            </Breadcrumbs>
            <div className={cx('wrapper')}>
                <form action="" className="row">
                    <h1>Nhập Thông Tin Học Viên</h1>
                    <div className={cx('input-box', 'col-6')}>
                        <input id="username" type="text" placeholder="Họ Tên" required />
                    </div>
                    <div className={cx('input-box', 'col-6')}>
                        <input type="text" placeholder="Số Điện Thoại" required />
                    </div>
                    <div className={cx('input-box')}>
                        <input type="date" placeholder="Ngày Sinh" required />
                    </div>
                    <div className={cx('input-box')}>
                        <input type="text" placeholder="Địa Chỉ" required />
                    </div>
                    <div className={cx('input-box', 'col-6')}>
                        <input type="text" placeholder="Học Phí" required />
                    </div>

                    <div className={cx('input-box', 'col-6')}>
                        <input type="text" placeholder="Số Tài Khoản" required />
                    </div>
                    <hr />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
                        <button type="submit" className="w-25">
                            Thêm
                        </button>
                        <button type="submit" className="w-25">
                            Làm Mới
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddStudent;

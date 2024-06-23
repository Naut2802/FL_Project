import styles from './AddStudets.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AddStudent() {
    // const dateInput = document.getElementById('registrationDate');
    // const today = new Date();
    // const formattedDate = today.toISOString().substr(0, 10);
    // dateInput.value = formattedDate;

    return (
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
                {/* <div className={cx('input-box')}>
                    <input type="date" disabled id="registrationDate" placeholder="Ngày Đăng Ký" required />
                </div>
                <div className={cx('input-box')}>
                    <select className="form-select" defaultValue="">
                        <option selected>Lớp Học</option>
                        <option value="1">Lớp Học 1</option>
                        <option value="2">Lớp Học 2</option>
                        <option value="3">Lớp Học 3</option>
                    </select>
                </div> */}
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
    );
}

export default AddStudent;

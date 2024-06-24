import classNames from 'classnames/bind';
import styles from './AddStudets.module.scss';

const cx = classNames.bind(styles);

function AddStudent() {
    return (
        <div className={cx('wrapper')}>
            <form action="" className="row">
                <h1>Nhập Thông Tin Học Viên</h1>
                <div className={cx('input-box', 'col-6')}>
                    <input type="text" placeholder="Họ Tên" required />
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
                <div className={cx('input-box')}>
                    <select className="form-select" defaultValue="">
                        <option selected>Khóa Học</option>
                        <option value="1">Khóa Học 1</option>
                        <option value="2">Khóa Học 2</option>
                        <option value="3">Khóa Học 3</option>
                    </select>
                </div>
                <div className={cx('input-box', 'col-6')}>
                    <input type="text" placeholder="Học Phí" required />
                </div>
                <div className={cx('input-box', 'col-6')}>
                    <input type="text" placeholder="Số Tài Khoản" required />
                </div>
                <div className="d-flex mt-3">
                    <button type="submit">Add</button>
                    <button className="mx-2" type="submit">
                        Update
                    </button>
                    <button type="submit">Clear</button>
                </div>
            </form>
        </div>
    );
}

export default AddStudent;

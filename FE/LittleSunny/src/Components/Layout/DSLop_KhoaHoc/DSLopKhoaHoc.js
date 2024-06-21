import Table from 'react-bootstrap/Table';
import styles from './DSLopKhoaHoc.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function DSLopKhoaHoc() {
    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className={cx('wrapper', 'my-4')}>
                    <form action="">
                        <h1>Thêm Khóa - Lớp Học</h1>
                        <hr />
                        {/* <div className={cx('input-box')}>
                            <input type="text" placeholder="Khóa Học" required />
                        </div> */}
                        <div className={cx('input-box')}>
                            <select className="form-select" defaultValue="0">
                                <option value="0">Khóa Học</option>
                                <option value="1">Khóa Học 1</option>
                                <option value="2">Khóa Học 2</option>
                                <option value="3">Khóa Học 3</option>
                            </select>
                        </div>
                        <div className={cx('input-box')}>
                            <input type="text" placeholder="Lớp Học" required />
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
            </div>
            <div className="card my-4 border bg-white rounded-4">
                <div className="card-header row my-2 text-center">
                    <h1 className="col-10">Danh Sách Lớp</h1>
                    <select className="col-2 rounded-5" placeholder="Tìm kiếm" defaultValue="0">
                        <option value="0">Chọn Khóa...</option>
                        <option value="1">Khóa...</option>
                        <option value="2">Khóa...</option>
                    </select>
                </div>
                <div className="card-body">
                    <Table striped bordered hover size="sm">
                        <thead className="text-center">
                            <tr>
                                <th scope="col">Lớp</th>
                                <th scope="col">Khóa</th>
                                <th scope="col">Trạng Thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="w-25">Lớp ...</td>
                                <td className="w-25">Khóa ...</td>
                                <td className="w-25 text-center">
                                    <a href="a">Chi tiết</a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default DSLopKhoaHoc;

function ThongKe() {
    return (
        <div className="container">
            <div className="card mt-4 border bg-white rounded-4">
                <div className="card-header row my-2 text-center">
                    <h1 className="col-10">Thống Kê Học Phí</h1>
                    <input className="col-2 rounded-5" type="text" placeholder="Tìm kiếm" />
                </div>
                <div className="card-body">
                    <table className="table table-striped-columns mt-2" id="myTable">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Lớp</th>
                                <th scope="col">Họ Tên</th>
                                <th scope="col">Số Điện Thoại</th>
                                <th scope="col">Ngày Đăng Ký</th>
                                <th scope="col">Trạng Thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ID ...</td>
                                <td>Lớp ...</td>
                                <td>Nguyễn Văn A</td>
                                <td>21/12/2023</td>
                                <td>xxxx.xxx.xxx</td>
                                <td>Đã Đóng Học Phí</td>
                            </tr>
                            <tr>
                                <td>ID ...</td>
                                <td>Lớp ...</td>
                                <td>Nguyễn Văn B</td>
                                <td>21/12/2023</td>
                                <td>xxxx.xxx.xxx</td>
                                <td>Chưa Đóng Học Phí</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-footer text-end">
                    <h4 className="m-4">Doanh Thu: ... VND</h4>
                </div>
            </div>
            <div className="card mt-4 border bg-white rounded-4">
                <div className="card-header row my-2 text-center">
                    <h1 className="col-10">Thống Kê Theo Tháng</h1>
                    <input className="col-2 rounded-5" type="date" placeholder="Tìm kiếm tháng" />
                </div>
                <div className="card-body">
                    <table className="table table-striped-columns mt-2" id="myTable">
                        <thead>
                            <tr>
                                <th scope="col">Tháng</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Tổng Học Phí</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Tháng ...</td>
                                <td>...</td>
                                <td>......</td>
                            </tr>
                            <tr>
                                <td>Tháng ...</td>
                                <td>...</td>
                                <td>......</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-footer text-end">
                    <h4 className="m-4">Doanh Thu: ... VND</h4>
                </div>
            </div>
        </div>
    );
}

export default ThongKe;

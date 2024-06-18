function DSHocVien() {
    return (
        <div className="container card mt-4 border bg-white rounded-4">
            <div className="card-header row my-2 text-center">
                <h1 className="col-10">Danh Sách Học Viên Trung Tâm</h1>
                <input className="col-2 rounded-5" type="text" placeholder="Tìm kiếm" />
            </div>
            <div className="card-body">
                <table className="table table-striped-columns mt-2">
                    <thead>
                        <tr>
                            <th scope="col">Khóa Học</th>
                            <th scope="col">Lớp</th>
                            <th scope="col">Họ Tên</th>
                            <th scope="col">Ngày Sinh</th>
                            <th scope="col">Địa Chỉ</th>
                            <th scope="col">Số ĐT</th>
                            <th scope="col">TT Phụ Huynh</th>
                            <th scope="col">Học Phí</th>
                            <th scope="col">Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Khóa ...</td>
                            <td>Lớp ...</td>
                            <td>Nguyễn Văn A</td>
                            <td>02/02/2010</td>
                            <td>abc/edf</td>
                            <td>xxxx.xxx.xxx</td>
                            <td>Phụ Huynh A</td>
                            <td>300.000</td>
                            <td>Đã Đóng Học Phí</td>
                        </tr>
                        <tr>
                            <td>Khóa ...</td>
                            <td>Lớp ...</td>
                            <td>Nguyễn Văn B</td>
                            <td>02/02/2010</td>
                            <td>abc/edf</td>
                            <td>xxxx.xxx.xxx</td>
                            <td>Phụ Huynh B</td>
                            <td>300.000</td>
                            <td>Chưa Đóng Học Phí</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DSHocVien;

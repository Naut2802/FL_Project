// import { useEffect } from 'react';
// import { DataTable } from 'simple-datatables';
function DSLopKhoaHoc() {
    // useEffect(() => {
    //     const myTable = document.getElementById('myTable');
    //     if (myTable) {
    //         new DataTable('#myTable', {
    //             paging: true,
    //             perPage: 5, // Số hàng mỗi trang
    //         });
    //     }
    // }, []);
    return (
        <div className="container">
            <div className="card mt-4 border bg-white rounded-4">
                <div className="card-header row my-2 text-center">
                    <h1 className="col-10">Danh Sách Lớp</h1>
                    <input className="col-2 rounded-5" type="text" placeholder="Tìm kiếm" />
                </div>
                <div className="card-body">
                    <table className="table table-striped-columns mt-2" id="myTable">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Lớp</th>
                                <th scope="col">Họ Tên</th>
                                <th scope="col">Trạng Thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ID ...</td>
                                <td>Lớp ...</td>
                                <td>Nguyễn Văn A</td>
                                <td>Nghỉ Học</td>
                            </tr>
                            <tr>
                                <td>ID ...</td>
                                <td>Lớp ...</td>
                                <td>Nguyễn Văn B</td>
                                <td>Còn Học</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card mt-4 border bg-white rounded-4">
                <div className="card-header row my-2 text-center">
                    <h1 className="col-10">Danh Sách Khóa Học</h1>
                    <input className="col-2 rounded-5" type="text" placeholder="Tìm kiếm" />
                </div>
                <div className="card-body">
                    <table className="table table-striped-columns mt-2">
                        <thead>
                            <tr>
                                <th scope="col">Tên Khóa Học</th>
                                <th scope="col">Giá Khóa Học</th>
                                <th scope="col">Trạng Thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Khóa ...</td>
                                <td>3.000.000</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>Khóa ...</td>
                                <td>3.100.000</td>
                                <td>...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DSLopKhoaHoc;

import Table from 'react-bootstrap/Table';

function DSLopKhoaHoc() {
    return (
        <div className="container">
            <div className="card mt-4 border bg-white rounded-4">
                <div className="card-header row my-2 text-center">
                    <h1 className="col-10">Danh Sách Lớp</h1>
                    <select className="col-2 rounded-5" placeholder="Tìm kiếm">
                        <option selected>Chọn Khóa...</option>
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

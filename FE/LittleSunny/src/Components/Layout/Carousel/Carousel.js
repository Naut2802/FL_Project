import Logo1 from '~/Components/Images/logo1.jpg';
import Logo2 from '~/Components/Images/2.jpg';
import Logo3 from '~/Components/Images/3.jpg';
import kynang from '~/Components/Images/kynang.jpg';
import lotrinh from '~/Components/Images/lotrinh.jpg';
import vuichoi from '~/Components/Images/vuichoi.jpg';

function Carousel() {
    return (
        <div className="my-3">
            <div id="carouselExampleSlidesOnly" className="carousel slide border " data-bs-ride="carousel">
                <div className="carousel-inner rounded-4">
                    <div className="carousel-item active">
                        <img src={Logo1} class="d-block w-100" style={{ height: 580 }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={Logo2} class="d-block w-100" style={{ height: 580 }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={Logo3} class="d-block w-100" style={{ height: 580 }} alt="..." />
                    </div>
                </div>
            </div>
            <hr />
            <div className="row w-100 d-flex justify-content-center">
                <h1 className="text-center">Đến Với Chúng Tôi</h1>
                <div className="card col-4 w-25">
                    <img src={kynang} className="card-img-top h-50" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">NÂNG CAO KHẢ NĂNG GIAO TIẾP</h5>
                        <p class="card-text">
                            .....
                            <br />
                            <br />
                        </p>
                    </div>
                    <div className="card-footer">
                        <a href="a" className="btn btn-primary">
                            Đăng Ký Ngay
                        </a>
                    </div>
                </div>
                <div className="card col-4 mx-2 w-25">
                    <img src={lotrinh} className="card-img-top h-50" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">ĐẢM BẢO KHÓA HỌC THEO LỘ TRÌNH</h5>
                        <p class="card-text">
                            ....
                            <br />
                            <br />
                        </p>
                    </div>
                    <div className="card-footer">
                        <a href="a" className="btn btn-primary">
                            Đăng Ký Ngay
                        </a>
                    </div>
                </div>
                <div className="card col-4 w-25">
                    <img src={vuichoi} className="card-img-top h-50" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">CÁC HOẠT ĐỘNG VỪA HỌC VỪA CHƠI CHO BÉ</h5>
                        <p class="card-text">.....</p>
                    </div>
                    <div className="card-footer">
                        <a href="a" className="btn btn-primary">
                            Đăng Ký Ngay
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;

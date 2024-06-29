import { Outlet } from 'react-router-dom';

import SideBar from '~/Components/Layout/SideBar';

function Home() {
    return (
        <div className="row w-100">
            <div className="col-auto col-md-2">
                <SideBar />
            </div>
            <div className="col-auto col-md-10">
                <Outlet />
            </div>
        </div>
    );
}

export default Home;

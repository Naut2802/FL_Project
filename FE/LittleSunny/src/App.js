import { Outlet } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <>
            <div className="row">
                <div className="col-auto col-md-2">
                    <Home />
                </div>
                <div className="col-auto col-md-10">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default App;

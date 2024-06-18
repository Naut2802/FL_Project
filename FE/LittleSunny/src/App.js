
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/Account/Login/LoginForm';
import AddStudent from './Components/Layout/AddStudets/AddStudets';
import Contact from './pages/Contact';
import Home from './pages/Home';
import News from './pages/News';


function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace={true} />} />

            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addS" element={<AddStudent />} />
        </Routes>

    );
}

export default App;

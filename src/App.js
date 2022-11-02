import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import {
  Routes,
  Route,
} from "react-router-dom";
import Bus from './pages/Bus';
import ScheduleList from './pages/ScheduleList';

function App() {

  return (
    <div className='very-dark w-100'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/bus' element={<Bus/>} />
        <Route path='/schedule' element={<ScheduleList/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import {
  Routes,
  Route,
} from "react-router-dom";
import Bus from './pages/Bus';
import ScheduleList from './pages/ScheduleList';
import Login from './pages/Login';
import Register from './pages/Register';
import UserHome from './pages/UserHome';

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bus' element={<Bus />} />
        <Route path='/schedule' element={<ScheduleList />} />
        <Route path='/home' element={<UserHome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
  );
}

export default App;

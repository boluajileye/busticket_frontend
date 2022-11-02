import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Home from './pages/Home';

function App() {

  return (
    <div className='very-dark h-100'>
      <NavBar />
      <Home />
    </div>
  );
}

export default App;

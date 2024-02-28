import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route} from "react-router-dom";
import Signup from './components/signup-signin';
import DashboardComponent from './pages/dashboard';
function App() {
  
  return (
    <div className="App">
      
  <Routes>
 <Route path='/' element={<Signup></Signup>}></Route>
<Route  path="/dashboard" element={<DashboardComponent/>}/>
</Routes>


      
    </div>
  );
}

export default App;

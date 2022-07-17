
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
function App() {
  return (
  <Router>
    
      
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
    </Routes>

  </Router>
  );
}

export default App;

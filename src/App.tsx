import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Payments from "./pages/Payments";
import UserProfile from "./pages/Userprofile";
import ResumeForm from "./components/ResumeForm";
import ResumeByUser from "./components/ResumeByUser";

function App() {


  return (
 
  <Router>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/userProfile/:id" element={<UserProfile/>} />
      <Route path="/createResume" element={<ResumeForm/>} />
      <Route path="/resumeByUser/:id" element={<ResumeByUser/>} />
    </Routes>
  </Router>
     

  )
}

export default App

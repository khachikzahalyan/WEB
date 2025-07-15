
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Teacher from './pages/Teacher/Teacher';
import Student from './pages/Student/Student';

import { getUser } from './utils/auth';
import About from "./pages/About/About";
import Possibilities from "./pages/Possibilities/Possibilities";
import Contact from "./pages/Contact/Contact";
import Header from "./pages/Navigation/Header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";



function App() {
  const user = getUser();

  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRole="teacher">
                <Teacher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRole="student">
                <Student />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={user ? `/${user.role}` : "/login"} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/possibilities" element={<Possibilities />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    </Router>
  );
}

export default App;

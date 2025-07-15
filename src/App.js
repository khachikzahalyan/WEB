
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Teacher from './pages/Teacher/Teacher';
import Student from './pages/Student/Student';
import ProtectedRoute from './components/ProtectedRoute';
import { getUser } from './utils/auth';



function App() {
  const user = getUser();

  return (
    <Router>
      <div className="App">
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

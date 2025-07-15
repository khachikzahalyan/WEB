import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedInPath = location.pathname === '/teacher' || location.pathname === '/student';

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login', { replace: true });
  };

  return (
    <header className="home-header">
      <Link to="/" className="logo">Ուսումնական Պլատֆորմ</Link>
      <nav className="home-menu">
        <div className="menu-left">
          <Link to="/about">Մեր մասին</Link>
          <Link to="/possibilities">Հնարավորություններ</Link>
        </div>
        <div className="menu-right">
          <Link to="/contact">Կապ</Link>
          {isLoggedInPath ? (
            <button className="login-button" onClick={handleLogout}>Ելք</button>
          ) : (
            <button className="login-button" onClick={handleLogin}>Մուտք</button>
          )}
        </div>
      </nav>
    </header>
  );
}

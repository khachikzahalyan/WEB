import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
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
          <button className="login-button" onClick={handleLogin}>Մուտք</button>
        </div>
      </nav>
    </header>
  );
}

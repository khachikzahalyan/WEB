import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">Ուսումնական Պլատֆորմ</div>
        <nav className="home-menu">
          <a href="#about">Մեր մասին</a>
          <a href="#features">Հնարավորություններ</a>
          <a href="#contact">Կապ</a>
        </nav>
        <button className="login-button" onClick={handleLogin}>Մուտք</button>
      </header>

      <main className="home-main">
        <h1>Բարի գալուստ Ուսումնական Պլատֆորմ</h1>
        <p>Ուսուցիչների և աշակերտների համար նախատեսված հարթակ առաջադրանքների փոխանակման ու գնահատման համար։</p>
      </main>
    </div>
  );
}

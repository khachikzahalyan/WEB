import './Home.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <Link to="/" className="logo">Ուսումնական Պլատֆորմ</Link>
        <nav className="home-menu">
          <div className="menu-left">
            <a href="#about">Մեր մասին</a>
            <a href="#features">Հնարավորություններ</a>
          </div>
          <div className="menu-right">
            <a href="#contact">Կապ</a>
            <button className="login-button" onClick={handleLogin}>Մուտք</button>
          </div>
        </nav>
      </header>

      <main className="home-main">
        <h1>Բարի գալուստ Ուսումնական Պլատֆորմ</h1>
        <p>Ուսուցիչների և աշակերտների համար նախատեսված հարթակ առաջադրանքների փոխանակման ու գնահատման համար։</p>

        <div className="info-block" id="about">
          <h2>Ինչի համար է այս հարթակը՞</h2>
          <p>
            Այս հարթակը նպատակ ունի հեշտացնել ուսումնական գործընթացը՝
            ապահովելով պարզ և ինտերակտիվ միջավայր, որտեղ ուսուցիչները կարող են ստեղծել առաջադրանքներ, իսկ աշակերտները՝
            հանձնել իրենց աշխատանքները՝ կցելով ֆայլեր կամ նկարագրություն։
          </p>

          <h2 id="features">Հնարավորություններ</h2>
          <ul>
            <li>Ուսուցիչները կարող են ստեղծել և խմբագրել առաջադրանքներ</li>
            <li>Աշակերտները կարող են հանձնել առաջադրանքների պատասխանները</li>
            <li>Ուսուցիչը կարող է գնահատել աշակերտների հանձնած աշխատանքները</li>
            <li>Երկու կողմերն էլ ունեն իրենց դաշբորդը՝ համապատասխան գործիքներով</li>
          </ul>

          <h2>Ինչու ընտրել հենց մեզ?</h2>
          <p>
            Մեր հարթակը կենտրոնացած է պարզության, արագ աշխատանքի և ինտերակտիվության վրա։ Դուք կարող եք միանալ մի քանի վայրկյանում
            և անմիջապես սկսել օգտագործել համակարգը՝ առանց ավելորդ բարդությունների։
          </p>

          <h2 id="contact">Համակարգի նպատակը</h2>
          <p>
            Մեր նպատակն է աջակցել կրթության թվայնացմանը՝ ստեղծելով գործիք, որը կօգնի դպրոցներին և ուսումնական կենտրոններին
            կազմակերպել և հետևել առաջադրանքների և գնահատականների աշխատանքին։
          </p>
        </div>
      </main>
    </div>
  );
}

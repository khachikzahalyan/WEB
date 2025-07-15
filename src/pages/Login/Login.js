import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, saveUser } from "../../utils/auth";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = loginUser(username, password);
    if (user) {
      saveUser(user);
      navigate(`/${user.role}`);
    } else {
      setError("Ներդրված մուտքանունը կամ գաղտնաբառը սխալ է");
    }
  };

  return (
    <div className="login-page__container">
      <h2 className="login-page__title">Մուտք</h2>
      <input
        className="login-page__input"
        type="text"
        placeholder="Մուտքանուն"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-page__input"
        type="password"
        placeholder="Գաղտնաբառ"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-page__button" onClick={handleLogin}>
        Մուտք գործել
      </button>
      {error && <p className="login-page__error">{error}</p>}
    </div>
  );
}

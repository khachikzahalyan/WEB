import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, saveUser } from "../../utils/auth";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = loginUser(username, password);
    if (user) {
      saveUser(user);
      navigate(`/${user.role}`);
    } else {
      setError("Ներդրված մուտքանունը կամ գաղտնաբառը սխալ է");
    }
  };

  return (
    <form className="login-page__container" onSubmit={handleLogin}>
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
      <button className="login-page__button" type="submit">
        Մուտք գործել
      </button>
      {error && <p className="login-page__error">{error}</p>}
    </form>
  );
}

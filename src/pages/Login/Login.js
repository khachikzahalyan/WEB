import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'; 
import { loginUser, saveUser } from "../../utils/auth";

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
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="login-container">
      <h2>Вход</h2>
      <input
        type="text"
        className="input-login"
        placeholder="Մուտքանուն"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="input-password"
        placeholder="Գաղտնաբառ"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
      {error && <p>{error}</p>}
    </div>
  );
}

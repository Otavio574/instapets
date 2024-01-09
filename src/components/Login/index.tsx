import "./styles.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
interface LoginProps {
  loginType: "login" | "signup" | undefined;
}

function Login({ loginType }: LoginProps) {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    console.log(login);
  }, [login, password]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Username:", login);
    console.log("Password:", password);
    setLogin("");
    setPassword("");
  };

  const handleClick = () => {
    window.location.href = 'http://localhost:5173/';

  };
  
  const nextPage = () =>{
    window.location.href = 'http://localhost:5173/loggedin/homepage/';
  }

  return (
    <>
      <div className="login-container">
        {loginType === "login" ? <h1>Login</h1> : <h1>Criar conta</h1>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={handleChangeLogin}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={handleChangePassword}
          />
          <input
            type="submit"
            value={loginType === "login" ? "Entrar" : "Criar conta"}
            onClick={nextPage}
          />
        </form>

        <button id="myButton" onClick={handleClick}>
          HomePage
        </button>
        {loginType === "login" ? (
          <NavLink to="/signup">Criar conta</NavLink>
        ) : (
          <NavLink to="/login">Já tenho conta</NavLink>
        )}
        
      </div>
    </>
  );
}

export default Login;
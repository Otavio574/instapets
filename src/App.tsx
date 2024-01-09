import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import NewPage from "./pages/NewPost";

function HomePage() {
  const handleClick = () => {
    window.location.href = 'http://localhost:5173/login';
  };

  return (
    <>
      <h1>Welcome to Monitoria de Frontend 2023.1</h1>
      <button id="myButton" onClick={handleClick}>
        Login
      </button>
    </>
  );
}


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/loggedin/homepage" element={<NewPage />} />
      </Routes>
    </>
    
  );
}

export default App;
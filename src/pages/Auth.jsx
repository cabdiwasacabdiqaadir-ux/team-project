import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("libraryUser"));

    if (isLogin) {
      // LOGIN
      if (!savedUser) {
        setError("Account-kan ma jiro. Fadlan Sign Up samee.");
        return;
      }
      if (savedUser.username === username && savedUser.password === password) {
        localStorage.setItem("isAuth", "true");
        navigate(from, { replace: true });
      } else {
        setError("Username ama Password khaldan");
      }
    } else {
      // SIGN UP → auto login
      if (!username || !password) {
        setError("Fadlan buuxi username iyo password");
        return;
      }
      if (savedUser && savedUser.username === username) {
        setError("Username-kan hore ayuu u diiwaan gashan yahay. Fadlan login samee.");
        return;
      }

      // Save user
      localStorage.setItem("libraryUser", JSON.stringify({ username, password }));
      // Auto login
      localStorage.setItem("isAuth", "true");
      navigate(from, { replace: true }); // to page user rabay

      // Reset form
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">
      <form className="bg-white p-8 rounded-xl shadow w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? "Library Login" : "Library Sign Up"}</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-4 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={`w-full py-2 rounded text-white ${isLogin ? 'bg-green-600' : 'bg-blue-600'}`}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-gray-500 text-sm">
          {isLogin ? "Ma lihid account?" : "Hore u leedahay account?"}{" "}
          <span className="text-blue-600 cursor-pointer" onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Auth;

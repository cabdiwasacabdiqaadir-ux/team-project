import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Add default user "raxma / 12345" if no user exists
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("libraryUser"));
    if (!savedUser) {
      localStorage.setItem(
        "libraryUser",
        JSON.stringify({ username: "raxma", password: "12345" })
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("libraryUser"));

    if (isLogin) {
      // Login
      if (savedUser && savedUser.username === username && savedUser.password === password) {
        localStorage.setItem("isAuth", "true");
        navigate("/");
      } else {
        setError("Username ama Password khaldan");
      }
    } else {
      // SignUp
      if (savedUser && savedUser.username === username) {
        setError("Username hore ayuu u diiwaangashan yahay, fadlan login samee");
        return;
      }

      if (!username || !password) {
        setError("Fadlan buuxi username iyo password");
        return;
      }

      // Save new user
      localStorage.setItem("libraryUser", JSON.stringify({ username, password }));
      localStorage.setItem("isAuth", "true");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 bg-white p-8 rounded-xl shadow">
        {/* Toggle Buttons */}
        <div className="flex justify-around mb-6">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`px-4 py-2 rounded ${isLogin ? "bg-blue-600 text-white font-bold" : "bg-gray-200"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`px-4 py-2 rounded ${!isLogin ? "bg-blue-600 text-white font-bold" : "bg-gray-200"}`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-3">{error}</p>}

          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 mb-4 rounded"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;

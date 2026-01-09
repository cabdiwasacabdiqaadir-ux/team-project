import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('isAuth');
    setIsAuth(auth === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    setIsAuth(false);
    navigate('/auth');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        MyLibrary
      </Link>
      <div className="space-x-4">
        {isAuth ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-1 rounded font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth"
              className="bg-white text-blue-600 px-4 py-1 rounded font-semibold"
            >
              Login / Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

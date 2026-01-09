import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showChoice, setShowChoice] = useState(true);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ username: '', password: '', remember: false });
  const [signupData, setSignupData] = useState({ name: '', username: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('libraryUser'));
    if (!savedUser) {
      localStorage.setItem('libraryUser', JSON.stringify({ username: 'raxma', password: '12345' }));
    }
  }, []);

  function switchMode(m) {
    setErrors({});
    setMode(m);
    setShowChoice(false);
  }

  function handleLoginChange(e) {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSignupChange(e) {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  }

  function onSubmitSignup(e) {
    e.preventDefault();
    // simple validation
    if (!signupData.username || !signupData.password) {
      setErrors({ form: 'Fadlan buuxi username iyo password' });
      return;
    }
    if (signupData.password !== signupData.confirm) {
      setErrors({ form: 'Passwords ma is waafaqaan' });
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem('libraryUser'));
    if (savedUser && savedUser.username === signupData.username) {
      setErrors({ form: 'Username hore ayuu u diiwaangashan yahay, fadlan login samee' });
      return;
    }

    localStorage.setItem('libraryUser', JSON.stringify({ username: signupData.username, password: signupData.password }));
    localStorage.setItem('isAuth', 'true');
    navigate('/');
  }

  function onSubmitLogin(e) {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('libraryUser'));
    if (savedUser && savedUser.username === loginData.username && savedUser.password === loginData.password) {
      localStorage.setItem('isAuth', 'true');
      navigate('/');
    } else {
      setErrors({ form: 'Username ama Password khaldan' });
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 bg-white p-8 rounded-xl shadow">
        {showChoice ? (
          <div className="text-center">
            <h2 className="text-lg font-semibold">Please choose an option to continue:</h2>
            <p className="text-sm text-gray-500 mb-6">Choose one of the options below to proceed</p>

            <div className="space-y-3">
              <button
                onClick={() => { setMode('signup'); setShowChoice(false); }}
                className="w-full text-left p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Sign Up</div>
                    <div className="text-xs text-gray-500">Create a new account</div>
                  </div>
                  <div className="text-indigo-600 font-semibold">→</div>
                </div>
              </button>

              <button
                onClick={() => { setMode('login'); setShowChoice(false); }}
                className="w-full text-left p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Login</div>
                    <div className="text-xs text-gray-500">Access your existing account</div>
                  </div>
                  <div className="text-indigo-600 font-semibold">→</div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex">
                <button
                  onClick={() => switchMode('signup')}
                  className={`px-4 py-2 rounded-l-md font-medium ${mode === 'signup' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  Sign Up
                </button>
                <button
                  onClick={() => switchMode('login')}
                  className={`px-4 py-2 rounded-r-md font-medium ${mode === 'login' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  Login
                </button>
              </div>
              <button onClick={() => setShowChoice(true)} className="text-sm text-gray-500">Back</button>
            </div>

            {mode === 'signup' ? (
              <form onSubmit={onSubmitSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full name</label>
                  <input
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    name="username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="your-username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter a password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm password</label>
                  <input
                    name="confirm"
                    type="password"
                    value={signupData.confirm}
                    onChange={handleSignupChange}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Repeat password"
                  />
                </div>

                {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Create account
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={onSubmitLogin} className="space-y-4">
                {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your password"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    {"Sign in"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

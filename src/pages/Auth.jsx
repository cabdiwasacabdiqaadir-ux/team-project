import { useState } from 'react';

export default function Auth() {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showChoice, setShowChoice] = useState(true);

  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
  const [signupData, setSignupData] = useState({ name: '', username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

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

  function validateSignup() {
    const err = {};
    if (!signupData.name.trim()) err.name = 'Name is required';
    if (!signupData.username.trim()) err.username = 'Username is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) err.email = 'Valid email required';
    if (signupData.password.length < 6) err.password = 'Minimum 6 characters';
    if (signupData.password !== signupData.confirm) err.confirm = 'Passwords must match';
    return err;
  }

  function validateLogin() {
    const err = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) err.email = 'Valid email required';
    if (!loginData.password) err.password = 'Password required';
    return err;
  }

  function onSubmitSignup(e) {
    e.preventDefault();
    const err = validateSignup();
    if (Object.keys(err).length) return setErrors(err);
    setErrors({});
    console.log('Sign Up data', signupData);
    alert('Sign Up submitted — replace with real auth call');
  }

  function onSubmitLogin(e) {
    e.preventDefault();
    const err = validateLogin();
    if (Object.keys(err).length) return setErrors(err);
    setErrors({});
    console.log('Login data', loginData);
    alert('Login submitted — replace with real auth call');
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
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
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
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
                  {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
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
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
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
                  {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Create account
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <button type="button" className="text-indigo-600 font-medium" onClick={() => switchMode('login')}>
                    Login
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={onSubmitLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
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
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm">
                    <input type="checkbox" name="remember" checked={loginData.remember} onChange={handleLoginChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <span className="ml-2 text-gray-700">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-indigo-600">Forgot?</button>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign in
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500">Don't have an account? <button type="button" className="text-indigo-600 font-medium" onClick={() => switchMode('signup')}>Sign up</button></p>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

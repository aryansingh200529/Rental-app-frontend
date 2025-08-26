import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

const LoginPage = ({ setRoute }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { ok, user: u } = await login(email, password);

      if (ok && u) {
        if (u.role === 'Landlord') {
          setRoute({ name: 'LandlordDashboard' });
        } else {
          setRoute({ name: 'RenterDashboard' });
        }
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Sign in to your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Account
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Welcome back! Please enter your details to continue.
          </p>
        </div>

        <div className="bg-white p-8 shadow-xl rounded-2xl">
          <form className="space-y-6" onSubmit={submit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Not a member?{' '}
          <button
            onClick={() => setRoute({ name: 'SignupPage' })}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;


import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { api } from '../api';

const SignupPage = ({ setRoute }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Renter');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      
      await api.signupUser({ email, password, role });

      const { ok, user } = await login(email, password);

      if (ok && user) {
        if (user.role === 'Landlord') {
          setRoute({ name: 'LandlordDashboard' });
        } else {
          setRoute({ name: 'RenterDashboard' });
        }
      } else {
        setError('Signup succeeded but auto-login failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Create a new{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Account
            </span>
          </h2>
          <p className="mt-2 text-base text-slate-600">Join us! It only takes a minute.</p>
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
                className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md"
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
                className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-700">
                I am a...
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-md"
              >
                <option value="Renter">Renter</option>
                <option value="Landlord">Landlord</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <button
            onClick={() => setRoute({ name: 'LoginPage' })}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

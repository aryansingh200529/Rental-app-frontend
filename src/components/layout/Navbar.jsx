
import React, { useState } from 'react';

// --- MOCK IMPLEMENTATIONS FOR DEMONSTRATION ---
// In a real application, these would be in separate files.
// This is a placeholder to make the component runnable.
const useAuth = () => {
  // You can toggle this value to see both authenticated and guest views
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  
  const user = {
    email: ' ',
    role: 'Landlord',
  };

  const logout = () => {
    console.log('Logging out...');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, user, logout };
};

// This is a placeholder to make the component runnable.
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ term: searchTerm });
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by city, address, or zip..."
        className="block w-full bg-slate-100 border border-transparent rounded-lg py-2 pl-10 pr-3 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
      />
    </form>
  );
};
// --- END OF MOCK IMPLEMENTATIONS ---


const Navbar = ({ setRoute }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setRoute({ name: 'HomePage' });
  };

  const handleSearch = (params) => {
    console.log('Searching for:', params);
    setRoute({ name: 'SearchResultsPage', params });
  };

  const navLinkClasses =
    'text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md text-sm';

  const primaryButtonClasses =
    'bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 font-medium px-4 py-2 rounded-lg text-sm shadow-sm';

  return (
    
    <header className="bg-slate-50/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
      <nav className="container mx-auto px-6 lg:px-8">
      
        <div className="flex items-center justify-between h-20">
  
          <div className="flex-shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setRoute({ name: 'HomePage' });
                setIsMenuOpen(false); 
              }}
              className="text-2xl font-bold flex items-center group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-blue-600 group-hover:text-cyan-500 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                RentalApp
              </span>
            </a>
          </div>

         
          <div className="hidden md:block flex-1 max-w-xl mx-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-slate-600 mr-2">Hi, {user.email}</span>
                <button
                  onClick={() => setRoute({ name: 'LandlordDashboard' })}
                  className={navLinkClasses}
                >
                  Dashboard
                </button>
                <button onClick={handleLogout} className={navLinkClasses}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setRoute({ name: 'LoginPage' })} className={navLinkClasses}>
                  Login
                </button>
                <button
                  onClick={() => setRoute({ name: 'SignupPage' })}
                  className={primaryButtonClasses}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

         
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
             
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
               
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

    
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-4 space-y-3 border-t border-slate-200">
           
            <div className="mt-4 px-2">
              <SearchBar onSearch={handleSearch} />
            </div>

           
            <div className="flex flex-col space-y-1 px-2">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-slate-600">Signed in as {user.email}</div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setRoute({ name: 'LandlordDashboard' });
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-200"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-200"
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setRoute({ name: 'LoginPage' });
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-200"
                  >
                    Login
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setRoute({ name: 'SignupPage' });
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-200"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;


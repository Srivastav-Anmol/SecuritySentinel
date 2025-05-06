import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogIn, UserPlus, LogOut, Settings, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    setIsAuthenticated(!!token);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path ? 'nav-link-active' : '';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-foreground">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Security Sentinel</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          {isAuthenticated ? (
            <Link to="/detect" className={`nav-link ${isActive('/detect')}`}>Detect Now</Link>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="nav-link"
            >
              Detect Now
            </button>
          )}
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About Us</Link>
          <div className="flex items-center space-x-3 ml-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                >
                  <span>Welcome, {user?.fullName}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings className="h-4 w-4 inline-block mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 inline-block mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost px-4 py-2 flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="btn btn-primary px-4 py-2 flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-white/10 animate-slide-in-right">
          <nav className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/')}`}
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <Link 
                to="/detect" 
                className={`nav-link ${isActive('/detect')}`}
                onClick={toggleMobileMenu}
              >
                Detect Now
              </Link>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  toggleMobileMenu();
                }}
                className="nav-link text-left"
              >
                Detect Now
              </button>
            )}
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about')}`}
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
            <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-foreground px-4">Welcome, {user?.fullName}</span>
                  <Link
                    to="/settings"
                    className="btn btn-ghost px-4 py-2 justify-start"
                    onClick={toggleMobileMenu}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="btn btn-ghost px-4 py-2 justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="btn btn-ghost px-4 py-2 justify-start"
                    onClick={toggleMobileMenu}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/signup" 
                    className="btn btn-primary px-4 py-2 justify-start"
                    onClick={toggleMobileMenu}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
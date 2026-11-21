import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn, Leaf, TrendingUp, CloudRain, Info, Home, UserCircle, Settings, LogOut, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  // Placeholder for authentication state
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAboutClick = () => {
    if (isHomePage) {
      // If on home page, scroll to About section
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to the About Us page
      navigate('/about-us');
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle login/logout
  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-4 w-4" />,
      color: "text-gray-700 hover:text-green-600"
    },
    {
      name: "Predict Price",
      path: "/predict",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-gray-700 hover:text-green-600"
    },
    {
      name: "Crop Advisory",
      path: "/crop-advisory",
      icon: <Leaf className="h-4 w-4" />,
      color: "text-gray-700 hover:text-orange-600"
    },
    {
      name: "Weather",
      path: "/weather",
      icon: <CloudRain className="h-4 w-4" />,
      color: "text-gray-700 hover:text-blue-600"
    },
    {
      name: "About Us",
      path: "/about-us",
      icon: <Info className="h-4 w-4" />,
      color: "text-gray-700 hover:text-green-600",
      onClick: handleAboutClick
    }
  ];
  
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/50 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-2 w-2 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                AgriTrend
              </span>
              <p className="text-xs text-gray-500 -mt-1">Smart Agriculture</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-gray-100/80 ${item.color}`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-gray-100/80 ${item.color}`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200/50 transition-all duration-300 hover:shadow-md"
                  >
                    <UserCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium text-gray-700">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl">
                  <DropdownMenuItem className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <UserCircle className="h-4 w-4 mr-3 text-gray-500" />
                    <Link to="/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <Settings className="h-4 w-4 mr-3 text-gray-500" />
                    <Link to="/settings" className="w-full">Settings</Link>
                  </DropdownMenuItem>
                  <div className="border-t border-gray-200 my-1"></div>
                  <DropdownMenuItem 
                    onClick={handleAuth}
                    className="flex items-center px-4 py-3 hover:bg-red-50 text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-green-600 font-medium px-4 py-2 rounded-xl hover:bg-gray-100/80 transition-all duration-300"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6 space-y-2">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className={`flex items-center w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-gray-100/80 ${item.color}`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-gray-100/80 ${item.color}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center w-full px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100/80 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserCircle className="h-4 w-4 mr-3" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center w-full px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100/80 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Link>
                  <button
                    onClick={handleAuth}
                    className="flex items-center w-full px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full border-green-200 text-green-600 hover:bg-green-50 font-medium py-3 rounded-xl"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/register');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

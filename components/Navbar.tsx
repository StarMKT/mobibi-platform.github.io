import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="https://blogger.googleusercontent.com/img/a/AVvXsEhOSXEhwcGoqqiP3zGK5Oj0mx53it9RZiIt9wFq_8WRDt9ISnJasJYuzGn_RMe0Az0laHFwaRZsCN4Q4bF3FLHOjH4R_IPFbF01vO8Ogz-ahgnpSCB1HiCpC2CukOqObEBGPX5P4BS-uQ9isWhgXwDmrmNBvk-IOuIQcM9k5nBDk8_YvoDo3ge9gRidzU7U"
                alt="Mobibi"
                className="h-10 md:h-12"
              />
            </Link>

            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                to="/reservar"
                className="text-gray-900 hover:text-brand px-3 py-2 text-sm font-medium transition-colors"
              >
                Alugar
              </Link>

              <Link
                to="/ofertas"
                className="text-gray-500 hover:text-brand px-3 py-2 text-sm font-medium transition-colors"
              >
                Ofertas
              </Link>

              <Link
                to="/motorista-app"
                className="text-gray-500 hover:text-brand px-3 py-2 text-sm font-medium transition-colors"
              >
                Para Motoristas
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-gray-700">
                  <User size={18} />
                  <span className="font-medium text-sm">Olá, {user?.name}</span>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="ml-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                    >
                      <ShieldCheck size={12} />
                      Admin
                    </Link>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  title="Sair"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-brand font-semibold hover:bg-brand-light px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-brand hover:bg-brand-light"
            >
              Home
            </Link>

            <Link
              to="/reservar"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-brand hover:bg-brand-light"
            >
              Alugar
            </Link>

            <Link
              to="/ofertas"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-brand hover:bg-brand-light"
            >
              Ofertas
            </Link>

            <Link
              to="/motorista-app"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-brand hover:bg-brand-light"
            >
              Para Motoristas
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:text-brand hover:bg-brand-light"
                  >
                    Painel Admin
                  </Link>
                )}

                <button
                  onClick={() => {
                    closeMobileMenu();
                    handleLogout();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-brand hover:bg-brand-light"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
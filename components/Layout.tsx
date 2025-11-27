
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { User } from '../types';

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
    <div className="container mx-auto px-4 text-center">
      <p className="font-medium text-lg mb-2">منصة تفوق التعليمية</p>
      <p className="text-sm opacity-80 dir-ltr">
        Made by Adham Ahmed — Contact WhatsApp: <span className="font-mono">01091569465</span>
      </p>
    </div>
  </footer>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/login');
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المراجعات', path: '/reviews' },
    { name: 'من نحن', path: '/about' },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ name: 'لوحة التحكم', path: '/dashboard' });
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse text-blue-600 font-bold text-xl hover:text-blue-700 transition">
            <BookOpen className="w-8 h-8" />
            <span>تفوق</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {user ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-slate-700 flex items-center gap-2">
                  <UserIcon size={18} />
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-sm"
                >
                  <LogOut size={16} />
                  خروج
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium">دخول</Link>
                <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-sm">
                  حساب جديد
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-slate-700 hover:text-blue-600 font-medium border-b border-slate-50 last:border-0"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
             <div className="pt-4 border-t border-slate-100">
               <div className="text-slate-500 text-sm mb-2">مرحباً، {user.name}</div>
               <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-red-500 block w-full text-right font-medium">تسجيل الخروج</button>
             </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-700 block text-center">دخول</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white block text-center py-2 rounded-lg">حساب جديد</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-cairo text-right">
      <Navbar />
      <main className="flex-grow bg-slate-50">
        {children}
      </main>
      <Footer />
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const usersStr = localStorage.getItem('users');
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];

    // Check existing
    if (users.some(u => u.email === email)) {
      alert('البريد الإلكتروني مسجل بالفعل');
      return;
    }

    const newUser: User = { name, email, password, role: 'user' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('تم إنشاء الحساب بنجاح! قم بتسجيل الدخول الآن.');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">حساب جديد</h1>
          <p className="text-slate-500">انضم إلينا وابدأ رحلة التفوق</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">الاسم الكامل</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              placeholder="اسم الطالب"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              dir="ltr"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              dir="ltr"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            تسجيل
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            سجل دخولك هنا
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
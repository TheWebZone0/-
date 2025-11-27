import React, { useState, useEffect } from 'react';
import { Search, Youtube, PlayCircle } from 'lucide-react';
import { TEACHERS, SUBJECTS } from '../constants';
import { Teacher } from '../types';
import { motion } from 'framer-motion';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubject, setActiveSubject] = useState('الكل');
  
  // Initialize teachers from localStorage or fallback to constants
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const stored = localStorage.getItem('teachers');
    return stored ? JSON.parse(stored) : TEACHERS;
  });

  // Ensure localStorage is populated on first load if empty (optional safety)
  useEffect(() => {
    if (!localStorage.getItem('teachers')) {
      localStorage.setItem('teachers', JSON.stringify(TEACHERS));
    }
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch = teacher.name.includes(searchTerm) || teacher.subject.includes(searchTerm);
    const matchesSubject = activeSubject === 'الكل' || teacher.subject === activeSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20 px-4 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            اصنع مستقبلك مع <span className="text-blue-300">أفضل المعلمين</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8"
          >
            منصة تعليمية شاملة تجمع نخبة من مدرسي الثانوية العامة في مكان واحد. اختر مدرسك وابدأ رحلة التفوق.
          </motion.p>
          
          {/* Search Bar in Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto relative"
          >
            <input
              type="text"
              placeholder="ابحث عن اسم المدرس أو المادة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-4 pr-12 pl-4 rounded-full text-slate-800 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition text-lg"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Subject Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {SUBJECTS.map((subject) => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSubject === subject
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Teachers Grid */}
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100"
              >
                <div className="h-48 overflow-hidden relative bg-slate-100">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                    {teacher.subject}
                  </div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{teacher.name}</h3>
                  <p className="text-slate-500 mb-6 text-sm">مدرس {teacher.subject} للثانوية العامة</p>
                  
                  <a
                    href={teacher.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full gap-2 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition shadow-red-200 shadow-lg group-hover:-translate-y-1"
                  >
                    <Youtube size={20} />
                    <span>دخول القناة</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">لا توجد نتائج مطابقة لبحثك</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
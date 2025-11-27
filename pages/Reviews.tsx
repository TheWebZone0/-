
import React, { useState, useEffect } from 'react';
import { ReviewItem } from '../types';
import { FileText, Youtube, Calendar, Download, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Reviews = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [activeTab, setActiveTab] = useState<'monthly' | 'final'>('monthly');

  useEffect(() => {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const filteredReviews = reviews.filter(review => review.type === activeTab);

  const handleDownload = (base64Data: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = fileName || 'download.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-4">المراجعات والملخصات</h1>
        <p className="text-slate-600 text-lg">كل ما تحتاجه للمراجعة والتدريب في مكان واحد</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-white p-1 rounded-full shadow-sm border border-slate-200 flex">
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'monthly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            مراجعات شهرية
          </button>
          <button
            onClick={() => setActiveTab('final')}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'final'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            مراجعات نهائية
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${review.type === 'monthly' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                  <FileText size={24} />
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <Calendar size={14} className="ml-1" />
                  {review.date}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-6 line-clamp-2 min-h-[3.5rem]">
                {review.title}
              </h3>

              <div className="space-y-3">
                {review.pdfData && (
                  <button
                    onClick={() => handleDownload(review.pdfData!, review.pdfName!)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition"
                  >
                    <Download size={18} />
                    تحميل PDF
                  </button>
                )}
                
                {review.videoUrl && (
                  <a
                    href={review.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
                  >
                    <PlayCircle size={18} />
                    مشاهدة الشرح
                  </a>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-slate-400" size={32} />
            </div>
            <p className="text-slate-500 text-lg">لا توجد مراجعات مضافة حالياً في هذا القسم</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;

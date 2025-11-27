
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ReviewItem, Teacher } from '../types';
import { TEACHERS } from '../constants';
import { Plus, Trash2, FileText, Youtube, Video, Upload, Image as ImageIcon } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'monthly' | 'final'>('monthly');
  const [videoLink, setVideoLink] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Data State
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    // Auth Check
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const parsedUser: User = JSON.parse(storedUser);
    if (parsedUser.role !== 'admin') {
      navigate('/');
      return;
    }
    setUser(parsedUser);

    // Load Reviews
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }

    // Load Teachers
    const storedTeachers = localStorage.getItem('teachers');
    if (storedTeachers) {
      setTeachers(JSON.parse(storedTeachers));
    } else {
      setTeachers(TEACHERS);
      localStorage.setItem('teachers', JSON.stringify(TEACHERS));
    }
  }, [navigate]);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file && !videoLink) {
      alert('يجب إضافة ملف PDF أو رابط فيديو على الأقل');
      return;
    }

    let pdfData: string | undefined = undefined;
    let pdfName: string | undefined = undefined;

    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت.');
        return;
      }
      // Read file as Base64
      pdfData = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      pdfName = file.name;
    }

    const newReview: ReviewItem = {
      id: Date.now().toString(),
      title,
      type,
      date: new Date().toLocaleDateString('ar-EG'),
      pdfData,
      pdfName,
      videoUrl: videoLink
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    try {
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
      setTitle('');
      setVideoLink('');
      setFile(null);
      alert('تم إضافة المراجعة بنجاح');
    } catch (error) {
      alert('فشل في الحفظ. قد يكون حجم الملف كبيراً جداً للتخزين المحلي.');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من الحذف؟')) {
      const updatedReviews = reviews.filter(r => r.id !== id);
      setReviews(updatedReviews);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    }
  };

  const handleImageUpload = (teacherId: number, file: File) => {
    if (file.size > 2000000) { // 2MB limit
      alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 2 ميجابايت');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const updatedTeachers = teachers.map(t => 
        t.id === teacherId ? { ...t, image: base64String } : t
      );
      setTeachers(updatedTeachers);
      localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
      alert('تم تحديث صورة المدرس بنجاح');
    };
    reader.readAsDataURL(file);
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">لوحة التحكم</h1>
        <p className="text-slate-500">مرحباً بك، {user.name} (مدير النظام)</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-1 space-y-8">
          {/* Add Review Form */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <Plus className="text-blue-600" />
              إضافة مراجعة جديدة
            </h2>
            
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">عنوان المراجعة</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="مثال: مراجعة الكيمياء لشهر أكتوبر"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">نوع المراجعة</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'monthly' | 'final')}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                >
                  <option value="monthly">مراجعة شهرية</option>
                  <option value="final">مراجعة نهائية</option>
                </select>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-4 border border-slate-100">
                <p className="text-sm font-bold text-slate-700">المحتوى (املأ أحدهما أو كلاهما)</p>
                
                {/* File Input */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                    <FileText size={14} /> ملف المراجعة (PDF)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                  />
                  {file && <p className="text-xs text-green-600 mt-1">تم اختيار: {file.name}</p>}
                </div>

                {/* Video Link Input */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                    <Youtube size={14} /> رابط الفيديو (YouTube)
                  </label>
                  <input
                    type="url"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-sm"
                    placeholder="https://youtube.com/..."
                    dir="ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md mt-2"
              >
                نشر المراجعة
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Content Lists */}
        <div className="lg:col-span-2 space-y-8">

          {/* Teachers Management Section */}
          <section>
             <h3 className="text-xl font-bold text-slate-800 mb-4 border-r-4 border-yellow-500 pr-3 flex items-center gap-2">
              <ImageIcon className="text-yellow-500 w-6 h-6" />
              إدارة صور المعلمين
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                 {teachers.map((teacher) => (
                   <div key={teacher.id} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50">
                     <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                       <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-grow">
                       <h4 className="font-bold text-slate-800 text-sm">{teacher.name}</h4>
                       <p className="text-xs text-slate-500 mb-2">{teacher.subject}</p>
                       <label className="cursor-pointer bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition inline-flex items-center gap-1.5">
                         <Upload size={12} />
                         تغيير الصورة
                         <input 
                           type="file" 
                           accept="image/*" 
                           className="hidden" 
                           onChange={(e) => {
                             if (e.target.files?.[0]) {
                               handleImageUpload(teacher.id, e.target.files[0]);
                             }
                           }}
                         />
                       </label>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </section>

          {/* Monthly Reviews Section */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-r-4 border-blue-500 pr-3">المراجعات الشهرية</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {reviews.filter(r => r.type === 'monthly').length === 0 ? (
                <p className="p-8 text-center text-slate-500">لا توجد مراجعات شهرية مضافة</p>
              ) : (
                <ReviewsTable 
                  reviews={reviews.filter(r => r.type === 'monthly')} 
                  onDelete={handleDelete}
                />
              )}
            </div>
          </section>

          {/* Final Reviews Section */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-r-4 border-purple-500 pr-3">المراجعات النهائية</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {reviews.filter(r => r.type === 'final').length === 0 ? (
                <p className="p-8 text-center text-slate-500">لا توجد مراجعات نهائية مضافة</p>
              ) : (
                <ReviewsTable 
                  reviews={reviews.filter(r => r.type === 'final')} 
                  onDelete={handleDelete}
                />
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

// Helper Component for Table
const ReviewsTable = ({ reviews, onDelete }: { reviews: ReviewItem[], onDelete: (id: string) => void }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-slate-50 border-b border-slate-200">
        <tr>
          <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">العنوان</th>
          <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">المحتوى</th>
          <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">التاريخ</th>
          <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">حذف</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {reviews.map((review) => (
          <tr key={review.id} className="hover:bg-slate-50 transition">
            <td className="px-6 py-4">
              <span className="font-medium text-slate-800">{review.title}</span>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                {review.pdfData && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md flex items-center gap-1">
                    <FileText size={12} /> ملف
                  </span>
                )}
                {review.videoUrl && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md flex items-center gap-1">
                    <Youtube size={12} /> فيديو
                  </span>
                )}
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">{review.date}</td>
            <td className="px-6 py-4 text-center">
              <button 
                onClick={() => onDelete(review.id)}
                className="p-2 text-slate-400 hover:text-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Dashboard;

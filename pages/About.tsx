import React from 'react';
import { Target, Lightbulb, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">من نحن</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">رسالة الموقع</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                نسعى لتقديم منصة تعليمية متكاملة تخدم طلاب الثانوية العامة من خلال توفير الوصول السهل والسريع لأفضل الكوادر التعليمية في مصر. نؤمن بأن التعليم الجيد حق للجميع، وهدفنا هو تذليل الصعاب أمام الطلاب للوصول إلى محتوى تعليمي متميز.
              </p>
              
              <h2 className="text-2xl font-bold text-blue-900 mb-4">هدف المشروع</h2>
              <p className="text-slate-600 leading-relaxed">
                تجميع شتات المحتوى التعليمي المنتشر على يوتيوب في مكان واحد منظم ومرتب، مما يوفر وقت الطالب وجهده في البحث، ويساعده على التركيز في المذاكرة والتحصيل الدراسي.
              </p>
            </div>
            <div className="relative h-64 md:h-full rounded-2xl overflow-hidden shadow-lg">
               <img src="https://picsum.photos/id/449/600/800" alt="Students learning" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Target className="w-10 h-10 text-blue-600" />,
              title: "تنظيم",
              desc: "محتوى مرتب حسب المواد والمدرسين لسهولة الوصول"
            },
            {
              icon: <Award className="w-10 h-10 text-blue-600" />,
              title: "جودة",
              desc: "اخترنا لكم أفضل المعلمين المشهود لهم بالكفاءة"
            },
            {
              icon: <Lightbulb className="w-10 h-10 text-blue-600" />,
              title: "مجانية",
              desc: "جميع المصادر التعليمية المتاحة مجانية بالكامل"
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
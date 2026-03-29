import React, { useEffect, useState, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { usePDF } from '@react-pdf/renderer';
import A4Template from '../../templates/A4Template';
import { Download, Mail, Phone, MapPin, Linkedin, Globe, AlertCircle, Github } from 'lucide-react';

const ResumePreview = () => {
  const { data } = useResume();
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  const [instance, updateInstance] = usePDF({ 
    document: <A4Template data={data} /> 
  });

  // More stable scale calculation
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile && containerRef.current) {
        const padding = 32; // Total padding
        const containerWidth = window.innerWidth - padding;
        const a4WidthInPx = 210 * 3.785; // Standard A4 width in px at 96dpi
        
        const calculatedScale = Math.max(containerWidth / a4WidthInPx, 0.4); // Never go smaller than 40%
        setScale(calculatedScale);
      } else {
        setScale(1);
      }
    };

    handleResize();
    const timer = setTimeout(handleResize, 100); // Also run with a small delay for tab switching
    
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer);
    };
  }, [containerRef]);

  // Handle PDF update with debounce for stability
  useEffect(() => {
    const timer = setTimeout(() => {
      updateInstance(<A4Template data={data} />);
    }, 1200);
    return () => clearTimeout(timer);
  }, [data, updateInstance]);

  const handleDownload = () => {
    if (instance.url && !instance.loading) {
      const link = document.createElement('a');
      link.href = instance.url;
      link.download = `${data.personalInfo.fullName || 'resume'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const tU = (s) => s ? s.toLocaleUpperCase('tr-TR') : '';

  return (
    <div className="flex flex-col items-center w-full min-h-full py-2">
      {/* Downloader Header */}
      <div className="shrink-0 mb-6 lg:mb-10 flex flex-col items-center gap-3 w-full">
        <button
          onClick={handleDownload}
          disabled={instance.loading || !data.personalInfo.fullName}
          className={`px-10 lg:px-12 py-3.5 lg:py-4 rounded-xl lg:rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl transition-all select-none w-auto max-w-full ${
            instance.loading
              ? 'bg-zinc-100 text-zinc-400 cursor-wait'
              : !data.personalInfo.fullName
              ? 'bg-zinc-200 text-zinc-500 cursor-not-allowed opacity-50'
              : 'bg-black text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
          }`}
        >
          {instance.loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-zinc-400 border-t-white" />
          ) : (
            <Download size={20} />
          )}
          <span className="uppercase tracking-widest text-[11px] lg:text-[13px] whitespace-nowrap">
            {instance.loading ? 'Hazırlanıyor...' : (instance.error ? 'Hatalı (Yazı Girin)' : 'PDF İndir')}
          </span>
        </button>
        
        {!data.personalInfo.fullName && !instance.loading && (
          <p className="text-[10px] font-bold text-amber-600 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full uppercase tracking-tighter">
            <AlertCircle size={14} /> İsim girmeden PDF oluşturulamaz
          </p>
        )}
      </div>

      {/* A4 Preview Container with Scaling */}
      <div 
        ref={containerRef}
        className="w-full h-full flex justify-center items-start lg:pb-32"
      >
        <div 
          className="a4-container shadow-2xl origin-top bg-white min-h-[297mm] h-[297mm] lg:h-auto flex flex-col relative px-[35pt] lg:px-[45pt] py-[40pt] text-left transition-transform duration-300 pointer-events-none"
          style={{ 
            transform: `scale(${scale})`,
            width: '210mm',
            minWidth: '210mm'
          }}
        >
          {/* Header */}
          <header className="flex justify-between items-center border-b-2 border-slate-900 pb-5 mb-5">
            <div className="flex-grow pr-10">
              <h1 className="text-[26pt] font-black uppercase text-slate-900 leading-none mb-2 mt-[-4px]">
                {tU(data.personalInfo.fullName) || 'ADINIZ SOYADINIZ'}
              </h1>
              <p className="text-[10.5pt] font-bold text-slate-500 uppercase tracking-widest mb-4">
                {tU(data.personalInfo.title) || 'ÜNVANINIZ'}
              </p>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[9pt] font-medium text-slate-600">
                {data.personalInfo.email && <div className="flex items-center gap-1.5"><Mail size={12} className="text-slate-400" /> {data.personalInfo.email}</div>}
                {data.personalInfo.phone && <div className="flex items-center gap-1.5"><Phone size={12} className="text-slate-400" /> {data.personalInfo.phone}</div>}
                {data.personalInfo.location && <div className="flex items-center gap-1.5"><MapPin size={12} className="text-slate-400" /> {data.personalInfo.location}</div>}
                {data.personalInfo.linkedin && <div className="flex items-center gap-1.5"><Linkedin size={12} className="text-slate-400" /> {data.personalInfo.linkedin}</div>}
                {data.personalInfo.github && <div className="flex items-center gap-1.5 font-bold text-slate-900 border-b border-slate-300"><Github size={12} className="text-slate-400" /> {data.personalInfo.github}</div>}
              </div>
            </div>

            {data.personalInfo.profileImage && (
              <div className="flex-shrink-0">
                <img src={data.personalInfo.profileImage} className="w-32 h-32 object-cover rounded shadow-sm border border-slate-100" />
              </div>
            )}
          </header>

          {/* Body */}
          <div className="flex-1 flex flex-col justify-between py-2">
            {data.summary ? (
              <section className="my-2">
                <h2 className="text-[12.5pt] font-bold border-b-2 border-slate-900 pb-1 mb-2 tracking-wide">{tU('Özet')}</h2>
                <p className="text-[10.5pt] text-slate-700 leading-relaxed text-justify pr-2 whitespace-pre-line">{data.summary}</p>
              </section>
            ) : <div className="h-20" />}

            {data.experience.length > 0 && (
              <section className="my-2">
                <h2 className="text-[12.5pt] font-bold border-b-2 border-slate-900 pb-1 mb-2 tracking-wide">{tU('Deneyimler')}</h2>
                <div className="space-y-4">
                  {data.experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="text-[11.5pt] font-bold text-slate-900 leading-tight">{tU(exp.position)}</h3>
                        <span className="text-[9.5pt] font-bold text-slate-600">{exp.duration}</span>
                      </div>
                      <div className="text-[10.5pt] font-bold text-slate-600 uppercase mb-1">{tU(exp.company)}</div>
                      <p className="text-[10.5pt] text-slate-700 leading-relaxed text-justify pr-2 whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section className="my-2">
                <h2 className="text-[12.5pt] font-bold border-b-2 border-slate-900 pb-1 mb-2 tracking-wide">{tU('Eğitim')}</h2>
                <div className="space-y-3">
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-[11.5pt] font-bold text-slate-900 leading-tight uppercase">{tU(edu.school)}</h3>
                        <span className="text-[9.5pt] font-bold text-slate-600">{edu.duration}</span>
                      </div>
                      <div className="text-[10.5pt] font-bold text-slate-600 uppercase mb-1">{tU(edu.degree)}</div>
                      {edu.description && <p className="text-[9.5pt] text-slate-600 leading-relaxed text-justify pr-2">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="mt-auto pt-4 border-t-2 border-slate-200 grid grid-cols-5 gap-6">
               <div className="col-span-3">
                 {data.skills.length > 0 && (
                   <section>
                     <h2 className="text-[12.5pt] font-bold mb-2 tracking-wide">{tU('Yetenekler')}</h2>
                     <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                       {data.skills.map((s, i) => (
                         <span key={i} className="text-[10pt] font-extrabold text-slate-800 uppercase leading-none tracking-tighter">• {tU(s.name)}</span>
                       ))}
                     </div>
                   </section>
                 )}
               </div>
               <div className="col-span-2">
                 {data.languages.length > 0 && (
                   <section>
                     <h2 className="text-[12.5pt] font-bold mb-2 tracking-wide">{tU('Diller')}</h2>
                     <div className="grid grid-cols-1 gap-y-2 mt-1">
                       {data.languages.map((l, i) => (
                         <div key={i} className="flex flex-col">
                           <span className="text-[10.5pt] font-extrabold text-slate-800 uppercase leading-none">{tU(l.name)}</span>
                           <span className="text-[9pt] text-slate-500 italic mt-1 leading-none font-medium">{tU(l.level)}</span>
                         </div>
                       ))}
                     </div>
                   </section>
                 )}
               </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;

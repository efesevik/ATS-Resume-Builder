import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Input } from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { TextArea } from '../../components/ui/TextArea';
import { User, Mail, Phone, MapPin, Linkedin, GraduationCap, Briefcase, Languages, Wrench, FileText, Camera, Trash2, Github, Scissors } from 'lucide-react';
import ImageCropper from './ImageCropper';

const ResumeForm = () => {
  const { data, updatePersonalInfo, updateSummary, addItem, removeItem, updateItem } = useResume();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedImage) => {
    updatePersonalInfo('profileImage', croppedImage);
    setShowCropper(false);
    setSelectedImage(null);
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    updatePersonalInfo('profileImage', null);
  };

  return (
    <div className="space-y-4 lg:space-y-6 p-4 lg:p-8 pb-32 lg:pb-20">
      {showCropper && (
        <ImageCropper 
          image={selectedImage} 
          onCropComplete={onCropComplete} 
          onCancel={() => setShowCropper(false)} 
        />
      )}
      
      {/* Kişisel Bilgiler */}
      <Card title="Kişisel Bilgiler" icon={<User size={18}/>}>
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 mb-6">
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div className="relative w-28 lg:w-32 h-28 lg:h-32 bg-zinc-50 rounded-2xl overflow-hidden border-2 border-dashed border-zinc-200 group hover:border-black transition-all shadow-sm">
              {data.personalInfo.profileImage ? (
                <>
                  <img 
                    src={data.personalInfo.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => { setSelectedImage(data.personalInfo.profileImage); setShowCropper(true); }}
                      className="p-2.5 bg-white text-zinc-900 rounded-xl active:scale-90 transition-all shadow-lg"
                    >
                      <Scissors size={18} />
                    </button>
                    <button 
                      onClick={handleRemoveImage}
                      className="p-2.5 bg-red-500 text-white rounded-xl active:scale-90 transition-all shadow-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-zinc-100 transition-colors">
                  <Camera size={24} className="text-zinc-400 mb-2 group-hover:text-black transition-colors" />
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-black transition-colors">YÜKLE</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            <Input 
              label="Ad Soyad" 
              value={data.personalInfo.fullName} 
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)} 
              placeholder="Örn: Furkan Efe Sevik"
            />
            <Input 
              label="Ünvan" 
              value={data.personalInfo.title} 
              onChange={(e) => updatePersonalInfo('title', e.target.value)} 
              placeholder="Örn: Bilgisayar Mühendisi"
            />
            <Input 
              label="E-posta" 
              value={data.personalInfo.email} 
              onChange={(e) => updatePersonalInfo('email', e.target.value)} 
            />
            <Input 
              label="Telefon" 
              value={data.personalInfo.phone} 
              onChange={(e) => updatePersonalInfo('phone', e.target.value)} 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
          <Input 
            label="Konum" 
            value={data.personalInfo.location} 
            onChange={(e) => updatePersonalInfo('location', e.target.value)} 
          />
          <Input 
            label="LinkedIn" 
            value={data.personalInfo.linkedin} 
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)} 
          />
          <Input 
            label="GitHub" 
            value={data.personalInfo.github || ''} 
            onChange={(e) => updatePersonalInfo('github', e.target.value)} 
          />
        </div>
      </Card>

      {/* Profesyonel Özet */}
      <Card title="Profesyonel Özet" icon={<FileText size={18}/>}>
        <TextArea 
          label="Özet" 
          value={data.summary} 
          onChange={(e) => updateSummary(e.target.value)} 
          rows={4}
        />
      </Card>

      {/* Deneyimler */}
      <Card title="Deneyimler" icon={<Briefcase size={18}/>}>
        <div className="space-y-4 lg:space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index} className="p-4 lg:p-5 bg-zinc-50 rounded-2xl border border-zinc-100 relative group animate-in slide-in-from-left-2 duration-300">
              <button 
                onClick={() => removeItem('experience', index)}
                className="absolute top-3 right-3 p-2 text-zinc-300 hover:text-red-500 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 pr-8 sm:pr-0">
                <Input 
                  label="Pozisyon" 
                  value={exp.position} 
                  onChange={(e) => updateItem('experience', index, 'position', e.target.value)} 
                />
                <Input 
                  label="Şirket" 
                  value={exp.company} 
                  onChange={(e) => updateItem('experience', index, 'company', e.target.value)} 
                />
                <Input 
                  label="Süre" 
                  value={exp.duration} 
                  onChange={(e) => updateItem('experience', index, 'duration', e.target.value)} 
                />
                <div className="sm:col-span-2">
                  <TextArea 
                    label="Açıklama" 
                    value={exp.description} 
                    onChange={(e) => updateItem('experience', index, 'description', e.target.value)} 
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={() => addItem('experience')}
            className="w-full py-4 border-2 border-dashed border-zinc-200 rounded-2xl text-zinc-400 font-bold hover:border-black hover:text-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]"
          >
            + Yeni Deneyim Ekle
          </button>
        </div>
      </Card>

      {/* Eğitim */}
      <Card title="Eğitim" icon={<GraduationCap size={18}/>}>
        <div className="space-y-4 lg:space-y-6">
          {data.education.map((edu, index) => (
            <div key={index} className="p-4 lg:p-5 bg-zinc-50 rounded-2xl border border-zinc-100 relative group animate-in slide-in-from-left-2 duration-300">
              <button 
                onClick={() => removeItem('education', index)}
                className="absolute top-3 right-3 p-2 text-zinc-300 hover:text-red-500 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 pr-8 sm:pr-0">
                <Input 
                  label="Okul / Kurum" 
                  value={edu.school} 
                  onChange={(e) => updateItem('education', index, 'school', e.target.value)} 
                />
                <Input 
                  label="Bölüm" 
                  value={edu.degree} 
                  onChange={(e) => updateItem('education', index, 'degree', e.target.value)} 
                />
                <Input 
                  label="Süre" 
                  value={edu.duration} 
                  onChange={(e) => updateItem('education', index, 'duration', e.target.value)} 
                />
                <div className="sm:col-span-2">
                  <TextArea 
                    label="Açıklama" 
                    value={edu.description} 
                    onChange={(e) => updateItem('education', index, 'description', e.target.value)} 
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={() => addItem('education')}
            className="w-full py-4 border-2 border-dashed border-zinc-200 rounded-2xl text-zinc-400 font-bold hover:border-black hover:text-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]"
          >
            + Yeni Eğitim Ekle
          </button>
        </div>
      </Card>

      {/* Projeler */}
      <Card title="Projeler" icon={<FileText size={18}/>}>
        <div className="space-y-4">
          {data.projects.map((proj, index) => (
            <div key={index} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 relative group animate-in slide-in-from-left-2 duration-300">
              <button 
                onClick={() => removeItem('projects', index)}
                className="absolute top-3 right-3 p-2 text-zinc-300 hover:text-red-500 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-8 sm:pr-0">
                <Input label="Proje Adı" value={proj.name} onChange={(e) => updateItem('projects', index, 'name', e.target.value)} />
                <Input label="Link" value={proj.link} onChange={(e) => updateItem('projects', index, 'link', e.target.value)} />
                <div className="sm:col-span-2">
                  <TextArea label="Açıklama" value={proj.description} onChange={(e) => updateItem('projects', index, 'description', e.target.value)} rows={2} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addItem('projects')} className="w-full py-4 border-2 border-dashed border-zinc-200 rounded-2xl text-zinc-400 font-bold hover:border-black hover:text-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]">
            + Yeni Proje Ekle
          </button>
        </div>
      </Card>

      {/* Yetenekler ve Diller */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        <Card title="Yetenekler" icon={<Wrench size={18}/>}>
          {data.skills.map((skill, index) => (
            <div key={index} className="flex gap-2 mb-2 group">
              <Input value={skill.name} onChange={(e) => updateItem('skills', index, 'name', e.target.value)} />
              <button onClick={() => removeItem('skills', index)} className="p-2 text-zinc-300 hover:text-red-500 transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => addItem('skills')} className="mt-2 text-black font-bold text-[9px] uppercase tracking-widest px-4 py-2 bg-zinc-100 rounded-lg hover:bg-black hover:text-white transition-all">
            + Ekle
          </button>
        </Card>

        <Card title="Diller" icon={<Languages size={18}/>}>
          {data.languages.map((lang, index) => (
            <div key={index} className="flex gap-2 mb-2 items-end">
              <div className="flex-1"><Input label="Dil" value={lang.name} onChange={(e) => updateItem('languages', index, 'name', e.target.value)} /></div>
              <div className="flex-1"><Input label="Seviye" value={lang.level} onChange={(e) => updateItem('languages', index, 'level', e.target.value)} /></div>
              <button onClick={() => removeItem('languages', index)} className="p-2 text-zinc-300 hover:text-red-500 transition-all mb-1">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={() => addItem('languages')} className="mt-2 text-black font-bold text-[9px] uppercase tracking-widest px-4 py-2 bg-zinc-100 rounded-lg hover:bg-black hover:text-white transition-all">
            + Ekle
          </button>
        </Card>
      </div>
    </div>
  );
};

export default ResumeForm;

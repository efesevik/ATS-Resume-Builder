import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const INITIAL_DATA = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    profileImage: null,
    themeColor: '#111827',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  personalSkills: [],
  languages: [],
  projects: [],
};

const useResumeData = (userId) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(true);

  // Veriyi Supabase'den çek
  useEffect(() => {
    if (!userId) return;

    const fetchResume = async () => {
      try {
        const { data: row, error } = await supabase
          .from('resumes')
          .select('resume_data')
          .eq('id', userId)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116: Kayıt bulunamadı hatası
          console.error('Supabase veri çekme hatası:', error);
        }

        let currentData = INITIAL_DATA;

        if (row && row.resume_data) {
          // Supabase'de veri varsa onu kullan
          currentData = row.resume_data;
        } else {
          // Supabase boşsa eski localstorage verisi var mı diye bak (Geçiş için)
          const saved = localStorage.getItem('resume-shield-data');
          if (saved) {
            currentData = JSON.parse(saved);
          }
        }

        // Veriyi güvenli bir şekilde state'e aktar
        setData({
          ...INITIAL_DATA,
          ...currentData,
          personalInfo: {
            ...INITIAL_DATA.personalInfo,
            ...(currentData.personalInfo || {})
          },
          experience: Array.isArray(currentData.experience) ? currentData.experience : [],
          education: Array.isArray(currentData.education) ? currentData.education : [],
          skills: Array.isArray(currentData.skills) ? currentData.skills : [],
          personalSkills: Array.isArray(currentData.personalSkills) ? currentData.personalSkills : [],
          languages: Array.isArray(currentData.languages) ? currentData.languages : [],
          projects: Array.isArray(currentData.projects) ? currentData.projects : [],
        });

      } catch (e) {
        console.error("Kritik veri yükleme hatası", e);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  // Veri değiştiğinde hem localStorage'a hem Supabase'e kaydet (1 saniye gecikmeli/debounce ile)
  useEffect(() => {
    if (loading || !userId) return; // Henüz yükleniyorsa veya userId yoksa kaydetme

    const saveResume = async () => {
      try {
        // Çevrimdışı durumlar için yine de local'e yazalım
        localStorage.setItem('resume-shield-data', JSON.stringify(data));
        
        // Supabase'e Upsert (Varsa güncelle, yoksa oluştur)
        const { error } = await supabase
          .from('resumes')
          .upsert({ 
            id: userId, 
            resume_data: data,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });

        if (error) {
          console.error('Supabase kaydetme hatası:', error);
        }
      } catch (e) {
        console.warn("Kayıt uyarısı:", e);
      }
    };

    // Her tuş vuruşunda veritabanını yormamak için 1 saniyelik debounce ekliyoruz
    const timeoutId = setTimeout(saveResume, 1000);
    return () => clearTimeout(timeoutId);
  }, [data, loading, userId]);

  const updatePersonalInfo = (field, value) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSummary = (value) => {
    setData(prev => ({ ...prev, summary: value }));
  };

  const addItem = (section) => {
    const newItem = section === 'experience' 
      ? { company: '', position: '', duration: '', description: '' }
      : section === 'education'
      ? { school: '', degree: '', duration: '', description: '' }
      : section === 'projects'
      ? { name: '', link: '', description: '', technologies: '' }
      : section === 'languages'
      ? { name: '', level: 'B1 - Orta Seviye' }
      : section === 'personalSkills'
      ? { name: '' }
      : { name: '', level: '' };

    setData(prev => {
      const currentList = Array.isArray(prev[section]) ? prev[section] : [];
      return {
        ...prev,
        [section]: [...currentList, newItem]
      };
    });
  };

  const updateItem = (section, index, field, value) => {
    setData(prev => {
      const newList = Array.isArray(prev[section]) ? [...prev[section]] : [];
      if (newList[index]) {
        newList[index] = { ...newList[index], [field]: value };
      }
      return { ...prev, [section]: newList };
    });
  };

  const removeItem = (section, index) => {
    setData(prev => {
      const currentList = Array.isArray(prev[section]) ? prev[section] : [];
      return {
        ...prev,
        [section]: currentList.filter((_, i) => i !== index)
      };
    });
  };

  const clearImage = () => {
    updatePersonalInfo('profileImage', null);
  };

  const resetData = () => {
    if (window.confirm('Tüm veriler silinecek. Emin misiniz?')) {
      setData(INITIAL_DATA);
      localStorage.removeItem('resume-shield-data');
      // Supabase'den de silinebilir veya boş data olarak güncellenebilir.
      // Şu an sadece boş data ile update ediyoruz:
      if (userId) {
        supabase.from('resumes').upsert({ id: userId, resume_data: INITIAL_DATA });
      }
    }
  };

  return {
    data,
    loading, // Yükleniyor durumunu UI'da kullanmak isteyebilirsin
    updatePersonalInfo,
    updateSummary,
    addItem,
    updateItem,
    removeItem,
    clearImage,
    resetData
  };
};

export default useResumeData;

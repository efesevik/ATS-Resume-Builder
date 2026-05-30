import React, { useState, useEffect } from 'react';
import ResumeForm from './features/resume/ResumeForm';
import ResumePreview from './features/resume/ResumePreview';
import { Shield, RefreshCw, Eye, Edit3, LogOut } from 'lucide-react';
import { supabase } from './lib/supabaseClient';
import Auth from './components/Auth';
import { ResumeProvider } from './context/ResumeContext';

function AppContent({ onLogout }) {
  const [activeTab, setActiveTab] = useState('edit'); 
  
  const handleHardReset = () => {
    if (window.confirm('Tüm kayıtlı veriler silinerek uygulama sıfırlanacaktır. Devam etmek istiyor musunuz?')) {
      localStorage.removeItem('resume-shield-data');
      window.location.reload();
    }
  };

  return (
    <div className="h-screen bg-[#f8fafc] font-sans text-slate-900 overflow-hidden flex flex-col">
      {/* Navbar */}
      <nav className="h-16 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md shrink-0 flex items-center shadow-sm z-50">
        <div className="mx-auto flex w-full max-w-full lg:max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-lg shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <span className="text-lg lg:text-xl font-black tracking-tight text-gray-900 uppercase">ATS CV BUILDER</span>
              <p className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-gray-400 -mt-1">PREMIUM ATS COMPLIANT</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={handleHardReset}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex items-center gap-2 text-[10px] font-bold uppercase"
              title="Formu Sıfırla"
            >
              <RefreshCw size={14} />
              <span className="hidden lg:inline">Sıfırla</span>
            </button>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all flex items-center gap-2 text-[10px] font-bold uppercase"
              title="Çıkış Yap"
            >
              <LogOut size={14} />
              <span className="hidden lg:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden items-stretch">
        {/* Left: Form */}
        <div className={`h-full overflow-y-auto border-r border-gray-100 bg-white transition-all ${
          activeTab === 'edit' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'
        }`}>
          <ResumeForm />
        </div>

        {/* Right: Preview */}
        <div className={`h-full overflow-y-auto bg-slate-50 relative ${
          activeTab === 'preview' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'
        }`}>
          <div className="p-4 lg:p-8 flex-1 w-full bg-slate-50 custom-scrollbar overflow-x-hidden">
             <ResumePreview />
          </div>
        </div>
      </main>

      {/* Mobile Floating Menu */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-white/10 z-[100] flex gap-1">
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
            activeTab === 'edit' 
              ? 'bg-white text-black shadow-lg scale-105' 
              : 'text-zinc-500'
          }`}
        >
          <Edit3 size={16} />
          <span>DÜZENLE</span>
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
            activeTab === 'preview' 
              ? 'bg-white text-black shadow-lg scale-105' 
              : 'text-zinc-500'
          }`}
        >
          <Eye size={16} />
          <span>ÖNİZLE</span>
        </button>
      </div>
    </div>
  );
}

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin text-black">
          <RefreshCw size={32} />
        </div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <ResumeProvider userId={session.user.id}>
      <AppContent onLogout={() => supabase.auth.signOut()} />
    </ResumeProvider>
  );
}

export default App;

import React from 'react';
import { Sparkles, Mic, BookOpen, Lightbulb } from 'lucide-react';

interface HeaderProps {
  activeTab: 'transcribe' | 'practice' | 'tips';
  onTabChange: (tab: 'transcribe' | 'practice' | 'tips') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="flex flex-col items-center text-center pt-8 pb-4 px-4 max-w-2xl mx-auto">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-amber-900/10 shadow-xs text-xs sm:text-sm font-semibold text-stone-700 mb-3.5 transition-transform hover:scale-102">
        <Sparkles className="w-3.5 h-3.5 text-[#c23f25]" />
        <span className="bg-gradient-to-r from-stone-800 via-[#c23f25] to-amber-700 bg-clip-text text-transparent font-bold">
          Chuyên Gia Ngữ Âm & Phiên Âm Việt
        </span>
      </div>

      {/* Main Brand Title: NGUYỄN PHONG */}
      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2 select-none">
        <span className="text-stone-900">NGUYỄN </span>
        <span className="bg-gradient-to-r from-[#c23f25] via-orange-600 to-amber-600 bg-clip-text text-transparent drop-shadow-xs">
          PHONG
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-stone-600 font-normal max-w-xl mb-6 leading-relaxed">
        Phiên âm chữ Việt chuẩn xác, giải thích chi tiết từ loại và luyện phát âm bản ngữ.
      </p>

      {/* Navigation tabs */}
      <nav className="inline-flex items-center p-1 rounded-full bg-stone-200/60 border border-stone-200/80 mb-2 text-xs sm:text-sm">
        <button
          onClick={() => onTabChange('transcribe')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-medium transition-all ${
            activeTab === 'transcribe'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Phiên âm</span>
        </button>
        <button
          onClick={() => onTabChange('practice')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-medium transition-all ${
            activeTab === 'practice'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Luyện ngữ điệu</span>
        </button>
        <button
          onClick={() => onTabChange('tips')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-medium transition-all ${
            activeTab === 'tips'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Mẹo phát âm chuẩn</span>
        </button>
      </nav>
    </header>
  );
};

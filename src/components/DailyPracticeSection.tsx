import React, { useState, useMemo, useEffect } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Layers,
  Copy,
  Check,
  Search,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { PracticeItem } from '../data/pronunciationRules';
import { ALL_PRACTICE_ITEMS, PRACTICE_CATEGORIES } from '../data/practiceLibrary';
import { SupportedLanguage, getLanguageConfig } from '../utils/speech';
import { LanguageSelector } from './LanguageSelector';

interface DailyPracticeSectionProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onSelectPractice: (item: PracticeItem) => void;
  onSpeak: (text: string, speed: number, customLang?: SupportedLanguage) => void;
  speechSpeed: number;
}

const ITEMS_PER_PAGE = 10;

interface CategoryGroup {
  name: string;
  items: { label: string; baseCategory: string }[];
}

const PRIORITY_TOP_CATEGORIES = [
  { label: '✨ Tất cả', baseCategory: 'Tất cả' },
  { label: '☀️ Hàng ngày', baseCategory: 'Hàng ngày' },
];

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    name: 'Ẩm thực & Mua sắm',
    items: [
      { label: '☕ Cafe', baseCategory: 'Cafe' },
      { label: '🍽️ Nhà hàng', baseCategory: 'Nhà hàng' },
      { label: '🛒 Siêu thị', baseCategory: 'Siêu thị' },
      { label: '🛍️ Mua sắm', baseCategory: 'Mua sắm' },
    ],
  },
  {
    name: 'Đời sống & Kết nối',
    items: [
      { label: '🚶 Dạo phố', baseCategory: 'Dạo phố' },
      { label: '🎈 Cuối tuần', baseCategory: 'Cuối tuần' },
      { label: '🎁 Ngày lễ', baseCategory: 'Ngày lễ' },
      { label: '💖 Tình cảm, tình yêu', baseCategory: 'Tình cảm, tình yêu' },
    ],
  },
  {
    name: 'Du lịch & Lưu trú',
    items: [
      { label: '✈️ Du lịch', baseCategory: 'Du lịch' },
      { label: '🛫 Sân bay', baseCategory: 'Sân bay' },
      { label: '🏨 Khách sạn', baseCategory: 'Khách sạn' },
      { label: '🛎️ Lễ tân khách sạn', baseCategory: 'Lễ tân khách sạn' },
    ],
  },
  {
    name: 'Công việc & Chuyên môn',
    items: [
      { label: '💼 Công sở, văn phòng', baseCategory: 'Công sở, văn phòng' },
      { label: '💻 Máy tính', baseCategory: 'Máy tính' },
      { label: '📊 Kinh tế, tài chính, kế toán', baseCategory: 'Kinh tế, tài chính, kế toán' },
    ],
  },
];

export const DailyPracticeSection: React.FC<DailyPracticeSectionProps> = ({
  currentLanguage,
  onLanguageChange,
  onSelectPractice,
  onSpeak,
  speechSpeed,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Reset page when category, language, or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, currentLanguage, searchQuery]);

  // Filter items by selected language, category, and search query
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return ALL_PRACTICE_ITEMS.filter((item) => {
      const matchLang = item.language === currentLanguage;
      if (!matchLang) return false;

      const matchCat =
        selectedCategory === 'Tất cả' ||
        item.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim() ||
        item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(item.category.toLowerCase());
      if (!matchCat) return false;

      if (!q) return true;

      return (
        item.original.toLowerCase().includes(q) ||
        item.meaningVi.toLowerCase().includes(q) ||
        item.phoneticsVi.toLowerCase().includes(q) ||
        item.tip.toLowerCase().includes(q)
      );
    });
  }, [currentLanguage, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleCopy = (id: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePlaySample = (item: PracticeItem) => {
    setPlayingId(item.id);
    onSpeak(item.original, speechSpeed, item.language);
    setTimeout(() => setPlayingId(null), 2500);
  };

  const handlePlayVietnamese = (item: PracticeItem) => {
    setPlayingId(`${item.id}-vi`);
    onSpeak(item.phoneticsVi, speechSpeed, 'vi');
    setTimeout(() => setPlayingId(null), 2500);
  };

  const currentLangConfig = getLanguageConfig(currentLanguage);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16 space-y-6">
      {/* 1. Header & Language Selection Card */}
      <div className="bg-white rounded-[2rem] border border-orange-200/80 p-6 sm:p-7 shadow-lg shadow-stone-900/5 space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#c23f25]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
              Luyện Ngữ Điệu
            </h2>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Hơn <span className="font-bold text-[#c23f25]">200 câu giao tiếp chuẩn bản xứ</span> cho mỗi chủ đề đời sống cùng <span className="font-bold text-[#c23f25]">500 câu đối thoại chuyên đề Kinh tế, tài chính, kế toán</span> (tổng cộng 16 chủ đề thực tế). Có thể bấm nghe bản ngữ, nghe giọng đọc chữ Việt hoặc nạp thẳng vào bộ phiên âm để phân tích chi tiết.
          </p>
        </div>

        {/* Tùy chọn ngôn ngữ giống y hệt như trong tab phiên âm */}
        <div className="pt-2 pb-1 border-t border-stone-100 flex flex-col items-center">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
            Chọn ngôn ngữ luyện ngữ điệu:
          </p>
          <LanguageSelector
            language={currentLanguage}
            onChange={onLanguageChange}
          />
        </div>

        {/* Search input box */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Tìm câu giao tiếp ${currentLangConfig.name} hoặc tiếng Việt...`}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-stone-50 hover:bg-stone-100/80 focus:bg-white text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 border border-stone-200 outline-none focus:border-[#c23f25] focus:ring-2 focus:ring-[#c23f25]/15 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sắp xếp lại các chủ đề giao tiếp theo đúng yêu cầu */}
        <div className="pt-3 border-t border-stone-100 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
              <Layers className="w-3.5 h-3.5 text-[#c23f25]" />
              <span>Chủ đề giao tiếp:</span>
            </div>
            <span className="text-[11px] font-semibold text-[#c23f25] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/60 shadow-2xs">
              {totalItems} câu đang hiển thị
            </span>
          </div>

          {/* Khối ưu tiên ở vị trí đầu tiên: ✨ Tất cả và ☀️ Hàng ngày nổi bật ở đầu */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50/80 to-amber-50 border border-amber-300/80 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900/90 mb-2 px-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#c23f25]" />
              <span>Khối ưu tiên nổi bật:</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {PRIORITY_TOP_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.baseCategory;
                return (
                  <button
                    key={cat.baseCategory}
                    type="button"
                    onClick={() => setSelectedCategory(cat.baseCategory)}
                    className={`h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#c23f25] text-white shadow-md shadow-orange-950/20 ring-2 ring-[#c23f25]/30'
                        : 'bg-white hover:bg-orange-50/70 text-stone-800 border border-amber-200/90 shadow-2xs active:scale-97'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Các nhóm chủ đề liền kề hài hòa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {CATEGORY_GROUPS.map((group) => (
              <div
                key={group.name}
                className="p-3 rounded-2xl bg-stone-50/80 border border-stone-200/70 space-y-2"
              >
                <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider px-0.5">
                  {group.name}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {group.items.map((cat) => {
                    const isSelected = selectedCategory === cat.baseCategory;
                    return (
                      <button
                        key={cat.baseCategory}
                        type="button"
                        onClick={() => setSelectedCategory(cat.baseCategory)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#c23f25] text-white shadow-xs'
                            : 'bg-white text-stone-700 border border-stone-200/70 hover:bg-stone-100 hover:text-stone-900 active:scale-97'
                        }`}
                      >
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Practice Items List */}
      <div className="space-y-4">
        {paginatedItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-stone-300 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-[#c23f25] flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-800">
              Không tìm thấy câu phù hợp
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              {searchQuery
                ? `Không có kết quả nào khớp với "${searchQuery}". Hãy thử từ khóa khác hoặc xóa tìm kiếm.`
                : `Chưa có mẫu câu cho chủ đề này trong ${currentLangConfig.name}. Bạn có thể gõ câu bất kỳ vào tab Phiên âm.`}
            </p>
          </div>
        ) : (
          paginatedItems.map((item, idx) => {
            const itemNumber = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
            return (
              <div
                key={`${item.id}-${itemNumber}`}
                className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all hover:border-orange-300 relative group"
              >
                {/* Header: Item index, category, intonation, copy */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-400 w-6">
                      #{itemNumber}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/70">
                      {item.intonation}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.original)}
                      title="Sao chép câu này"
                      className="p-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer transition-all active:scale-95"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Original Sentence */}
                <p className="text-lg sm:text-xl font-bold text-stone-900 mb-1.5 font-sans leading-relaxed">
                  {item.original}
                </p>

                {/* Vietnamese Phonetics */}
                <p className="text-base sm:text-lg font-bold text-[#c23f25] mb-2 tracking-wide font-sans">
                  {item.phoneticsVi}
                </p>

                {/* Meaning in Vietnamese */}
                <p className="text-xs sm:text-sm text-stone-700 mb-3 font-semibold">
                  <span className="text-stone-400 font-normal">Nghĩa: </span>
                  {item.meaningVi}
                </p>

                {/* Intonation & Pronunciation Tip */}
                <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-100 text-xs text-orange-950 mb-4 leading-relaxed">
                  <span className="font-bold text-[#c23f25]">Mẹo ngữ điệu: </span>
                  {item.tip}
                </div>

                {/* Action buttons: Listen native, listen Vietnamese, or Load to transcriber */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    {/* Nghe mẫu bản xứ */}
                    <button
                      type="button"
                      onClick={() => handlePlaySample(item)}
                      title={`Nghe phát âm chuẩn ${currentLangConfig.name}`}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        playingId === item.id
                          ? 'bg-[#c23f25] text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${playingId === item.id ? 'animate-bounce' : ''}`} />
                      <span>Nghe mẫu</span>
                    </button>

                    {/* Nghe đọc chữ Việt */}
                    <button
                      type="button"
                      onClick={() => handlePlayVietnamese(item)}
                      title="Nghe giọng đọc chữ Việt phát âm"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        playingId === `${item.id}-vi`
                          ? 'bg-[#c23f25] text-white shadow-xs'
                          : 'bg-orange-50 hover:bg-orange-100 text-[#c23f25] border border-orange-200/60'
                      }`}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${playingId === `${item.id}-vi` ? 'animate-bounce' : ''}`} />
                      <span>Đọc chữ Việt</span>
                    </button>
                  </div>

                  {/* Nạp thẳng vào bộ phiên âm để phân tích */}
                  <button
                    type="button"
                    onClick={() => onSelectPractice(item)}
                    title="Nạp câu này thẳng vào bộ phiên âm để phân tích chi tiết từ loại và ngắt cụm"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#c23f25] hover:bg-[#b0361e] text-white transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Nạp vào bộ phiên âm</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 3. Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-600 font-medium">
            Trang <span className="font-bold text-stone-900">{currentPage}</span> /{' '}
            <span className="font-bold text-stone-900">{totalPages}</span> · Tổng{' '}
            <span className="font-bold text-[#c23f25]">{totalItems} câu</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Prev button */}
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              title="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Quick page numbers with guaranteed unique keys */}
            {(() => {
              const maxButtons = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
              let endPage = startPage + maxButtons - 1;
              if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - maxButtons + 1);
              }
              const pageNumbers: number[] = [];
              for (let p = startPage; p <= endPage; p++) {
                pageNumbers.push(p);
              }

              return pageNumbers.map((pageNum) => {
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={`page-${pageNum}`}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#c23f25] text-white shadow-xs'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/60'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              });
            })()}

            {/* Next button */}
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              title="Trang tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

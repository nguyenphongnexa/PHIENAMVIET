import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, Sparkles } from 'lucide-react';
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  getLanguageConfig,
  LanguageOption,
} from '../utils/speech';

interface LanguageSelectorProps {
  language: SupportedLanguage;
  onChange: (lang: SupportedLanguage) => void;
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Stored secondary language (defaults to 'zh' - Tiếng Trung)
  const [selectedOtherLang, setSelectedOtherLang] = useState<string>(
    language !== 'en' ? language : 'zh'
  );

  // Sync selectedOtherLang when language changes to a non-English language
  useEffect(() => {
    if (language !== 'en') {
      setSelectedOtherLang(language);
    }
  }, [language]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // English option
  const englishOption = SUPPORTED_LANGUAGES.find((l) => l.code === 'en')!;

  // Current active other language
  const currentOtherOption = getLanguageConfig(selectedOtherLang);

  // Other languages list: EXPLICIT REQUIREMENT:
  // "Ô tiếng trung sẽ có danh sách xổ xuống với tất cả các ngôn ngữ khác, nhưng tiếng trung sẽ được sắp xếp trên cùng."
  // Chinese ('zh') must be sorted at the very TOP of the dropdown!
  const chineseOption = SUPPORTED_LANGUAGES.find((l) => l.code === 'zh')!;
  const nonEnglishNonChinese = SUPPORTED_LANGUAGES.filter(
    (l) => l.code !== 'en' && l.code !== 'zh'
  );

  // Pinned Chinese first, followed by all other languages
  const allOtherLanguages: LanguageOption[] = [chineseOption, ...nonEnglishNonChinese];

  // Filtered by search query
  const query = searchQuery.trim().toLowerCase();
  const filteredLanguages = allOtherLanguages.filter((l) => {
    if (!query) return true;
    return (
      l.name.toLowerCase().includes(query) ||
      l.nativeName.toLowerCase().includes(query) ||
      l.badge.toLowerCase().includes(query) ||
      l.code.toLowerCase().includes(query)
    );
  });

  const handleSelectOther = (langCode: string) => {
    setSelectedOtherLang(langCode);
    setIsOpen(false);
    onChange(langCode);
  };

  const isEnglishActive = language === 'en';
  const isOtherActive = language !== 'en';

  return (
    <div className="flex items-center justify-center gap-3 my-4 relative z-30 select-none">
      {/* 1. English Button (Đồng bộ kích thước chuẩn h-12, chiều rộng đồng nhất) */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setIsOpen(false);
          onChange('en');
        }}
        className={`h-12 w-48 sm:w-56 px-4 rounded-2xl text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
          isEnglishActive
            ? 'bg-[#c23f25] text-white shadow-md shadow-orange-950/15 ring-2 ring-[#c23f25]/20'
            : 'bg-white/95 text-stone-700 hover:bg-white hover:text-stone-900 border border-stone-200/90 shadow-xs'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'active:scale-97'}`}
      >
        <span className="text-xs uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-black/10 flex-shrink-0">
          {englishOption.badge}
        </span>
        <span className="flex items-center gap-1.5 truncate">
          <span className="text-base">{englishOption.flag}</span>
          <span className="truncate">{englishOption.name}</span>
        </span>
      </button>

      {/* 2. Other Languages Dropdown Slot (Đồng bộ kích thước chuẩn h-12, chiều rộng đồng nhất) */}
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center">
          {/* Main button for the other language */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              if (isEnglishActive) {
                // If currently on English, clicking this switches to the other language
                onChange(selectedOtherLang);
              } else {
                // If already on other language, clicking toggles the dropdown
                setIsOpen(!isOpen);
              }
            }}
            className={`h-12 w-48 sm:w-56 px-3.5 sm:px-4 rounded-2xl text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
              isOtherActive
                ? 'bg-[#c23f25] text-white shadow-md shadow-orange-950/15 ring-2 ring-[#c23f25]/20'
                : 'bg-white/95 text-stone-700 hover:bg-white hover:text-stone-900 border border-stone-200/90 shadow-xs'
            } ${disabled ? 'opacity-60 cursor-not-allowed' : 'active:scale-97'}`}
            title="Nhấn để chọn ngôn ngữ này hoặc bấm mũi tên để đổi sang ngôn ngữ khác"
          >
            <div className="flex items-center gap-1.5 min-w-0 truncate">
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-black/10 flex-shrink-0">
                {currentOtherOption.badge}
              </span>
              <span className="flex items-center gap-1.5 truncate">
                <span className="text-base">{currentOtherOption.flag}</span>
                <span className="truncate">{currentOtherOption.name}</span>
              </span>
            </div>

            {/* Dropdown Chevron Indicator */}
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) setIsOpen(!isOpen);
              }}
              className={`p-1 rounded-md hover:bg-black/15 transition-transform duration-200 flex-shrink-0 ${
                isOpen ? 'rotate-180' : ''
              }`}
              title="Xem tất cả các ngôn ngữ khác"
            >
              <ChevronDown className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full mt-2 right-0 sm:left-1/2 sm:-translate-x-1/2 w-72 sm:w-80 bg-white rounded-2xl border border-stone-200 shadow-2xl shadow-stone-900/15 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Search Input */}
            <div className="relative mb-2 px-1">
              <div className="flex items-center gap-2 px-3 py-2 bg-stone-100 rounded-xl text-xs text-stone-700 border border-stone-200/60 focus-within:border-[#c23f25] focus-within:ring-2 focus-within:ring-[#c23f25]/20 focus-within:bg-white transition-all">
                <Search className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm ngôn ngữ (Trung, Cam, Lào, Nhật, Hàn, Pháp...)"
                  className="w-full bg-transparent border-none outline-none text-xs text-stone-800 placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* List container */}
            <div className="max-h-64 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
              {filteredLanguages.length === 0 ? (
                <div className="py-6 text-center text-xs text-stone-400">
                  Không tìm thấy ngôn ngữ phù hợp
                </div>
              ) : (
                filteredLanguages.map((langItem, idx) => {
                  const isChinese = langItem.code === 'zh';
                  const isSelected = language === langItem.code;

                  return (
                    <React.Fragment key={langItem.code}>
                      {/* Section Divider after Chinese if query is empty */}
                      {!searchQuery && idx === 1 && (
                        <div className="px-2 pt-2 pb-1 flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                            Các ngôn ngữ khác
                          </span>
                          <div className="flex-1 border-t border-stone-100" />
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleSelectOther(langItem.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-orange-50 text-[#c23f25] font-semibold border border-orange-200/60'
                            : 'hover:bg-stone-50 text-stone-700 hover:text-stone-900'
                        } ${isChinese ? 'bg-amber-50/50 hover:bg-amber-100/50' : ''}`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-base flex-shrink-0">{langItem.flag}</span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="truncate">{langItem.name}</span>
                              {isChinese && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#c23f25] text-white">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  <span>Ưu tiên</span>
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-stone-400 block truncate">
                              {langItem.nativeName}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 border border-stone-200/60">
                            {langItem.badge}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#c23f25]" />}
                        </div>
                      </button>
                    </React.Fragment>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Lightbulb, Volume2, BookOpen, Sparkles, Check, Copy } from 'lucide-react';
import {
  PRONUNCIATION_RULES,
  IPA_ENGLISH_CHEAT_SHEET,
  PINYIN_CHINESE_CHEAT_SHEET,
  KHMER_CHEAT_SHEET,
  LAO_CHEAT_SHEET,
} from '../data/pronunciationRules';
import { SupportedLanguage, getLanguageConfig } from '../utils/speech';
import { LanguageSelector } from './LanguageSelector';

interface PronunciationTipsSectionProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onSpeak: (text: string, speed: number, customLang?: SupportedLanguage) => void;
  speechSpeed: number;
}

export const PronunciationTipsSection: React.FC<PronunciationTipsSectionProps> = ({
  currentLanguage,
  onLanguageChange,
  onSpeak,
  speechSpeed,
}) => {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(
    currentLanguage === 'vi' ? 'en' : currentLanguage
  );
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleLanguageSelect = (newLang: SupportedLanguage) => {
    setSelectedLang(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Filter rules by language or general rules ('all')
  const rules = PRONUNCIATION_RULES.filter(
    (r) => r.language === selectedLang || r.language === 'all'
  );

  const langConfig = getLanguageConfig(selectedLang);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16 space-y-6 animate-in fade-in duration-300">
      {/* Intro card & Language Selector (Giống hệt tab Phiên âm theo yêu cầu) */}
      <div className="bg-white rounded-[2rem] border border-orange-200/80 p-6 sm:p-7 shadow-lg shadow-stone-900/5">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-[#c23f25]" />
          <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
            Mẹo Phát Âm Chuẩn
          </h2>
        </div>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-5">
          Hướng dẫn chuyên sâu về ngắt nhịp (Thought Groups), nối âm (Linking), âm lướt Schwa /ə/, biến điệu 2 thanh 3 tiếng Trung, quy tắc biến điệu chữ 不 và 一, thanh nhẹ, âm uốn lưỡi 儿. Bảng đối chiếu âm Quốc tế IPA - Chữ Việt và Pinyin - Âm vần tiếng Việt có kèm các nút nghe phát âm trực quan.
        </p>

        {/* Tùy chọn ngôn ngữ giống như trong tab phiên âm */}
        <div className="pt-2 pb-1 border-t border-stone-100 flex flex-col items-center">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
            Chọn ngôn ngữ xem mẹo phát âm:
          </p>
          <LanguageSelector
            language={selectedLang}
            onChange={handleLanguageSelect}
          />
        </div>
      </div>

      {/* Rules list */}
      <div className="space-y-5">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm space-y-4"
          >
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-[#c23f25]/10 text-[#c23f25] font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  {rule.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed whitespace-pre-line">
                  {rule.summary}
                </p>
              </div>
            </div>

            {/* Examples table / list */}
            {rule.examples && rule.examples.length > 0 && (
              <div className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/60 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Ví dụ minh họa & Cách phát âm:
                </h4>

                {rule.examples.map((ex, exIdx) => {
                  const speakText = ex.text.split('->')[0].replace(/[\/\[\]]/g, '').trim();
                  return (
                    <div
                      key={exIdx}
                      className="bg-white p-3.5 rounded-xl border border-stone-200/60 space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="font-semibold text-stone-900 text-sm sm:text-base">
                          {ex.text}
                        </span>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => onSpeak(speakText, speechSpeed, rule.language === 'all' ? selectedLang : (rule.language as SupportedLanguage))}
                            title="Nghe phát âm chuẩn bản ngữ"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#c23f25] text-xs font-semibold cursor-pointer transition-all active:scale-95"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe bản ngữ</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onSpeak(ex.phoneticsVi.replace(/[\/\[\]()]/g, ''), speechSpeed, 'vi')}
                            title="Nghe giọng đọc chữ Việt phát âm"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer transition-all active:scale-95"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-stone-500" />
                            <span>Đọc chữ Việt</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopy(speakText)}
                            title="Sao chép câu ví dụ"
                            className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 cursor-pointer transition-all"
                          >
                            {copiedText === speakText ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-[#c23f25] bg-orange-50/50 p-2.5 rounded-lg">
                        Đọc bằng chữ Việt: {ex.phoneticsVi}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        💡 <span className="font-semibold text-stone-700">Lưu ý:</span> {ex.note}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* BẢNG ĐỐI CHIẾU TIẾNG ANH (IPA sang Chữ Việt) */}
        {selectedLang === 'en' && (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#c23f25]" />
              <span>Bảng Đối Chiếu Âm Quốc Tế (IPA) Sang Chữ Việt Dễ Nhớ</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-stone-100 text-stone-700 font-semibold rounded-lg">
                  <tr>
                    <th className="p-2.5 rounded-l-lg">Âm IPA</th>
                    <th className="p-2.5">Chữ Việt tương đương</th>
                    <th className="p-2.5">Ví dụ từ</th>
                    <th className="p-2.5 rounded-r-lg">Khẩu hình & Mẹo đọc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {IPA_ENGLISH_CHEAT_SHEET.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-2.5 font-mono font-bold text-stone-900">{row.symbol}</td>
                      <td className="p-2.5 font-bold text-[#c23f25]">{row.vietnameseEquivalent}</td>
                      <td className="p-2.5 font-medium">
                        <div className="flex items-center gap-1.5">
                          <span>{row.example}</span>
                          <button
                            type="button"
                            onClick={() => onSpeak(row.example.split('/')[0].trim(), speechSpeed, 'en')}
                            className="p-1 rounded-md hover:bg-stone-200/60 text-stone-600"
                            title="Nghe mẫu phát âm"
                          >
                            <Volume2 className="w-3 h-3 text-[#c23f25]" />
                          </button>
                        </div>
                      </td>
                      <td className="p-2.5 text-stone-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BẢNG ĐỐI CHIẾU TIẾNG TRUNG (Pinyin & Thanh điệu sang Chữ Việt) */}
        {selectedLang === 'zh' && (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#c23f25]" />
              <span>Bảng Đối Chiếu Pinyin & Thanh Điệu Tiếng Trung Sang Chữ Việt</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-stone-100 text-stone-700 font-semibold rounded-lg">
                  <tr>
                    <th className="p-2.5 rounded-l-lg">Pinyin / Thanh điệu</th>
                    <th className="p-2.5">Chữ Việt tương đương</th>
                    <th className="p-2.5">Ví dụ chữ Hán</th>
                    <th className="p-2.5 rounded-r-lg">Khẩu hình & Cao độ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {PINYIN_CHINESE_CHEAT_SHEET.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-2.5 font-mono font-bold text-stone-900">{row.symbol}</td>
                      <td className="p-2.5 font-bold text-[#c23f25]">{row.vietnameseEquivalent}</td>
                      <td className="p-2.5 font-medium">
                        <div className="flex items-center gap-1.5">
                          <span>{row.example}</span>
                          <button
                            type="button"
                            onClick={() => onSpeak(row.example.split('->')[0].replace(/[a-zA-Z]/g, '').trim(), speechSpeed, 'zh')}
                            className="p-1 rounded-md hover:bg-stone-200/60 text-stone-600"
                            title="Nghe mẫu phát âm"
                          >
                            <Volume2 className="w-3 h-3 text-[#c23f25]" />
                          </button>
                        </div>
                      </td>
                      <td className="p-2.5 text-stone-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BẢNG ĐỐI CHIẾU TIẾNG CAMPUCHIA (KHMER) */}
        {selectedLang === 'km' && (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#c23f25]" />
              <span>Bảng Đối Chiếu Từ Ngữ & Phiên Âm Tiếng Khmer Sang Chữ Việt</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-stone-100 text-stone-700 font-semibold rounded-lg">
                  <tr>
                    <th className="p-2.5 rounded-l-lg">Chữ Khmer</th>
                    <th className="p-2.5">Đọc bằng Chữ Việt</th>
                    <th className="p-2.5">Phiên âm Latin</th>
                    <th className="p-2.5 rounded-r-lg">Ý nghĩa & Cách dùng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {KHMER_CHEAT_SHEET.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-2.5 font-bold text-stone-900 text-base">{row.symbol}</td>
                      <td className="p-2.5 font-bold text-[#c23f25]">{row.vietnameseEquivalent}</td>
                      <td className="p-2.5 font-medium">
                        <div className="flex items-center gap-1.5">
                          <span>{row.example}</span>
                          <button
                            type="button"
                            onClick={() => onSpeak(row.symbol, speechSpeed, 'km')}
                            className="p-1 rounded-md hover:bg-stone-200/60 text-stone-600"
                            title="Nghe phát âm chuẩn tiếng Khmer"
                          >
                            <Volume2 className="w-3 h-3 text-[#c23f25]" />
                          </button>
                        </div>
                      </td>
                      <td className="p-2.5 text-stone-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BẢNG ĐỐI CHIẾU TIẾNG LÀO (LAO) */}
        {selectedLang === 'lo' && (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#c23f25]" />
              <span>Bảng Đối Chiếu Từ Ngữ & Phiên Âm Tiếng Lào Sang Chữ Việt</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-stone-100 text-stone-700 font-semibold rounded-lg">
                  <tr>
                    <th className="p-2.5 rounded-l-lg">Chữ Lào</th>
                    <th className="p-2.5">Đọc bằng Chữ Việt</th>
                    <th className="p-2.5">Phiên âm Latin</th>
                    <th className="p-2.5 rounded-r-lg">Ý nghĩa & Cách dùng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {LAO_CHEAT_SHEET.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-2.5 font-bold text-stone-900 text-base">{row.symbol}</td>
                      <td className="p-2.5 font-bold text-[#c23f25]">{row.vietnameseEquivalent}</td>
                      <td className="p-2.5 font-medium">
                        <div className="flex items-center gap-1.5">
                          <span>{row.example}</span>
                          <button
                            type="button"
                            onClick={() => onSpeak(row.symbol, speechSpeed, 'lo')}
                            className="p-1 rounded-md hover:bg-stone-200/60 text-stone-600"
                            title="Nghe phát âm chuẩn tiếng Lào"
                          >
                            <Volume2 className="w-3 h-3 text-[#c23f25]" />
                          </button>
                        </div>
                      </td>
                      <td className="p-2.5 text-stone-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Thông tin cho các ngôn ngữ khác */}
        {selectedLang !== 'en' && selectedLang !== 'zh' && selectedLang !== 'km' && selectedLang !== 'lo' && (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c23f25]" />
              <span>Mẹo Phát Âm Chuẩn {langConfig.name}</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Hệ thống NGUYỄN PHONG hỗ trợ phiên âm chữ Việt chuẩn xác cho {langConfig.name}. Hãy áp dụng các quy tắc ngắt nhịp (Thought Groups) và quy tắc trọng âm câu phía trên để giao tiếp tự nhiên và trôi chảy nhất.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Volume2, Copy, Check, Info, Sparkles, CornerDownRight, Zap, BookOpen, Search } from 'lucide-react';
import { TranscriptionResult, extractWordAnalysis, WordAnalysis } from '../utils/transliterate';
import { SupportedLanguage, getLanguageConfig } from '../utils/speech';

interface TranscriptionResultViewProps {
  result: TranscriptionResult;
  language: SupportedLanguage;
  onSpeak: (text: string, speed: number, customLang?: SupportedLanguage) => void;
  speechSpeed: number;
  isPlayingAudio: boolean;
}

export const TranscriptionResultView: React.FC<TranscriptionResultViewProps> = ({
  result,
  language,
  onSpeak,
  speechSpeed,
  isPlayingAudio,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedMeaning, setCopiedMeaning] = useState(false);
  const [playingChunkIndex, setPlayingChunkIndex] = useState<number | null>(null);
  const [playingWordIndex, setPlayingWordIndex] = useState<number | null>(null);

  const handleCopyAll = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyOriginal = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedOriginal(true);
    setTimeout(() => setCopiedOriginal(false), 2000);
  };

  const handleCopyMeaning = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMeaning(true);
    setTimeout(() => setCopiedMeaning(false), 2000);
  };

  const handlePlayChunk = (chunkText: string, index: number) => {
    setPlayingChunkIndex(index);
    onSpeak(chunkText, speechSpeed, language);
    setTimeout(() => setPlayingChunkIndex(null), 1800);
  };

  const handlePlayWord = (wordText: string, index: number) => {
    setPlayingWordIndex(index);
    onSpeak(wordText, speechSpeed, language);
    setTimeout(() => setPlayingWordIndex(null), 1500);
  };

  const targetLangConfig = getLanguageConfig(language);
  const targetLangName = targetLangConfig.name;

  // Ensure words list is always available for Khối 5 with IPA/Pinyin and usageNote
  const fallbackWordList = extractWordAnalysis(result.originalText, language, result.chunks);
  const wordList: WordAnalysis[] =
    result.words && result.words.length > 0
      ? result.words.map((w, idx) => {
          const fb = fallbackWordList[idx];
          return {
            ...w,
            ipaOrPinyin: w.ipaOrPinyin || fb?.ipaOrPinyin,
            usageNote: w.usageNote || fb?.usageNote,
          };
        })
      : fallbackWordList;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-16 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Khối tổng hợp 1, 2, 3 */}
      <section className="bg-white rounded-[2rem] border border-orange-200/70 shadow-xl shadow-stone-900/5 p-6 sm:p-8 relative overflow-hidden">
        {/* Top Header Row with Badges and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c23f25] animate-pulse" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700">
              Kết Quả Phiên Âm & Phân Tích Chuẩn Xác
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {result.sentenceType && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/70">
                {result.sentenceType}
              </span>
            )}

            <button
              type="button"
              onClick={() =>
                handleCopyAll(
                  `[${targetLangName}]: ${result.originalText}\n[Phiên âm Việt]: ${result.fullVietnamesePhonetics}\n[Ý nghĩa]: ${result.fullVietnameseMeaning}`
                )
              }
              title="Sao chép toàn bộ kết quả"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all cursor-pointer border border-stone-200/70 shadow-2xs"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Đã chép tất cả</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Sao chép tất cả</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Notice Banner: When user input was converted to target language */}
        {result.inputWasVietnamese && (
          <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-stone-800 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#c23f25] uppercase tracking-wide mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>✨ Đã tự động hiển thị theo chuẩn {targetLangName}</span>
            </div>
            {result.vietnameseSourceText && (
              <p className="text-xs sm:text-sm text-stone-700">
                <span className="font-semibold text-stone-800">Nội dung ban đầu đã nhập:</span> "{result.vietnameseSourceText}"
              </p>
            )}
          </div>
        )}

        {/* 🔊 KHỐI 1 — NGUYÊN CÂU THEO CHUẨN BẢN NGỮ */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider">
              <span>🔊 Khối 1 — Nguyên câu theo chuẩn bản ngữ ({targetLangName}):</span>
            </div>
            {result.inputWasVietnamese && (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                ✓ Chuẩn bản xứ
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200/80">
            <div className="flex-1">
              <span className="text-xl sm:text-2xl font-bold text-stone-900 leading-relaxed font-sans mr-2">
                {result.originalText}
              </span>
              {/* Icon copy nằm ở cuối câu */}
              <button
                type="button"
                onClick={() => handleCopyOriginal(result.originalText)}
                title={`Sao chép câu ${targetLangName}`}
                className="inline-flex items-center justify-center p-1.5 rounded-lg bg-white hover:bg-stone-200 text-stone-600 hover:text-stone-900 shadow-2xs border border-stone-200 cursor-pointer active:scale-95 transition-all align-middle"
                aria-label={`Sao chép câu ${targetLangName}`}
              >
                {copiedOriginal ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-stone-500 hover:text-stone-700" />
                )}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              {/* Nghe chậm 0.75x để luyện bắt chước phát âm */}
              <button
                type="button"
                onClick={() => onSpeak(result.originalText, 0.75, language)}
                title={`Nghe chậm 0.75x để luyện bắt chước phát âm chuẩn ${targetLangName}`}
                className="p-2 sm:px-2.5 sm:py-2 rounded-xl bg-white hover:bg-amber-50 text-amber-800 shadow-2xs border border-amber-200/80 flex items-center gap-1 cursor-pointer active:scale-95 transition-all text-xs font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Chậm 0.75x</span>
              </button>

              {/* Phát âm nguyên câu chuẩn theo tốc độ đã chọn */}
              <button
                type="button"
                onClick={() => onSpeak(result.originalText, speechSpeed, language)}
                title={`Nghe phát âm chuẩn ${targetLangName} (${speechSpeed}x)`}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-orange-50 text-[#c23f25] shadow-2xs border border-orange-200 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all text-xs font-semibold"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-[#c23f25]' : ''}`} />
                <span>Nghe chuẩn</span>
              </button>
            </div>
          </div>
        </div>

        {/* ✨ KHỐI 2 — PHIÊN ÂM CHỮ VIỆT THANH THOÁT & NGỮ ĐIỆU */}
        <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-stone-50 border border-orange-200/90">
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 text-[#c23f25] text-xs font-bold uppercase tracking-wider border border-orange-200/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>✨ Khối 2 — Phiên âm chữ Việt thanh thoát & Ngữ điệu:</span>
            </div>

            {/* Nút nghe giọng đọc tiếng Việt cho phiên âm */}
            <button
              type="button"
              onClick={() => onSpeak(result.fullVietnamesePhonetics, speechSpeed, 'vi')}
              title="Nghe giọng đọc phát âm chữ Việt siêu rõ ràng"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 text-[#c23f25] text-xs font-semibold border border-orange-200 shadow-2xs cursor-pointer active:scale-95 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#c23f25]" />
              <span>Đọc chữ Việt</span>
            </button>
          </div>

          <p className="text-xl sm:text-2xl font-bold text-stone-900 leading-relaxed tracking-wide mb-3 font-sans">
            {result.fullVietnamesePhonetics}
          </p>

          {/* Ngữ điệu câu tích hợp trực tiếp trong Khối 2 */}
          {result.intonation && (
            <div className="p-3 rounded-xl bg-white/90 border border-orange-200/70 text-xs sm:text-sm text-stone-700 flex items-start gap-2.5 mb-2">
              <span className="text-2xl leading-none font-bold text-[#c23f25] flex-shrink-0">
                {result.intonation.symbol}
              </span>
              <div>
                <p className="font-bold text-stone-900">
                  Ngữ điệu: {result.intonation.direction === 'rising' ? 'Lên giọng ở cuối câu ↗ (Rising)' : 'Xuống giọng ở cuối câu ↘ (Falling)'}
                </p>
                <p className="text-stone-600 mt-0.5 leading-relaxed">
                  {result.intonation.rule}
                </p>
              </div>
            </div>
          )}

          <p className="text-xs text-stone-500 font-normal">
            💡 <span className="font-semibold text-stone-700">Quy tắc đọc:</span> Chữ viết <span className="font-bold text-[#c23f25]">HOA</span> là âm mang trọng âm chính; loại bỏ phụ âm líu lưỡi rườm rà.
          </p>
        </div>

        {/* 📖 KHỐI 3 — NGHĨA TIẾNG VIỆT */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
              <BookOpen className="w-3.5 h-3.5" />
              <span>📖 Khối 3 — Nghĩa tiếng Việt</span>
            </div>

            {/* Giọng đọc tiếng Việt cho câu ý nghĩa */}
            <button
              type="button"
              onClick={() => onSpeak(result.fullVietnameseMeaning, speechSpeed, 'vi')}
              title="Nghe phát âm chuẩn tiếng Việt của câu ý nghĩa"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80 shadow-2xs cursor-pointer active:scale-95 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Nghe tiếng Việt</span>
            </button>
          </div>

          {/* Câu ý nghĩa kèm icon copy nguyên câu nằm ngay sau câu */}
          <div className="pt-1">
            <span className="text-base sm:text-lg font-semibold text-stone-800 leading-relaxed mr-2">
              {result.fullVietnameseMeaning}
            </span>

            {/* Icon copy nằm ngay sau câu */}
            <button
              type="button"
              onClick={() => handleCopyMeaning(result.fullVietnameseMeaning)}
              title="Sao chép câu ý nghĩa tiếng Việt"
              className="inline-flex items-center justify-center p-1.5 rounded-lg bg-white hover:bg-emerald-100/70 text-emerald-800 border border-emerald-300 shadow-2xs cursor-pointer active:scale-95 transition-all align-middle"
              aria-label="Sao chép câu ý nghĩa tiếng Việt"
            >
              {copiedMeaning ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4 text-emerald-700 hover:text-emerald-900" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ⚡ KHỐI 4 — CHIA THEO CỤM TỪ NGẮN (THOUGHT GROUPS - NGẮT ĐÚNG NHỊP CÂU) */}
      <section className="bg-white rounded-[2rem] border border-stone-200/80 shadow-lg shadow-stone-900/5 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#c23f25]" />
              <span>⚡ Khối 4 — Chia theo cụm từ ngắn (Thought groups - Ngắt đúng nhịp câu)</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Chia câu thành các cụm 2–4 từ theo nhịp thở tự nhiên, kèm chữ Việt, ký hiệu IPA/Pinyin, nghĩa cụm từ, mẹo nối âm / biến điệu và nút Loa riêng.
            </p>
          </div>
        </div>

        {/* Chunks List */}
        <div className="space-y-4">
          {result.chunks && result.chunks.length > 0 ? (
            result.chunks.map((chunk, idx) => (
              <div
                key={idx}
                className="group p-4 sm:p-5 rounded-2xl bg-stone-50/80 hover:bg-stone-50 border border-stone-200/80 transition-all hover:border-orange-300 hover:shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1 min-w-0">
                    {/* Original + IPA/Pinyin + Dạng từ badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base sm:text-lg font-bold text-stone-900">
                        {chunk.original}
                      </span>
                      <span className="text-xs font-mono text-stone-600 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                        {chunk.ipaOrPinyin}
                      </span>
                      {chunk.partOfSpeech && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                          {chunk.partOfSpeech}
                        </span>
                      )}
                    </div>

                    {/* Vietnamese Phonetics of Chunk */}
                    <div className="flex items-center gap-2">
                      <CornerDownRight className="w-3.5 h-3.5 text-[#c23f25] flex-shrink-0" />
                      <span className="text-base sm:text-lg font-bold text-[#c23f25] tracking-wide">
                        {chunk.phoneticsVi}
                      </span>
                    </div>

                    {/* Meaning of this chunk */}
                    <p className="text-xs sm:text-sm text-stone-800 font-semibold pl-5">
                      <span className="font-normal text-stone-500">Nghĩa cụm từ:</span> {chunk.meaningVi}
                    </p>

                    {/* Giải thích chi tiết */}
                    {chunk.detailedExplanation && (
                      <div className="ml-5 p-2.5 sm:p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs sm:text-sm text-blue-950 leading-relaxed">
                        <div className="flex items-start gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-700 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-blue-900">Giải thích chi tiết: </span>
                            <span>{chunk.detailedExplanation}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stress & Liaison Tip */}
                    {chunk.stressAndLiaisonTip && (
                      <div className="ml-5 p-2 rounded-lg bg-amber-50/90 border border-amber-200/60 text-xs text-amber-950 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
                        <span>{chunk.stressAndLiaisonTip}</span>
                      </div>
                    )}
                  </div>

                  {/* Play Chunk Audio Button */}
                  <button
                    type="button"
                    onClick={() => handlePlayChunk(chunk.original, idx)}
                    title={`Nghe phát âm cụm từ: "${chunk.original}"`}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex-shrink-0 active:scale-95 ${
                      playingChunkIndex === idx
                        ? 'bg-[#c23f25] text-white border-[#c23f25] shadow-xs'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200 shadow-2xs'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${playingChunkIndex === idx ? 'animate-bounce' : ''}`} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-stone-500 text-center py-4">Chưa có thông tin cụm từ</p>
          )}
        </div>
      </section>

      {/* 🔍 KHỐI 5 — PHÂN TÍCH CHI TIẾT TỪNG TỪ & TỪ LOẠI VỚI ĐẦY ĐỦ NGHĨA */}
      <section className="bg-white rounded-[2rem] border border-stone-200/80 shadow-lg shadow-stone-900/5 p-6 sm:p-8">
        <div className="mb-5">
          <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#c23f25] flex-shrink-0" />
            <span>🔍 Khối 5 — Phân tích chi tiết từng từ & Từ loại với đầy đủ nghĩa</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Bóc tách từng từ vựng, từ loại tiếng Việt, phiên âm dễ đọc, toàn bộ nghĩa phổ biến và loa phát âm riêng từng từ.
          </p>
        </div>

        {/* Word cards list matching reference design */}
        <div className="space-y-3.5">
          {wordList.map((item, idx) => {
            const isHighlighted = playingWordIndex === idx || (playingWordIndex === null && idx === 0);
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border bg-white transition-all hover:border-amber-400/90 hover:shadow-xs ${
                  isHighlighted
                    ? 'border-amber-400/90 shadow-2xs'
                    : 'border-stone-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left: Word + IPA/Pinyin + Part of Speech + Phonetics + Full Meaning + Usage Note */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-stone-900 font-sans">
                        {item.word}
                      </span>

                      {item.ipaOrPinyin && (
                        <span className="text-xs font-mono text-stone-600 bg-stone-50 px-2.5 py-0.5 rounded-lg border border-stone-200/80">
                          {item.ipaOrPinyin}
                        </span>
                      )}

                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200/70">
                        {item.partOfSpeech}
                      </span>

                      <span className="text-sm sm:text-base font-bold px-3 py-0.5 rounded-lg bg-orange-50 text-[#c23f25] border border-orange-200/80 tracking-wide font-sans">
                        {item.phoneticsVi}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      <span className="text-stone-500">Nghĩa đầy đủ: </span>
                      <span className="font-bold text-stone-800">{item.meaningVi}</span>
                    </p>

                    {item.usageNote && (
                      <p className="text-xs text-stone-500 leading-relaxed">
                        {item.usageNote}
                      </p>
                    )}
                  </div>

                  {/* Right: Loa phát âm riêng từng từ */}
                  <button
                    type="button"
                    onClick={() => handlePlayWord(item.word, idx)}
                    title={`Nghe phát âm riêng từ: "${item.word}"`}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 flex-shrink-0 ${
                      playingWordIndex === idx
                        ? 'bg-[#c23f25] text-white border-[#c23f25] shadow-xs'
                        : 'bg-white hover:bg-orange-50 text-[#c23f25] border-stone-200/80 shadow-2xs'
                    }`}
                    aria-label={`Nghe phát âm riêng từ ${item.word}`}
                  >
                    <Volume2 className={`w-4 h-4 ${playingWordIndex === idx ? 'animate-bounce' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MẸO ĐỌC & LƯU Ý PHÁT ÂM CHO CÂU NÀY */}
      {result.pronunciationTips && result.pronunciationTips.length > 0 && (
        <section className="bg-white rounded-[2rem] border border-stone-200/80 shadow-md shadow-stone-900/5 p-6 sm:p-7">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#c23f25]" />
            <span>Mẹo đọc & Lưu ý phát âm cho câu này</span>
          </h3>
          <ul className="space-y-2">
            {result.pronunciationTips.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c23f25] mt-2 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

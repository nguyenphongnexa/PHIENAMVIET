import React, { useRef, useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Loader2, Sparkles, Copy, Check } from 'lucide-react';
import { SupportedLanguage, getLanguageConfig } from '../utils/speech';

interface TranscriberInputCardProps {
  language: SupportedLanguage;
  text: string;
  isExample: boolean;
  onTextChange: (newText: string, isExample: boolean) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onSpeak: (text: string, speed: number) => void;
  isPlayingAudio: boolean;
  onToggleRecord: () => void;
  isRecording: boolean;
  speechSpeed: number;
  onSpeedChange: (speed: number) => void;
  micLanguage: 'vi' | 'target';
  onMicLanguageChange: (lang: 'vi' | 'target') => void;
  onClear?: () => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5];

export const TranscriberInputCard: React.FC<TranscriberInputCardProps> = ({
  language,
  text,
  isExample,
  onTextChange,
  onSubmit,
  isLoading,
  onSpeak,
  isPlayingAudio,
  onToggleRecord,
  isRecording,
  speechSpeed,
  onSpeedChange,
  micLanguage,
  onMicLanguageChange,
  onClear,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [copiedInput, setCopiedInput] = useState(false);
  const prevRecordingRef = useRef(isRecording);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(100, textareaRef.current.scrollHeight)}px`;
    }
  }, [text]);

  // Focus textarea when voice recording stops so pressing Enter works immediately
  useEffect(() => {
    if (prevRecordingRef.current && !isRecording && text.trim()) {
      textareaRef.current?.focus();
    }
    prevRecordingRef.current = isRecording;
  }, [isRecording, text]);

  const handleFocus = () => {
    // As requested: "Mặc định khi đưa trỏ vào để nhập chữ, chữ làm ví dụ sẽ tự động được xóa"
    if (isExample) {
      onTextChange('', false);
      setHasInteracted(true);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onTextChange('', false);
    }
    setHasInteracted(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleCopyInput = async () => {
    if (!text.trim()) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    } catch {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // As requested: "khi chọn enter sẽ tự động thực hiện chức năng" (Shift+Enter for newline)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  const handleSpeakCurrent = () => {
    if (text.trim()) {
      onSpeak(text.trim(), speechSpeed);
    }
  };

  const langConfig = getLanguageConfig(language);
  const targetLangName = langConfig.name;
  const targetShortName = langConfig.badge;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-6">
      {/* Main Card Container */}
      <div className="bg-white rounded-[2rem] border border-stone-200/80 shadow-xl shadow-stone-900/5 p-5 sm:p-7 relative transition-all">
        {/* Action icons stack at top right: Quick Clear (X) and Copy */}
        {(text.length > 0 || isRecording) && (
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex flex-col items-center gap-2 z-10">
            {/* 1. Icon Xóa nhanh (X) */}
            <button
              type="button"
              onClick={handleClear}
              title="Xóa sạch văn bản và bộ đệm giọng nói đang ghi"
              aria-label="Xóa nhanh"
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs border border-stone-200/50"
            >
              <X className="w-4 h-4" />
            </button>

            {/* 2. Icon Copy ngay bên dưới icon Xóa nhanh (X) với phản hồi tức thì */}
            {text.length > 0 && (
              <div className="relative">
                {copiedInput && (
                  <span className="absolute right-11 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg bg-emerald-700 text-white text-[11px] font-semibold shadow-md animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
                    Đã sao chép!
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleCopyInput}
                  title="Sao chép văn bản đã nhập"
                  aria-label="Sao chép văn bản"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs border ${
                    copiedInput
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 ring-2 ring-emerald-500/20'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 border-stone-200/50'
                  }`}
                >
                  {copiedInput ? (
                    <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in duration-150" />
                  ) : (
                    <Copy className="w-4 h-4 text-stone-500 hover:text-stone-700" />
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Text Input Area */}
        <div className="relative pr-12 sm:pr-14">
          <textarea
            ref={textareaRef}
            rows={3}
            value={text}
            onFocus={handleFocus}
            onChange={(e) => {
              onTextChange(e.target.value, false);
              setHasInteracted(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={`Nhập tiếng Việt hoặc ${targetLangName} (ví dụ: Xin chào / ${langConfig.sampleText})...`}
            className={`w-full resize-none border-none outline-none text-xl sm:text-2xl leading-relaxed text-stone-800 placeholder:text-stone-300 bg-transparent ${
              isExample ? 'italic text-stone-600' : 'font-medium'
            }`}
          />
        </div>

        {/* Dynamic translation note */}
        <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-1 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
          <span>Gõ tiếng Việt sẽ tự động dịch sang chuẩn {targetLangName}</span>
        </div>

        {/* Divider line matching 001.jpg */}
        <hr className="border-stone-100 my-4" />

        {/* Audio tools bar: Mic button, Mic language selector, and Speaker */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5">
          <div className="flex items-center gap-2">
            {/* Microphone button */}
            <button
              type="button"
              onClick={onToggleRecord}
              title={
                isRecording
                  ? 'Dừng thu âm'
                  : `Nói ${micLanguage === 'vi' ? 'Tiếng Việt' : targetLangName}`
              }
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isRecording
                  ? 'bg-red-500 text-white animate-mic-active shadow-md shadow-red-500/30'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 active:scale-95 shadow-2xs border border-stone-200/60'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Quick Mic Language Toggle */}
            <div className="bg-stone-100 p-0.5 rounded-xl flex items-center text-[11px] font-semibold text-stone-600 border border-stone-200/50">
              <button
                type="button"
                onClick={() => onMicLanguageChange('vi')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  micLanguage === 'vi' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Thu âm bằng tiếng Việt để tự động dịch"
              >
                Nói: Việt
              </button>
              <button
                type="button"
                onClick={() => onMicLanguageChange('target')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  micLanguage === 'target' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-800'
                }`}
                title={`Thu âm bằng ${targetLangName}`}
              >
                Nói: {targetShortName}
              </button>
            </div>
          </div>

          {/* Speaker button */}
          <button
            type="button"
            onClick={handleSpeakCurrent}
            disabled={!text.trim() || isPlayingAudio}
            title="Nghe phát âm chuẩn cả câu"
            className={`h-10 px-3.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-100 text-[#c23f25] ring-2 ring-[#c23f25]/30'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 active:scale-95 shadow-2xs border border-stone-200/60'
            } ${!text.trim() ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-[#c23f25]' : ''}`} />
            <span>Nghe câu</span>
          </button>
        </div>

        {/* Khung bộ chọn tốc độ có chiều ngang cân đối và bằng với khung phiên âm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Khung bộ chọn tốc độ (50% trên máy tính, 100% trên điện thoại, chia đều 5 mức) */}
          <div className="h-12 bg-stone-100/90 border border-stone-200/80 rounded-2xl p-1 shadow-2xs flex items-center gap-1">
            <span className="text-[11px] font-bold text-stone-500 pl-2 hidden xs:inline flex-shrink-0">
              Tốc độ:
            </span>
            <div className="grid grid-cols-5 gap-1 flex-1 h-full items-center">
              {SPEED_OPTIONS.map((speed) => {
                const isActive = speechSpeed === speed;
                return (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => onSpeedChange(speed)}
                    className={`h-full rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-[#c23f25] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
                    }`}
                    title={`Tốc độ đọc ${speed}x`}
                  >
                    {speed}x
                  </button>
                );
              })}
            </div>
          </div>

          {/* Khung nút phiên âm (Chiều ngang cân đối và bằng với khung bộ chọn tốc độ) */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={!text.trim() || isLoading}
            className={`h-12 rounded-2xl font-bold text-white bg-[#c23f25] hover:bg-[#b0361e] active:scale-98 transition-all shadow-md shadow-orange-950/15 flex items-center justify-center gap-2 cursor-pointer w-full ${
              !text.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Đang phân tích...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Phiên âm</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Enter hint matching 001.jpg */}
      <p className="text-center text-xs sm:text-sm text-stone-500 mt-3 font-normal">
        Nhấn <span className="font-medium text-stone-700">Enter</span> để phiên âm ·{' '}
        <span className="font-medium text-stone-700">Shift+Enter</span> xuống dòng
      </p>
    </div>
  );
};

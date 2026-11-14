/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { Header } from './components/Header';
import { LanguageSelector } from './components/LanguageSelector';
import { TranscriberInputCard } from './components/TranscriberInputCard';
import { TranscriptionResultView } from './components/TranscriptionResultView';
import { DailyPracticeSection } from './components/DailyPracticeSection';
import { PronunciationTipsSection } from './components/PronunciationTipsSection';
import {
  SupportedLanguage,
  playSpeechAudio,
  stopCurrentAudio,
  createSpeechRecognizer,
  getLanguageConfig,
} from './utils/speech';
import {
  TranscriptionResult,
  generateLocalFallback,
} from './utils/transliterate';
import { PracticeItem } from './data/pronunciationRules';

const DEFAULT_ENGLISH_EXAMPLE = 'Hello, how are you today?';
const DEFAULT_CHINESE_EXAMPLE = '你好，你今天过得怎么样？';

export default function App() {
  const [activeTab, setActiveTab] = useState<'transcribe' | 'practice' | 'tips'>('transcribe');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [text, setText] = useState<string>(DEFAULT_ENGLISH_EXAMPLE);
  const [isExample, setIsExample] = useState<boolean>(true);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognizerRef = useRef<any>(null);
  const transcribeSessionIdRef = useRef<number>(0);

  // Perform transcription analysis
  const handleTranscribe = useCallback(
    async (textToTranscribe?: string, langToUse?: SupportedLanguage) => {
      const targetText = (textToTranscribe ?? text).trim();
      const targetLang = langToUse ?? language;

      if (!targetText) return;

      // 1. Loại bỏ HOÀN TOÀN kết quả cũ ngay lập tức, ví dụ cũ & dừng âm thanh cũ
      setResult(null);
      stopCurrentAudio();
      setIsPlayingAudio(false);
      setErrorMessage(null);
      setIsLoading(true);
      setIsExample(false);

      const sessionId = ++transcribeSessionIdRef.current;

      try {
        const response = await fetch('/api/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: targetText,
            language: targetLang,
          }),
        });

        if (!response.ok) {
          throw new Error('Không thể phân tích ngữ âm bằng máy chủ');
        }

        const data: TranscriptionResult = await response.json();
        // Cập nhật kết quả phiên âm mới đầy đủ nhất ngay lập tức
        if (transcribeSessionIdRef.current === sessionId) {
          setResult(data);
        }
      } catch (err: any) {
        console.warn('Backend transcribe fallback active:', err);
        if (transcribeSessionIdRef.current === sessionId) {
          const fallbackResult = generateLocalFallback(targetText, targetLang);
          setResult(fallbackResult);
        }
      } finally {
        if (transcribeSessionIdRef.current === sessionId) {
          setIsLoading(false);
        }
      }
    },
    [text, language]
  );

  // When language changes: update placeholder/example text
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    if (newLang === language) return;
    setLanguage(newLang);
    const langConfig = getLanguageConfig(newLang);
    const newExample = langConfig.sampleText || DEFAULT_ENGLISH_EXAMPLE;
    setText(newExample);
    setIsExample(true);
    setErrorMessage(null);
    setResult(null);
    stopCurrentAudio();
    setIsPlayingAudio(false);
  };

  const [micLanguage, setMicLanguage] = useState<'vi' | 'target'>('vi');

  // Audio speech player
  const handleSpeak = (textToSpeak: string, speed: number, customLang?: SupportedLanguage) => {
    setIsPlayingAudio(true);
    playSpeechAudio(
      textToSpeak,
      customLang || language,
      speed,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  // Toggle voice recording (Speech-to-Text)
  const handleToggleRecord = () => {
    if (isRecording) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    // Stop current audio if playing (giữ nguyên kết quả phiên âm trên màn hình khi nói)
    stopCurrentAudio();
    setIsPlayingAudio(false);

    const speechLangToUse = micLanguage === 'vi' ? 'vi' : language;
    let recordedTranscript = '';

    const recognizer = createSpeechRecognizer(
      speechLangToUse,
      (transcript) => {
        recordedTranscript = transcript;
        setText(transcript);
        setIsExample(false);
        // Khi nói: kết quả phiên âm KHÔNG biến mất cho đến khi bấm nút phiên âm hoặc nhấn Enter
      },
      (error) => {
        setErrorMessage(error);
        setIsRecording(false);
      },
      () => {
        // Kết thúc nói vào mic: KHÔNG tự động phiên âm
        // Phiên âm chỉ thực hiện khi bấm nút phiên âm hoặc phím enter
        setIsRecording(false);
      }
    );

    if (!recognizer) {
      setErrorMessage(
        'Trình duyệt của bạn chưa hỗ trợ nhận dạng giọng nói trực tiếp qua micro. Bạn có thể gõ văn bản.'
      );
      return;
    }

    try {
      recognizer.start();
      recognizerRef.current = recognizer;
      setIsRecording(true);
      setErrorMessage(null);
    } catch (err) {
      console.error(err);
      setIsRecording(false);
    }
  };

  // Clear input text AND active voice recognition buffer completely
  const handleClearInput = useCallback(() => {
    if (recognizerRef.current?.clearBuffer) {
      recognizerRef.current.clearBuffer();
    }
    if (!isRecording) {
      recognizerRef.current = null;
    }
    setText('');
    setIsExample(false);
    setResult(null);
    setErrorMessage(null);
    stopCurrentAudio();
    setIsPlayingAudio(false);
  }, [isRecording]);

  // Select practice item from daily practice list
  const handleSelectPractice = (item: PracticeItem) => {
    setResult(null); // Loại bỏ kết quả cũ ngay lập tức
    stopCurrentAudio();
    setIsPlayingAudio(false);
    setLanguage(item.language);
    setText(item.original);
    setIsExample(false);
    setActiveTab('transcribe');
    handleTranscribe(item.original, item.language);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/70 via-[#faf6f0] to-[#f5efe6] text-stone-800 antialiased selection:bg-amber-200 selection:text-amber-900 pb-12">
      {/* Background soft ambient radial light */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-orange-200/40 via-amber-100/20 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab 1: Phiên âm trực tiếp (Transcriber) */}
        {activeTab === 'transcribe' && (
          <main className="flex-1 w-full flex flex-col items-center">
            {/* Language Switcher buttons matching 001.jpg */}
            <LanguageSelector
              language={language}
              onChange={handleLanguageChange}
              disabled={isLoading || isRecording}
            />

            {/* Error banner if any */}
            {errorMessage && (
              <div className="w-full max-w-2xl px-4 mb-4">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm flex items-center justify-between">
                  <span>{errorMessage}</span>
                  <button
                    onClick={() => setErrorMessage(null)}
                    className="text-amber-600 hover:text-amber-900 font-bold ml-2 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Main Input Card matching 001.jpg */}
            <TranscriberInputCard
              language={language}
              text={text}
              isExample={isExample}
              onTextChange={(newText, isEx) => {
                setText(newText);
                setIsExample(isEx);
                // Loại bỏ HOÀN TOÀN kết quả cũ ngay khi thay đổi văn bản
                setResult(null);
                stopCurrentAudio();
                setIsPlayingAudio(false);
              }}
              onSubmit={() => handleTranscribe()}
              isLoading={isLoading}
              onSpeak={handleSpeak}
              isPlayingAudio={isPlayingAudio}
              onToggleRecord={handleToggleRecord}
              isRecording={isRecording}
              speechSpeed={speechSpeed}
              onSpeedChange={setSpeechSpeed}
              micLanguage={micLanguage}
              onMicLanguageChange={setMicLanguage}
              onClear={handleClearInput}
            />

            {/* Loading state: Vòng tròn loading rõ ràng khi đang phiên âm */}
            {isLoading && (
              <div className="w-full max-w-2xl mx-auto px-4 py-8 mb-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="bg-white rounded-[2rem] border border-orange-200/90 shadow-xl shadow-stone-900/5 p-8 sm:p-10 flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
                  {/* Subtle warm glow background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none" />

                  {/* Vòng tròn loading xoay tròn nổi bật */}
                  <div className="relative flex items-center justify-center">
                    {/* Vòng tròn nền */}
                    <div className="w-16 h-16 rounded-full border-4 border-stone-200/80" />
                    {/* Vòng tròn loading xoay chính */}
                    <div className="absolute w-16 h-16 rounded-full border-4 border-transparent border-t-[#c23f25] border-r-[#c23f25] animate-spin" />
                    {/* Chấm tròn nhịp tim ở giữa */}
                    <div className="absolute w-3 h-3 rounded-full bg-[#c23f25] animate-ping opacity-75" />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-[#c23f25]" />
                  </div>

                  <div className="space-y-1 relative z-10">
                    <h3 className="text-lg font-bold text-stone-900">
                      Đang xử lý phiên âm chuẩn...
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                      Đã loại bỏ kết quả cũ. Đang ngắt cụm chuẩn nhịp câu, giải thích từ loại và tạo cách đọc chữ Việt theo chuẩn <span className="font-semibold text-stone-700">{getLanguageConfig(language).name}</span>.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-xs font-semibold text-[#c23f25]">
                    <span className="w-2 h-2 rounded-full bg-[#c23f25] animate-pulse" />
                    <span>Đang nhận diện ngữ âm & phân loại từ vựng...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Transcription Result Card */}
            {result && (
              <TranscriptionResultView
                key={`${result.originalText}-${result.language}-${transcribeSessionIdRef.current}`}
                result={result}
                language={language}
                onSpeak={handleSpeak}
                speechSpeed={speechSpeed}
                isPlayingAudio={isPlayingAudio}
              />
            )}
          </main>
        )}

        {/* Tab 2: Luyện ngữ điệu */}
        {activeTab === 'practice' && (
          <main className="flex-1 w-full">
            <DailyPracticeSection
              currentLanguage={language}
              onLanguageChange={handleLanguageChange}
              onSelectPractice={handleSelectPractice}
              onSpeak={handleSpeak}
              speechSpeed={speechSpeed}
            />
          </main>
        )}

        {/* Tab 3: Mẹo phát âm (Pronunciation Tips) */}
        {activeTab === 'tips' && (
          <main className="flex-1 w-full">
            <PronunciationTipsSection
              currentLanguage={language}
              onLanguageChange={handleLanguageChange}
              onSpeak={handleSpeak}
              speechSpeed={speechSpeed}
            />
          </main>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-stone-400 py-6">
          <p>© {new Date().getFullYear()} NGUYỄN PHONG · Học phát âm chuẩn xác, thông minh & tự nhiên</p>
        </footer>
      </div>
    </div>
  );
}

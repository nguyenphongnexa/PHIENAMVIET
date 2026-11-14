// Speech Synthesis & Recognition Utilities

export type SupportedLanguage =
  | 'en'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'fr'
  | 'de'
  | 'es'
  | 'ru'
  | 'th'
  | 'it'
  | 'pt'
  | 'ar'
  | 'hi'
  | 'id'
  | string;

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  badge: string;
  flag: string;
  speechCode: string;
  sampleText: string;
}

// Full registry of supported languages
// Note: In the other languages dropdown, 'zh' (Tiếng Trung) is positioned at the very top.
export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'Tiếng Anh',
    nativeName: 'English',
    badge: 'EN',
    flag: '🇬🇧',
    speechCode: 'en-US',
    sampleText: 'Hello, how are you today?',
  },
  {
    code: 'zh',
    name: 'Tiếng Trung',
    nativeName: '中文 (Mandarin)',
    badge: '中',
    flag: '🇨🇳',
    speechCode: 'zh-CN',
    sampleText: '你好，你今天过得怎么样？',
  },
  {
    code: 'ja',
    name: 'Tiếng Nhật',
    nativeName: '日本語',
    badge: '日',
    flag: '🇯🇵',
    speechCode: 'ja-JP',
    sampleText: 'こんにちは、今日はいかがですか？',
  },
  {
    code: 'ko',
    name: 'Tiếng Hàn',
    nativeName: '한국어',
    badge: '한',
    flag: '🇰🇷',
    speechCode: 'ko-KR',
    sampleText: '안녕하세요, 오늘 어떠세요?',
  },
  {
    code: 'fr',
    name: 'Tiếng Pháp',
    nativeName: 'Français',
    badge: 'FR',
    flag: '🇫🇷',
    speechCode: 'fr-FR',
    sampleText: 'Bonjour, comment allez-vous aujourd’hui ?',
  },
  {
    code: 'de',
    name: 'Tiếng Đức',
    nativeName: 'Deutsch',
    badge: 'DE',
    flag: '🇩🇪',
    speechCode: 'de-DE',
    sampleText: 'Guten Tag, wie geht es Ihnen heute?',
  },
  {
    code: 'es',
    name: 'Tiếng Tây Ban Nha',
    nativeName: 'Español',
    badge: 'ES',
    flag: '🇪🇸',
    speechCode: 'es-ES',
    sampleText: 'Hola, ¿cómo estás hoy?',
  },
  {
    code: 'ru',
    name: 'Tiếng Nga',
    nativeName: 'Русский',
    badge: 'RU',
    flag: '🇷🇺',
    speechCode: 'ru-RU',
    sampleText: 'Здравствуйте, как ваши дела сегодня?',
  },
  {
    code: 'th',
    name: 'Tiếng Thái',
    nativeName: 'ไทย',
    badge: 'TH',
    flag: '🇹🇭',
    speechCode: 'th-TH',
    sampleText: 'สวัสดี วันนี้คุณเป็นอย่างไรบ้าง?',
  },
  {
    code: 'it',
    name: 'Tiếng Ý',
    nativeName: 'Italiano',
    badge: 'IT',
    flag: '🇮🇹',
    speechCode: 'it-IT',
    sampleText: 'Ciao, come stai oggi?',
  },
  {
    code: 'pt',
    name: 'Tiếng Bồ Đào Nha',
    nativeName: 'Português',
    badge: 'PT',
    flag: '🇵🇹',
    speechCode: 'pt-PT',
    sampleText: 'Olá, como você está hoje?',
  },
  {
    code: 'ar',
    name: 'Tiếng Ả Rập',
    nativeName: 'العربية',
    badge: 'AR',
    flag: '🇸🇦',
    speechCode: 'ar-SA',
    sampleText: 'مرحبًا، كيف حالك اليوم؟',
  },
  {
    code: 'hi',
    name: 'Tiếng Hindi',
    nativeName: 'हिन्दी',
    badge: 'HI',
    flag: '🇮🇳',
    speechCode: 'hi-IN',
    sampleText: 'नमस्ते, आज आप कैसे हैं?',
  },
  {
    code: 'id',
    name: 'Tiếng Indonesia',
    nativeName: 'Bahasa Indonesia',
    badge: 'ID',
    flag: '🇮🇩',
    speechCode: 'id-ID',
    sampleText: 'Halo, bagaimana kabar Anda hari ini?',
  },
  {
    code: 'km',
    name: 'Tiếng Cam (Khmer)',
    nativeName: 'ភាសាខ្មែរ (Khmer)',
    badge: 'KH',
    flag: '🇰🇭',
    speechCode: 'km-KH',
    sampleText: 'សួស្តី តើអ្នកសុខសប្បាយជាទេ?',
  },
  {
    code: 'lo',
    name: 'Tiếng Lào',
    nativeName: 'ພາສາລາວ (Lao)',
    badge: 'LA',
    flag: '🇱🇦',
    speechCode: 'lo-LA',
    sampleText: 'ສະບາຍດີ ເຈົ້າສະບາຍດີບໍ່?',
  },
  {
    code: 'ms',
    name: 'Tiếng Malaysia',
    nativeName: 'Bahasa Melayu',
    badge: 'MY',
    flag: '🇲🇾',
    speechCode: 'ms-MY',
    sampleText: 'Apa khabar hari ini?',
  },
  {
    code: 'tl',
    name: 'Tiếng Philippines (Tagalog)',
    nativeName: 'Tagalog',
    badge: 'PH',
    flag: '🇵🇭',
    speechCode: 'fil-PH',
    sampleText: 'Kumusta ka ngayon?',
  },
  {
    code: 'my',
    name: 'Tiếng Myanmar',
    nativeName: 'မြန်မာဘာသာ',
    badge: 'MM',
    flag: '🇲🇲',
    speechCode: 'my-MM',
    sampleText: 'မင်္ဂလာပါ နေကောင်းလား?',
  },
];

// Helper to look up language option
export function getLanguageConfig(code: string): LanguageOption {
  const found = SUPPORTED_LANGUAGES.find((l) => l.code === code);
  if (found) return found;
  return {
    code,
    name: code.toUpperCase(),
    nativeName: code,
    badge: code.slice(0, 2).toUpperCase(),
    flag: '🌐',
    speechCode: code,
    sampleText: '',
  };
}

export function getLanguageName(code: string): string {
  return getLanguageConfig(code).name;
}

// BCP-47 tag mapping for browser Web Speech API
const BCP47_TAGS: Record<string, string> = {
  vi: 'vi-VN',
  en: 'en-US',
  zh: 'zh-CN',
  km: 'km-KH',
  lo: 'lo-LA',
  ja: 'ja-JP',
  ko: 'ko-KR',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  ru: 'ru-RU',
  th: 'th-TH',
  it: 'it-IT',
  pt: 'pt-PT',
  ar: 'ar-SA',
  hi: 'hi-IN',
  id: 'id-ID',
  ms: 'ms-MY',
  tl: 'fil-PH',
  my: 'my-MM',
};

// Play speech via Web Speech API with fallback
export function speakWebSpeech(
  text: string,
  lang: string,
  rate: number = 1.0,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): () => void {
  if (!('speechSynthesis' in window)) {
    onError?.(new Error('Trình duyệt không hỗ trợ tổng hợp giọng nói'));
    return () => {};
  }

  // Resume paused synthesis in Chromium
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
  window.speechSynthesis.cancel();

  const bcp47 = BCP47_TAGS[lang] || lang || 'en-US';
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = bcp47;
  utterance.rate = Math.max(0.5, Math.min(2.0, rate));
  utterance.pitch = 1.0;

  // Find best native voice matching target language prefix
  const voices = window.speechSynthesis.getVoices();
  const targetPrefix = bcp47.split('-')[0].toLowerCase();
  const matchedVoice =
    voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(targetPrefix) &&
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Siri') ||
          v.name.includes('Microsoft') ||
          v.name.includes('Apple'))
    ) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(targetPrefix));

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    onStart?.();
  };

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = (e) => {
    if (e.error !== 'canceled' && e.error !== 'interrupted') {
      onError?.(e);
    }
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
}

// Play audio from base64 WAV/MP3 string or stream
let currentAudioElement: HTMLAudioElement | null = null;

export function stopCurrentAudio() {
  if (currentAudioElement) {
    currentAudioElement.pause();
    currentAudioElement.currentTime = 0;
    currentAudioElement = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Try direct audio stream URL
function tryDirectAudioStream(
  text: string,
  lang: string,
  rate: number,
  onStart?: () => void,
  onEnd?: () => void
): Promise<boolean> {
  return new Promise((resolve) => {
    const url = `/api/tts/audio?text=${encodeURIComponent(text.slice(0, 250))}&language=${encodeURIComponent(lang)}`;
    const audio = new Audio(url);
    currentAudioElement = audio;
    audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));

    audio.onplaying = () => {
      onStart?.();
      resolve(true);
    };

    audio.onended = () => {
      currentAudioElement = null;
      onEnd?.();
    };

    audio.onerror = () => {
      currentAudioElement = null;
      resolve(false);
    };

    audio.play().catch(() => {
      currentAudioElement = null;
      resolve(false);
    });
  });
}

// Robust multi-tiered speech player:
// 1. Server TTS (Gemini or Google Native Pronunciation with crystal clarity)
// 2. Direct streaming endpoint /api/tts/audio
// 3. Client Web Speech API with full language code support
export async function playSpeechAudio(
  text: string,
  lang: SupportedLanguage,
  rate: number = 1.0,
  onStart?: () => void,
  onEnd?: () => void
): Promise<void> {
  stopCurrentAudio();
  onStart?.();

  const cleanText = text.trim();
  if (!cleanText) {
    onEnd?.();
    return;
  }

  // Tier 1: Try server TTS endpoint (returns base64 audio with 100% native accent)
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText, language: lang }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.audioBase64) {
        const audioUrl = `data:${data.mimeType || 'audio/mpeg'};base64,${data.audioBase64}`;
        const audio = new Audio(audioUrl);
        currentAudioElement = audio;
        audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));

        audio.onended = () => {
          currentAudioElement = null;
          onEnd?.();
        };

        audio.onerror = async () => {
          currentAudioElement = null;
          // Fallback to Tier 2
          const streamed = await tryDirectAudioStream(cleanText, lang, rate, onStart, onEnd);
          if (!streamed) {
            speakWebSpeech(cleanText, lang, rate, undefined, onEnd, () => onEnd?.());
          }
        };

        await audio.play();
        return;
      }
    }
  } catch {
    // Continue to next tier
  }

  // Tier 2: Try direct audio stream from server
  const playedDirect = await tryDirectAudioStream(cleanText, lang, rate, onStart, onEnd);
  if (playedDirect) {
    return;
  }

  // Tier 3: Browser client Web Speech API
  speakWebSpeech(cleanText, lang, rate, undefined, onEnd, () => onEnd?.());
}

export type SpeechInputLanguage = 'vi' | SupportedLanguage;

// Browser Speech-to-Text Recognition Hook/Helper with continuous streaming
export function createSpeechRecognizer(
  lang: SpeechInputLanguage,
  onResult: (transcript: string) => void,
  onError: (error: string) => void,
  onEnd: () => void
) {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  // Bật chế độ lắng nghe liên tục (continuous streaming) giúp thu nhận trọn vẹn nguyên câu
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  const recognitionLang = lang === 'vi' ? 'vi-VN' : (BCP47_TAGS[lang] || lang || 'en-US');
  recognition.lang = recognitionLang;

  let isManualStopped = false;
  let isClearing = false;
  let accumulatedFinal = '';
  let restartTimer: ReturnType<typeof setTimeout> | null = null;

  recognition.onresult = (event: any) => {
    if (isClearing) {
      return;
    }
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const piece = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        accumulatedFinal += (accumulatedFinal ? ' ' : '') + piece.trim();
      } else {
        interimTranscript += piece;
      }
    }
    const combined = (accumulatedFinal + (interimTranscript ? ' ' + interimTranscript : '')).trim();
    if (combined) {
      onResult(combined);
    }
  };

  recognition.onerror = (event: any) => {
    // Trong continuous mode, no-speech xảy ra khi tạm nghỉ ngắn: không ngắt phiên thu âm
    if (event.error === 'no-speech' || event.error === 'aborted') {
      return;
    }
    let msg = 'Không thể thu âm';
    if (event.error === 'not-allowed') {
      msg = 'Vui lòng cho phép quyền truy cập micro trong trình duyệt';
    } else if (event.error === 'network') {
      msg = 'Lỗi kết nối mạng khi nhận dạng giọng nói';
    }
    onError(msg);
  };

  recognition.onend = () => {
    // Tự động kết nối lại nếu người dùng chưa chủ động bấm dừng (tránh tự ngắt giữa chừng khi nói xa)
    if (!isManualStopped) {
      const wasClearing = isClearing;
      isClearing = false;
      const attemptRestart = () => {
        if (isManualStopped) return;
        try {
          recognition.start();
        } catch {
          if (wasClearing) {
            restartTimer = setTimeout(() => {
              if (!isManualStopped) {
                try {
                  recognition.start();
                } catch {
                  // Ignored
                }
              }
            }, 80);
          }
        }
      };
      attemptRestart();
      return;
    }
    isClearing = false;
    onEnd();
  };

  return {
    start: () => {
      if (restartTimer) {
        clearTimeout(restartTimer);
        restartTimer = null;
      }
      isManualStopped = false;
      isClearing = false;
      accumulatedFinal = '';
      try {
        recognition.start();
      } catch (err) {
        console.warn('SpeechRecognition start notice:', err);
      }
    },
    clearBuffer: () => {
      accumulatedFinal = '';
      if (restartTimer) {
        clearTimeout(restartTimer);
        restartTimer = null;
      }
      if (!isManualStopped) {
        isClearing = true;
        try {
          recognition.abort();
        } catch {
          isClearing = false;
        }
      }
    },
    stop: () => {
      isManualStopped = true;
      isClearing = false;
      accumulatedFinal = '';
      if (restartTimer) {
        clearTimeout(restartTimer);
        restartTimer = null;
      }
      try {
        recognition.stop();
      } catch {
        // Ignored
      }
      onEnd();
    },
  };
}

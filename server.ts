import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini on server-side with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const LANGUAGE_META: Record<string, { name: string; nativeName: string; rule: string; speechCode: string }> = {
  zh: {
    name: 'Chinese (Mandarin / Tiếng Trung)',
    nativeName: '中文',
    rule: 'Phiên âm theo Pinyin chuẩn chữ Việt có dấu thanh điệu tự nhiên, ngắn gọn (ví dụ: 你好 -> Ní hảo, 谢谢 -> Xiê xiê, 这个多少钱 -> Chưa cờ tua sao chén?, 我想喝咖啡 -> Ủa xẻng hư kha phây).',
    speechCode: 'zh-CN',
  },
  en: {
    name: 'English (Tiếng Anh)',
    nativeName: 'English',
    rule: 'Dùng âm vần thuần Việt ngắn gọn, thanh thoát, dễ đọc (ví dụ: Hello -> Hê-lâu, coffee -> có-phi, today -> tu-đây, meet -> mít, thank you -> thenk kiu).',
    speechCode: 'en-US',
  },
  ja: {
    name: 'Japanese (Tiếng Nhật)',
    nativeName: '日本語',
    rule: 'Phiên âm theo Romaji chuẩn chữ Việt tự nhiên (ví dụ: こんにちは -> Kôn-ni-chi-oa, ありがとう -> A-ri-ga-tô, すみません -> Sư-mi-ma-sen, おいしい -> Ôi-si).',
    speechCode: 'ja-JP',
  },
  ko: {
    name: 'Korean (Tiếng Hàn)',
    nativeName: '한국어',
    rule: 'Phiên âm tiếng Hàn chuẩn chữ Việt tự nhiên (ví dụ: 안녕하세요 -> An-nhơng ha-sê-dô, 감사합니다 -> Cám-sa ham-ni-đà, 사랑해요 -> Sa-rang hê-dô).',
    speechCode: 'ko-KR',
  },
  fr: {
    name: 'French (Tiếng Pháp)',
    nativeName: 'Français',
    rule: 'Phiên âm tiếng Pháp chuẩn chữ Việt mềm mại, thanh thoát (ví dụ: Bonjour -> Bông-dua, Merci -> Méc-xi, S\'il vous plaît -> Xin vu phle).',
    speechCode: 'fr-FR',
  },
  de: {
    name: 'German (Tiếng Đức)',
    nativeName: 'Deutsch',
    rule: 'Phiên âm tiếng Đức chuẩn chữ Việt dứt khoát (ví dụ: Guten Tag -> Gu-từn thạc, Danke -> Đăng-kơ, Bitte -> Bít-tơ).',
    speechCode: 'de-DE',
  },
  es: {
    name: 'Spanish (Tiếng Tây Ban Nha)',
    nativeName: 'Español',
    rule: 'Phiên âm tiếng Tây Ban Nha chuẩn chữ Việt vui tươi (ví dụ: Hola -> Ô-la, Gracias -> Gơ-ra-xi-át, Por favor -> Pooc pha-vo).',
    speechCode: 'es-ES',
  },
  ru: {
    name: 'Russian (Tiếng Nga)',
    nativeName: 'Русский',
    rule: 'Phiên âm tiếng Nga chuẩn chữ Việt (ví dụ: Здравствуйте -> X-đơ-rát-s-vuýt-tye, Спасибо -> S-pa-xi-ba).',
    speechCode: 'ru-RU',
  },
  th: {
    name: 'Thai (Tiếng Thái)',
    nativeName: 'ไทย',
    rule: 'Phiên âm tiếng Thái chuẩn chữ Việt có thanh điệu (ví dụ: สวัสดี -> Xà-oắt-đi, ขอบคุณ -> Khọp-khun).',
    speechCode: 'th-TH',
  },
  it: {
    name: 'Italian (Tiếng Ý)',
    nativeName: 'Italiano',
    rule: 'Phiên âm tiếng Ý chuẩn chữ Việt (ví dụ: Ciao -> Chao, Grazie -> Gơ-ra-chê, Per favore -> Pe pha-vo-rê).',
    speechCode: 'it-IT',
  },
  pt: {
    name: 'Portuguese (Tiếng Bồ Đào Nha)',
    nativeName: 'Português',
    rule: 'Phiên âm tiếng Bồ Đào Nha chuẩn chữ Việt (ví dụ: Olá -> Ô-la, Obrigado -> Ô-bơ-ri-ga-đu).',
    speechCode: 'pt-PT',
  },
  ar: {
    name: 'Arabic (Tiếng Ả Rập)',
    nativeName: 'العربية',
    rule: 'Phiên âm tiếng Ả Rập chuẩn chữ Việt (ví dụ: مرحبًا -> Mác-ha-ban, شكرا -> Suốc-ran).',
    speechCode: 'ar-SA',
  },
  hi: {
    name: 'Hindi (Tiếng Hindi)',
    nativeName: 'हिन्दी',
    rule: 'Phiên âm tiếng Hindi chuẩn chữ Việt (ví dụ: नमस्ते -> Na-mát-s-tê, धन्यवाद -> Đan-da-vát).',
    speechCode: 'hi-IN',
  },
  id: {
    name: 'Indonesian (Tiếng Indonesia)',
    nativeName: 'Bahasa Indonesia',
    rule: 'Phiên âm tiếng Indonesia chuẩn chữ Việt (ví dụ: Halo -> Ha-lô, Terima kasih -> Tê-ri-ma ca-xih).',
    speechCode: 'id-ID',
  },
  km: {
    name: 'Khmer (Tiếng Cam / Campuchia)',
    nativeName: 'ភាសាខ្មែរ',
    rule: 'Phiên âm tiếng Khmer Campuchia sang chữ Việt siêu ngắn gọn, thanh thoát, dễ đọc (ví dụ: សួស្តី (Suostei) -> Xua-s-đây, អរគុណ (Orkun) -> Oóc-kun, ចាស/បាទ -> Chá/Bạt).',
    speechCode: 'km',
  },
  lo: {
    name: 'Lao (Tiếng Lào)',
    nativeName: 'ພາສາລາວ',
    rule: 'Phiên âm tiếng Lào sang chữ Việt tự nhiên, ngắn gọn (ví dụ: ສະບາຍດີ (Sabaidee) -> Xa-bai-đi, ຂອບໃຈ (Khop chai) -> Khọp-chay, ແມ່ນແລ້ວ -> Men-leo, ບໍ່ເປັນຫຍັງ -> Bo-pen-nhăng).',
    speechCode: 'lo',
  },
  ms: {
    name: 'Malay (Tiếng Malaysia)',
    nativeName: 'Bahasa Melayu',
    rule: 'Phiên âm tiếng Malaysia chuẩn chữ Việt (ví dụ: Selamat pagi -> Xê-la-mát pa-gi, Terima kasih -> Tê-ri-ma ca-xih).',
    speechCode: 'ms',
  },
  tl: {
    name: 'Filipino (Tiếng Philippines / Tagalog)',
    nativeName: 'Tagalog',
    rule: 'Phiên âm tiếng Tagalog chuẩn chữ Việt (ví dụ: Kumusta -> Ku-mút-ta, Salamat -> Sa-la-mát).',
    speechCode: 'tl',
  },
  my: {
    name: 'Burmese (Tiếng Myanmar)',
    nativeName: 'မြန်မာဘာသာ',
    rule: 'Phiên âm tiếng Myanmar sang chữ Việt (ví dụ: မင်္ဂလာပါ -> Min-ga-la-ba, ကျေးဇူးတင်ပါတယ် -> Chê-xu-tin-ba-đê).',
    speechCode: 'my',
  },
  vi: {
    name: 'Tiếng Việt',
    nativeName: 'Tiếng Việt',
    rule: 'Đọc bằng tiếng Việt chuẩn ngữ âm và dấu thanh tự nhiên.',
    speechCode: 'vi',
  },
};

// Online translator using instant Google Translate API
async function translateOnline(text: string, targetLang: string): Promise<{ translated: string; sourceLang: string }> {
  try {
    const speechCode = LANGUAGE_META[targetLang]?.speechCode?.split('-')[0] || targetLang;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(speechCode)}&dt=t&q=${encodeURIComponent(text.trim())}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (res.ok) {
      const data: any = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = data[0].map((item: any) => item[0]).join('').trim();
        const sourceLang = data[2] || 'auto';
        if (translated) {
          return { translated, sourceLang };
        }
      }
    }
  } catch (err) {
    console.warn('Translate error:', err);
  }
  return { translated: text, sourceLang: 'auto' };
}

// Memory cache for instant repeat and fast-path responses
const transcribeCache = new Map<string, { data: any; timestamp: number }>();

// Transcribe API
app.post('/api/transcribe', async (req, res) => {
  try {
    const { text, language } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Nội dung văn bản không hợp lệ' });
    }

    const targetLangKey = (language || 'en').toLowerCase();
    const cacheKey = `${targetLangKey}:${text.trim().toLowerCase()}`;

    // 1. Fast Cache check (response in <5ms)
    if (transcribeCache.has(cacheKey)) {
      const cached = transcribeCache.get(cacheKey)!;
      if (Date.now() - cached.timestamp < 3600000) {
        return res.json(cached.data);
      }
    }

    // 2. Fast Dictionary check for common phrases (response in <10ms)
    const cleanLower = text.trim().toLowerCase().replace(/[.,!?;:]/g, '');
    if (VI_TRANSLATION_MAP[cleanLower] && (targetLangKey === 'en' || targetLangKey === 'zh')) {
      const fastResult = generateServerFallback(text, targetLangKey);
      transcribeCache.set(cacheKey, { data: fastResult, timestamp: Date.now() });
      return res.json(fastResult);
    }

    const targetMeta = LANGUAGE_META[targetLangKey] || {
      name: `${language} (Tiếng ${language})`,
      nativeName: language,
      rule: `Phiên âm ${language} sang chữ Việt ngắn gọn, thanh thoát, dễ đọc nhất.`,
      speechCode: language,
    };
    const lang = targetMeta.name;

    // Detect if input is different from target language and obtain native translation
    let autoTranslatedTarget = text.trim();
    let isInputDifferent = false;

    if (targetLangKey !== 'vi') {
      const isVi = isVietnameseText(text);
      const transRes = await translateOnline(text, targetLangKey);
      if (transRes.translated && transRes.translated.trim()) {
        autoTranslatedTarget = transRes.translated.trim();
        isInputDifferent = isVi || (transRes.sourceLang !== targetLangKey && transRes.sourceLang !== 'auto');
      }
    }

    const prompt = `Bạn là chuyên gia ngôn ngữ học và luyện phát âm hàng đầu, chuyên dịch và phiên âm chuẩn xác sang ngôn ngữ mục tiêu ${lang} (${targetMeta.nativeName}), đồng thời phiên âm sang CHỮ VIẾT TIẾNG VIỆT SIÊU NGẮN GỌN, DỄ ĐỌC NHẤT cho người Việt Nam.

Ngôn ngữ mục tiêu người dùng đã chọn: ${lang} (${targetMeta.nativeName})

Nội dung người dùng nhập vào hoặc nói vào mic (có thể bằng BẤT KỲ NGÔN NGỮ NÀO):
"""
${text}
"""
${isInputDifferent ? `Câu đã được chuyển ngữ chuẩn xác sang ${lang} (${targetMeta.nativeName}):
"""
${autoTranslatedTarget}
"""` : ''}

QUY TẮC BẮT BUỘC 100% CHO TRƯỜNG "originalText" (HIỂN THỊ Ở KHỐI 1):
1. **KHỐI 1 LÀ NGUYÊN CÂU THEO CHÍNH XÁC CHUẨN NGÔN NGỮ ĐÃ CHỌN (${lang} - ${targetMeta.nativeName})**:
   - Trường "originalText" BẮT BUỘC 100% PHẢI LÀ NGUYÊN CÂU ĐƯỢC VIẾT HOÀN TOÀN BẰNG ${lang} (${targetMeta.nativeName}) CHUẨN XÁC, TỰ NHIÊN NHƯ NGƯỜI BẢN XỨ.
   - BẤT KỂ người dùng nhập hoặc nói bằng BẤT KỲ NGÔN NGỮ NÀO (Tiếng Việt, Tiếng Trung, Tiếng Nhật, Tiếng Hàn, Tiếng Pháp, Tiếng Đức, Tiếng Tây Ban Nha, Tiếng Anh, v.v.):
     * BẮT BUỘC tự động chuyển đổi sang câu chuẩn xác, lưu loát nhất của ${lang}.
     ${isInputDifferent ? `* Gán câu chuẩn "${autoTranslatedTarget}" (hoặc phiên bản tự nhiên nhất theo chuẩn ngữ pháp và văn phong của người bản xứ ${targetMeta.nativeName}) vào trường "originalText".` : ''}
     * TUYỆT ĐỐI KHÔNG để tiếng Việt hay ngôn ngữ khác vào trường "originalText" (trừ khi ngôn ngữ mục tiêu đã chọn chính là tiếng Việt).
     * NẾU nội dung người dùng nhập ban đầu đã là ${lang}, hãy hiệu chỉnh/chuẩn hóa chính tả hoặc ngữ pháp nếu cần và gán vào "originalText".
   - "inputWasVietnamese": ${isInputDifferent ? 'true' : 'false'},
   - "vietnameseSourceText": "${text.replace(/"/g, '\\"')}",
   - "fullVietnameseMeaning": BẮT BUỘC là nghĩa tiếng Việt đầy đủ, tự nhiên nhất của câu ${lang} trong "originalText".

QUY TẮC PHIÊN ÂM TIẾNG VIỆT SIÊU NGẮN GỌN & DỄ ĐỌC (CHO CÂU "originalText"):
1. **NGẮN GỌN, THANH THOÁT, DỄ ĐỌC NHẤT**:
   - Dùng các âm vần thuần Việt giản dị, ngắn gọn. Người Việt nhìn vào là đọc trơn tru ngay lập tức, không bị líu lưỡi hay vấp.
   - TUYỆT ĐỐI LOẠI BỎ các phụ âm rườm rà ở đuôi (TRÁNH các đuôi như "-ch", "-st", "-k", "-kh", "-th", "-dh", "-kờ", "-đờ").
   - Âm vần thuần Việt tự nhiên chuẩn mực (BẮT BUỘC theo mẫu này):
     * "Hello, how are you today?" -> "Hê-lâu, hao a diu tu-đây?" (hoặc viết HOA trọng âm chính "Hê-lâu, hao a diu tu-ĐÂY?")
     * "Nice to meet you!" -> "Nai-s thừ mít diu!"
     * "Could you please help me?" -> "Kút diu phli-z hép mi?"
     * "How much is this?" -> "Hao mát i-z đít?"
     * "Can I have the check, please?" -> "Cen nai hép đờ check, phli-z?"
     * "Thank you so much!" -> "Thenk kiu sâu mát!"
     * "Where is the subway station?" -> "Ue rơ-z đờ sáp-uê s-tây-sừn?"
   - Tiếng Trung chuẩn chữ Việt có thanh điệu chuẩn xác:
     * "你好，很高兴认识你！" -> "Ní hảo, hẩn cao xing rân sử nỉ!"
     * "这个多少钱？" -> "Chưa cờ tua sao chén?"
     * "谢谢！ / 再见！" -> "Xiê xiê! / Chai chiên!"
     * "我想喝咖啡。" -> "Ủa xẻng hư kha phây."
     * "买单，请结账！" -> "Mải đan, chỉnh chiế trang!"
   - Giữ khoảng cách giữa các từ như tiếng Việt bình thường. Dùng dấu gạch nối trong từ có 2-3 âm tiết để nối âm tự nhiên.
2. **QUY TẮC PHIÊN ÂM CHỮ VIỆT THANH THOÁT & NGỮ ĐIỆU (CHO "fullVietnamesePhonetics"):**:
   - BẮT BUỘC viết HOA âm mang trọng âm chính (ví dụ: "Hê-LÂU, hao a diu tu-ĐÂY?", "Ít-s KHỜ-LÂU-zing thaim.", "Ủa xẻng XUẾ DÍNG-dủy"), loại bỏ phụ âm líu lưỡi rườm rà.
   - Dùng các âm vần thuần Việt giản dị, ngắn gọn. Người Việt nhìn vào là đọc trơn tru ngay lập tức.
   - Luôn kèm biểu tượng ngữ điệu ↗ (lên giọng) hoặc ↘ (xuống giọng) ở cuối câu.
3. **QUY TẮC CHIA CỤM TỪ RÕ RÀNG (KHỐI 4 - THOUGHT GROUPS - 2 ĐẾN 4 TỪ/CỤM)**:
   - BẮT BUỘC ngắt đúng theo nhịp thở và cấu trúc ngữ nghĩa hoàn chỉnh (2-4 từ/cụm tương ứng nhịp thở tự nhiên).
   - Mỗi cụm có original, phoneticsVi, ipaOrPinyin, partOfSpeech, meaningVi, detailedExplanation, stressAndLiaisonTip.
4. **PHÂN TÍCH CHI TIẾT TỪNG TỪ & TỪ LOẠI VỚI ĐẦY ĐỦ NGHĨA (KHỐI 5 - BẮT BUỘC 100%)**:
   - Trường "words" là danh sách chi tiết TỪNG TỪ ĐƠN LẺ trong câu "originalText" (theo đúng thứ tự từ trong câu).
   - Với mỗi từ đơn lẻ:
     + "word": từ đơn lẻ trong câu (giữ nguyên cách viết chữ hoa/thường, không kèm dấu phẩy hay dấu chấm thừa).
     + "ipaOrPinyin": ký hiệu phiên âm chuẩn quốc tế IPA (tiếng Anh, ví dụ /həˈloʊ/, /haʊ/, /ɑːr/, /juː/, /təˈdeɪ/) hoặc Pinyin (tiếng Trung, ví dụ nǐ hǎo, jīntiān) hoặc ký hiệu phiên âm chuẩn của ngôn ngữ đó.
     + "partOfSpeech": nhãn từ loại chuẩn xác bằng tiếng Việt (ví dụ: Thán từ, Từ để hỏi, Động từ (tobe), Đại từ nhân xưng, Trạng từ, Danh từ, Động từ, Tính từ, Giới từ, Liên từ...).
     + "phoneticsVi": phiên âm chữ Việt siêu ngắn gọn, dễ đọc của riêng từ này, viết HOA âm mang trọng âm chính (ví dụ: hê-LÂU, HAO, A, DIU, tu-ĐÂY, KHỜ-LÂU-zing, THAIM).
     + "meaningVi": BỔ SUNG ĐẦY ĐỦ CÁC NGHĨA phổ biến tiếng Việt của từ, phân tách bằng dấu phẩy (ĐẶC BIỆT: "Hello" -> "Chào, xin chào"; "how" -> "như thế nào, bằng cách nào"; "are"/"is"/"am" -> "thì, là, ở"; "you" -> "bạn, các bạn, anh, chị, em"; "today" -> "hôm nay, ngày nay"; "be" -> "thì, là, ở, trở thành"; "have" -> "có, dùng, ăn uống, trải qua"; "closing" -> "đóng cửa, kết thúc"; "time" -> "thời gian, lúc, giờ").
     + "usageNote": giải thích ngắn gọn 1 câu về vai trò ngữ pháp hoặc cách dùng của từ trong ngữ cảnh câu này (ví dụ: "Lời chào mở đầu cuộc trò chuyện.", "Dùng để hỏi về trạng thái của đối tượng.", "Động từ liên kết chia theo chủ ngữ 'you'.", "Đại từ làm chủ ngữ trong câu hỏi.", "Trạng từ chỉ thời gian trong ngày.").`;

    // Candidate models in order: gemini-3.1-flash-lite and gemini-3.8-flash
    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let parsed: any = null;

    if (apiKey) {
      for (const modelName of candidateModels) {
        try {
          const geminiPromise = ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  originalText: {
                    type: Type.STRING,
                    description: `BẮT BUỘC 100% LÀ NGUYÊN CÂU VIẾT BẰNG ${targetMeta.name} (${targetMeta.nativeName}) CHUẨN XÁC ĐỂ HIỂN THỊ Ở KHỐI 1. TUYỆT ĐỐI KHÔNG ĐỂ TIẾNG VIỆT Ở ĐÂY.`,
                  },
                  inputWasVietnamese: {
                    type: Type.BOOLEAN,
                    description: 'True nếu người dùng đã nhập bằng tiếng Việt và đã được tự động dịch sang ngôn ngữ đích',
                  },
                  vietnameseSourceText: {
                    type: Type.STRING,
                    description: 'Nội dung tiếng Việt ban đầu người dùng đã nhập nếu có',
                  },
                  language: { type: Type.STRING },
                  fullVietnamesePhonetics: {
                    type: Type.STRING,
                    description: 'Cách đọc cả câu hoàn chỉnh bằng chữ Việt siêu ngắn gọn, viết HOA âm mang trọng âm chính',
                  },
                  fullVietnameseMeaning: {
                    type: Type.STRING,
                    description: 'Nghĩa tiếng Việt chuẩn xác, đầy đủ của câu',
                  },
                  sentenceType: {
                    type: Type.STRING,
                    description: 'Loại câu (ví dụ: Câu hỏi Wh-, Câu chào hỏi, Câu cảm thán)',
                  },
                  intonation: {
                    type: Type.OBJECT,
                    properties: {
                      direction: { type: Type.STRING, description: 'rising | falling | fall-rise | level' },
                      symbol: { type: Type.STRING, description: '↗ | ↘ | ⤵ | →' },
                      rule: { type: Type.STRING, description: 'Giải thích quy tắc ngữ điệu của câu' },
                    },
                    required: ['direction', 'symbol', 'rule'],
                  },
                  chunks: {
                    type: Type.ARRAY,
                    description: 'Các từ/cụm từ ngắt đúng nhịp câu, giải thích nghĩa và dạng từ đầy đủ',
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        original: { type: Type.STRING, description: 'Cụm từ gốc trong ngôn ngữ đã chọn' },
                        phoneticsVi: { type: Type.STRING, description: 'Phiên âm tiếng Việt siêu ngắn gọn, dễ đọc' },
                        ipaOrPinyin: { type: Type.STRING, description: 'Ký hiệu phiên âm quốc tế IPA hoặc Pinyin' },
                        partOfSpeech: { type: Type.STRING, description: 'Dạng từ / loại từ (Danh từ, Động từ, Tính từ, Phó từ, Đại từ, Giới từ, Trợ từ, Cụm danh từ, v.v.)' },
                        meaningVi: { type: Type.STRING, description: 'Dịch nghĩa tiếng Việt của từ/cụm từ' },
                        detailedExplanation: { type: Type.STRING, description: 'Giải thích nghĩa đầy đủ và chi tiết nhất: vai trò ngữ pháp, cấu trúc và sắc thái biểu đạt' },
                        stressAndLiaisonTip: { type: Type.STRING, description: 'Mẹo nối âm, nuốt âm hoặc khẩu hình' },
                      },
                      required: ['original', 'phoneticsVi', 'ipaOrPinyin', 'partOfSpeech', 'meaningVi', 'detailedExplanation', 'stressAndLiaisonTip'],
                    },
                  },
                  words: {
                    type: Type.ARRAY,
                    description: 'Khối 5 — Phân tích chi tiết từng từ đơn lẻ trong câu: từ, ký hiệu IPA/Pinyin, từ loại tiếng Việt, phiên âm chữ Việt, đầy đủ các nghĩa phổ biến và giải thích ngắn gọn cách dùng',
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        word: { type: Type.STRING, description: 'Từ đơn lẻ trong câu' },
                        ipaOrPinyin: { type: Type.STRING, description: 'Ký hiệu phiên âm quốc tế IPA (vd: /həˈloʊ/) hoặc Pinyin (vd: nǐ hǎo)' },
                        partOfSpeech: { type: Type.STRING, description: 'Nhãn từ loại tiếng Việt (Thán từ, Từ để hỏi, Động từ (tobe), Đại từ nhân xưng, Trạng từ, Danh từ, Động từ, Tính từ, Giới từ...)' },
                        phoneticsVi: { type: Type.STRING, description: 'Phiên âm chữ Việt ngắn gọn của từ, viết HOA âm trọng âm (vd: hê-LÂU, HAO, A, DIU, tu-ĐÂY)' },
                        meaningVi: { type: Type.STRING, description: 'Đầy đủ các nghĩa phổ biến tiếng Việt của từ, cách nhau bằng dấu phẩy (vd: "thì, là, ở")' },
                        usageNote: { type: Type.STRING, description: 'Giải thích ngắn gọn 1 câu về vai trò ngữ pháp hoặc cách dùng của từ trong câu' },
                      },
                      required: ['word', 'ipaOrPinyin', 'partOfSpeech', 'phoneticsVi', 'meaningVi', 'usageNote'],
                    },
                  },
                  pronunciationTips: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Các mẹo phát âm quan trọng cần nhớ cho câu này',
                  },
                },
                required: [
                  'originalText',
                  'inputWasVietnamese',
                  'language',
                  'fullVietnamesePhonetics',
                  'fullVietnameseMeaning',
                  'sentenceType',
                  'intonation',
                  'chunks',
                  'words',
                  'pronunciationTips',
                ],
              },
            },
          });

          // 12s timeout to ensure Gemini delivers full linguistic analysis for any sentence
          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), 12000)
          );

          const response = await Promise.race([geminiPromise, timeoutPromise]);

          if (response && response.text) {
            parsed = JSON.parse(response.text);
            if (parsed && parsed.fullVietnamesePhonetics && parsed.originalText) {
              // Ensure clean, concise phonetics
              parsed.fullVietnamesePhonetics = sanitizeConcisePhonetics(parsed.fullVietnamesePhonetics);
              if (Array.isArray(parsed.chunks)) {
                parsed.chunks.forEach((c: any) => {
                  if (c && c.phoneticsVi) {
                    c.phoneticsVi = sanitizeConcisePhonetics(c.phoneticsVi);
                  }
                });
              }

              // ĐẢM BẢO KHỐI 1 (originalText) TUYỆT ĐỐI HIỂN THỊ CHÍNH XÁC THEO CHUẨN NGÔN NGỮ ĐÃ CHỌN:
              if (targetLangKey !== 'vi') {
                if (
                  isVietnameseText(parsed.originalText) ||
                  (isInputDifferent && parsed.originalText.trim().toLowerCase() === text.trim().toLowerCase())
                ) {
                  if (autoTranslatedTarget && !isVietnameseText(autoTranslatedTarget)) {
                    parsed.originalText = autoTranslatedTarget;
                  }
                }
              }

              if (isInputDifferent) {
                parsed.inputWasVietnamese = true;
                parsed.vietnameseSourceText = text;
              }

              // ĐẢM BẢO KHỐI 5 (words) LUÔN CÓ ĐẦY ĐỦ VÀ CHUẨN XÁC
              if (!parsed.words || !Array.isArray(parsed.words) || parsed.words.length === 0) {
                parsed.words = generateWordList(parsed.originalText, targetLangKey, parsed.chunks);
              } else {
                const fallbackWords = generateWordList(parsed.originalText, targetLangKey, parsed.chunks);
                parsed.words.forEach((w: any, idx: number) => {
                  if (w && w.phoneticsVi) {
                    w.phoneticsVi = sanitizeConcisePhonetics(w.phoneticsVi);
                  }
                  const fb = fallbackWords[idx];
                  if (w && !w.ipaOrPinyin) {
                    w.ipaOrPinyin = fb?.ipaOrPinyin || `/${String(w.word || '').toLowerCase()}/`;
                  }
                  if (w && !w.usageNote && fb?.usageNote) {
                    w.usageNote = fb.usageNote;
                  }
                });
              }

              break;
            }
          }
        } catch {
          // Gracefully try next model or linguistic fallback
          continue;
        }
      }
    }

    if (parsed && parsed.fullVietnamesePhonetics && parsed.originalText) {
      if (!parsed.words || !Array.isArray(parsed.words) || parsed.words.length === 0) {
        parsed.words = generateWordList(parsed.originalText, targetLangKey, parsed.chunks);
      }
      if (transcribeCache.size > 300) transcribeCache.clear();
      transcribeCache.set(cacheKey, { data: parsed, timestamp: Date.now() });
      return res.json(parsed);
    }

    // High quality offline linguistic processor fallback
    const fallback = generateServerFallback(text, targetLangKey, autoTranslatedTarget, isInputDifferent);
    if (transcribeCache.size > 300) transcribeCache.clear();
    transcribeCache.set(cacheKey, { data: fallback, timestamp: Date.now() });
    return res.json(fallback);
  } catch {
    const fallback = generateServerFallback(req.body?.text || '', (req.body?.language || 'en').toLowerCase());
    return res.json(fallback);
  }
});

// Helper to infer part of speech for fallback
function inferPartOfSpeech(text: string, _lang?: string): string {
  const t = text.trim().toLowerCase().replace(/^[.,!?;:"'(){}\[\]]+|[.,!?;:"'(){}\[\]]+$/g, '');
  if (/^(hello|hi|thanks|thank you|please|sorry|yes|no|goodbye|welcome|nǐ hǎo|xièxie|zàijiàn|你好|谢谢|再见|对不起|欢迎)$/i.test(t)) return 'Thán từ';
  if (/^(how|where|why|when|what|who|which|duōshao|zěnme|多少|怎么|哪里|什么)$/i.test(t)) return 'Từ để hỏi';
  if (/^(it's|it’s)$/i.test(t)) return 'Đại từ + Động từ (viết tắt)';
  if (/^(i|you|he|she|it|we|they|me|him|her|us|them|my|your|his|their|our|wǒ|nǐ|tā|我|你|他|她)$/i.test(t)) return 'Đại từ nhân xưng';
  if (/^(is|am|are|was|were|be)$/i.test(t)) return 'Động từ (tobe)';
  if (/^(closing)$/i.test(t)) return 'Danh từ / Tính từ';
  if (/^(do|does|did|have|has|had|can|could|will|would|go|see|meet|help|speak|want|like|learn|drink|eat|take|shì|huì|xiǎng|kěyǐ|dào|dǎyàng|是|会|想|要|喝|吃|认识|学习|到|打烊)$/i.test(t)) return 'Động từ';
  if (/^(good|nice|fine|hot|cold|delicious|easy|great|bad|happy|hǎo|piàoliang|hǎochī|好|漂亮|好吃|贵|便宜)$/i.test(t)) return 'Tính từ';
  if (/^(today|yesterday|tomorrow|very|so|slowly|well|now|jīntiān|hěn|fēicháng|今天|很|非常|太|慢)$/i.test(t)) return 'Trạng từ';
  if (/^(in|on|at|to|for|with|by|about|from|zài|gěi|在|给)$/i.test(t)) return 'Giới từ';
  if (/^(and|or|but|because|if)$/i.test(t)) return 'Liên từ';
  if (/^(time|hour|day|morning|afternoon|evening|night|shíjiān|时间|coffee|water|tea|hotel|bill|check|station|subway|food|weather|name|airport|taxi|kāfēi|shuǐ|zhàngdān|chē|咖啡|水|账单|地铁|机场)$/i.test(t)) return 'Danh từ';
  if (/^(ma|ne|ba|le|吗|呢|吧|了)$/i.test(t)) return 'Trợ từ';
  if (t.includes(' ')) return 'Cụm từ';
  return 'Từ vựng';
}

function generateWordList(sentence: string, lang: string, chunks?: any[]): any[] {
  if (!sentence) return [];
  const clean = sentence.trim();
  if (lang === 'zh') {
    const knownKeys = Object.keys(ZH_WORD_MAP).sort((a, b) => b.length - a.length);
    let remaining = clean.replace(/[，。？！、\s]/g, '');
    const words: string[] = [];
    while (remaining.length > 0) {
      const match = knownKeys.find((k) => remaining.startsWith(k));
      if (match) {
        words.push(match);
        remaining = remaining.slice(match.length);
      } else {
        words.push(remaining[0]);
        remaining = remaining.slice(1);
      }
    }
    return words.map((w) => {
      const entry = ZH_WORD_MAP[w];
      const pos = entry?.pos || inferPartOfSpeech(w, 'zh');
      return {
        word: w,
        ipaOrPinyin: entry ? entry.py : w,
        partOfSpeech: pos,
        phoneticsVi: entry ? entry.vi : w,
        meaningVi: entry ? entry.m : 'Từ vựng',
        usageNote: entry?.note || `Từ đóng vai trò ${pos.toLowerCase()} trong câu tiếng Trung.`,
      };
    });
  }

  // English & other languages
  const tokens = clean.split(/\s+/).filter(Boolean);
  return tokens.map((t) => {
    const cleanWord = t.replace(/^[.,!?;:"'(){}\[\]]+|[.,!?;:"'(){}\[\]]+$/g, '');
    const lower = cleanWord.toLowerCase();
    const entry = EN_WORD_MAP[lower];
    if (entry) {
      const pos = entry.pos || inferPartOfSpeech(cleanWord, lang);
      return {
        word: cleanWord,
        ipaOrPinyin: entry.ipa,
        partOfSpeech: pos,
        phoneticsVi: entry.vi,
        meaningVi: entry.m,
        usageNote: entry.note || `Từ đóng vai trò ${pos.toLowerCase()} trong câu.`,
      };
    }
    const foundChunk = Array.isArray(chunks)
      ? chunks.find((c) => typeof c?.original === 'string' && c.original.toLowerCase().includes(lower))
      : null;
    const pos = foundChunk?.partOfSpeech || inferPartOfSpeech(cleanWord, lang);
    return {
      word: cleanWord,
      ipaOrPinyin: foundChunk?.ipaOrPinyin || `/${lower}/`,
      partOfSpeech: pos,
      phoneticsVi: foundChunk?.phoneticsVi || approximateCleanPhonetic(cleanWord),
      meaningVi: foundChunk?.meaningVi || 'Từ vựng',
      usageNote: foundChunk?.detailedExplanation || `Từ đóng vai trò ${pos.toLowerCase()} trong câu.`,
    };
  });
}

// Helper to remove any leftover clunky phonetic symbols
function sanitizeConcisePhonetics(str: string): string {
  if (!str) return '';
  return str
    .replace(/-ch\b/gi, '')
    .replace(/-st\b/gi, 't')
    .replace(/-sh\b/gi, '')
    .replace(/-kh\b/gi, '')
    .replace(/-dh\b/gi, '')
    .replace(/-th\b/gi, '')
    .replace(/-đờ\b/gi, '')
    .replace(/-kờ\b/gi, '')
    .replace(/thù-ĐÂY/g, 'tu-đây')
    .replace(/thù-đây/g, 'tu-đây')
    .replace(/HÉO-ph/g, 'hép')
    .replace(/héo-ph/g, 'hép')
    .replace(/MIIT/g, 'mít')
    .replace(/THENK-khiu/g, 'Thenk kiu')
    .replace(/thenk-khiu/g, 'thenk kiu')
    .replace(/MẮT-ch/g, 'mát')
    .replace(/mắt-ch/g, 'mát')
    .replace(/\s+/g, ' ')
    .trim();
}

// Check if text is Vietnamese
function isVietnameseText(str: string): boolean {
  return (
    /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(str) ||
    /\b(tôi|bạn|xin chào|chào|cảm ơn|bao nhiêu|tiền|giúp|ở đâu|muốn|làm ơn|thế nào|tính tiền|hóa đơn|rất vui|không|được|có thể|uống|cà phê|ngon|tạm biệt)\b/i.test(str)
  );
}

// Built-in Vietnamese translation dictionary with ultra-concise phonetics & capitalized stressed syllables
const VI_TRANSLATION_MAP: Record<
  string,
  {
    en: string;
    zh: string;
    enPhonetics: string;
    zhPhonetics: string;
    meaning: string;
    enChunks: { o: string; v: string; ipa: string; m: string; t: string }[];
    zhChunks: { o: string; v: string; ipa: string; m: string; t: string }[];
    enTip: string;
    zhTip: string;
  }
> = {
  'đã đến giờ đóng cửa': {
    en: "It's closing time.",
    zh: '到打烊时间了。',
    enPhonetics: 'Ít-s KHỜ-LÂU-zing thaim. ↘',
    zhPhonetics: 'Tào tà dang sử chiên lơ. ↘',
    meaning: 'Đã đến giờ đóng cửa / sắp hết giờ mở cửa.',
    enChunks: [
      { o: "It's", v: 'Ít-s', ipa: '/ɪts/', m: 'đã là / nó là', t: 'Đọc gọn Ít-s' },
      { o: 'closing', v: 'KHỜ-LÂU-zing', ipa: '/ˈkloʊzɪŋ/', m: 'đóng cửa', t: 'Nhấn mạnh KHỜ-LÂU' },
      { o: 'time.', v: 'thaim.', ipa: '/taɪm/', m: 'giờ / thời gian.', t: 'Hạ giọng ở cuối câu' }
    ],
    zhChunks: [
      { o: '到', v: 'Tào', ipa: 'dào', m: 'đến', t: 'Thanh 4' },
      { o: '打烊', v: 'tà dang', ipa: 'dǎyàng', m: 'đóng cửa quán', t: 'tà dang' },
      { o: '时间了。', v: 'sử chiên lơ.', ipa: 'shíjiān le', m: 'thời gian rồi.', t: 'Hạ giọng nhẹ' }
    ],
    enTip: 'Nhấn mạnh trọng âm vào "KHỜ-LÂU" trong closing. Xuống giọng ở cuối câu.',
    zhTip: '到打烊时间了 (Tào tà dang sử chiên lơ) là cách nói chuẩn nhất của người bản xứ khi quán đến giờ đóng cửa.'
  },
  'đến giờ đóng cửa rồi': {
    en: "It's closing time.",
    zh: '到打烊时间了。',
    enPhonetics: 'Ít-s KHỜ-LÂU-zing thaim. ↘',
    zhPhonetics: 'Tào tà dang sử chiên lơ. ↘',
    meaning: 'Đã đến giờ đóng cửa rồi.',
    enChunks: [
      { o: "It's", v: 'Ít-s', ipa: '/ɪts/', m: 'đã là / nó là', t: 'Ít-s' },
      { o: 'closing', v: 'KHỜ-LÂU-zing', ipa: '/ˈkloʊzɪŋ/', m: 'đóng cửa', t: 'Nhấn KHỜ-LÂU' },
      { o: 'time.', v: 'thaim.', ipa: '/taɪm/', m: 'thời gian / giờ.', t: 'Hạ giọng' }
    ],
    zhChunks: [
      { o: '到', v: 'Tào', ipa: 'dào', m: 'đến', t: 'Tào' },
      { o: '打烊', v: 'tà dang', ipa: 'dǎyàng', m: 'đóng cửa quán', t: 'tà dang' },
      { o: '时间了。', v: 'sử chiên lơ.', ipa: 'shíjiān le', m: 'thời gian rồi.', t: 'lơ đọc nhẹ' }
    ],
    enTip: 'Nhấn mạnh vào "KHỜ-LÂU-zing".',
    zhTip: '到打烊时间了 là câu nói tự nhiên nhất của người bản xứ.'
  },
  'đến giờ đóng cửa': {
    en: "It's closing time.",
    zh: '到打烊时间了。',
    enPhonetics: 'Ít-s KHỜ-LÂU-zing thaim. ↘',
    zhPhonetics: 'Tào tà dang sử chiên lơ. ↘',
    meaning: 'Đã đến giờ đóng cửa.',
    enChunks: [
      { o: "It's", v: 'Ít-s', ipa: '/ɪts/', m: 'đã là', t: 'Ít-s' },
      { o: 'closing', v: 'KHỜ-LÂU-zing', ipa: '/ˈkloʊzɪŋ/', m: 'đóng cửa', t: 'Nhấn KHỜ-LÂU' },
      { o: 'time.', v: 'thaim.', ipa: '/taɪm/', m: 'thời gian.', t: 'Hạ giọng' }
    ],
    zhChunks: [
      { o: '到', v: 'Tào', ipa: 'dào', m: 'đến', t: 'Tào' },
      { o: '打烊', v: 'tà dang', ipa: 'dǎyàng', m: 'đóng cửa', t: 'tà dang' },
      { o: '时间了。', v: 'sử chiên lơ.', ipa: 'shíjiān le', m: 'giờ rồi.', t: 'lơ' }
    ],
    enTip: 'Nhấn mạnh vào KHỜ-LÂU.',
    zhTip: '打烊 nghĩa là kết thúc giờ mở cửa.'
  },
  'đã đến giờ đóng cửa rồi': {
    en: "It's closing time.",
    zh: '到打烊时间了。',
    enPhonetics: 'Ít-s KHỜ-LÂU-zing thaim. ↘',
    zhPhonetics: 'Tào tà dang sử chiên lơ. ↘',
    meaning: 'Đã đến giờ đóng cửa rồi.',
    enChunks: [
      { o: "It's", v: 'Ít-s', ipa: '/ɪts/', m: 'đã là', t: 'Ít-s' },
      { o: 'closing', v: 'KHỜ-LÂU-zing', ipa: '/ˈkloʊzɪŋ/', m: 'đóng cửa', t: 'Nhấn KHỜ-LÂU' },
      { o: 'time.', v: 'thaim.', ipa: '/taɪm/', m: 'thời gian.', t: 'Hạ giọng' }
    ],
    zhChunks: [
      { o: '到', v: 'Tào', ipa: 'dào', m: 'đến', t: 'Tào' },
      { o: '打烊', v: 'tà dang', ipa: 'dǎyàng', m: 'đóng cửa', t: 'tà dang' },
      { o: '时间了。', v: 'sử chiên lơ.', ipa: 'shíjiān le', m: 'giờ rồi.', t: 'lơ' }
    ],
    enTip: 'Nhấn mạnh vào KHỜ-LÂU.',
    zhTip: '到打烊时间了 là câu nói tự nhiên nhất của người bản xứ.'
  },
  'hôm nay bạn thế nào': {
    en: 'How are you today?',
    zh: '你今天过得怎么样？',
    enPhonetics: 'Hao a diu tu-ĐÂY? ↘',
    zhPhonetics: 'Nỉ chin then cua tợ chẩn mơ dang? ↘',
    meaning: 'Hôm nay bạn thế nào / có ổn không?',
    enChunks: [
      { o: 'How are you', v: 'Hao a diu', ipa: '/haʊ ɑːr juː/', m: 'bạn thế nào', t: 'Đọc nối nhẹ "hao-oa diu"' },
      { o: 'today?', v: 'tu-ĐÂY?', ipa: '/təˈdeɪ/', m: 'hôm nay?', t: 'Nhấn mạnh vào ĐÂY, hạ giọng ở cuối câu' }
    ],
    zhChunks: [
      { o: '你今天', v: 'Nỉ chin then', ipa: 'nǐ jīntiān', m: 'hôm nay bạn', t: 'Hôm nay' },
      { o: '过得怎么样？', v: 'cua tợ chẩn mơ dang?', ipa: 'guò de zěnmeyàng?', m: 'trôi qua thế nào?', t: '得 đọc thanh nhẹ' }
    ],
    enTip: 'Từ "today" phát âm ngắn gọn là "tu-đây", nhấn mạnh "ĐÂY". Xuống giọng nhẹ ở cuối câu.',
    zhTip: '今天 đọc thanh 1 ngân dài, 得 đọc thanh nhẹ.'
  },
  'bạn có khỏe không': {
    en: 'How are you?',
    zh: '你好吗？',
    enPhonetics: 'Hao a DIU? ↘',
    zhPhonetics: 'Ní hảo ma? ↘',
    meaning: 'Bạn có khỏe không?',
    enChunks: [
      { o: 'How are you?', v: 'Hao a DIU?', ipa: '/haʊ ɑːr juː/', m: 'bạn có khỏe không?', t: 'Nhấn vào DIU' }
    ],
    zhChunks: [
      { o: '你好吗？', v: 'Ní hảo ma?', ipa: 'nǐ hǎo ma?', m: 'bạn khỏe không?', t: 'ma đọc thanh nhẹ' }
    ],
    enTip: 'Nhấn vào "DIU", xuống giọng nhẹ ở cuối câu.',
    zhTip: 'Trợ từ "ma" đọc thanh nhẹ lướt tự nhiên.'
  },
  'xin chào': {
    en: 'Hello, nice to meet you!',
    zh: '你好，很高兴认识你！',
    enPhonetics: 'Hê-lâu, nai-s thừ mít diu!',
    zhPhonetics: 'Ní hảo, hẩn cao xing rân sử nỉ!',
    meaning: 'Xin chào, rất vui được gặp bạn!',
    enChunks: [
      { o: 'Hello,', v: 'Hê-lâu,', ipa: '/həˈloʊ/', m: 'Xin chào', t: 'Nhấn âm lâu' },
      { o: 'nice to meet you!', v: 'nai-s thừ mít diu!', ipa: '/naɪs tə miːt juː/', m: 'rất vui được gặp bạn!', t: 'meet you nối thành mít-diu' }
    ],
    zhChunks: [
      { o: '你好，', v: 'Ní hảo,', ipa: 'nǐ hǎo', m: 'Xin chào', t: 'Biến điệu 2 thanh 3' },
      { o: '很高兴认识你！', v: 'hẩn cao xing rân sử nỉ!', ipa: 'hěn gāoxìng rènshi nǐ', m: 'rất vui được làm quen!', t: 'rènshi đọc rân-sử' }
    ],
    enTip: 'Nice to meet you đọc trơn tru thành "nai-s thừ mít diu".',
    zhTip: '你好 biến điệu thành Ní hảo, 认识 chữ 识 đọc thanh nhẹ.'
  },
  'chào bạn': {
    en: 'Hello there!',
    zh: '你好！',
    enPhonetics: 'Hê-lâu đe!',
    zhPhonetics: 'Ní hảo!',
    meaning: 'Chào bạn!',
    enChunks: [{ o: 'Hello there!', v: 'Hê-lâu đe!', ipa: '/həˈloʊ ðeər/', m: 'Chào bạn!', t: 'Nhấn hê-lâu' }],
    zhChunks: [{ o: '你好！', v: 'Ní hảo!', ipa: 'nǐ hǎo!', m: 'Chào bạn!', t: 'Biến điệu 2 thanh 3' }],
    enTip: 'Nhấn vào Hê-lâu.',
    zhTip: 'Hai thanh 3 biến điệu thành thanh 2 + thanh 3.'
  },
  'cái này bao nhiêu tiền': {
    en: 'How much is this?',
    zh: '这个多少钱？',
    enPhonetics: 'Hao mát i-z đít?',
    zhPhonetics: 'Chưa cờ tua sao chén?',
    meaning: 'Cái này giá bao nhiêu tiền?',
    enChunks: [
      { o: 'How much', v: 'Hao mát', ipa: '/haʊ mʌtʃ/', m: 'bao nhiêu', t: 'Đọc gọn mát' },
      { o: 'is this?', v: 'i-z đít?', ipa: '/ɪz ðɪs/', m: 'cái này?', t: 'Nối thành i-z đít' }
    ],
    zhChunks: [
      { o: '这个', v: 'Chưa cờ', ipa: 'zhè ge', m: 'cái này', t: 'Chưa cờ' },
      { o: '多少钱？', v: 'tua sao chén?', ipa: 'duōshao qián?', m: 'bao nhiêu tiền?', t: 'chén thanh 2' }
    ],
    enTip: 'How much đọc gọn thành "hao mát", không kéo dài.',
    zhTip: '这个 đọc "chưa cờ", 钱 đọc "chén" thanh 2.'
  },
  'bao nhiêu tiền': {
    en: 'How much is it?',
    zh: '多少钱？',
    enPhonetics: 'Hao mát i-z it?',
    zhPhonetics: 'Tua sao chén?',
    meaning: 'Bao nhiêu tiền?',
    enChunks: [{ o: 'How much is it?', v: 'Hao mát i-z it?', ipa: '/haʊ mʌtʃ ɪz ɪt/', m: 'Bao nhiêu tiền?', t: 'Đọc gọn' }],
    zhChunks: [{ o: '多少钱？', v: 'Tua sao chén?', ipa: 'duōshao qián?', m: 'Bao nhiêu tiền?', t: 'chén thanh 2' }],
    enTip: 'Đọc trơn tru "hao mát i-z it".',
    zhTip: '多少 đọc thanh 1 + thanh nhẹ.'
  },
  'rất vui được gặp bạn': {
    en: 'Nice to meet you!',
    zh: '很高兴认识你！',
    enPhonetics: 'Nai-s thừ mít diu!',
    zhPhonetics: 'Hẩn cao xing rân sử nỉ!',
    meaning: 'Rất vui được gặp bạn!',
    enChunks: [
      { o: 'Nice to', v: 'Nai-s thừ', ipa: '/naɪs tə/', m: 'rất vui', t: 'Xì nhẹ s' },
      { o: 'meet you!', v: 'mít diu!', ipa: '/miːt juː/', m: 'được gặp bạn!', t: 'mít-diu' }
    ],
    zhChunks: [
      { o: '很高兴', v: 'Hẩn cao xing', ipa: 'hěn gāoxìng', m: 'rất vui', t: 'cao xing' },
      { o: '认识你！', v: 'rân sử nỉ!', ipa: 'rènshi nǐ', m: 'làm quen bạn!', t: 'rân sử nỉ' }
    ],
    enTip: 'Meet you đọc nối thành mít-diu.',
    zhTip: '认识 đọc rân sử.'
  },
  'cảm ơn bạn rất nhiều': {
    en: 'Thank you so much!',
    zh: '非常感谢你！',
    enPhonetics: 'Thenk kiu sâu mát!',
    zhPhonetics: 'Phây tráng cảm xia nỉ!',
    meaning: 'Cảm ơn bạn rất nhiều!',
    enChunks: [
      { o: 'Thank you', v: 'Thenk kiu', ipa: '/θæŋk juː/', m: 'cảm ơn bạn', t: 'Nối âm thenk-kiu' },
      { o: 'so much!', v: 'sâu mát!', ipa: '/soʊ mʌtʃ/', m: 'rất nhiều!', t: 'sâu mát' }
    ],
    zhChunks: [
      { o: '非常', v: 'Phây tráng', ipa: 'fēicháng', m: 'vô cùng', t: 'thanh 1 + 2' },
      { o: '感谢你！', v: 'cảm xia nỉ!', ipa: 'gǎnxiè nǐ', m: 'cảm ơn bạn!', t: 'cảm xia' }
    ],
    enTip: 'Thank you đọc nối gọn thành "thenk kiu".',
    zhTip: '感谢 đọc cảm xia.'
  },
  'cảm ơn': {
    en: 'Thank you!',
    zh: '谢谢！',
    enPhonetics: 'Thenk kiu!',
    zhPhonetics: 'Xiê xiê!',
    meaning: 'Cảm ơn!',
    enChunks: [{ o: 'Thank you!', v: 'Thenk kiu!', ipa: '/θæŋk juː/', m: 'Cảm ơn!', t: 'Nối âm thenk-kiu' }],
    zhChunks: [{ o: '谢谢！', v: 'Xiê xiê!', ipa: 'xièxie!', m: 'Cảm ơn!', t: 'Chữ sau đọc nhẹ' }],
    enTip: 'Đọc gọn "thenk kiu".',
    zhTip: 'Chữ thứ hai đọc thanh nhẹ lướt.'
  },
  'tính tiền': {
    en: 'Check, please!',
    zh: '买单，请结账！',
    enPhonetics: 'Check, phli-z!',
    zhPhonetics: 'Mải đan, chỉnh chiế trang!',
    meaning: 'Cho tôi xin tính tiền!',
    enChunks: [
      { o: 'Check,', v: 'Check,', ipa: '/tʃek/', m: 'Tính tiền', t: 'Bật âm check' },
      { o: 'please!', v: 'phli-z!', ipa: '/pliːz/', m: 'làm ơn!', t: 'Lên giọng lịch sự' }
    ],
    zhChunks: [
      { o: '买单，', v: 'Mải đan,', ipa: 'mǎidān', m: 'thanh toán', t: 'mải đan' },
      { o: '请结账！', v: 'chỉnh chiế trang!', ipa: 'qǐng jiézhàng', m: 'xin tính tiền!', t: 'chiế trang' }
    ],
    enTip: 'Nói ngắn gọn: "check, phli-z" khi gọi tính tiền trong nhà hàng.',
    zhTip: 'Tại quán ăn có thể nói ngắn gọn "Mải đan" hoặc "Chiế trang".'
  },
  'cho tôi xin hóa đơn': {
    en: 'Can I get the bill, please?',
    zh: '请给我账单，谢谢！',
    enPhonetics: 'Cen nai gét đờ biu, phli-z?',
    zhPhonetics: 'Chỉnh cấy ủa trang tan, xiê xiê!',
    meaning: 'Cho tôi xin hóa đơn tính tiền nhé?',
    enChunks: [
      { o: 'Can I get', v: 'Cen nai gét', ipa: '/kæn aɪ ɡet/', m: 'cho tôi xin', t: 'cen nai' },
      { o: 'the bill, please?', v: 'đờ biu, phli-z?', ipa: '/ðə bɪl pliːz/', m: 'hóa đơn nhé?', t: 'biu phli-z' }
    ],
    zhChunks: [
      { o: '请给我账单，', v: 'Chỉnh cấy ủa trang tan,', ipa: 'qǐng gěi wǒ zhàngdān', m: 'cho tôi xin hóa đơn', t: 'trang tan' },
      { o: '谢谢！', v: 'xiê xiê!', ipa: 'xièxie', m: 'cảm ơn!', t: 'xiê xiê' }
    ],
    enTip: 'Can I nối thành cen-nai, bill đọc là biu.',
    zhTip: '账单 đọc trang-tan.'
  },
  'bạn có thể giúp tôi không': {
    en: 'Could you please help me?',
    zh: '你可以帮我一下吗？',
    enPhonetics: 'Kút diu phli-z hép mi?',
    zhPhonetics: 'Nỉ khở dỉ pang ủa di xia ma?',
    meaning: 'Bạn có thể giúp tôi một chút được không?',
    enChunks: [
      { o: 'Could you please', v: 'Kút diu phli-z', ipa: '/kʊd juː pliːz/', m: 'bạn có thể vui lòng', t: 'kút diu' },
      { o: 'help me?', v: 'hép mi?', ipa: '/help miː/', m: 'giúp tôi không?', t: 'hép mi, lên giọng' }
    ],
    zhChunks: [
      { o: '你可以', v: 'Nỉ khở dỉ', ipa: 'nǐ kěyǐ', m: 'bạn có thể', t: 'khở dỉ' },
      { o: '帮我一下吗？', v: 'pang ủa di xia ma?', ipa: 'bāng wǒ yíxià ma?', m: 'giúp tôi một chút?', t: 'pang ủa' }
    ],
    enTip: 'Help đọc gọn là "hép", lên giọng nhẹ ở "mi?".',
    zhTip: '可以 biến điệu thành khở dỉ.'
  },
  'tôi muốn uống cà phê': {
    en: 'I would like a coffee, please.',
    zh: '我想喝一杯咖啡。',
    enPhonetics: 'Ai út lai ơ có-phi, phli-z.',
    zhPhonetics: 'Ủa xẻng hư di phây kha phây.',
    meaning: 'Tôi muốn gọi một ly cà phê.',
    enChunks: [
      { o: 'I would like', v: 'Ai út lai', ipa: '/aɪ wʊd laɪk/', m: 'tôi muốn', t: 'ai út lai' },
      { o: 'a coffee, please.', v: 'ơ có-phi, phli-z.', ipa: '/ə ˈkɔːfi pliːz/', m: 'một ly cà phê.', t: 'có-phi' }
    ],
    zhChunks: [
      { o: '我想喝', v: 'Ủa xẻng hư', ipa: 'wǒ xiǎng hē', m: 'tôi muốn uống', t: 'hư là uống' },
      { o: '一杯咖啡。', v: 'di phây kha phây.', ipa: 'yì bēi kāfēi', m: 'một ly cà phê.', t: 'kha phây' }
    ],
    enTip: 'Coffee đọc gọn thành "có-phi".',
    zhTip: '咖啡 đọc "kha phây", hai thanh 1 bằng phẳng.'
  },
  'tôi muốn một ly cà phê nóng': {
    en: 'I would like a hot coffee.',
    zh: '我想喝一杯热咖啡。',
    enPhonetics: 'Ai út lai ơ hót có-phi.',
    zhPhonetics: 'Ủa xẻng hư di phây rưa kha phây.',
    meaning: 'Tôi muốn một ly cà phê nóng.',
    enChunks: [
      { o: 'I would like', v: 'Ai út lai', ipa: '/aɪ wʊd laɪk/', m: 'tôi muốn', t: 'út lai' },
      { o: 'a hot coffee.', v: 'ơ hót có-phi.', ipa: '/ə hɑːt ˈkɔːfi/', m: 'cà phê nóng.', t: 'hót có-phi' }
    ],
    zhChunks: [
      { o: '我想喝', v: 'Ủa xẻng hư', ipa: 'wǒ xiǎng hē', m: 'tôi muốn uống', t: 'hư' },
      { o: '一杯热咖啡。', v: 'di phây rưa kha phây.', ipa: 'yì bēi rè kāfēi', m: 'ly cà phê nóng.', t: 'rưa là nóng' }
    ],
    enTip: 'Hot coffee đọc gọn "hót có-phi".',
    zhTip: '热 đọc "rưa" thanh 4 dứt khoát.'
  },
  'tên bạn là gì': {
    en: 'What is your name?',
    zh: '你叫什么名字？',
    enPhonetics: 'Oát i-z gio nêm?',
    zhPhonetics: 'Nỉ cheo sấn mơ mính chự?',
    meaning: 'Bạn tên là gì?',
    enChunks: [
      { o: 'What is', v: 'Oát i-z', ipa: '/wʌt ɪz/', m: 'cái gì là', t: 'oát i-z' },
      { o: 'your name?', v: 'gio nêm?', ipa: '/jɔːr neɪm/', m: 'tên của bạn?', t: 'gio nêm' }
    ],
    zhChunks: [
      { o: '你叫', v: 'Nỉ cheo', ipa: 'nǐ jiào', m: 'bạn tên là', t: 'cheo' },
      { o: '什么名字？', v: 'sấn mơ mính chự?', ipa: 'shénme míngzi?', m: 'tên gì?', t: 'mính chự' }
    ],
    enTip: 'What is your name đọc gọn "oát i-z gio nêm".',
    zhTip: '什么名字 đọc sấn mơ mính chự.'
  },
  'tôi muốn học tiếng anh': {
    en: 'I want to learn English.',
    zh: '我想学英语。',
    enPhonetics: 'Ai oán tu lơn Íng-lít.',
    zhPhonetics: 'Ủa xẻng xuế dính dủy.',
    meaning: 'Tôi muốn học tiếng Anh.',
    enChunks: [
      { o: 'I want to', v: 'Ai oán tu', ipa: '/aɪ wɑːnt tuː/', m: 'tôi muốn', t: 'oán tu' },
      { o: 'learn English.', v: 'lơn Íng-lít.', ipa: '/lɜːrn ˈɪŋɡlɪʃ/', m: 'học tiếng Anh.', t: 'lơn Íng-lít' }
    ],
    zhChunks: [
      { o: '我想', v: 'Ủa xẻng', ipa: 'wǒ xiǎng', m: 'tôi muốn', t: 'xẻng' },
      { o: '学英语。', v: 'xuế dính dủy.', ipa: 'xué yīngyǔ', m: 'học tiếng Anh.', t: 'xuế dính dủy' }
    ],
    enTip: 'English phát âm gọn "Íng-lít".',
    zhTip: '学 (xuế) thanh 2, 英语 (dính dủy).'
  },
  'hôm nay thời tiết rất đẹp': {
    en: 'The weather is very nice today.',
    zh: '今天天气很好。',
    enPhonetics: 'Đờ ue-đơ i-z ve-ri nai-s tu-đây.',
    zhPhonetics: 'Chin then thiên chi hẩn hảo.',
    meaning: 'Hôm nay thời tiết rất đẹp.',
    enChunks: [
      { o: 'The weather is', v: 'Đờ ue-đơ i-z', ipa: '/ðə ˈweðər ɪz/', m: 'thời tiết thì', t: 'ue-đơ' },
      { o: 'very nice today.', v: 've-ri nai-s tu-đây.', ipa: '/ˈveri naɪs təˈdeɪ/', m: 'rất đẹp hôm nay.', t: 'nai-s tu-đây' }
    ],
    zhChunks: [
      { o: '今天天气', v: 'Chin then thiên chi', ipa: 'jīntiān tiānqì', m: 'thời tiết hôm nay', t: 'chin then' },
      { o: '很好。', v: 'hẩn hảo.', ipa: 'hěn hǎo', m: 'rất tốt.', t: 'hẩn hảo' }
    ],
    enTip: 'Weather đọc gọn "ue-đơ", today đọc "tu-đây".',
    zhTip: '今天天气 đọc thanh 1 đều và cao.'
  },
  'bạn có nói được tiếng anh không': {
    en: 'Do you speak English?',
    zh: '你会说英语吗？',
    enPhonetics: 'Đu diu s-píc Íng-lít? ↗',
    zhPhonetics: 'Nỉ huây suô dính dủy ma? ↗',
    meaning: 'Bạn có nói được tiếng Anh không?',
    enChunks: [
      { o: 'Do you speak', v: 'Đu diu s-píc', ipa: '/duː juː spiːk/', m: 'bạn có nói', t: 's-píc' },
      { o: 'English?', v: 'Íng-lít? ↗', ipa: '/ˈɪŋɡlɪʃ/', m: 'tiếng Anh không?', t: 'Lên giọng cuối câu' }
    ],
    zhChunks: [
      { o: '你会说', v: 'Nỉ huây suô', ipa: 'nǐ huì shuō', m: 'bạn biết nói', t: 'huây suô' },
      { o: '英语吗？', v: 'dính dủy ma? ↗', ipa: 'yīngyǔ ma', m: 'tiếng Anh không?', t: 'ma đọc nhẹ' }
    ],
    enTip: 'Speak đọc là s-píc, lên giọng nhẹ ở English.',
    zhTip: 'Câu hỏi nghi vấn lên giọng nhẹ ở ma.'
  },
  'tôi không hiểu': {
    en: "I don't understand.",
    zh: '我听不懂。',
    enPhonetics: 'Ai đơn-t ân-đơ-s-ten.',
    zhPhonetics: 'Ủa thinh pu tung.',
    meaning: 'Tôi không hiểu / tôi nghe không hiểu.',
    enChunks: [
      { o: "I don't", v: 'Ai đơn-t', ipa: '/aɪ doʊnt/', m: 'tôi không', t: 'đơn-t' },
      { o: 'understand.', v: 'ân-đơ-s-ten.', ipa: '/ˌʌndərˈstænd/', m: 'hiểu.', t: 'nhấn ten' }
    ],
    zhChunks: [
      { o: '我', v: 'Ủa', ipa: 'wǒ', m: 'tôi', t: 'ủa' },
      { o: '听不懂。', v: 'thinh pu tung.', ipa: 'tīng bu dǒng', m: 'nghe không hiểu.', t: 'thinh pu tung' }
    ],
    enTip: 'Understand đọc ngắn gọn "ân-đơ-s-ten", nhấn vào ten.',
    zhTip: '我听不懂 (Ủa thinh pu tung) là cách nói tự nhiên nhất của người bản xứ.'
  },
  'làm ơn nói chậm lại': {
    en: 'Could you please speak slowly?',
    zh: '请说慢一点。',
    enPhonetics: 'Kút diu phli-z s-píc slo-li?',
    zhPhonetics: 'Chỉnh suô man di tiển.',
    meaning: 'Làm ơn nói chậm lại một chút.',
    enChunks: [
      { o: 'Could you please', v: 'Kút diu phli-z', ipa: '/kʊd juː pliːz/', m: 'bạn có thể vui lòng', t: 'kút diu' },
      { o: 'speak slowly?', v: 's-píc slo-li?', ipa: '/spiːk ˈsloʊli/', m: 'nói chậm lại?', t: 's-píc slo-li' }
    ],
    zhChunks: [
      { o: '请说', v: 'Chỉnh suô', ipa: 'qǐng shuō', m: 'xin nói', t: 'chỉnh suô' },
      { o: '慢一点。', v: 'man di tiển.', ipa: 'màn yìdiǎn', m: 'chậm một chút.', t: 'man di tiển' }
    ],
    enTip: 'Speak slowly đọc gọn "s-píc slo-li".',
    zhTip: '慢 (man) thanh 4 dứt khoát.'
  },
  'chúc bạn một ngày tốt lành': {
    en: 'Have a good day!',
    zh: '祝你度过愉快的一天！',
    enPhonetics: 'Hép ơ gút đây!',
    zhPhonetics: 'Tru nỉ tu cua du khoai tợ di then!',
    meaning: 'Chúc bạn một ngày tốt lành / vui vẻ!',
    enChunks: [
      { o: 'Have a', v: 'Hép ơ', ipa: '/hæv ə/', m: 'chúc có', t: 'hép ơ' },
      { o: 'good day!', v: 'gút đây!', ipa: '/ɡʊd deɪ/', m: 'ngày tốt lành!', t: 'gút đây' }
    ],
    zhChunks: [
      { o: '祝你', v: 'Tru nỉ', ipa: 'zhù nǐ', m: 'chúc bạn', t: 'tru nỉ' },
      { o: '度过愉快的一天！', v: 'tu cua du khoai tợ di then!', ipa: 'dùguò yúkuài de yì tiān', m: 'ngày vui vẻ!', t: 'du khoai' }
    ],
    enTip: 'Have a good day đọc liền mạch "hép ơ gút đây".',
    zhTip: '愉快 đọc du khoai, 一天 đọc di then.'
  },
  'tôi có thể thử cái này không': {
    en: 'Can I try this on?',
    zh: '我可以试一下这个吗？',
    enPhonetics: 'Cen nai trai đít on?',
    zhPhonetics: 'Ủa khở dỉ sư di xia chưa cờ ma?',
    meaning: 'Tôi có thể mặc thử / dùng thử cái này không?',
    enChunks: [
      { o: 'Can I try', v: 'Cen nai trai', ipa: '/kæn aɪ traɪ/', m: 'tôi có thể thử', t: 'cen nai trai' },
      { o: 'this on?', v: 'đít on?', ipa: '/ðɪs ɑːn/', m: 'cái này?', t: 'đít on' }
    ],
    zhChunks: [
      { o: '我可以', v: 'Ủa khở dỉ', ipa: 'wǒ kěyǐ', m: 'tôi có thể', t: 'khở dỉ' },
      { o: '试一下这个吗？', v: 'sư di xia chưa cờ ma?', ipa: 'shì yíxià zhè ge ma', m: 'thử cái này?', t: 'sư di xia' }
    ],
    enTip: 'Can I try đọc gọn "cen nai trai".',
    zhTip: '试一下 đọc sư di xia.'
  },
  'món này rất ngon': {
    en: 'This food is delicious!',
    zh: '这个菜很好吃！',
    enPhonetics: 'Đít phu-t i-z đì-lí-sợt!',
    zhPhonetics: 'Chưa cờ thai hẩn hảo chư!',
    meaning: 'Món ăn này rất ngon!',
    enChunks: [
      { o: 'This food is', v: 'Đít phu-t i-z', ipa: '/ðɪs fuːd ɪz/', m: 'món ăn này thì', t: 'đít phu-t' },
      { o: 'delicious!', v: 'đì-lí-sợt!', ipa: '/dɪˈlɪʃəs/', m: 'rất ngon!', t: 'đì-lí-sợt' }
    ],
    zhChunks: [
      { o: '这个菜', v: 'Chưa cờ thai', ipa: 'zhè ge cài', m: 'món này', t: 'thai là món' },
      { o: '很好吃！', v: 'hẩn hảo chư!', ipa: 'hěn hǎochī', m: 'rất ngon!', t: 'hảo chư' }
    ],
    enTip: 'Delicious phát âm ngắn gọn "đì-lí-sợt", nhấn vào lí.',
    zhTip: '好吃 đọc "hảo chư" ngân vang.'
  },
  'tạm biệt': {
    en: 'Goodbye, see you again!',
    zh: '再见！',
    enPhonetics: 'Gút-bai, si diu ơ-gen!',
    zhPhonetics: 'Chai chiên!',
    meaning: 'Tạm biệt, hẹn gặp lại!',
    enChunks: [
      { o: 'Goodbye,', v: 'Gút-bai,', ipa: '/ˌɡʊdˈbaɪ/', m: 'Tạm biệt', t: 'gút-bai' },
      { o: 'see you again!', v: 'si diu ơ-gen!', ipa: '/siː juː əˈɡen/', m: 'hẹn gặp lại!', t: 'si diu ơ-gen' }
    ],
    zhChunks: [{ o: '再见！', v: 'Chai chiên!', ipa: 'zàijiàn!', m: 'Tạm biệt!', t: 'Hai thanh 4 dứt khoát' }],
    enTip: 'Goodbye đọc gọn "gút-bai", see you again đọc "si diu ơ-gen".',
    zhTip: '再见 đọc "chai chiên" dứt khoát hai thanh 4.'
  }
};

// Word conversion for natural English phonetics
const EN_WORD_MAP: Record<string, { vi: string; ipa: string; m: string; pos?: string; note?: string }> = {
  hello: { vi: 'hê-LÂU', ipa: '/həˈloʊ/', m: 'Chào, xin chào', pos: 'Thán từ', note: 'Lời chào mở đầu cuộc trò chuyện.' },
  hi: { vi: 'HAI', ipa: '/haɪ/', m: 'Chào, xin chào (thân mật)', pos: 'Thán từ', note: 'Lời chào thân mật khi gặp gỡ.' },
  how: { vi: 'HAO', ipa: '/haʊ/', m: 'như thế nào, bằng cách nào', pos: 'Từ để hỏi', note: 'Dùng để hỏi về trạng thái của đối tượng.' },
  are: { vi: 'A', ipa: '/ɑːr/', m: 'thì, là, ở', pos: 'Động từ (tobe)', note: "Động từ liên kết chia theo chủ ngữ 'you'." },
  is: { vi: 'I-z', ipa: '/ɪz/', m: 'thì, là, ở', pos: 'Động từ (tobe)', note: 'Động từ liên kết chia theo ngôi thứ ba số ít.' },
  am: { vi: 'EM', ipa: '/æm/', m: 'thì, là, ở', pos: 'Động từ (tobe)', note: "Động từ liên kết đi cùng chủ ngữ 'I'." },
  be: { vi: 'BI', ipa: '/biː/', m: 'thì, là, ở, trở thành', pos: 'Động từ (tobe)', note: 'Động từ nguyên thể chỉ trạng thái hoặc sự tồn tại.' },
  you: { vi: 'DIU', ipa: '/juː/', m: 'bạn, các bạn, anh, chị, em', pos: 'Đại từ nhân xưng', note: 'Đại từ làm chủ ngữ hoặc tân ngữ trong câu.' },
  today: { vi: 'tu-ĐÂY', ipa: '/təˈdeɪ/', m: 'hôm nay, ngày nay', pos: 'Trạng từ', note: 'Trạng từ chỉ thời gian trong ngày.' },
  good: { vi: 'GÚT', ipa: '/ɡʊd/', m: 'tốt, đẹp, hay, giỏi', pos: 'Tính từ', note: 'Tính từ mô tả chất lượng hoặc lời chúc tích cực.' },
  morning: { vi: 'MO-ninh', ipa: '/ˈmɔːrnɪŋ/', m: 'buổi sáng, sáng sớm' },
  afternoon: { vi: 'áp-tơ-NUN', ipa: '/ˌæftərˈnuːn/', m: 'buổi chiều' },
  evening: { vi: 'ÍP-ninh', ipa: '/ˈiːvnɪŋ/', m: 'buổi tối' },
  night: { vi: 'NAI-t', ipa: '/naɪt/', m: 'đêm, ban đêm' },
  nice: { vi: 'NAI-s', ipa: '/naɪs/', m: 'đẹp, vui, tốt, dễ chịu' },
  to: { vi: 'thừ', ipa: '/tə/', m: 'để, đến, tới, cho' },
  meet: { vi: 'MÍT', ipa: '/miːt/', m: 'gặp, gặp gỡ, làm quen' },
  thank: { vi: 'THENK', ipa: '/θæŋk/', m: 'cảm ơn, biết ơn' },
  thanks: { vi: 'THENK-s', ipa: '/θæŋks/', m: 'cảm ơn, lời cảm ơn' },
  welcome: { vi: 'OEN-khơm', ipa: '/ˈwelkəm/', m: 'chào đón, hoan nghênh' },
  please: { vi: 'PHLI-z', ipa: '/pliːz/', m: 'làm ơn, xin vui lòng, nhé' },
  sorry: { vi: 'SO-ri', ipa: '/ˈsɒri/', m: 'xin lỗi, lấy làm tiếc' },
  yes: { vi: 'DÉT', ipa: '/jes/', m: 'vâng, có, đúng' },
  no: { vi: 'NÂU', ipa: '/noʊ/', m: 'không' },
  what: { vi: 'OÁT', ipa: '/wʌt/', m: 'cái gì, gì, điều gì' },
  it: { vi: 'IT', ipa: '/ɪt/', m: 'nó, điều đó' },
  "it's": { vi: 'ÍT-s', ipa: '/ɪts/', m: 'nó là, đã là' },
  closing: { vi: 'KHỜ-LÂU-zing', ipa: '/ˈkloʊzɪŋ/', m: 'đóng cửa, kết thúc' },
  time: { vi: 'THAIM', ipa: '/taɪm/', m: 'thời gian, lúc, giờ' },
  your: { vi: 'GIO', ipa: '/jɔːr/', m: 'của bạn, của các bạn' },
  name: { vi: 'NÊM', ipa: '/neɪm/', m: 'tên, tên gọi' },
  my: { vi: 'MAI', ipa: '/maɪ/', m: 'của tôi, của mình' },
  i: { vi: 'AI', ipa: '/aɪ/', m: 'tôi, mình' },
  fine: { vi: 'PHAIN', ipa: '/faɪn/', m: 'khỏe, tốt, ổn' },
  and: { vi: 'en', ipa: '/ænd/', m: 'và, cùng với' },
  can: { vi: 'KHEN', ipa: '/kæn/', m: 'có thể, biết, được phép' },
  could: { vi: 'KÚT', ipa: '/kʊd/', m: 'có thể (lịch sự)' },
  help: { vi: 'HÉP', ipa: '/help/', m: 'giúp đỡ, hỗ trợ' },
  me: { vi: 'MI', ipa: '/miː/', m: 'tôi, mình, cho tôi' },
  much: { vi: 'MÁT', ipa: '/mʌtʃ/', m: 'nhiều, rất nhiều' },
  where: { vi: 'UE', ipa: '/weər/', m: 'ở đâu, nơi nào' },
  check: { vi: 'CHECK', ipa: '/tʃek/', m: 'hóa đơn, kiểm tra' },
  bill: { vi: 'BIU', ipa: '/bɪl/', m: 'hóa đơn, phiếu tính tiền' },
  water: { vi: 'OA-tơ', ipa: '/ˈwɔːtər/', m: 'nước, nước uống' },
  coffee: { vi: 'CÓ-phi', ipa: '/ˈkɔːfi/', m: 'cà phê, ly cà phê' },
  tea: { vi: 'THI', ipa: '/tiː/', m: 'trà, nước trà' },
  hotel: { vi: 'hô-TEN', ipa: '/hoʊˈtel/', m: 'khách sạn' },
  airport: { vi: 'E-pót', ipa: '/ˈerpɔːrt/', m: 'sân bay, phi trường' },
  taxi: { vi: 'TÁC-xi', ipa: '/ˈtæksi/', m: 'xe taxi, tắc xi' },
  hospital: { vi: 'HÓT-s-pi-từn', ipa: '/ˈhɑːspɪtl/', m: 'bệnh viện' },
  restaurant: { vi: 'RÉ-stơ-rơn', ipa: '/ˈrestrɑːnt/', m: 'nhà hàng' },
  supermarket: { vi: 'SU-pơ-mác-kịt', ipa: '/ˈsuːpərmɑːrkɪt/', m: 'siêu thị' },
  subway: { vi: 'SÁP-uê', ipa: '/ˈsʌbweɪ/', m: 'tàu điện ngầm' },
  station: { vi: 's-TÂY-sừn', ipa: '/ˈsteɪʃn/', m: 'nhà ga, trạm' },
  delicious: { vi: 'đì-LÍ-sợt', ipa: '/dɪˈlɪʃəs/', m: 'ngon, thơm ngon, tuyệt hảo' },
  speak: { vi: 's-PÍC', ipa: '/spiːk/', m: 'nói, nói chuyện' },
  english: { vi: 'ÍNG-lít', ipa: '/ˈɪŋɡlɪʃ/', m: 'tiếng Anh' },
  learn: { vi: 'LƠN', ipa: '/lɜːrn/', m: 'học, học hỏi' },
  want: { vi: 'OÁN', ipa: '/wɑːnt/', m: 'muốn, mong muốn, cần' },
  like: { vi: 'LAI', ipa: '/laɪk/', m: 'thích, muốn, như là' },
  would: { vi: 'ÚT', ipa: '/wʊd/', m: 'muốn, sẽ' },
  have: { vi: 'HÉP', ipa: '/hæv/', m: 'có, dùng, ăn uống, trải qua' },
  day: { vi: 'ĐÂY', ipa: '/deɪ/', m: 'ngày, ban ngày' },
  see: { vi: 'SI', ipa: '/siː/', m: 'thấy, nhìn, gặp' },
  again: { vi: 'ơ-GEN', ipa: '/əˈɡen/', m: 'lại, lần nữa' },
  bye: { vi: 'BAI', ipa: '/baɪ/', m: 'tạm biệt, chào nhé' },
  slowly: { vi: 'SLO-li', ipa: '/ˈsloʊli/', m: 'chậm, chậm rãi' },
  food: { vi: 'PHU-t', ipa: '/fuːd/', m: 'đồ ăn, món ăn' },
  weather: { vi: 'UE-đơ', ipa: '/ˈweðər/', m: 'thời tiết, khí hậu' },
  very: { vi: 'VE-ri', ipa: '/ˈveri/', m: 'rất, cực kỳ' },
  this: { vi: 'ĐÍT', ipa: '/ðɪs/', m: 'cái này, điều này' },
  that: { vi: 'ĐÁT', ipa: '/ðæt/', m: 'cái kia, cái đó' },
  take: { vi: 'THÊK', ipa: '/teɪk/', m: 'lấy, mang, đưa' },
  care: { vi: 'KE', ipa: '/ker/', m: 'chăm sóc, quan tâm' },
  easy: { vi: 'I-zi', ipa: '/ˈiːzi/', m: 'dễ dàng, đơn giản' },
  everything: { vi: 'ÉV-ri-thing', ipa: '/ˈevriθɪŋ/', m: 'mọi thứ, tất cả' },
  will: { vi: 'UYN', ipa: '/wɪl/', m: 'sẽ' },
  understand: { vi: 'ân-đơ-s-TEN', ipa: '/ˌʌndərˈstænd/', m: 'hiểu, nắm bắt, hiểu được' }
};

// Word conversion for natural Chinese phonetics
const ZH_WORD_MAP: Record<string, { vi: string; py: string; m: string; pos?: string; note?: string }> = {
  你好: { vi: 'Ní HẢO', py: 'nǐ hǎo', m: 'Chào, xin chào', pos: 'Thán từ', note: 'Lời chào phổ biến nhất mở đầu cuộc trò chuyện.' },
  您好: { vi: 'Nín HẢO', py: 'nín hǎo', m: 'Chào ngài, xin chào quý khách', pos: 'Thán từ', note: 'Lời chào lịch sự, kính trọng.' },
  谢谢: { vi: 'XIÊ xiê', py: 'xièxie', m: 'cảm ơn, xin cảm ơn', pos: 'Thán từ', note: 'Từ dùng để bày tỏ lòng biết ơn.' },
  再见: { vi: 'chai CHIÊN', py: 'zàijiàn', m: 'tạm biệt, hẹn gặp lại', pos: 'Thán từ', note: 'Lời chào khi chia tay.' },
  不客气: { vi: 'pú KHƯA chi', py: 'bù kèqi', m: 'đừng khách sáo, không có gì' },
  对不起: { vi: 'thuây pu CHỈ', py: 'duìbuqǐ', m: 'xin lỗi, thật có lỗi' },
  没关系: { vi: 'mấy QUAN xi', py: 'méi guānxi', m: 'không sao đâu, không có gì' },
  多少钱: { vi: 'tua sao CHÉN?', py: 'duōshao qián?', m: 'bao nhiêu tiền?' },
  太贵了: { vi: 'thai CÙY lơ!', py: 'tài guì le!', m: 'đắt quá rồi!' },
  便宜一点: { vi: 'phiến di di TIỂN', py: 'piányi yìdiǎn', m: 'rẻ hơn một chút' },
  结账: { vi: 'chiế TRANG', py: 'jiézhàng', m: 'tính tiền, thanh toán' },
  买单: { vi: 'mải ĐAN', py: 'mǎidān', m: 'thanh toán, tính tiền' },
  服务员: { vi: 'phú u DIỂN', py: 'fúwùyuán', m: 'nhân viên phục vụ' },
  请问: { vi: 'chỉnh UẦN', py: 'qǐngwèn', m: 'xin hỏi, làm ơn cho hỏi' },
  在哪里: { vi: 'chai nả LỈ?', py: 'zài nǎlǐ?', m: 'ở đâu, tại đâu?' },
  地铁站: { vi: 'ti thiết TRANG', py: 'dìtiě zhàn', m: 'ga tàu điện ngầm' },
  机场: { vi: 'chi TRẢNG', py: 'jīchǎng', m: 'sân bay, phi trường' },
  酒店: { vi: 'chiểu TIỆM', py: 'jiǔdiàn', m: 'khách sạn' },
  洗手间: { vi: 'xỉ sẩu CHEN', py: 'xǐshǒujiān', m: 'nhà vệ sinh' },
  好吃: { vi: 'hảo CHƯ', py: 'hǎochī', m: 'ngon, ngon miệng' },
  喝水: { vi: 'hư SUẨY', py: 'hē shuǐ', m: 'uống nước' },
  咖啡: { vi: 'kha PHÂY', py: 'kāfēi', m: 'cà phê' },
  听不懂: { vi: 'thinh pu TUNG', py: 'tīng bu dǒng', m: 'nghe không hiểu' },
  很高兴认识你: { vi: 'Hẩn cao xing rân sử nỉ', py: 'hěn gāoxìng rènshi nǐ', m: 'rất vui được quen bạn' },
  你今天过得怎么样: { vi: 'Nỉ chin then cua tợ chẩn mơ DANG?', py: 'nǐ jīntiān guò de zěnmeyàng?', m: 'hôm nay bạn thế nào?' },
  到: { vi: 'TÀO', py: 'dào', m: 'đến, tới, đạt tới' },
  打烊: { vi: 'tà DANG', py: 'dǎyàng', m: 'đóng cửa quán, nghỉ bán' },
  时间: { vi: 'sử CHIÊN', py: 'shíjiān', m: 'thời gian, lúc, giờ' },
  了: { vi: 'lơ', py: 'le', m: 'rồi, đã' },
  到打烊时间了: { vi: 'Tào tà dang sử chiên lơ', py: 'dào dǎyàng shíjiān le', m: 'đã đến giờ đóng cửa rồi' }
};

// Advanced Linguistic Fallback Engine
function generateServerFallback(text: string, lang: string, preTranslatedTarget?: string, isInputDifferent?: boolean) {
  const clean = text.trim();
  const lower = clean.toLowerCase().replace(/[.,!?;:]/g, '');
  const isQuestion = clean.endsWith('?') || /^(ai|gì|đâu|nào|mấy|bao nhiêu|sao|không|tại sao)/i.test(lower);
  const isVi = isVietnameseText(clean);
  const targetMeta = LANGUAGE_META[lang] || {
    name: lang,
    nativeName: lang,
    rule: '',
    speechCode: lang,
  };

  // If user entered Vietnamese text: auto translate to selected target language
  if (isVi || isInputDifferent) {
    for (const [key, val] of Object.entries(VI_TRANSLATION_MAP)) {
      if (lower === key) {
        const targetText = lang === 'zh' ? val.zh : (lang === 'en' ? val.en : (preTranslatedTarget || val.en));
        const targetPhonetics = lang === 'zh' ? val.zhPhonetics : val.enPhonetics;
        const tip = lang === 'zh' ? val.zhTip : val.enTip;
        const rawChunks = lang === 'zh' ? val.zhChunks : val.enChunks;

        const chunks = rawChunks.map((c) => ({
          original: c.o,
          phoneticsVi: c.v,
          ipaOrPinyin: c.ipa,
          partOfSpeech: inferPartOfSpeech(c.o, lang),
          meaningVi: c.m,
          detailedExplanation: `Từ/cụm từ "${c.o}" giữ vai trò ngữ pháp chính với nghĩa "${c.m}" trong ngữ cảnh câu này.`,
          stressAndLiaisonTip: c.t,
        }));

        return {
          originalText: targetText,
          inputWasVietnamese: true,
          vietnameseSourceText: clean,
          language: lang,
          fullVietnamesePhonetics: targetPhonetics,
          fullVietnameseMeaning: val.meaning,
          sentenceType: isQuestion ? (lang === 'zh' ? 'Câu hỏi tiếng Trung' : 'Câu hỏi tiếng Anh') : 'Câu giao tiếp chuẩn',
          intonation: {
            direction: isQuestion ? (targetText.toLowerCase().startsWith('what') || targetText.toLowerCase().startsWith('where') || targetText.toLowerCase().startsWith('how') ? 'falling' : 'rising') : 'falling',
            symbol: isQuestion && !/^(what|where|how|why)/i.test(targetText) ? '↗' : '↘',
            rule: isQuestion ? 'Ngữ điệu câu hỏi tự nhiên' : 'Xuống giọng tự nhiên ở cuối câu',
          },
          chunks,
          words: generateWordList(targetText, lang, chunks),
          pronunciationTips: [
            tip,
            `Đã tự động chuyển từ Tiếng Việt sang ${targetMeta.name} chuẩn bản ngữ.`,
          ],
        };
      }
    }

    // When Vietnamese or different language text is entered and target language is English, Chinese or other
    // Ensure Khối 1 (originalText) is strictly converted to the target language
    let translatedTarget = preTranslatedTarget && preTranslatedTarget.trim() ? preTranslatedTarget.trim() : clean;
    let targetPhonetics = clean;

    if (preTranslatedTarget && preTranslatedTarget.trim()) {
      translatedTarget = preTranslatedTarget.trim();
    } else if (lang === 'en') {
      // Map basic words to English
      const enWordDict: Record<string, string> = {
        'tôi': 'I', 'bạn': 'you', 'chúng tôi': 'we', 'họ': 'they', 'anh ấy': 'he', 'cô ấy': 'she',
        'muốn': 'want to', 'cần': 'need', 'thích': 'like', 'uống': 'drink', 'ăn': 'eat',
        'cà phê': 'coffee', 'trà': 'tea', 'nước': 'water', 'khách sạn': 'hotel', 'sân bay': 'airport',
        'bao nhiêu': 'how much', 'tiền': 'money', 'giúp': 'help', 'ở đâu': 'where is',
        'hôm nay': 'today', 'ngày mai': 'tomorrow', 'rất': 'very', 'đẹp': 'beautiful',
        'ngon': 'delicious', 'tốt': 'good', 'cảm ơn': 'thank you', 'xin chào': 'hello',
        'tạm biệt': 'goodbye', 'không': 'no', 'có': 'yes', 'làm ơn': 'please',
      };
      let trans = clean.toLowerCase();
      for (const [k, v] of Object.entries(enWordDict)) {
        trans = trans.replace(new RegExp(`\\b${k}\\b`, 'gi'), v);
      }
      translatedTarget = trans.charAt(0).toUpperCase() + trans.slice(1);
      if (isQuestion && !translatedTarget.endsWith('?')) translatedTarget += '?';
    } else if (lang === 'zh') {
      const zhWordDict: Record<string, string> = {
        'tôi': '我', 'bạn': '你', 'chúng tôi': '我们', 'muốn': '想', 'cần': '需要',
        'uống': '喝', 'ăn': '吃', 'cà phê': '咖啡', 'trà': '茶', 'nước': '水',
        'khách sạn': '酒店', 'sân bay': '机场', 'bao nhiêu tiền': '多少钱',
        'ở đâu': '在哪里', 'hôm nay': '今天', 'rất': '很', 'tốt': '好', 'cảm ơn': '谢谢',
        'xin chào': '你好', 'tạm biệt': '再见', 'làm ơn': '请',
      };
      let trans = clean.toLowerCase();
      for (const [k, v] of Object.entries(zhWordDict)) {
        trans = trans.replace(new RegExp(k, 'gi'), v);
      }
      translatedTarget = trans;
    }

    // Split target sentence into words to build chunks in the target language
    const words = (lang === 'zh' || lang === 'ja')
      ? Array.from(translatedTarget)
      : translatedTarget.split(/\s+/);

    const phoneticList: string[] = [];
    const chunks = words.filter(w => Boolean(w.trim())).map((w) => {
      const wClean = w.replace(/[.,!?;:]/g, '');
      const enEntry = lang === 'en' ? EN_WORD_MAP[wClean.toLowerCase()] : null;
      const viPhonetic = enEntry ? enEntry.vi : (lang === 'en' ? approximateCleanPhonetic(wClean) : wClean);
      const ipa = enEntry ? enEntry.ipa : (lang === 'zh' ? 'Pinyin' : `/${wClean}/`);
      const mean = enEntry ? enEntry.m : (lang === 'en' ? w : 'Từ vựng');
      const pos = inferPartOfSpeech(wClean, lang);
      phoneticList.push(viPhonetic);

      return {
        original: w,
        phoneticsVi: viPhonetic,
        ipaOrPinyin: ipa,
        partOfSpeech: pos,
        meaningVi: mean,
        detailedExplanation: `Từ "${w}" trong câu giao tiếp chuẩn ${targetMeta.name}.`,
        stressAndLiaisonTip: 'Đọc âm điệu tự nhiên chuẩn bản ngữ',
      };
    });

    if (phoneticList.length > 0) {
      targetPhonetics = phoneticList.join(' ');
      targetPhonetics = targetPhonetics.charAt(0).toUpperCase() + targetPhonetics.slice(1);
    }

    return {
      originalText: translatedTarget,
      inputWasVietnamese: true,
      vietnameseSourceText: clean,
      language: lang,
      fullVietnamesePhonetics: targetPhonetics,
      fullVietnameseMeaning: clean,
      sentenceType: isQuestion ? 'Câu hỏi giao tiếp' : 'Câu giao tiếp',
      intonation: {
        direction: isQuestion ? 'rising' : 'falling',
        symbol: isQuestion ? '↗' : '↘',
        rule: 'Ngữ điệu câu tự nhiên',
      },
      chunks,
      words: generateWordList(translatedTarget, lang, chunks),
      pronunciationTips: [
        `Đã tự động nhận diện và chuyển đổi sang ${targetMeta.name} chuẩn bản xứ.`,
      ],
    };
  }

  // Chinese direct input
  if (lang === 'zh') {
    // Check known Chinese sentences/phrases
    for (const [key, val] of Object.entries(ZH_WORD_MAP)) {
      if (clean.includes(key)) {
        return {
          originalText: clean,
          inputWasVietnamese: false,
          language: 'zh',
          fullVietnamesePhonetics: val.vi,
          fullVietnameseMeaning: val.m,
          sentenceType: isQuestion ? 'Câu hỏi tiếng Trung' : 'Câu giao tiếp tiếng Trung',
          intonation: {
            direction: isQuestion ? 'rising' : 'falling',
            symbol: isQuestion ? '↗' : '↘',
            rule: isQuestion ? 'Lên giọng ở cuối câu hỏi hoặc giữ cao thanh điệu' : 'Xuống giọng dứt khoát ở thanh 4',
          },
          chunks: [
            {
              original: key,
              phoneticsVi: val.vi,
              ipaOrPinyin: val.py,
              partOfSpeech: inferPartOfSpeech(key, 'zh'),
              meaningVi: val.m,
              detailedExplanation: `Cụm từ "${key}" (${val.py}) có nghĩa "${val.m}", thuộc dạng ${inferPartOfSpeech(key, 'zh')}.`,
              stressAndLiaisonTip: 'Chú ý thanh điệu tự nhiên',
            },
          ],
          words: generateWordList(clean, 'zh'),
          pronunciationTips: [
            'Phát âm to, rõ thanh điệu, các âm như z, c, s không bật hơi quá mạnh.',
          ],
        };
      }
    }

    // Generic Chinese transliteration with Pinyin approximation
    return {
      originalText: clean,
      inputWasVietnamese: false,
      language: 'zh',
      fullVietnamesePhonetics: clean,
      fullVietnameseMeaning: 'Nghĩa tiếng Việt câu giao tiếp',
      sentenceType: isQuestion ? 'Câu hỏi' : 'Câu trần thuật',
      intonation: {
        direction: isQuestion ? 'rising' : 'falling',
        symbol: isQuestion ? '↗' : '↘',
        rule: 'Ngữ điệu tiếng Trung phụ thuộc vào 4 thanh điệu của từng chữ',
      },
      chunks: [
        {
          original: clean,
          phoneticsVi: clean,
          ipaOrPinyin: 'Pinyin',
          partOfSpeech: 'Cụm từ',
          meaningVi: 'Nghĩa câu',
          detailedExplanation: 'Cụm từ tiếng Trung giao tiếp tự nhiên.',
          stressAndLiaisonTip: 'Chú ý thanh điệu và biến điệu',
        },
      ],
      words: generateWordList(clean, 'zh'),
      pronunciationTips: ['Luyện nghe mẫu âm thanh và đọc theo nhịp tự nhiên.'],
    };
  }

  // English direct input: chunk and map words cleanly
  const words = clean.split(/\s+/);
  const chunks: any[] = [];
  const fullViWords: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const raw = words[i].replace(/[.,!?;:]/g, '').toLowerCase();
    const entry = EN_WORD_MAP[raw];
    const vi = entry ? entry.vi : approximateCleanPhonetic(raw);
    const ipa = entry ? entry.ipa : `/${raw}/`;
    const mean = entry ? entry.m : words[i];
    const pos = inferPartOfSpeech(words[i], 'en');

    chunks.push({
      original: words[i],
      phoneticsVi: vi,
      ipaOrPinyin: ipa,
      partOfSpeech: pos,
      meaningVi: mean,
      detailedExplanation: `Từ "${words[i]}" mang nghĩa "${mean}", đóng vai trò ${pos} trong cấu trúc câu.`,
      stressAndLiaisonTip: 'Đọc ngắn gọn, chuẩn âm',
    });
    fullViWords.push(vi);
  }

  const isWh = /^(what|where|when|why|who|how|which)/i.test(clean);
  const direction = isQuestion ? (isWh ? 'falling' : 'rising') : 'falling';
  const symbol = direction === 'rising' ? '↗' : '↘';

  // Capitalize first letter of whole sentence phonetics
  let sentencePhonetics = fullViWords.join(' ');
  if (sentencePhonetics.length > 0) {
    sentencePhonetics = sentencePhonetics.charAt(0).toUpperCase() + sentencePhonetics.slice(1);
  }
  if (isQuestion && !sentencePhonetics.endsWith('?')) {
    sentencePhonetics += '?';
  }

  const lowerTrimmed = clean.toLowerCase().replace(/[.,!?;:]/g, '');
  let exactMeaningVi = 'Nghĩa tiếng Việt câu giao tiếp';
  if (VI_TRANSLATION_MAP[lowerTrimmed]) {
    exactMeaningVi = VI_TRANSLATION_MAP[lowerTrimmed].meaning;
  } else {
    // Generate meaning from words
    const meanParts = words.map(w => {
      const raw = w.replace(/[.,!?;:]/g, '').toLowerCase();
      return EN_WORD_MAP[raw]?.m || w;
    });
    exactMeaningVi = meanParts.join(' ');
  }

  return {
    originalText: clean,
    language: 'en',
    fullVietnamesePhonetics: sentencePhonetics,
    fullVietnameseMeaning: exactMeaningVi,
    sentenceType: isQuestion ? (isWh ? 'Câu hỏi Wh-' : 'Câu hỏi Yes/No') : 'Câu trần thuật',
    intonation: {
      direction,
      symbol,
      rule: isQuestion
        ? (isWh ? 'Xuống giọng ↘ ở cuối câu hỏi Wh-' : 'Lên giọng ↗ ở cuối câu hỏi Yes/No')
        : 'Xuống giọng ↘ ở cuối câu trần thuật',
    },
    chunks,
    words: generateWordList(clean, 'en', chunks),
    pronunciationTips: [
      'Đọc các âm vần tự nhiên, thả lỏng quai hàm, không rườm rà.',
      'Nhấn nhẹ vào các từ khóa mang thông tin chính trong câu.',
    ],
  };
}

// Simple and clean syllable generator for any unlisted English word
function approximateCleanPhonetic(w: string): string {
  if (!w) return '';
  const word = w.toLowerCase();
  if (word === 'are') return 'a';
  if (word === 'you') return 'diu';
  if (word === 'how') return 'hao';
  if (word === 'today') return 'tu-đây';
  if (word === 'the') return 'đờ';
  if (word === 'for') return 'pho';
  if (word === 'with') return 'uýt';
  if (word === 'this') return 'đít';
  if (word === 'that') return 'đát';
  if (word === 'is') return 'i-z';
  if (word === 'it') return 'it';
  if (word === 'can') return 'khen';
  if (word === 'could') return 'kút';
  if (word === 'please') return 'phli-z';
  if (word === 'help') return 'hép';
  if (word === 'me') return 'mi';
  if (word === 'we') return 'uy';
  if (word === 'they') return 'đây';
  if (word === 'he') return 'hi';
  if (word === 'she') return 'xi';
  return word;
}

// Helper to fetch high-fidelity native pronunciation audio stream
async function fetchNativeSpeechAudio(text: string, langCode: string): Promise<{ data: string; mimeType: string } | null> {
  try {
    const speechCode = LANGUAGE_META[langCode]?.speechCode || langCode || 'en';
    const cleanText = text.slice(0, 250).trim();
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=${encodeURIComponent(speechCode)}&client=tw-ob`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/',
      },
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      return {
        data: base64,
        mimeType: 'audio/mpeg',
      };
    }
  } catch (err) {
    console.warn('Native speech fetch error:', err);
  }
  return null;
}

// Direct audio streaming endpoint for instant playback in <audio> elements
app.get('/api/tts/audio', async (req, res) => {
  try {
    const text = (req.query.text as string) || '';
    const lang = (req.query.language as string) || 'en';
    if (!text.trim()) {
      return res.status(400).send('No text provided');
    }

    const speechCode = LANGUAGE_META[lang]?.speechCode || lang || 'en';
    const clean = text.slice(0, 250).trim();
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(clean)}&tl=${encodeURIComponent(speechCode)}&client=tw-ob`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/',
      },
    });

    if (!response.ok) {
      return res.status(502).send('Upstream error');
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const buffer = await response.arrayBuffer();
    return res.send(Buffer.from(buffer));
  } catch (err: any) {
    return res.status(500).send(err?.message || 'Server error');
  }
});

// Robust TTS endpoint with Gemini AI TTS and Native Pronunciation fallback
app.post('/api/tts', async (req, res) => {
  try {
    const { text, language } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Thiếu nội dung đọc' });
    }

    const langCode = (language || 'en').toLowerCase();

    // 1. Attempt Gemini AI TTS first if configured and has quota
    if (apiKey) {
      try {
        const voiceName = langCode === 'zh' ? 'Kore' : 'Zephyr';
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash-lite-tts',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: text.slice(0, 200),
                  speechMetadata: {
                    style: 'Clear, natural, articulate pronunciation tutor',
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          return res.json({
            audioBase64: base64Audio,
            mimeType: 'audio/wav',
          });
        }
      } catch {
        // Quota exceeded (429) or transient error -> seamless fallback to high-fidelity native audio
      }
    }

    // 2. High-fidelity native speech audio fallback
    const nativeAudio = await fetchNativeSpeechAudio(text, langCode);
    if (nativeAudio) {
      return res.json({
        audioBase64: nativeAudio.data,
        mimeType: nativeAudio.mimeType,
      });
    }

    return res.status(500).json({ error: 'Không thể tạo âm thanh' });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Lỗi xử lý phát âm' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (production: ${isProduction})`);
  });
}

startServer();

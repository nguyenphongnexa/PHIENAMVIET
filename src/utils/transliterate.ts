import { SupportedLanguage, getLanguageConfig } from './speech';

export interface WordAnalysis {
  word: string;
  partOfSpeech: string;
  phoneticsVi: string;
  meaningVi: string;
  ipaOrPinyin?: string;
  usageNote?: string;
}

export interface TranscriptionChunk {
  original: string;
  phoneticsVi: string;
  ipaOrPinyin: string;
  partOfSpeech?: string;
  meaningVi: string;
  detailedExplanation?: string;
  stressAndLiaisonTip: string;
}

export interface TranscriptionResult {
  originalText: string;
  language: SupportedLanguage;
  fullVietnamesePhonetics: string;
  fullVietnameseMeaning: string;
  sentenceType: string;
  inputWasVietnamese?: boolean;
  vietnameseSourceText?: string;
  intonation: {
    direction: 'rising' | 'falling' | 'fall-rise' | 'level';
    symbol: '↗' | '↘' | '⤵' | '→';
    rule: string;
  };
  chunks: TranscriptionChunk[];
  words?: WordAnalysis[];
  pronunciationTips: string[];
}

// Built-in high accuracy dictionary with concise, natural Vietnamese phonetics
const EN_QUICK_DICT: Record<string, { vi: string; ipa: string; meaning: string; tip?: string }> = {
  hello: { vi: 'Hê-lâu', ipa: '/həˈloʊ/', meaning: 'xin chào', tip: 'Nhấn âm lâu' },
  hi: { vi: 'Hai', ipa: '/haɪ/', meaning: 'chào', tip: 'Âm ai rõ ràng' },
  how: { vi: 'Hao', ipa: '/haʊ/', meaning: 'thế nào / làm sao', tip: 'Tròn môi ở âm ao' },
  are: { vi: 'A', ipa: '/ɑːr/', meaning: 'thì / là', tip: 'Hạ hàm tự nhiên' },
  you: { vi: 'Diu', ipa: '/juː/', meaning: 'bạn', tip: 'Chu môi nhẹ' },
  today: { vi: 'tu-đây', ipa: '/təˈdeɪ/', meaning: 'hôm nay', tip: 'Nhấn vào đây, đọc gọn tu-đây' },
  good: { vi: 'Gút', ipa: '/ɡʊd/', meaning: 'tốt', tip: 'Âm u ngắn gọn' },
  morning: { vi: 'Mo-ninh', ipa: '/ˈmɔːrnɪŋ/', meaning: 'buổi sáng', tip: 'Nhấn vào mo' },
  afternoon: { vi: 'Áp-tơ-nun', ipa: '/ˌæftərˈnuːn/', meaning: 'buổi chiều', tip: 'Nhấn vào nun' },
  evening: { vi: 'Íp-ninh', ipa: '/ˈiːvnɪŋ/', meaning: 'buổi tối', tip: 'Nhấn vào íp' },
  night: { vi: 'Nai-t', ipa: '/naɪt/', meaning: 'đêm', tip: 'Bật nhẹ t' },
  nice: { vi: 'Nai-s', ipa: '/naɪs/', meaning: 'đẹp / vui vẻ', tip: 'Xì nhẹ s ở cuối' },
  to: { vi: 'thừ', ipa: '/tə/', meaning: 'để', tip: 'Âm lướt nhẹ' },
  meet: { vi: 'Mít', ipa: '/miːt/', meaning: 'gặp gỡ', tip: 'Đọc gọn mít' },
  thank: { vi: 'Thenk', ipa: '/θæŋk/', meaning: 'cảm ơn', tip: 'Kẹp lưỡi nhẹ' },
  thanks: { vi: 'Thenk-s', ipa: '/θæŋks/', meaning: 'cảm ơn', tip: 'Xì s cuối' },
  welcome: { vi: 'Oen-khơm', ipa: '/ˈwelkəm/', meaning: 'chào đón', tip: 'Nhấn oen' },
  please: { vi: 'Phli-z', ipa: '/pliːz/', meaning: 'làm ơn', tip: 'Rung nhẹ z' },
  sorry: { vi: 'So-ri', ipa: '/ˈsɒri/', meaning: 'xin lỗi', tip: 'Nhấn so' },
  yes: { vi: 'Dét', ipa: '/jes/', meaning: 'vâng / có', tip: 'Gọn gàng' },
  no: { vi: 'Nâu', ipa: '/noʊ/', meaning: 'không', tip: 'Nguyên âm đôi' },
  what: { vi: 'Oát', ipa: '/wʌt/', meaning: 'cái gì', tip: 'Gọn gàng' },
  is: { vi: 'i-z', ipa: '/ɪz/', meaning: 'là', tip: 'Rung nhẹ z' },
  it: { vi: 'it', ipa: '/ɪt/', meaning: 'nó', tip: 'Gọn gàng' },
  your: { vi: 'gio', ipa: '/jɔːr/', meaning: 'của bạn', tip: 'Tròn môi' },
  name: { vi: 'nêm', ipa: '/neɪm/', meaning: 'tên', tip: 'Khép môi âm m' },
  my: { vi: 'Mai', ipa: '/maɪ/', meaning: 'của tôi', tip: 'Âm ai' },
  i: { vi: 'Ai', ipa: '/aɪ/', meaning: 'tôi', tip: 'Rõ ràng' },
  am: { vi: 'em', ipa: '/æm/', meaning: 'là', tip: 'Khép môi' },
  fine: { vi: 'phain', ipa: '/faɪn/', meaning: 'khỏe', tip: 'Gọn gàng' },
  and: { vi: 'en', ipa: '/ænd/', meaning: 'và', tip: 'Lướt nhẹ' },
  can: { vi: 'khen', ipa: '/kæn/', meaning: 'có thể', tip: 'Gọn gàng' },
  could: { vi: 'kút', ipa: '/kʊd/', meaning: 'có thể', tip: 'Âm u ngắn' },
  help: { vi: 'hép', ipa: '/help/', meaning: 'giúp đỡ', tip: 'Đọc gọn hép' },
  me: { vi: 'mi', ipa: '/miː/', meaning: 'tôi', tip: 'Âm i' },
  how_much: { vi: 'Hao mát', ipa: '/haʊ mʌtʃ/', meaning: 'bao nhiêu tiền', tip: 'Đọc gọn mát' },
  where: { vi: 'Ue', ipa: '/weər/', meaning: 'ở đâu', tip: 'Gọn gàng' },
  check: { vi: 'check', ipa: '/tʃek/', meaning: 'hóa đơn', tip: 'Bật âm ch' },
  water: { vi: 'oa-tơ', ipa: '/ˈwɔːtər/', meaning: 'nước uống', tip: 'Gọn gàng' },
  coffee: { vi: 'có-phi', ipa: '/ˈkɔːfi/', meaning: 'cà phê', tip: 'Nhấn có' },
  subway: { vi: 'sáp-uê', ipa: '/ˈsʌbweɪ/', meaning: 'tàu điện ngầm', tip: 'Nhấn sáp' },
  station: { vi: 's-tây-sừn', ipa: '/ˈsteɪʃn/', meaning: 'nhà ga', tip: 'Nhấn tây' },
};

const ZH_QUICK_DICT: Record<string, { vi: string; pinyin: string; meaning: string; tip?: string }> = {
  你好: { vi: 'Ní hảo', pinyin: 'nǐ hǎo', meaning: 'xin chào', tip: 'Biến điệu 2 thanh 3 thành thanh 2 + thanh 3' },
  早上好: { vi: 'Chảo sẳng hảo', pinyin: 'zǎoshang hǎo', meaning: 'chào buổi sáng', tip: 'Chữ 上 đọc thanh nhẹ' },
  晚上好: { vi: 'Uản sẳng hảo', pinyin: 'wǎnshang hǎo', meaning: 'chào buổi tối', tip: 'Chữ 上 đọc thanh nhẹ' },
  再见: { vi: 'Chai chiên', pinyin: 'zàijiàn', meaning: 'tạm biệt', tip: 'Hai thanh 4 dứt khoát' },
  谢谢: { vi: 'Xiê xiê', pinyin: 'xièxie', meaning: 'cảm ơn', tip: 'Chữ sau đọc thanh nhẹ' },
  不客气: { vi: 'Pú khưa chi', pinyin: 'bù kèqi', meaning: 'đừng khách sáo / không có gì', tip: 'Chữ 不 biến điệu thành pú' },
  对不起: { vi: 'Thuây pu chỉ', pinyin: 'duìbuqǐ', meaning: 'xin lỗi', tip: 'Chữ 不 đọc thanh nhẹ' },
  没关系: { vi: 'Mấy quan xi', pinyin: 'méi guānxi', meaning: 'không sao đâu', tip: 'Chữ 系 đọc thanh nhẹ' },
  多少钱: { vi: 'Tua sao chén?', pinyin: 'duōshao qián?', meaning: 'bao nhiêu tiền?', tip: '多少 đọc thanh 1 + thanh nhẹ' },
  太贵了: { vi: 'Thai cùy lơ!', pinyin: 'tài guì le!', meaning: 'đắt quá rồi!', tip: 'Nhấn mạnh vào 太 (thai)' },
  便宜一点: { vi: 'Phiến di di tiển', pinyin: 'piányi yìdiǎn', meaning: 'rẻ hơn một chút', tip: 'Yìdiǎn biến âm tự nhiên' },
  结账: { vi: 'Chiế trang', pinyin: 'jiézhàng', meaning: 'tính tiền', tip: 'Thanh 2 + thanh 4 dứt khoát' },
  买单: { vi: 'Mải đan', pinyin: 'mǎidān', meaning: 'thanh toán', tip: 'Thanh 3 + thanh 1' },
  哪里: { vi: 'Nả lỉ', pinyin: 'nǎlǐ', meaning: 'ở đâu', tip: 'Hai thanh 3' },
  地铁站: { vi: 'Ti thiết trang', pinyin: 'dìtiě zhàn', meaning: 'ga tàu điện ngầm', tip: 'Thanh 4 + 3 + 4' },
};

// Comprehensive word dictionary for Khối 5 (Word by word analysis)
export const WORD_DICTIONARY_EN: Record<string, { pos: string; vi: string; ipa: string; mean: string; note?: string }> = {
  hello: { pos: 'Thán từ', vi: 'hê-LÂU', ipa: '/həˈloʊ/', mean: 'Chào, xin chào', note: 'Lời chào mở đầu cuộc trò chuyện.' },
  hi: { pos: 'Thán từ', vi: 'HAI', ipa: '/haɪ/', mean: 'Chào, xin chào (thân mật)', note: 'Lời chào thân mật khi gặp gỡ.' },
  how: { pos: 'Từ để hỏi', vi: 'HAO', ipa: '/haʊ/', mean: 'như thế nào, bằng cách nào', note: 'Dùng để hỏi về trạng thái của đối tượng.' },
  are: { pos: 'Động từ (tobe)', vi: 'A', ipa: '/ɑːr/', mean: 'thì, là, ở', note: "Động từ liên kết chia theo chủ ngữ 'you' hoặc số nhiều." },
  is: { pos: 'Động từ (tobe)', vi: 'I-z', ipa: '/ɪz/', mean: 'thì, là, ở', note: 'Động từ liên kết chia theo chủ ngữ ngôi thứ ba số ít.' },
  am: { pos: 'Động từ (tobe)', vi: 'EM', ipa: '/æm/', mean: 'thì, là, ở', note: "Động từ liên kết đi cùng chủ ngữ 'I'." },
  be: { pos: 'Động từ (tobe)', vi: 'BI', ipa: '/biː/', mean: 'thì, là, ở, trở thành', note: 'Động từ nguyên thể diễn tả trạng thái hoặc sự tồn tại.' },
  "it's": { pos: 'Đại từ + Động từ (viết tắt)', vi: 'ÍT-s', ipa: '/ɪts/', mean: 'nó là, đã là, trời đang', note: "Dạng viết tắt của 'it is' làm chủ ngữ và động từ." },
  closing: { pos: 'Danh từ / Tính từ', vi: 'KHỜ-LÂU-zing', ipa: '/ˈkloʊzɪŋ/', mean: 'đóng cửa, kết thúc, cuối cùng', note: 'Chỉ trạng thái kết thúc hoạt động hoặc giờ đóng cửa.' },
  time: { pos: 'Danh từ', vi: 'THAIM', ipa: '/taɪm/', mean: 'thời gian, lúc, giờ, lần', note: 'Danh từ chỉ thời gian hoặc thời điểm.' },
  you: { pos: 'Đại từ nhân xưng', vi: 'DIU', ipa: '/juː/', mean: 'bạn, các bạn, anh, chị, em', note: 'Đại từ làm chủ ngữ hoặc tân ngữ trong câu.' },
  today: { pos: 'Trạng từ', vi: 'tu-ĐÂY', ipa: '/təˈdeɪ/', mean: 'hôm nay, ngày nay', note: 'Trạng từ chỉ thời gian trong ngày.' },
  good: { pos: 'Tính từ', vi: 'GÚT', ipa: '/ɡʊd/', mean: 'tốt, đẹp, hay, giỏi', note: 'Tính từ mô tả chất lượng hoặc lời chúc tích cực.' },
  morning: { pos: 'Danh từ', vi: 'MO-ninh', ipa: '/ˈmɔːrnɪŋ/', mean: 'buổi sáng, sáng sớm', note: 'Danh từ chỉ khoảng thời gian đầu ngày.' },
  afternoon: { pos: 'Danh từ', vi: 'áp-tơ-NUN', ipa: '/ˌæftərˈnuːn/', mean: 'buổi chiều', note: 'Danh từ chỉ khoảng thời gian từ trưa đến tối.' },
  evening: { pos: 'Danh từ', vi: 'ÍP-ninh', ipa: '/ˈiːvnɪŋ/', mean: 'buổi tối', note: 'Danh từ chỉ khoảng thời gian chiều muộn đến tối.' },
  night: { pos: 'Danh từ', vi: 'NAI-t', ipa: '/naɪt/', mean: 'đêm, ban đêm, buổi tối', note: 'Danh từ chỉ thời gian ban đêm.' },
  nice: { pos: 'Tính từ', vi: 'NAI-s', ipa: '/naɪs/', mean: 'đẹp, vui, tốt, dễ chịu', note: 'Tính từ bày tỏ cảm xúc tích cực hoặc sự thân thiện.' },
  to: { pos: 'Giới từ', vi: 'thừ', ipa: '/tə/', mean: 'để, đến, tới, cho', note: 'Giới từ chỉ hướng hoặc đi trước động từ nguyên mẫu.' },
  meet: { pos: 'Động từ', vi: 'MÍT', ipa: '/miːt/', mean: 'gặp, gặp gỡ, làm quen', note: 'Động từ chỉ hành động gặp mặt trực tiếp.' },
  thank: { pos: 'Động từ', vi: 'THENK', ipa: '/θæŋk/', mean: 'cảm ơn, biết ơn', note: 'Động từ bày tỏ lòng biết ơn với người đối diện.' },
  thanks: { pos: 'Thán từ', vi: 'THENK-s', ipa: '/θæŋks/', mean: 'cảm ơn, lời cảm ơn', note: 'Cách nói cảm ơn ngắn gọn, tự nhiên.' },
  much: { pos: 'Lượng từ / Phó từ', vi: 'MÁT', ipa: '/mʌtʃ/', mean: 'nhiều, rất nhiều, bao nhiêu', note: 'Bổ nghĩa mức độ hoặc số lượng không đếm được.' },
  so: { pos: 'Phó từ', vi: 'SÂU', ipa: '/soʊ/', mean: 'rất, quá, vì vậy, thế nên', note: 'Nhấn mạnh mức độ của tính từ hoặc trạng từ.' },
  very: { pos: 'Trạng từ', vi: 'VE-ri', ipa: '/ˈveri/', mean: 'rất, cực kỳ, thực sự', note: 'Trạng từ tăng mức độ cho tính từ đứng sau.' },
  this: { pos: 'Đại từ chỉ định', vi: 'ĐÍT', ipa: '/ðɪs/', mean: 'này, cái này, điều này', note: 'Chỉ đối tượng hoặc sự vật ở gần người nói.' },
  that: { pos: 'Đại từ chỉ định', vi: 'ĐÁT', ipa: '/ðæt/', mean: 'đó, kia, cái đó, rằng', note: 'Chỉ đối tượng ở xa hơn hoặc mệnh đề phụ.' },
  it: { pos: 'Đại từ nhân xưng', vi: 'IT', ipa: '/ɪt/', mean: 'nó, điều đó, việc đó', note: 'Đại từ thay thế cho sự vật, hiện tượng hoặc chủ ngữ giả.' },
  what: { pos: 'Từ để hỏi', vi: 'OÁT', ipa: '/wʌt/', mean: 'cái gì, gì, điều gì', note: 'Từ để hỏi thông tin về sự vật, tên gọi hoặc hành động.' },
  where: { pos: 'Từ để hỏi', vi: 'UE', ipa: '/weər/', mean: 'ở đâu, nơi nào', note: 'Từ để hỏi về địa điểm hoặc vị trí.' },
  why: { pos: 'Từ để hỏi', vi: 'OAI', ipa: '/waɪ/', mean: 'tại sao, vì sao', note: 'Từ để hỏi nguyên nhân hoặc lý do.' },
  when: { pos: 'Từ để hỏi', vi: 'GUEN', ipa: '/wen/', mean: 'khi nào, lúc nào', note: 'Từ để hỏi về thời điểm xảy ra sự việc.' },
  who: { pos: 'Từ để hỏi', vi: 'HU', ipa: '/huː/', mean: 'ai, người nào', note: 'Từ để hỏi về người hoặc chủ thể.' },
  can: { pos: 'Động từ khiếm khuyết', vi: 'KHEN', ipa: '/kæn/', mean: 'có thể, biết, được phép', note: 'Động từ khuyết thiếu diễn tả khả năng hoặc lời đề nghị.' },
  could: { pos: 'Động từ khiếm khuyết', vi: 'KÚT', ipa: '/kʊd/', mean: 'có thể (lịch sự), đã có thể', note: 'Dạng lịch sự dùng để nhờ vả hoặc yêu cầu.' },
  would: { pos: 'Động từ khiếm khuyết', vi: 'ÚT', ipa: '/wʊd/', mean: 'muốn, sẽ, có lẽ', note: 'Dùng trong câu đề nghị lịch sự hoặc mong muốn.' },
  like: { pos: 'Động từ', vi: 'LAI', ipa: '/laɪk/', mean: 'thích, muốn, như là', note: 'Diễn tả sở thích hoặc mong muốn nhẹ nhàng.' },
  want: { pos: 'Động từ', vi: 'OÁN', ipa: '/wɑːnt/', mean: 'muốn, mong muốn, cần', note: 'Động từ chỉ nhu cầu hoặc ý định của chủ ngữ.' },
  learn: { pos: 'Động từ', vi: 'LƠN', ipa: '/lɜːrn/', mean: 'học, học hỏi, biết được', note: 'Động từ chỉ hành động tiếp thu kiến thức.' },
  speak: { pos: 'Động từ', vi: 's-PÍC', ipa: '/spiːk/', mean: 'nói, phát biểu, nói chuyện', note: 'Động từ chỉ khả năng hoặc cách thức nói ngôn ngữ.' },
  help: { pos: 'Động từ', vi: 'HÉP', ipa: '/help/', mean: 'giúp, giúp đỡ, hỗ trợ', note: 'Động từ chỉ hành động hỗ trợ người khác.' },
  me: { pos: 'Đại từ nhân xưng', vi: 'MI', ipa: '/miː/', mean: 'tôi, mình, cho tôi', note: 'Đại từ làm tân ngữ chỉ bản thân người nói.' },
  my: { pos: 'Tính từ sở hữu', vi: 'MAI', ipa: '/maɪ/', mean: 'của tôi, của mình', note: 'Đứng trước danh từ để chỉ quyền sở hữu của người nói.' },
  your: { pos: 'Tính từ sở hữu', vi: 'GIO', ipa: '/jɔːr/', mean: 'của bạn, của các bạn', note: 'Đứng trước danh từ để chỉ sự sở hữu của người nghe.' },
  name: { pos: 'Danh từ', vi: 'NÊM', ipa: '/neɪm/', mean: 'tên, tên gọi, danh tiếng', note: 'Danh từ chỉ tên riêng của người hoặc vật.' },
  coffee: { pos: 'Danh từ', vi: 'CÓ-phi', ipa: '/ˈkɔːfi/', mean: 'cà phê, ly cà phê', note: 'Danh từ chỉ đồ uống.' },
  water: { pos: 'Danh từ', vi: 'OA-tơ', ipa: '/ˈwɔːtər/', mean: 'nước, nước uống', note: 'Danh từ chỉ nước uống.' },
  tea: { pos: 'Danh từ', vi: 'THI', ipa: '/tiː/', mean: 'trà, nước trà', note: 'Danh từ chỉ đồ uống.' },
  food: { pos: 'Danh từ', vi: 'PHU-t', ipa: '/fuːd/', mean: 'thức ăn, đồ ăn, món ăn', note: 'Danh từ chỉ thực phẩm nói chung.' },
  bill: { pos: 'Danh từ', vi: 'BIU', ipa: '/bɪl/', mean: 'hóa đơn, phiếu tính tiền', note: 'Danh từ dùng khi thanh toán tại nhà hàng.' },
  check: { pos: 'Danh từ / Động từ', vi: 'CHECK', ipa: '/tʃek/', mean: 'hóa đơn, kiểm tra, xem xét', note: 'Thường dùng để gọi tính tiền hoặc kiểm tra.' },
  please: { pos: 'Thán từ', vi: 'PHLI-z', ipa: '/pliːz/', mean: 'làm ơn, xin vui lòng, nhé', note: 'Từ đệm thể hiện sự lịch sự trong câu yêu cầu.' },
  delicious: { pos: 'Tính từ', vi: 'đì-LÍ-sợt', ipa: '/dɪˈlɪʃəs/', mean: 'ngon, thơm ngon, tuyệt hảo', note: 'Tính từ khen ngợi hương vị món ăn.' },
  weather: { pos: 'Danh từ', vi: 'UE-đơ', ipa: '/ˈweðər/', mean: 'thời tiết, khí hậu', note: 'Danh từ chỉ tình trạng nắng mưa ngoài trời.' },
  subway: { pos: 'Danh từ', vi: 'SÁP-uê', ipa: '/ˈsʌbweɪ/', mean: 'tàu điện ngầm, đường hầm', note: 'Danh từ chỉ phương tiện giao thông công cộng.' },
  station: { pos: 'Danh từ', vi: 's-TÂY-sừn', ipa: '/ˈsteɪʃn/', mean: 'nhà ga, trạm, đồn', note: 'Danh từ chỉ điểm dừng phương tiện.' },
  airport: { pos: 'Danh từ', vi: 'E-pót', ipa: '/ˈerpɔːrt/', mean: 'sân bay, phi trường', note: 'Danh từ chỉ địa điểm hàng không.' },
  hotel: { pos: 'Danh từ', vi: 'hô-TEN', ipa: '/hoʊˈtel/', mean: 'khách sạn', note: 'Danh từ chỉ nơi lưu trú.' },
  taxi: { pos: 'Danh từ', vi: 'TÁC-xi', ipa: '/ˈtæksi/', mean: 'xe taxi, tắc xi', note: 'Danh từ chỉ phương tiện di chuyển.' },
  english: { pos: 'Danh từ', vi: 'ÍNG-lít', ipa: '/ˈɪŋɡlɪʃ/', mean: 'tiếng Anh, thuộc nước Anh', note: 'Danh từ riêng chỉ ngôn ngữ tiếng Anh.' },
  goodbye: { pos: 'Thán từ', vi: 'gút-BAI', ipa: '/ˌɡʊdˈbaɪ/', mean: 'tạm biệt, chào tạm biệt', note: 'Lời chào khi kết thúc cuộc trò chuyện.' },
  bye: { pos: 'Thán từ', vi: 'BAI', ipa: '/baɪ/', mean: 'tạm biệt, chào nhé', note: 'Lời chào tạm biệt ngắn gọn, thân mật.' },
  see: { pos: 'Động từ', vi: 'SI', ipa: '/siː/', mean: 'thấy, nhìn, gặp, hiểu', note: 'Động từ chỉ thị giác hoặc cuộc hẹn gặp.' },
  again: { pos: 'Trạng từ', vi: 'ơ-GEN', ipa: '/əˈɡen/', mean: 'lại, lần nữa, thêm lần nữa', note: 'Trạng từ chỉ sự lặp lại của hành động.' },
  understand: { pos: 'Động từ', vi: 'ân-đơ-s-TEN', ipa: '/ˌʌndərˈstænd/', mean: 'hiểu, nắm bắt, thông cảm', note: 'Động từ chỉ khả năng tiếp nhận ý nghĩa.' },
  slowly: { pos: 'Trạng từ', vi: 'SLO-li', ipa: '/ˈsloʊli/', mean: 'chậm, chậm rãi, từ từ', note: 'Trạng từ mô tả tốc độ thực hiện hành động.' },
  have: { pos: 'Động từ', vi: 'HÉP', ipa: '/hæv/', mean: 'có, dùng, ăn uống, trải qua', note: 'Động từ chỉ sự sở hữu hoặc lời chúc.' },
  day: { pos: 'Danh từ', vi: 'ĐÂY', ipa: '/deɪ/', mean: 'ngày, ban ngày', note: 'Danh từ chỉ đơn vị thời gian.' },
  the: { pos: 'Mạo từ', vi: 'đờ', ipa: '/ðə/', mean: 'cái, con, người (xác định)', note: 'Mạo từ xác định đứng trước danh từ đã biết.' },
  a: { pos: 'Mạo từ', vi: 'ơ', ipa: '/ə/', mean: 'một, một cái', note: 'Mạo từ bất định đứng trước danh từ đếm được số ít.' },
  an: { pos: 'Mạo từ', vi: 'ân', ipa: '/æn/', mean: 'một, một cái', note: 'Mạo từ bất định dùng trước từ bắt đầu bằng nguyên âm.' },
  and: { pos: 'Liên từ', vi: 'en', ipa: '/ænd/', mean: 'và, cùng với', note: 'Liên từ nối hai từ hoặc mệnh đề ngang hàng.' },
  in: { pos: 'Giới từ', vi: 'in', ipa: '/ɪn/', mean: 'trong, ở trong, vào lúc', note: 'Giới từ chỉ vị trí bên trong hoặc thời gian.' },
  on: { pos: 'Giới từ', vi: 'on', ipa: '/ɑːn/', mean: 'trên, ở trên, vào ngày', note: 'Giới từ chỉ vị trí bề mặt hoặc ngày cụ thể.' },
  for: { pos: 'Giới từ', vi: 'pho', ipa: '/fɔːr/', mean: 'cho, để, vì, trong khoảng', note: 'Giới từ chỉ mục đích, đối tượng hoặc thời lượng.' },
};

export const WORD_DICTIONARY_ZH: Record<string, { pos: string; vi: string; py: string; mean: string; note?: string }> = {
  你: { pos: 'Đại từ nhân xưng', vi: 'NỈ', py: 'nǐ', mean: 'bạn, anh, chị, em', note: 'Đại từ ngôi thứ hai số ít xưng hô thân thiện.' },
  好: { pos: 'Tính từ', vi: 'HẢO', py: 'hǎo', mean: 'tốt, khỏe, đẹp, hay, được', note: 'Tính từ chỉ trạng thái tích cực hoặc lời chào.' },
  你好: { pos: 'Thán từ', vi: 'Ní HẢO', py: 'nǐ hǎo', mean: 'Chào, xin chào', note: 'Lời chào phổ biến nhất mở đầu cuộc trò chuyện.' },
  您: { pos: 'Đại từ nhân xưng', vi: 'NÍN', py: 'nín', mean: 'ngài, ông, bà, quý khách', note: 'Đại từ ngôi thứ hai mang sắc thái kính trọng.' },
  今天: { pos: 'Danh từ thời gian', vi: 'chin THEN', py: 'jīntiān', mean: 'hôm nay, ngày hôm nay', note: 'Từ chỉ thời gian hiện tại trong ngày.' },
  过得: { pos: 'Động từ', vi: 'CUA tợ', py: 'guò de', mean: 'trải qua, sống, trôi qua', note: 'Động từ kết hợp bổ ngữ chỉ trạng thái sinh hoạt.' },
  怎么样: { pos: 'Từ để hỏi', vi: 'chẩn mơ DANG', py: 'zěnmeyàng', mean: 'thế nào, ra sao, như thế nào', note: 'Dùng ở cuối câu để hỏi tình trạng hoặc ý kiến.' },
  叫: { pos: 'Động từ', vi: 'CHEO', py: 'jiào', mean: 'tên là, gọi, kêu, bảo', note: 'Động từ dùng để giới thiệu hoặc hỏi tên gọi.' },
  什么: { pos: 'Từ để hỏi', vi: 'SẤN mơ', py: 'shénme', mean: 'gì, cái gì, nào', note: 'Đại từ nghi vấn dùng để hỏi sự vật hoặc thông tin.' },
  名字: { pos: 'Danh từ', vi: 'MÍNH chự', py: 'míngzi', mean: 'tên, tên gọi, danh tính', note: 'Danh từ chỉ tên của người hoặc vật.' },
  我: { pos: 'Đại từ nhân xưng', vi: 'ỦA', py: 'wǒ', mean: 'tôi, mình, ta, em', note: 'Đại từ ngôi thứ nhất chỉ bản thân người nói.' },
  想: { pos: 'Động từ', vi: 'XẺNG', py: 'xiǎng', mean: 'muốn, nghĩ, nhớ, dự định', note: 'Động từ năng nguyện bày tỏ mong muốn hoặc suy nghĩ.' },
  喝: { pos: 'Động từ', vi: 'HƯ', py: 'hē', mean: 'uống', note: 'Động từ chỉ hành động uống chất lỏng.' },
  一杯: { pos: 'Số từ + Lượng từ', vi: 'di PHÂY', py: 'yì bēi', mean: 'một ly, một cốc, một tách', note: 'Cụm số lượng dùng cho đồ uống đựng trong cốc.' },
  咖啡: { pos: 'Danh từ', vi: 'kha PHÂY', py: 'kāfēi', mean: 'cà phê', note: 'Danh từ chỉ loại đồ uống.' },
  水: { pos: 'Danh từ', vi: 'SUẨY', py: 'shuǐ', mean: 'nước, nước uống', note: 'Danh từ chỉ chất lỏng, nước lọc.' },
  谢谢: { pos: 'Thán từ', vi: 'XIÊ xiê', py: 'xièxie', mean: 'cảm ơn, xin cảm ơn', note: 'Từ dùng để bày tỏ lòng biết ơn.' },
  再见: { pos: 'Thán từ', vi: 'chai CHIÊN', py: 'zàijiàn', mean: 'tạm biệt, hẹn gặp lại', note: 'Lời chào khi chia tay.' },
  这个: { pos: 'Đại từ chỉ định', vi: 'CHƯA cờ', py: 'zhège', mean: 'cái này, điều này, người này', note: 'Chỉ đối tượng cụ thể ở gần người nói.' },
  多少: { pos: 'Từ để hỏi', vi: 'tua SAO', py: 'duōshao', mean: 'bao nhiêu, mấy', note: 'Dùng để hỏi số lượng hoặc giá cả.' },
  钱: { pos: 'Danh từ', vi: 'CHÉN', py: 'qián', mean: 'tiền, tiền bạc, chi phí', note: 'Danh từ chỉ tiền tệ.' },
  买单: { pos: 'Động từ', vi: 'mải ĐAN', py: 'mǎidān', mean: 'thanh toán, tính tiền', note: 'Cụm động từ dùng khi trả tiền tại quán ăn.' },
  结账: { pos: 'Động từ', vi: 'chiế TRANG', py: 'jiézhàng', mean: 'tính tiền, thanh toán hóa đơn', note: 'Dùng khi chốt hóa đơn thanh toán.' },
  请: { pos: 'Động từ / Kính từ', vi: 'CHỈNH', py: 'qǐng', mean: 'xin, mời, làm ơn, vui lòng', note: 'Từ lịch sự đặt đầu câu để nhờ hoặc mời.' },
  问: { pos: 'Động từ', vi: 'UẦN', py: 'wèn', mean: 'hỏi, hỏi thăm', note: 'Động từ chỉ hành động đặt câu hỏi.' },
  请问: { pos: 'Cụm từ kính ngữ', vi: 'chỉnh UẦN', py: 'qǐngwèn', mean: 'xin hỏi, làm ơn cho hỏi', note: 'Cụm từ lịch sự mở đầu khi muốn hỏi thông tin.' },
  在: { pos: 'Giới từ / Động từ', vi: 'CHAI', py: 'zài', mean: 'ở, tại, đang', note: 'Chỉ vị trí tồn tại hoặc hành động đang diễn ra.' },
  哪里: { pos: 'Từ để hỏi', vi: 'nả LỈ', py: 'nǎlǐ', mean: 'ở đâu, nơi nào, chỗ nào', note: 'Từ để hỏi về vị trí, địa điểm.' },
  地铁站: { pos: 'Danh từ', vi: 'ti thiết TRANG', py: 'dìtiě zhàn', mean: 'ga tàu điện ngầm, trạm tàu ngầm', note: 'Danh từ chỉ nhà ga tàu điện.' },
  机场: { pos: 'Danh từ', vi: 'chi TRẢNG', py: 'jīchǎng', mean: 'sân bay, phi trường', note: 'Danh từ chỉ địa điểm bay.' },
  酒店: { pos: 'Danh từ', vi: 'chiểu TIỆM', py: 'jiǔdiàn', mean: 'khách sạn, nhà hàng lớn', note: 'Danh từ chỉ nơi lưu trú.' },
  天气: { pos: 'Danh từ', vi: 'thiên CHI', py: 'tiānqì', mean: 'thời tiết, khí hậu', note: 'Danh từ chỉ trạng thái thời tiết.' },
  很: { pos: 'Phó từ', vi: 'HẨN', py: 'hěn', mean: 'rất, lắm, vô cùng', note: 'Phó từ mức độ đứng trước tính từ.' },
  好吃: { pos: 'Tính từ', vi: 'hảo CHƯ', py: 'hǎochī', mean: 'ngon, ngon miệng', note: 'Tính từ khen hương vị đồ ăn.' },
  听不懂: { pos: 'Cụm động từ', vi: 'thinh pu TUNG', py: 'tīng bu dǒng', mean: 'nghe không hiểu', note: 'Bổ ngữ khả năng diễn tả không hiểu lời nói.' },
  不: { pos: 'Phó từ phủ định', vi: 'PU / PÚ', py: 'bù', mean: 'không, chẳng', note: 'Phó từ dùng để phủ định hành động hoặc tính chất.' },
  客气: { pos: 'Tính từ', vi: 'KHƯA chi', py: 'kèqi', mean: 'khách sáo, lịch sự, khách khí', note: 'Mô tả thái độ giữ lễ nghi, khách sáo.' },
  对不起: { pos: 'Thán từ', vi: 'thuây pu CHỈ', py: 'duìbuqǐ', mean: 'xin lỗi, thật có lỗi', note: 'Lời xin lỗi chân thành khi làm phiền người khác.' },
  没关系: { pos: 'Thán từ', vi: 'mấy QUAN xi', py: 'méi guānxi', mean: 'không sao đâu, không có gì', note: 'Lời đáp lại lời xin lỗi.' },
  到: { pos: 'Động từ', vi: 'TÀO', py: 'dào', mean: 'đến, tới, đạt tới', note: 'Động từ chỉ sự di chuyển đến thời điểm hoặc địa điểm.' },
  打烊: { pos: 'Động từ', vi: 'tà DANG', py: 'dǎyàng', mean: 'đóng cửa quán, nghỉ bán', note: 'Động từ chuyên dùng khi cửa hàng kết thúc giờ mở cửa.' },
  时间: { pos: 'Danh từ', vi: 'sử CHIÊN', py: 'shíjiān', mean: 'thời gian, lúc, giờ giấc', note: 'Danh từ chỉ khoảng thời gian hoặc thời điểm.' },
  了: { pos: 'Trợ từ', vi: 'lơ', py: 'le', mean: 'rồi, đã (hoàn thành/thay đổi)', note: 'Trợ từ ngữ khí biểu thị sự thay đổi trạng thái.' },
  到打烊时间了: { pos: 'Cụm câu', vi: 'Tào tà dang sử chiên lơ', py: 'dào dǎyàng shíjiān le', mean: 'đã đến giờ đóng cửa rồi', note: 'Câu thông báo hoàn chỉnh khi kết thúc giờ phục vụ.' },
};

// Universal Word Analysis Extractor
export function extractWordAnalysis(
  sentence: string,
  lang: SupportedLanguage,
  chunks?: TranscriptionChunk[]
): WordAnalysis[] {
  if (!sentence || !sentence.trim()) return [];

  const raw = sentence.trim();

  // If Chinese: handle both multi-char words and single chars
  if (lang === 'zh') {
    const zhWords: string[] = [];
    const knownKeys = Object.keys(WORD_DICTIONARY_ZH).sort((a, b) => b.length - a.length);
    let remaining = raw.replace(/[，。？！、\s]/g, '');

    while (remaining.length > 0) {
      const match = knownKeys.find((k) => remaining.startsWith(k));
      if (match) {
        zhWords.push(match);
        remaining = remaining.slice(match.length);
      } else {
        zhWords.push(remaining[0]);
        remaining = remaining.slice(1);
      }
    }

    return zhWords.map((w) => {
      const dict = WORD_DICTIONARY_ZH[w];
      if (dict) {
        return {
          word: w,
          partOfSpeech: dict.pos,
          phoneticsVi: dict.vi,
          ipaOrPinyin: dict.py,
          meaningVi: dict.mean,
          usageNote: dict.note,
        };
      }
      return {
        word: w,
        partOfSpeech: inferClientPartOfSpeech(w),
        phoneticsVi: w,
        ipaOrPinyin: w,
        meaningVi: 'Từ vựng',
        usageNote: 'Từ vựng cấu thành nên câu giao tiếp.',
      };
    });
  }

  // English & Latin-based languages: split by spaces and strip punctuation
  const tokens = raw.split(/\s+/).filter(Boolean);
  return tokens.map((token) => {
    const cleanWord = token.replace(/^[.,!?;:"'(){}\[\]]+|[.,!?;:"'(){}\[\]]+$/g, '');
    const lower = cleanWord.toLowerCase();

    if (lang === 'en' && WORD_DICTIONARY_EN[lower]) {
      const entry = WORD_DICTIONARY_EN[lower];
      return {
        word: cleanWord,
        partOfSpeech: entry.pos,
        phoneticsVi: entry.vi,
        ipaOrPinyin: entry.ipa,
        meaningVi: entry.mean,
        usageNote: entry.note,
      };
    }

    // Try finding in chunks
    if (chunks && chunks.length > 0) {
      const foundChunk = chunks.find((c) =>
        c.original.toLowerCase().includes(lower)
      );
      if (foundChunk) {
        return {
          word: cleanWord,
          partOfSpeech: foundChunk.partOfSpeech || inferClientPartOfSpeech(cleanWord),
          phoneticsVi: foundChunk.phoneticsVi,
          ipaOrPinyin: foundChunk.ipaOrPinyin || `/${lower}/`,
          meaningVi: foundChunk.meaningVi,
          usageNote: foundChunk.detailedExplanation,
        };
      }
    }

    return {
      word: cleanWord,
      partOfSpeech: inferClientPartOfSpeech(cleanWord),
      phoneticsVi: approximateEnglishPhonetic(cleanWord),
      ipaOrPinyin: `/${lower}/`,
      meaningVi: 'Từ vựng',
      usageNote: `Từ đóng vai trò ${inferClientPartOfSpeech(cleanWord).toLowerCase()} trong câu.`,
    };
  });
}

// Infer part of speech on client side for fast local preview
export function inferClientPartOfSpeech(text: string): string {
  const t = text.trim().toLowerCase().replace(/^[.,!?;:"'(){}\[\]]+|[.,!?;:"'(){}\[\]]+$/g, '');
  if (/^(hello|hi|thanks|thank you|please|sorry|yes|no|goodbye|welcome|nǐ hǎo|xièxie|zàijiàn|你好|谢谢|再见|对不起|欢迎)$/i.test(t)) return 'Thán từ';
  if (/^(how|where|why|when|what|who|which|duōshao|zěnme|多少|怎么|哪里|什么)$/i.test(t)) return 'Từ để hỏi';
  if (/^(it's|it’s)$/i.test(t)) return 'Đại từ + Động từ (viết tắt)';
  if (/^(i|you|he|she|it|we|they|me|him|her|us|them|my|your|his|their|our|wǒ|nǐ|tā|我|你|他|她)$/i.test(t)) return 'Đại từ nhân xưng';
  if (/^(is|am|are|was|were|be)$/i.test(t)) return 'Động từ (tobe)';
  if (/^(closing)$/i.test(t)) return 'Danh từ / Tính từ';
  if (/^(do|does|did|have|has|had|can|could|will|would|go|see|meet|help|speak|want|like|learn|drink|eat|take|reserve|check|sign|present|stay|provide|call|order|confirm|assist|shì|huì|xiǎng|kěyǐ|dào|dǎyàng|是|会|想|要|喝|吃|认识|学习|预订|入住|退房|到|打烊)$/i.test(t)) return 'Động từ';
  if (/^(good|nice|fine|hot|cold|delicious|easy|great|bad|happy|quiet|clean|safe|deluxe|complimentary|available|comfortable|hǎo|piàoliang|hǎochī|好|漂亮|好吃|贵|便宜|免费|安静)$/i.test(t)) return 'Tính từ';
  if (/^(today|yesterday|tomorrow|very|so|slowly|well|now|immediately|safely|promptly|jīntiān|hěn|fēicháng|今天|很|非常|太|慢|立刻|马上)$/i.test(t)) return 'Trạng từ';
  if (/^(in|on|at|to|for|with|by|about|from|under|after|before|zài|gěi|在|给)$/i.test(t)) return 'Giới từ';
  if (/^(and|or|but|because|if)$/i.test(t)) return 'Liên từ';
  if (/^(time|hour|day|morning|afternoon|evening|night|shíjiān|时间|coffee|water|tea|hotel|bill|check|station|subway|food|weather|name|airport|taxi|passport|reservation|room|keycard|suite|elevator|luggage|breakfast|invoice|kāfēi|shuǐ|zhàngdān|chē|hùzhào|fángkǎ|咖啡|水|账单|地铁|机场|护照|房卡|房间)$/i.test(t)) return 'Danh từ';
  if (/^(ma|ne|ba|le|吗|呢|吧|了)$/i.test(t)) return 'Trợ từ';
  if (t.includes(' ')) return 'Cụm từ';
  return 'Từ vựng';
}

// Check if text is Vietnamese
export function isVietnameseText(str: string): boolean {
  return (
    /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(str) ||
    /\b(tôi|bạn|xin chào|chào|cảm ơn|bao nhiêu|tiền|giúp|ở đâu|muốn|làm ơn|thế nào|tính tiền|hóa đơn|rất vui|không|được|có thể|uống|cà phê|ngon|tạm biệt)\b/i.test(str)
  );
}

const LOCAL_VI_MAP: Record<
  string,
  {
    en: string;
    zh: string;
    enVi: string;
    zhVi: string;
    mean: string;
    enChunks: { o: string; v: string; ipa: string; m: string; t: string }[];
    zhChunks: { o: string; v: string; ipa: string; m: string; t: string }[];
  }
> = {
  'đã đến giờ đóng cửa': {
    en: "It's closing time.",
    zh: '到打烊时间了。',
    enVi: 'Ít-s KHỜ-LÂU-zing thaim. ↘',
    zhVi: 'Tào tà dang sử chiên lơ. ↘',
    mean: 'Đã đến giờ đóng cửa / sắp hết giờ mở cửa.',
    enChunks: [
      { o: "It's", v: 'Ít-s', ipa: '/ɪts/', m: 'đã là / nó là', t: 'Đọc gọn Ít-s' },
      { o: 'closing', v: 'KHỜ-LÂU-zing', ipa: '/ˈkloʊzɪŋ/', m: 'đóng cửa', t: 'Nhấn mạnh KHỜ-LÂU' },
      { o: 'time.', v: 'thaim.', ipa: '/taɪm/', m: 'giờ / thời gian.', t: 'Hạ giọng ở cuối câu' }
    ],
    zhChunks: [
      { o: '到', v: 'Tào', ipa: 'dào', m: 'đến', t: 'Tào' },
      { o: '打烊', v: 'tà dang', ipa: 'dǎyàng', m: 'đóng cửa quán', t: 'tà dang' },
      { o: '时间了。', v: 'sử chiên lơ.', ipa: 'shíjiān le', m: 'thời gian rồi.', t: 'lơ đọc nhẹ' }
    ]
  },
  'đến giờ đóng cửa rồi': {
    en: "It's closing time.",
    zh: '到打烊时间了。',
    enVi: 'Ít-s KHỜ-LÂU-zing thaim. ↘',
    zhVi: 'Tào tà dang sử chiên lơ. ↘',
    mean: 'Đã đến giờ đóng cửa rồi.',
    enChunks: [
      { o: "It's", v: 'Ít-s', ipa: '/ɪts/', m: 'đã là', t: 'Ít-s' },
      { o: 'closing', v: 'KHỜ-LÂU-zing', ipa: '/ˈkloʊzɪŋ/', m: 'đóng cửa', t: 'Nhấn KHỜ-LÂU' },
      { o: 'time.', v: 'thaim.', ipa: '/taɪm/', m: 'thời gian.', t: 'Hạ giọng' }
    ],
    zhChunks: [
      { o: '到', v: 'Tào', ipa: 'dào', m: 'đến', t: 'Tào' },
      { o: '打烊', v: 'tà dang', ipa: 'dǎyàng', m: 'đóng cửa', t: 'tà dang' },
      { o: '时间了。', v: 'sử chiên lơ.', ipa: 'shíjiān le', m: 'giờ rồi.', t: 'lơ' }
    ]
  },
  'đến giờ đóng cửa': {
    en: "It's closing time.",
    zh: '到打烊时间了。',
    enVi: 'Ít-s KHỜ-LÂU-zing thaim. ↘',
    zhVi: 'Tào tà dang sử chiên lơ. ↘',
    mean: 'Đã đến giờ đóng cửa.',
    enChunks: [
      { o: "It's", v: 'Ít-s', ipa: '/ɪts/', m: 'đã là', t: 'Ít-s' },
      { o: 'closing', v: 'KHỜ-LÂU-zing', ipa: '/ˈkloʊzɪŋ/', m: 'đóng cửa', t: 'Nhấn KHỜ-LÂU' },
      { o: 'time.', v: 'thaim.', ipa: '/taɪm/', m: 'thời gian.', t: 'Hạ giọng' }
    ],
    zhChunks: [
      { o: '到', v: 'Tào', ipa: 'dào', m: 'đến', t: 'Tào' },
      { o: '打烊', v: 'tà dang', ipa: 'dǎyàng', m: 'đóng cửa', t: 'tà dang' },
      { o: '时间了。', v: 'sử chiên lơ.', ipa: 'shíjiān le', m: 'giờ rồi.', t: 'lơ' }
    ]
  },
  'hôm nay bạn thế nào': {
    en: 'How are you today?',
    zh: '你今天过得怎么样？',
    enVi: 'Hao a diu tu-ĐÂY? ↘',
    zhVi: 'Nỉ chin then cua tợ chẩn mơ dang? ↘',
    mean: 'Hôm nay bạn thế nào / có ổn không?',
    enChunks: [
      { o: 'How are you', v: 'Hao a diu', ipa: '/haʊ ɑːr juː/', m: 'bạn thế nào', t: 'Đọc nối nhẹ' },
      { o: 'today?', v: 'tu-ĐÂY?', ipa: '/təˈdeɪ/', m: 'hôm nay?', t: 'Nhấn mạnh vào ĐÂY, hạ giọng cuối câu' }
    ],
    zhChunks: [
      { o: '你今天', v: 'Nỉ chin then', ipa: 'nǐ jīntiān', m: 'hôm nay bạn', t: 'chin then' },
      { o: '过得怎么样？', v: 'cua tợ chẩn mơ dang?', ipa: 'guò de zěnmeyàng?', m: 'thế nào?', t: 'tợ đọc nhẹ' }
    ]
  },
  'bạn có khỏe không': {
    en: 'How are you?',
    zh: '你好吗？',
    enVi: 'Hao a diu?',
    zhVi: 'Ní hảo ma?',
    mean: 'Bạn có khỏe không?',
    enChunks: [{ o: 'How are you?', v: 'Hao a diu?', ipa: '/haʊ ɑːr juː/', m: 'Bạn có khỏe không?', t: 'Nhấn diu' }],
    zhChunks: [{ o: '你好吗？', v: 'Ní hảo ma?', ipa: 'nǐ hǎo ma?', m: 'Bạn khỏe không?', t: 'ma đọc nhẹ' }]
  },
  'xin chào': {
    en: 'Hello, nice to meet you!',
    zh: '你好，很高兴认识你！',
    enVi: 'Hê-lâu, nai-s thừ mít diu!',
    zhVi: 'Ní hảo, hẩn cao xing rân sử nỉ!',
    mean: 'Xin chào, rất vui được gặp bạn',
    enChunks: [
      { o: 'Hello,', v: 'Hê-lâu,', ipa: '/həˈloʊ/', m: 'Xin chào', t: 'nhấn lâu' },
      { o: 'nice to meet you!', v: 'nai-s thừ mít diu!', ipa: '/naɪs tə miːt juː/', m: 'rất vui gặp bạn!', t: 'mít diu' }
    ],
    zhChunks: [
      { o: '你好，', v: 'Ní hảo,', ipa: 'nǐ hǎo', m: 'Xin chào', t: 'biến âm thanh 2' },
      { o: '很高兴认识你！', v: 'hẩn cao xing rân sử nỉ!', ipa: 'hěn gāoxìng rènshi nǐ', m: 'rất vui gặp bạn!', t: 'rân sử' }
    ]
  },
  'chào bạn': {
    en: 'Hello!',
    zh: '你好！',
    enVi: 'Hê-lâu!',
    zhVi: 'Ní hảo!',
    mean: 'Chào bạn',
    enChunks: [{ o: 'Hello!', v: 'Hê-lâu!', ipa: '/həˈloʊ/', m: 'Chào bạn!', t: 'nhấn lâu' }],
    zhChunks: [{ o: '你好！', v: 'Ní hảo!', ipa: 'nǐ hǎo!', m: 'Chào bạn!', t: 'thanh 2 + 3' }]
  },
  'cái này bao nhiêu tiền': {
    en: 'How much is this?',
    zh: '这个多少钱？',
    enVi: 'Hao mát i-z đít?',
    zhVi: 'Chưa cờ tua sao chén?',
    mean: 'Cái này giá bao nhiêu tiền?',
    enChunks: [
      { o: 'How much', v: 'Hao mát', ipa: '/haʊ mʌtʃ/', m: 'bao nhiêu', t: 'gọn mát' },
      { o: 'is this?', v: 'i-z đít?', ipa: '/ɪz ðɪs/', m: 'cái này?', t: 'i-z đít' }
    ],
    zhChunks: [
      { o: '这个', v: 'Chưa cờ', ipa: 'zhè ge', m: 'cái này', t: 'chưa cờ' },
      { o: '多少钱？', v: 'tua sao chén?', ipa: 'duōshao qián?', m: 'bao nhiêu tiền?', t: 'chén thanh 2' }
    ]
  },
  'bao nhiêu tiền': {
    en: 'How much is it?',
    zh: '多少钱？',
    enVi: 'Hao mát i-z it?',
    zhVi: 'Tua sao chén?',
    mean: 'Bao nhiêu tiền?',
    enChunks: [{ o: 'How much is it?', v: 'Hao mát i-z it?', ipa: '/haʊ mʌtʃ ɪz ɪt/', m: 'Bao nhiêu tiền?', t: 'gọn mát' }],
    zhChunks: [{ o: '多少钱？', v: 'Tua sao chén?', ipa: 'duōshao qián?', m: 'Bao nhiêu tiền?', t: 'chén thanh 2' }]
  },
  'rất vui được gặp bạn': {
    en: 'Nice to meet you!',
    zh: '很高兴认识你！',
    enVi: 'Nai-s thừ mít diu!',
    zhVi: 'Hẩn cao xing rân sử nỉ!',
    mean: 'Rất vui được gặp bạn',
    enChunks: [
      { o: 'Nice to', v: 'Nai-s thừ', ipa: '/naɪs tə/', m: 'rất vui', t: 'xì nhẹ s' },
      { o: 'meet you!', v: 'mít diu!', ipa: '/miːt juː/', m: 'gặp bạn!', t: 'mít diu' }
    ],
    zhChunks: [
      { o: '很高兴', v: 'Hẩn cao xing', ipa: 'hěn gāoxìng', m: 'rất vui', t: 'cao xing' },
      { o: '认识你！', v: 'rân sử nỉ!', ipa: 'rènshi nǐ', m: 'làm quen bạn!', t: 'rân sử' }
    ]
  },
  'cảm ơn bạn rất nhiều': {
    en: 'Thank you so much!',
    zh: '非常感谢你！',
    enVi: 'Thenk kiu sâu mát!',
    zhVi: 'Phây tráng cảm xia nỉ!',
    mean: 'Cảm ơn bạn rất nhiều',
    enChunks: [
      { o: 'Thank you', v: 'Thenk kiu', ipa: '/θæŋk juː/', m: 'cảm ơn bạn', t: 'thenk kiu' },
      { o: 'so much!', v: 'sâu mát!', ipa: '/soʊ mʌtʃ/', m: 'rất nhiều!', t: 'sâu mát' }
    ],
    zhChunks: [
      { o: '非常', v: 'Phây tráng', ipa: 'fēicháng', m: 'rất', t: 'phây tráng' },
      { o: '感谢你！', v: 'cảm xia nỉ!', ipa: 'gǎnxiè nǐ', m: 'cảm ơn bạn!', t: 'cảm xia' }
    ]
  },
  'cảm ơn': {
    en: 'Thank you!',
    zh: '谢谢！',
    enVi: 'Thenk kiu!',
    zhVi: 'Xiê xiê!',
    mean: 'Cảm ơn',
    enChunks: [{ o: 'Thank you!', v: 'Thenk kiu!', ipa: '/θæŋk juː/', m: 'Cảm ơn!', t: 'thenk kiu' }],
    zhChunks: [{ o: '谢谢！', v: 'Xiê xiê!', ipa: 'xièxie!', m: 'Cảm ơn!', t: 'xiê xiê' }]
  },
  'tính tiền': {
    en: 'Check, please!',
    zh: '买单，请结账！',
    enVi: 'Check, phli-z!',
    zhVi: 'Mải đan, chỉnh chiế trang!',
    mean: 'Cho tôi xin tính tiền',
    enChunks: [
      { o: 'Check,', v: 'Check,', ipa: '/tʃek/', m: 'Tính tiền', t: 'bật check' },
      { o: 'please!', v: 'phli-z!', ipa: '/pliːz/', m: 'làm ơn!', t: 'phli-z' }
    ],
    zhChunks: [
      { o: '买单，', v: 'Mải đan,', ipa: 'mǎidān', m: 'thanh toán', t: 'mải đan' },
      { o: '请结账！', v: 'chỉnh chiế trang!', ipa: 'qǐng jiézhàng', m: 'xin tính tiền!', t: 'chiế trang' }
    ]
  },
  'cho tôi xin hóa đơn': {
    en: 'Can I get the bill, please?',
    zh: '请给我账单，谢谢！',
    enVi: 'Cen nai gét đờ biu, phli-z?',
    zhVi: 'Chỉnh cấy ủa trang tan, xiê xiê!',
    mean: 'Cho tôi xin hóa đơn tính tiền',
    enChunks: [
      { o: 'Can I get', v: 'Cen nai gét', ipa: '/kæn aɪ ɡet/', m: 'cho tôi xin', t: 'cen nai' },
      { o: 'the bill, please?', v: 'đờ biu, phli-z?', ipa: '/ðə bɪl pliːz/', m: 'hóa đơn nhé?', t: 'biu phli-z' }
    ],
    zhChunks: [
      { o: '请给我账单，', v: 'Chỉnh cấy ủa trang tan,', ipa: 'qǐng gěi wǒ zhàngdān', m: 'cho tôi hóa đơn', t: 'trang tan' },
      { o: '谢谢！', v: 'xiê xiê!', ipa: 'xièxie', m: 'cảm ơn!', t: 'xiê xiê' }
    ]
  },
  'bạn có thể giúp tôi không': {
    en: 'Could you please help me?',
    zh: '你可以帮我一下吗？',
    enVi: 'Kút diu phli-z hép mi?',
    zhVi: 'Nỉ khở dỉ pang ủa di xia ma?',
    mean: 'Bạn có thể giúp tôi được không?',
    enChunks: [
      { o: 'Could you please', v: 'Kút diu phli-z', ipa: '/kʊd juː pliːz/', m: 'bạn vui lòng', t: 'kút diu' },
      { o: 'help me?', v: 'hép mi?', ipa: '/help miː/', m: 'giúp tôi không?', t: 'hép mi' }
    ],
    zhChunks: [
      { o: '你可以', v: 'Nỉ khở dỉ', ipa: 'nǐ kěyǐ', m: 'bạn có thể', t: 'khở dỉ' },
      { o: '帮我一下吗？', v: 'pang ủa di xia ma?', ipa: 'bāng wǒ yíxià ma?', m: 'giúp tôi một chút?', t: 'pang ủa' }
    ]
  },
  'ga tàu điện ngầm ở đâu': {
    en: 'Where is the subway station?',
    zh: '请问，地铁站在哪里？',
    enVi: 'Ue rơ-z đờ sáp-uê s-tây-sừn?',
    zhVi: 'Chỉnh uần, ti thiết trang chai nả lỉ?',
    mean: 'Ga tàu điện ngầm ở đâu?',
    enChunks: [
      { o: 'Where is', v: 'Ue rơ-z', ipa: '/weər ɪz/', m: 'ở đâu', t: 'ue rơ-z' },
      { o: 'the subway station?', v: 'đờ sáp-uê s-tây-sừn?', ipa: '/ðə ˈsʌbweɪ ˈsteɪʃn/', m: 'ga tàu điện ngầm?', t: 'sáp-uê' }
    ],
    zhChunks: [
      { o: '请问，', v: 'Chỉnh uần,', ipa: 'qǐngwèn', m: 'xin hỏi', t: 'chỉnh uần' },
      { o: '地铁站在哪里？', v: 'ti thiết trang chai nả lỉ?', ipa: 'dìtiě zhàn zài nǎlǐ', m: 'ga tàu ngầm ở đâu?', t: 'ti thiết' }
    ]
  },
  'tôi muốn uống cà phê': {
    en: 'I would like a coffee, please.',
    zh: '我想喝一杯咖啡。',
    enVi: 'Ai út lai ơ có-phi, phli-z.',
    zhVi: 'Ủa xẻng hư di phây kha phây.',
    mean: 'Tôi muốn uống một tách cà phê',
    enChunks: [
      { o: 'I would like', v: 'Ai út lai', ipa: '/aɪ wʊd laɪk/', m: 'tôi muốn', t: 'út lai' },
      { o: 'a coffee, please.', v: 'ơ có-phi, phli-z.', ipa: '/ə ˈkɔːfi pliːz/', m: 'ly cà phê.', t: 'có-phi' }
    ],
    zhChunks: [
      { o: '我想喝', v: 'Ủa xẻng hư', ipa: 'wǒ xiǎng hē', m: 'tôi muốn uống', t: 'hư' },
      { o: '一杯咖啡。', v: 'di phây kha phây.', ipa: 'yì bēi kāfēi', m: 'ly cà phê.', t: 'kha phây' }
    ]
  },
  'tên bạn là gì': {
    en: 'What is your name?',
    zh: '你叫什么名字？',
    enVi: 'Oát i-z gio nêm?',
    zhVi: 'Nỉ cheo sấn mơ mính chự?',
    mean: 'Bạn tên là gì?',
    enChunks: [
      { o: 'What is', v: 'Oát i-z', ipa: '/wʌt ɪz/', m: 'là gì', t: 'oát i-z' },
      { o: 'your name?', v: 'gio nêm?', ipa: '/jɔːr neɪm/', m: 'tên của bạn?', t: 'gio nêm' }
    ],
    zhChunks: [
      { o: '你叫', v: 'Nỉ cheo', ipa: 'nǐ jiào', m: 'bạn tên', t: 'cheo' },
      { o: '什么名字？', v: 'sấn mơ mính chự?', ipa: 'shénme míngzi?', m: 'tên gì?', t: 'mính chự' }
    ]
  },
  'tôi muốn học tiếng anh': {
    en: 'I want to learn English.',
    zh: '我想学英语。',
    enVi: 'Ai oán tu lơn Íng-lít.',
    zhVi: 'Ủa xẻng xuế dính dủy.',
    mean: 'Tôi muốn học tiếng Anh',
    enChunks: [
      { o: 'I want to', v: 'Ai oán tu', ipa: '/aɪ wɑːnt tuː/', m: 'tôi muốn', t: 'oán tu' },
      { o: 'learn English.', v: 'lơn Íng-lít.', ipa: '/lɜːrn ˈɪŋɡlɪʃ/', m: 'học tiếng Anh.', t: 'lơn Íng-lít' }
    ],
    zhChunks: [
      { o: '我想', v: 'Ủa xẻng', ipa: 'wǒ xiǎng', m: 'tôi muốn', t: 'xẻng' },
      { o: '学英语。', v: 'xuế dính dủy.', ipa: 'xué yīngyǔ', m: 'học tiếng Anh.', t: 'xuế dính dủy' }
    ]
  },
  'hôm nay thời tiết rất đẹp': {
    en: 'The weather is very nice today.',
    zh: '今天天气很好。',
    enVi: 'Đờ ue-đơ i-z ve-ri nai-s tu-đây.',
    zhVi: 'Chin then thiên chi hẩn hảo.',
    mean: 'Hôm nay thời tiết rất đẹp',
    enChunks: [
      { o: 'The weather is', v: 'Đờ ue-đơ i-z', ipa: '/ðə ˈweðər ɪz/', m: 'thời tiết thì', t: 'ue-đơ' },
      { o: 'very nice today.', v: 've-ri nai-s tu-đây.', ipa: '/ˈveri naɪs təˈdeɪ/', m: 'rất đẹp hôm nay.', t: 'nai-s tu-đây' }
    ],
    zhChunks: [
      { o: '今天天气', v: 'Chin then thiên chi', ipa: 'jīntiān tiānqì', m: 'thời tiết hôm nay', t: 'chin then' },
      { o: '很好。', v: 'hẩn hảo.', ipa: 'hěn hǎo', m: 'rất tốt.', t: 'hẩn hảo' }
    ]
  },
  'bạn có nói được tiếng anh không': {
    en: 'Do you speak English?',
    zh: '你会说英语吗？',
    enVi: 'Đu diu s-píc Íng-lít? ↗',
    zhVi: 'Nỉ huây suô dính dủy ma? ↗',
    mean: 'Bạn có nói được tiếng Anh không?',
    enChunks: [
      { o: 'Do you speak', v: 'Đu diu s-píc', ipa: '/duː juː spiːk/', m: 'bạn có nói', t: 's-píc' },
      { o: 'English?', v: 'Íng-lít? ↗', ipa: '/ˈɪŋɡlɪʃ/', m: 'tiếng Anh không?', t: 'lên giọng' }
    ],
    zhChunks: [
      { o: '你会说', v: 'Nỉ huây suô', ipa: 'nǐ huì shuō', m: 'bạn biết nói', t: 'huây suô' },
      { o: '英语吗？', v: 'dính dủy ma? ↗', ipa: 'yīngyǔ ma', m: 'tiếng Anh không?', t: 'ma đọc nhẹ' }
    ]
  },
  'tôi không hiểu': {
    en: "I don't understand.",
    zh: '我听不懂。',
    enVi: 'Ai đơn-t ân-đơ-s-ten.',
    zhVi: 'Ủa thinh pu tung.',
    mean: 'Tôi không hiểu',
    enChunks: [
      { o: "I don't", v: 'Ai đơn-t', ipa: '/aɪ doʊnt/', m: 'tôi không', t: 'đơn-t' },
      { o: 'understand.', v: 'ân-đơ-s-ten.', ipa: '/ˌʌndərˈstænd/', m: 'hiểu.', t: 'ân-đơ-s-ten' }
    ],
    zhChunks: [
      { o: '我', v: 'Ủa', ipa: 'wǒ', m: 'tôi', t: 'ủa' },
      { o: '听不懂。', v: 'thinh pu tung.', ipa: 'tīng bu dǒng', m: 'nghe không hiểu.', t: 'thinh pu tung' }
    ]
  },
  'làm ơn nói chậm lại': {
    en: 'Could you please speak slowly?',
    zh: '请说慢一点。',
    enVi: 'Kút diu phli-z s-píc slo-li?',
    zhVi: 'Chỉnh suô man di tiển.',
    mean: 'Làm ơn nói chậm lại một chút',
    enChunks: [
      { o: 'Could you please', v: 'Kút diu phli-z', ipa: '/kʊd juː pliːz/', m: 'bạn vui lòng', t: 'kút diu' },
      { o: 'speak slowly?', v: 's-píc slo-li?', ipa: '/spiːk ˈsloʊli/', m: 'nói chậm lại?', t: 's-píc' }
    ],
    zhChunks: [
      { o: '请说', v: 'Chỉnh suô', ipa: 'qǐng shuō', m: 'xin nói', t: 'chỉnh suô' },
      { o: '慢一点。', v: 'man di tiển.', ipa: 'màn yìdiǎn', m: 'chậm một chút.', t: 'man' }
    ]
  },
  'chúc bạn một ngày tốt lành': {
    en: 'Have a good day!',
    zh: '祝你度过愉快的一天！',
    enVi: 'Hép ơ gút đây!',
    zhVi: 'Tru nỉ tu cua du khoai tợ di then!',
    mean: 'Chúc bạn một ngày tốt lành!',
    enChunks: [
      { o: 'Have a', v: 'Hép ơ', ipa: '/hæv ə/', m: 'chúc có', t: 'hép ơ' },
      { o: 'good day!', v: 'gút đây!', ipa: '/ɡʊd deɪ/', m: 'ngày tốt lành!', t: 'gút đây' }
    ],
    zhChunks: [
      { o: '祝你', v: 'Tru nỉ', ipa: 'zhù nǐ', m: 'chúc bạn', t: 'tru nỉ' },
      { o: '度过愉快的一天！', v: 'tu cua du khoai tợ di then!', ipa: 'dùguò yúkuài de yì tiān', m: 'ngày vui!', t: 'du khoai' }
    ]
  },
  'tôi có thể thử cái này không': {
    en: 'Can I try this on?',
    zh: '我可以试一下这个吗？',
    enVi: 'Cen nai trai đít on?',
    zhVi: 'Ủa khở dỉ sư di xia chưa cờ ma?',
    mean: 'Tôi có thể thử cái này không?',
    enChunks: [
      { o: 'Can I try', v: 'Cen nai trai', ipa: '/kæn aɪ traɪ/', m: 'tôi có thể thử', t: 'cen nai trai' },
      { o: 'this on?', v: 'đít on?', ipa: '/ðɪs ɑːn/', m: 'cái này?', t: 'đít on' }
    ],
    zhChunks: [
      { o: '我可以', v: 'Ủa khở dỉ', ipa: 'wǒ kěyǐ', m: 'tôi có thể', t: 'khở dỉ' },
      { o: '试一下这个吗？', v: 'sư di xia chưa cờ ma?', ipa: 'shì yíxià zhè ge ma', m: 'thử cái này?', t: 'sư di xia' }
    ]
  },
  'món này rất ngon': {
    en: 'This food is delicious!',
    zh: '这个菜很好吃！',
    enVi: 'Đít phu-t i-z đì-lí-sợt!',
    zhVi: 'Chưa cờ thai hẩn hảo chư!',
    mean: 'Món này rất ngon!',
    enChunks: [
      { o: 'This food is', v: 'Đít phu-t i-z', ipa: '/ðɪs fuːd ɪz/', m: 'món ăn thì', t: 'đít phu-t' },
      { o: 'delicious!', v: 'đì-lí-sợt!', ipa: '/dɪˈlɪʃəs/', m: 'rất ngon!', t: 'đì-lí-sợt' }
    ],
    zhChunks: [
      { o: '这个菜', v: 'Chưa cờ thai', ipa: 'zhè ge cài', m: 'món này', t: 'thai là món' },
      { o: '很好吃！', v: 'hẩn hảo chư!', ipa: 'hěn hǎochī', m: 'rất ngon!', t: 'hảo chư' }
    ]
  },
  'tạm biệt': {
    en: 'Goodbye, see you again!',
    zh: '再见！',
    enVi: 'Gút-bai, si diu ơ-gen!',
    zhVi: 'Chai chiên!',
    mean: 'Tạm biệt, hẹn gặp lại!',
    enChunks: [
      { o: 'Goodbye,', v: 'Gút-bai,', ipa: '/ˌɡʊdˈbaɪ/', m: 'Tạm biệt', t: 'gút-bai' },
      { o: 'see you again!', v: 'si diu ơ-gen!', ipa: '/siː juː əˈɡen/', m: 'hẹn gặp lại!', t: 'si diu ơ-gen' }
    ],
    zhChunks: [
      { o: '再见！', v: 'Chai chiên!', ipa: 'zàijiàn!', m: 'Tạm biệt!', t: 'Hai thanh 4 dứt khoát' }
    ]
  }
};

// Fallback algorithm for instant preview
export function generateLocalFallback(text: string, lang: SupportedLanguage): TranscriptionResult {
  const clean = text.trim();
  const lower = clean.toLowerCase().replace(/[.,!?;:]/g, '');
  const isQuestion = clean.endsWith('?') || /^(ai|gì|đâu|nào|mấy|bao nhiêu|sao|không|tại sao)/i.test(lower);
  const isVi = isVietnameseText(clean);

  // If user entered Vietnamese: translate to target language
  if (isVi) {
    for (const [key, val] of Object.entries(LOCAL_VI_MAP)) {
      if (lower === key || lower.includes(key) || key.includes(lower)) {
        const targetText = lang === 'zh' ? val.zh : val.en;
        const targetPhonetics = lang === 'zh' ? val.zhVi : val.enVi;
        const rawChunks = lang === 'zh' ? val.zhChunks : val.enChunks;

        const chunks: TranscriptionChunk[] = rawChunks
          ? rawChunks.map((c) => ({
              original: c.o,
              phoneticsVi: c.v,
              ipaOrPinyin: c.ipa,
              partOfSpeech: inferClientPartOfSpeech(c.o),
              meaningVi: c.m,
              detailedExplanation: `Từ/cụm từ "${c.o}" có nghĩa "${c.m}", giữ vai trò ngữ pháp trong câu.`,
              stressAndLiaisonTip: c.t,
            }))
          : [
              {
                original: targetText,
                phoneticsVi: targetPhonetics,
                ipaOrPinyin: lang === 'zh' ? 'Pinyin' : 'IPA',
                partOfSpeech: 'Câu giao tiếp',
                meaningVi: val.mean,
                detailedExplanation: `Nguyên mẫu câu diễn đạt ý nghĩa "${val.mean}" chuẩn bản ngữ.`,
                stressAndLiaisonTip: 'Đã tự động dịch từ tiếng Việt sang chuẩn ngôn ngữ đích',
              },
            ];

        return {
          originalText: targetText,
          inputWasVietnamese: true,
          vietnameseSourceText: clean,
          language: lang,
          fullVietnamesePhonetics: targetPhonetics,
          fullVietnameseMeaning: val.mean,
          sentenceType: isQuestion ? (lang === 'zh' ? 'Câu hỏi tiếng Trung' : 'Câu hỏi tiếng Anh') : 'Câu giao tiếp',
          intonation: {
            direction: isQuestion ? 'rising' : 'falling',
            symbol: isQuestion ? '↗' : '↘',
            rule: isQuestion ? 'Lên giọng ở cuối câu hỏi' : 'Xuống giọng tự nhiên ở cuối câu',
          },
          chunks,
          words: extractWordAnalysis(targetText, lang, chunks),
          pronunciationTips: [
            `Đã nhận diện tiếng Việt và chuyển sang ${lang === 'zh' ? 'Tiếng Trung' : 'Tiếng Anh'} chuẩn.`,
          ],
        };
      }
    }

    // Preserve the user's actual sentence for the fallback
    const wordsTokens = clean.split(/\s+/);
    const chunks: TranscriptionChunk[] = wordsTokens.map((w) => ({
      original: w,
      phoneticsVi: w,
      ipaOrPinyin: 'Tiếng Việt',
      partOfSpeech: 'Từ vựng',
      meaningVi: w,
      detailedExplanation: `Từ "${w}" trong câu bạn đã nhập.`,
      stressAndLiaisonTip: 'Đọc tự nhiên',
    }));

    return {
      originalText: clean,
      inputWasVietnamese: true,
      vietnameseSourceText: clean,
      language: lang,
      fullVietnamesePhonetics: clean,
      fullVietnameseMeaning: clean,
      sentenceType: 'Câu giao tiếp',
      intonation: {
        direction: 'falling',
        symbol: '↘',
        rule: 'Ngữ điệu tự nhiên',
      },
      chunks,
      words: extractWordAnalysis(clean, lang, chunks),
      pronunciationTips: [
        'Đang kết nối máy chủ để hoàn tất phân tích ngữ âm đầy đủ cho câu của bạn.',
      ],
    };
  }

  // Other languages fallback (e.g. Japanese, Korean, French, German, Spanish...)
  if (lang !== 'zh' && lang !== 'en') {
    const langInfo = getLanguageConfig(lang);
    return {
      originalText: clean,
      inputWasVietnamese: false,
      language: lang,
      fullVietnamesePhonetics: 'Đang phân tích ngữ âm bằng máy chủ...',
      fullVietnameseMeaning: 'Đang dịch nghĩa...',
      sentenceType: isQuestion ? `Câu hỏi ${langInfo.name}` : `Câu giao tiếp ${langInfo.name}`,
      intonation: {
        direction: isQuestion ? 'rising' : 'falling',
        symbol: isQuestion ? '↗' : '↘',
        rule: `Ngữ điệu chuẩn ${langInfo.name}`,
      },
      chunks: [
        {
          original: clean,
          phoneticsVi: 'Đang tạo phiên âm...',
          ipaOrPinyin: langInfo.badge,
          partOfSpeech: inferClientPartOfSpeech(clean),
          meaningVi: 'Đang tải bản dịch...',
          detailedExplanation: 'Đang phân tích nghĩa chi tiết và ngữ pháp...',
          stressAndLiaisonTip: 'Phát âm tự nhiên chuẩn bản ngữ',
        },
      ],
      words: extractWordAnalysis(clean, lang),
      pronunciationTips: [`Đang kết nối AI phân tích chuẩn phát âm ${langInfo.name}...`],
    };
  }

  if (lang === 'zh') {
    // Chinese fallback
    const matched = ZH_QUICK_DICT[clean];
    if (matched) {
      return {
        originalText: clean,
        inputWasVietnamese: false,
        language: 'zh',
        fullVietnamesePhonetics: matched.vi,
        fullVietnameseMeaning: matched.meaning,
        sentenceType: isQuestion ? 'Câu hỏi tiếng Trung' : 'Câu giao tiếp tiếng Trung',
        intonation: {
          direction: isQuestion ? 'rising' : 'falling',
          symbol: isQuestion ? '↗' : '↘',
          rule: isQuestion ? 'Lên giọng ở cuối câu hỏi' : 'Xuống giọng dứt khoát ở thanh 4 cuối câu',
        },
        chunks: [
          {
            original: clean,
            phoneticsVi: matched.vi,
            ipaOrPinyin: matched.pinyin,
            partOfSpeech: inferClientPartOfSpeech(clean),
            meaningVi: matched.meaning,
            detailedExplanation: `Từ/cụm từ "${clean}" (${matched.pinyin}) có nghĩa "${matched.meaning}", dạng từ: ${inferClientPartOfSpeech(clean)}.`,
            stressAndLiaisonTip: matched.tip || 'Phát âm rõ thanh điệu',
          },
        ],
        words: extractWordAnalysis(clean, 'zh'),
        pronunciationTips: [
          matched.tip || 'Chú ý các thanh điệu tiếng Trung và thanh nhẹ ở cuối từ',
        ],
      };
    }

    return {
      originalText: clean,
      inputWasVietnamese: false,
      language: 'zh',
      fullVietnamesePhonetics: clean,
      fullVietnameseMeaning: 'Câu giao tiếp tiếng Trung',
      sentenceType: isQuestion ? 'Câu hỏi' : 'Câu trần thuật',
      intonation: {
        direction: isQuestion ? 'rising' : 'falling',
        symbol: isQuestion ? '↗' : '↘',
        rule: 'Ngữ điệu câu tiếng Trung phụ thuộc vào thanh điệu của từng chữ',
      },
      chunks: [
        {
          original: clean,
          phoneticsVi: clean,
          ipaOrPinyin: 'Pinyin',
          partOfSpeech: inferClientPartOfSpeech(clean),
          meaningVi: 'Nghĩa câu',
          detailedExplanation: 'Cụm từ giao tiếp tiếng Trung.',
          stressAndLiaisonTip: 'Giữ đều hơi và phát âm rõ ràng',
        },
      ],
      words: extractWordAnalysis(clean, 'zh'),
      pronunciationTips: ['Đang phân tích thanh điệu và cách đọc chuẩn Việt bằng AI...'],
    };
  }

  // English processing: group words and convert to concise phonetics
  const wordsTokens = clean.split(/\s+/);
  const chunks: TranscriptionChunk[] = [];
  const phoneticsParts: string[] = [];

  let i = 0;
  while (i < wordsTokens.length) {
    const raw1 = wordsTokens[i] ? wordsTokens[i].replace(/[.,!?;:]/g, '').toLowerCase() : '';
    const raw2 = wordsTokens[i + 1] ? wordsTokens[i + 1].replace(/[.,!?;:]/g, '').toLowerCase() : '';
    const combinedKey = `${raw1}_${raw2}`;

    if (EN_QUICK_DICT[combinedKey]) {
      const entry = EN_QUICK_DICT[combinedKey];
      const chunkText = `${wordsTokens[i]} ${wordsTokens[i + 1]}`;
      const pos = inferClientPartOfSpeech(chunkText);
      chunks.push({
        original: chunkText,
        phoneticsVi: entry.vi,
        ipaOrPinyin: entry.ipa,
        partOfSpeech: pos,
        meaningVi: entry.meaning,
        detailedExplanation: `Cụm từ "${chunkText}" có nghĩa là "${entry.meaning}", đóng vai trò ${pos} trong câu.`,
        stressAndLiaisonTip: entry.tip || 'Nối âm tự nhiên',
      });
      phoneticsParts.push(entry.vi);
      i += 2;
    } else {
      const entry = EN_QUICK_DICT[raw1];
      const chunkText = wordsTokens[i];
      const pos = inferClientPartOfSpeech(chunkText);
      if (entry) {
        chunks.push({
          original: chunkText,
          phoneticsVi: entry.vi,
          ipaOrPinyin: entry.ipa,
          partOfSpeech: pos,
          meaningVi: entry.meaning,
          detailedExplanation: `Từ "${chunkText}" có nghĩa là "${entry.meaning}", thuộc dạng ${pos}.`,
          stressAndLiaisonTip: entry.tip || 'Đọc gọn, chuẩn âm',
        });
        phoneticsParts.push(entry.vi);
      } else {
        const viApprox = approximateEnglishPhonetic(raw1);
        chunks.push({
          original: chunkText,
          phoneticsVi: viApprox,
          ipaOrPinyin: `/${raw1}/`,
          partOfSpeech: pos,
          meaningVi: 'Từ vựng',
          detailedExplanation: `Từ "${chunkText}" đóng vai trò ${pos} trong cấu trúc ngữ pháp câu.`,
          stressAndLiaisonTip: 'Đọc tự nhiên',
        });
        phoneticsParts.push(viApprox);
      }
      i++;
    }
  }

  const isWhQuestion = /^(what|where|when|why|who|how|which)/i.test(clean);
  const intonationDirection = isQuestion ? (isWhQuestion ? 'falling' : 'rising') : 'falling';
  const intonationSymbol = intonationDirection === 'rising' ? '↗' : '↘';
  const intonationRule = isQuestion
    ? (isWhQuestion
        ? 'Xuống giọng ↘ ở cuối câu hỏi có từ để hỏi (Wh-question)'
        : 'Lên giọng ↗ ở cuối câu hỏi Yes/No')
    : 'Xuống giọng ↘ ở cuối câu trần thuật';

  let sentenceVi = phoneticsParts.join(' ');
  if (sentenceVi.length > 0) {
    sentenceVi = sentenceVi.charAt(0).toUpperCase() + sentenceVi.slice(1);
  }
  if (isQuestion && !sentenceVi.endsWith('?')) {
    sentenceVi += '?';
  }

  return {
    originalText: clean,
    language: 'en',
    fullVietnamesePhonetics: sentenceVi,
    fullVietnameseMeaning: 'Đang tải bản dịch chi tiết...',
    sentenceType: isQuestion ? (isWhQuestion ? 'Câu hỏi Wh-' : 'Câu hỏi Yes/No') : 'Câu nói thông dụng',
    intonation: {
      direction: intonationDirection,
      symbol: intonationSymbol,
      rule: intonationRule,
    },
    chunks,
    words: extractWordAnalysis(clean, 'en', chunks),
    pronunciationTips: [
      'Phát âm các từ ngắn gọn, thanh thoát, dễ đọc.',
      'Nhấn nhẹ vào các từ khóa mang thông tin chính trong câu.',
    ],
  };
}

function approximateEnglishPhonetic(word: string): string {
  if (!word) return '';
  const w = word.toLowerCase();
  if (w === 'are') return 'a';
  if (w === 'you') return 'diu';
  if (w === 'how') return 'hao';
  if (w === 'today') return 'tu-đây';
  if (w === 'nice') return 'nai-s';
  if (w === 'meet') return 'mít';
  if (w === 'the') return 'đờ';
  if (w === 'for') return 'pho';
  if (w === 'with') return 'uýt';
  if (w === 'this') return 'đít';
  if (w === 'that') return 'đát';
  if (w === 'like') return 'lai';
  if (w === 'love') return 'láp';
  if (w === 'time') return 'thaim';
  if (w === 'people') return 'phi-phồ';
  return w;
}

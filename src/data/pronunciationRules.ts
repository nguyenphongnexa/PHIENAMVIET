export interface PracticeItem {
  id: string;
  language: string;
  category: string;
  original: string;
  phoneticsVi: string;
  meaningVi: string;
  intonation: string;
  tip: string;
}

export interface PronunciationRule {
  title: string;
  language: string;
  summary: string;
  examples: {
    text: string;
    phoneticsVi: string;
    note: string;
  }[];
}

// Danh mục chủ đề chuẩn hóa đầy đủ theo yêu cầu:
// Hàng ngày, Mua sắm, Du lịch, Công sở & Văn phòng, Cafe, Dạo phố, Cuối tuần, Khách sạn, Siêu thị, Máy tính & Công nghệ, Tình cảm & Tình yêu, Ngày lễ & Chúc mừng
export const PRACTICE_CATEGORIES = [
  'Tất cả',
  'Hàng ngày',
  'Cafe',
  'Nhà hàng',
  'Siêu thị',
  'Mua sắm',
  'Dạo phố',
  'Cuối tuần',
  'Ngày lễ',
  'Tình cảm, tình yêu',
  'Du lịch',
  'Sân bay',
  'Khách sạn',
  'Lễ tân khách sạn',
  'Công sở, văn phòng',
  'Máy tính',
  'Kinh tế, tài chính, kế toán',
];

export const DAILY_PRACTICE_ITEMS: PracticeItem[] = [
  // ==========================================
  // TIẾNG ANH (ENGLISH)
  // ==========================================

  // 1. Hàng ngày
  {
    id: 'en-daily-1',
    language: 'en',
    category: 'Hàng ngày',
    original: 'Hello, how are you today?',
    phoneticsVi: 'Hê-lâu, hao a diu tu-đây?',
    meaningVi: 'Xin chào, hôm nay bạn thế nào / có khỏe không?',
    intonation: '↘ Xuống giọng ở cuối câu hỏi có từ để hỏi (How)',
    tip: 'Từ "today" đọc gọn là "tu-đây", nhấn mạnh âm "đây". "How are" đọc lướt nối âm nhẹ thành "hao-oa".'
  },
  {
    id: 'en-daily-2',
    language: 'en',
    category: 'Hàng ngày',
    original: 'Nice to meet you, have a good day!',
    phoneticsVi: 'Nai-s thừ mít diu, hép ơ gút đây!',
    meaningVi: 'Rất vui được gặp bạn, chúc bạn một ngày tốt lành!',
    intonation: '↘ Hạ giọng êm ái ở cuối câu chào tạm biệt',
    tip: 'Xì nhẹ âm đuôi /s/ ở "Nai-s", "meet you" nối âm thành "mít-diu", "have a" nối thành "hép-pơ".'
  },
  {
    id: 'en-daily-3',
    language: 'en',
    category: 'Hàng ngày',
    original: 'What have you been up to lately?',
    phoneticsVi: 'Oát hép diu bin áp thừ lết-li?',
    meaningVi: 'Dạo gần đây bạn có gì mới không?',
    intonation: '↘ Xuống giọng ở từ cuối lately',
    tip: '"been up to" nối âm thành "bin-náp-thừ", nhấn trọng âm vào "lết-li".'
  },

  // 2. Mua sắm
  {
    id: 'en-shop-1',
    language: 'en',
    category: 'Mua sắm',
    original: 'How much does this cost?',
    phoneticsVi: 'Hao mát đơ-z đít cót?',
    meaningVi: 'Cái này giá bao nhiêu tiền?',
    intonation: '↘ Xuống giọng dứt khoát ở từ khóa cost',
    tip: 'Nhấn mạnh vào "mát" và "cót". Đọc ngắn gọn, không kéo dài rườm rà.'
  },
  {
    id: 'en-shop-2',
    language: 'en',
    category: 'Mua sắm',
    original: 'Can I get a discount if I buy two?',
    phoneticsVi: 'Cen nai gét ơ đít-s-khao-t íp ai bai thu? ↗',
    meaningVi: 'Tôi có được giảm giá nếu mua 2 cái không?',
    intonation: '↗ Lên giọng ở cuối câu hỏi Yes/No (thu?)',
    tip: '"Can I" nối thành "cen-nai", "discount" nhấn âm 1 "đít-s-khao-t".'
  },
  {
    id: 'en-shop-3',
    language: 'en',
    category: 'Mua sắm',
    original: 'Can I pay by credit card or cash?',
    phoneticsVi: 'Cen nai phây bai c-ré-địt cát o két?',
    meaningVi: 'Tôi có thể thanh toán bằng thẻ tín dụng hay tiền mặt?',
    intonation: '⤴ Lên giọng ở credit card, ↘ xuống giọng ở cash',
    tip: 'Câu hỏi lựa chọn (A or B): lên giọng ở phương án đầu, xuống giọng ở phương án cuối.'
  },

  // 3. Du lịch
  {
    id: 'en-travel-1',
    language: 'en',
    category: 'Du lịch',
    original: 'Excuse me, where is the nearest subway station?',
    phoneticsVi: 'Ích-s kiu-z mi, ue rơ-z đờ nia-rít sáp-uê s-tây-sừn?',
    meaningVi: 'Xin lỗi, cho tôi hỏi ga tàu điện ngầm gần nhất ở đâu?',
    intonation: '↘ Xuống giọng ở âm tiết cuối station',
    tip: 'Ngắt nhẹ sau "Excuse me", "Where is" nối thành "ue rơ-z", "station" nhấn âm 1.'
  },
  {
    id: 'en-travel-2',
    language: 'en',
    category: 'Du lịch',
    original: 'I would like to check in, here is my passport.',
    phoneticsVi: 'Ai út lai thừ check in, hia rơ-z mai pát-s-pót.',
    meaningVi: 'Tôi muốn làm thủ tục nhận phòng, đây là hộ chiếu của tôi.',
    intonation: '↘ Giọng điệu lịch sự, hạ nhẹ ở cuối câu',
    tip: '"check in" nối âm mượt mà "che-kin", "passport" nhấn âm 1 "pát-s-pót".'
  },
  {
    id: 'en-travel-3',
    language: 'en',
    category: 'Du lịch',
    original: 'Could you please call a taxi for me?',
    phoneticsVi: 'Kút diu phli-z cô ơ tác-xi pho mi? ↗',
    meaningVi: 'Bạn có thể vui lòng gọi giúp tôi một chiếc taxi được không?',
    intonation: '↗ Lên giọng ở cuối câu thỉnh cầu lịch sự',
    tip: '"Could you" nối thành "kút-diu", "call a" đọc nối thành "cô-lơ".'
  },

  // 4. Công sở
  {
    id: 'en-work-1',
    language: 'en',
    category: 'Công sở',
    original: 'Thank you for your timely update on this project.',
    phoneticsVi: 'Thenk kiu pho gio thaim-li áp-đét on đít p-ró-chếch.',
    meaningVi: 'Cảm ơn bạn đã cập nhật kịp thời về dự án này.',
    intonation: '↘ Xuống giọng ấm áp, chuyên nghiệp',
    tip: '"Thank you" đọc "thenk kiu", "timely" nhấn âm thaim, "project" đọc "p-ró-chếch".'
  },
  {
    id: 'en-work-2',
    language: 'en',
    category: 'Công sở',
    original: 'Please let me know if you need any further assistance.',
    phoneticsVi: 'Phli-z lét mi nâu íp diu nít én-ni phơ-đơ ơ-sít-từn.',
    meaningVi: 'Vui lòng báo cho tôi biết nếu bạn cần thêm bất kỳ sự hỗ trợ nào.',
    intonation: '↘ Xuống giọng dứt khoát, đáng tin cậy',
    tip: '"let me" đọc "lét-mi", "if you" đọc "íp-diu", "assistance" nhấn "sít".'
  },
  {
    id: 'en-work-3',
    language: 'en',
    category: 'Công sở',
    original: 'Shall we schedule a quick meeting tomorrow morning?',
    phoneticsVi: 'Seo uy s-kê-diu ơ quých mít-tinh thừ-mo-râu mo-ninh? ↗',
    meaningVi: 'Chúng ta có nên xếp một cuộc họp nhanh vào sáng mai không?',
    intonation: '↗ Lên giọng gợi ý ở cuối câu',
    tip: '"schedule a" nối thành "s-kê-diu-lơ", "tomorrow" âm to lướt nhẹ "thừ-mo-râu".'
  },

  // 5. Cafe & Ăn uống
  {
    id: 'en-cafe-1',
    language: 'en',
    category: 'Cafe & Ăn uống',
    original: 'I would like a hot cappuccino with less sugar, please.',
    phoneticsVi: 'Ai út lai ơ hót cáp-pu-chi-nô uýt lét su-gơ, phli-z.',
    meaningVi: 'Cho tôi một ly cappuccino nóng ít đường nhé, làm ơn.',
    intonation: '↘ Xuống giọng nhẹ nhàng ở từ please',
    tip: '"I would like" đọc gọn "ai út lai", "less sugar" đọc "lét su-gơ".'
  },
  {
    id: 'en-cafe-2',
    language: 'en',
    category: 'Cafe & Ăn uống',
    original: 'Can we get the check and split the bill, please?',
    phoneticsVi: 'Cen uy gét đờ check en s-p-lít đờ biu, phli-z? ↗',
    meaningVi: 'Cho chúng tôi xin hóa đơn và chia tiền tính riêng nhé?',
    intonation: '↗ Lên giọng lịch sự ở cuối câu',
    tip: '"split the bill" đọc trơn tru "s-p-lít đờ biu", bill đọc gọn âm "biu".'
  },
  {
    id: 'en-cafe-3',
    language: 'en',
    category: 'Cafe & Ăn uống',
    original: 'This dessert is absolutely delicious!',
    phoneticsVi: 'Đít đi-zớt i-z ép-xơ-lút-li đì-lí-sợt!',
    meaningVi: 'Món tráng miệng này thực sự ngon tuyệt vời!',
    intonation: '↗ Cảm thán hào hứng, âm vực cao ở delicious',
    tip: 'Dessert nhấn âm 2 "đi-zớt", delicious nhấn âm lí "đì-lí-sợt".'
  },

  // 6. Dạo phố
  {
    id: 'en-street-1',
    language: 'en',
    category: 'Dạo phố',
    original: 'The weather is so lovely for a walk today.',
    phoneticsVi: 'Đờ ue-đơ i-z sâu láp-li pho ơ uốc tu-đây.',
    meaningVi: 'Thời tiết hôm nay thật đẹp để đi dạo một vòng.',
    intonation: '↘ Giọng điệu thư giãn, trầm ấm',
    tip: '"weather" đọc gọn "ue-đơ", "for a walk" đọc nối "pho-rơ uốc".'
  },
  {
    id: 'en-street-2',
    language: 'en',
    category: 'Dạo phố',
    original: 'Could you take a picture of us, please?',
    phoneticsVi: 'Kút diu thêk ơ phích-chơ óp ắt, phli-z? ↗',
    meaningVi: 'Bạn có thể chụp giúp chúng tôi một bức ảnh được không?',
    intonation: '↗ Lên giọng thỉnh cầu thân thiện',
    tip: '"take a" nối thành "thê-kơ", "picture of us" đọc "phích-chơ-rơ vắt".'
  },

  // 7. Tình cảm & Tình yêu
  {
    id: 'en-love-1',
    language: 'en',
    category: 'Tình cảm & Tình yêu',
    original: 'You mean the world to me, I am always here for you.',
    phoneticsVi: 'Diu min đờ uôn thừ mi, ai em ôn-uây hia pho diu.',
    meaningVi: 'Em là cả thế giới đối với anh, anh luôn luôn ở bên em.',
    intonation: '↘ Giọng thì thầm, chân thành và sâu lắng',
    tip: 'Nhấn vào "world" (uôn) và "always" (ôn-uây), đọc liền mạch ấm áp.'
  },
  {
    id: 'en-love-2',
    language: 'en',
    category: 'Tình cảm & Tình yêu',
    original: 'Take good care of yourself and sweet dreams tonight.',
    phoneticsVi: 'Thêk gút ke óp gio-sép en suýt đ-rim-z thừ-nait.',
    meaningVi: 'Hãy chăm sóc bản thân thật tốt và chúc em ngủ ngon đêm nay nhé.',
    intonation: '↘ Giọng ấm áp, quan tâm nhẹ nhàng',
    tip: '"care of" đọc nối "ke-rớp", "sweet dreams" đọc êm ái "suýt đ-rim-z".'
  },

  // 8. Ngày lễ & Chúc mừng
  {
    id: 'en-holiday-1',
    language: 'en',
    category: 'Ngày lễ & Chúc mừng',
    original: 'Wishing you a joyful holiday season and a prosperous New Year!',
    phoneticsVi: 'Uýt-sing diu ơ troi-phồ ho-li-đây si-zừn en ơ p-ró-s-pơ-rợt Niu Dia!',
    meaningVi: 'Chúc bạn một mùa lễ hội tràn ngập niềm vui và một Năm Mới an khang thịnh vượng!',
    intonation: '↗ Rạng rỡ, phấn khởi ở cả hai vế câu chúc',
    tip: '"joyful" nhấn âm 1 "troi", "prosperous" nhấn "p-ró", "New Year" ngân vang.'
  },
  {
    id: 'en-holiday-2',
    language: 'en',
    category: 'Ngày lễ & Chúc mừng',
    original: 'Happy birthday! May all your wishes come true.',
    phoneticsVi: 'Hép-pi bớt-đây! Mây ôn gio uýt-sịt câm t-ru.',
    meaningVi: 'Chúc mừng sinh nhật! Chúc mọi điều ước của bạn đều thành hiện thực.',
    intonation: '↗ Hân hoan ở câu chúc đầu, ↘ hạ nhẹ ở cuối',
    tip: '"birthday" đọc "bớt-đây", "wishes come true" đọc "uýt-sịt câm t-ru".'
  },

  // 9. Cuối tuần
  {
    id: 'en-weekend-1',
    language: 'en',
    category: 'Cuối tuần',
    original: 'What are your plans for the weekend?',
    phoneticsVi: 'Oát a gio phen-z pho đờ uy-khen?',
    meaningVi: 'Kế hoạch cuối tuần này của bạn là gì?',
    intonation: '↘ Xuống giọng ở từ khóa cuối weekend',
    tip: 'Nhấn mạnh vào "plans" và "weekend", "for the" lướt nhẹ "pho đờ".'
  },
  {
    id: 'en-weekend-2',
    language: 'en',
    category: 'Cuối tuần',
    original: 'I just want to relax and sleep in this Sunday.',
    phoneticsVi: 'Ai chắt uốn tu ri-lác-s en s-líp in đít Săn-đây.',
    meaningVi: 'Chủ nhật này tôi chỉ muốn thư giãn và ngủ nướng một chút.',
    intonation: '↘ Giọng điệu thư thái, êm dịu',
    tip: '"sleep in" nối âm mượt "s-lí-pin", "relax" nhấn âm 2 "lác-s".'
  },

  // 10. Khách sạn
  {
    id: 'en-hotel-1',
    language: 'en',
    category: 'Khách sạn',
    original: 'I have a reservation under the name Phong.',
    phoneticsVi: 'Ai hép ơ rê-zơ-vây-sừn ăn-đơ đờ nêm Phong.',
    meaningVi: 'Tôi đã đặt phòng trước dưới tên Phong.',
    intonation: '↘ Giọng điệu lịch sự, hạ giọng ở tên riêng',
    tip: '"have a" nối thành "hép-pơ", "reservation" nhấn âm "vây".'
  },
  {
    id: 'en-hotel-2',
    language: 'en',
    category: 'Khách sạn',
    original: 'Could we get two extra towels and a wake-up call at seven?',
    phoneticsVi: 'Kút uy gét thu ích-s-tra thao-ồ-z en ơ uếk-ắp côl đợt sé-vừn? ↗',
    meaningVi: 'Khách sạn có thể cho tôi thêm 2 cái khăn tắm và báo thức lúc 7 giờ sáng không?',
    intonation: '↗ Lên giọng ở cuối câu thỉnh cầu',
    tip: '"wake-up" đọc "uếk-ắp", "at seven" nối nhẹ "đợt sé-vừn".'
  },

  // 11. Siêu thị
  {
    id: 'en-supermarket-1',
    language: 'en',
    category: 'Siêu thị',
    original: 'Excuse me, which aisle can I find fresh milk and bread?',
    phoneticsVi: 'Ích-s kiu-z mi, uýt ai-ồ cen nai phain ph-rét-s miu-k en b-rét?',
    meaningVi: 'Xin lỗi, dãy nào có bán sữa tươi và bánh mì vậy ạ?',
    intonation: '↘ Xuống giọng ở bread cuối câu hỏi có từ để hỏi which',
    tip: '"aisle" đọc là "ai-ồ", "can I" nối âm thành "cen-nai".'
  },
  {
    id: 'en-supermarket-2',
    language: 'en',
    category: 'Siêu thị',
    original: 'Do you have reusable shopping bags?',
    phoneticsVi: 'Diu hép ri-diu-zơ-bồ sóp-pinh pác? ↗',
    meaningVi: 'Ở đây có bán túi mua sắm dùng nhiều lần không?',
    intonation: '↗ Lên giọng ở cuối câu hỏi Yes/No',
    tip: '"shopping bags" đọc gọn "sóp-pinh pác", nhấn âm 1 "sóp".'
  },

  // 12. Máy tính & Công nghệ
  {
    id: 'en-computer-1',
    language: 'en',
    category: 'Máy tính & Công nghệ',
    original: 'My laptop battery is running low, do you have a charger?',
    phoneticsVi: 'Mai láp-thóp bát-tơ-ri i-z răn-ninh lâu, diu hép ơ cha-chơ? ↗',
    meaningVi: 'Pin máy tính xách tay của tôi sắp hết, bạn có đồ sạc không?',
    intonation: '↗ Lên giọng thỉnh cầu ở charger?',
    tip: '"laptop" nhấn láp, "battery" nhấn bát, "running low" đọc trôi chảy.'
  },
  {
    id: 'en-computer-2',
    language: 'en',
    category: 'Máy tính & Công nghệ',
    original: 'Could you send me the file via email or cloud link?',
    phoneticsVi: 'Kút diu sen mi đờ phai-ồ va-ia i-meo o clao lin-k?',
    meaningVi: 'Bạn có thể gửi tệp tin cho tôi qua email hoặc đường liên kết đám mây được không?',
    intonation: '⤴ Lên ở email, ↘ xuống ở cloud link',
    tip: '"Could you" nối thành "kút-diu", "file" đọc gọn "phai-ồ".'
  },

  // ==========================================
  // TIẾNG TRUNG (CHINESE)
  // ==========================================

  // 1. Hàng ngày
  {
    id: 'zh-daily-1',
    language: 'zh',
    category: 'Hàng ngày',
    original: '你好，很高兴认识你！',
    phoneticsVi: 'Ní hảo, hẩn cao xing rân sử nỉ!',
    meaningVi: 'Xin chào, rất vui được làm quen với bạn!',
    intonation: '→ Giữ thanh điệu rõ ràng, ngân vang vui tươi',
    tip: 'Hai thanh 3 "你好" (Nǐ hǎo) biến điệu thành "Ní hảo". 认识 đọc "rân sử".'
  },
  {
    id: 'zh-daily-2',
    language: 'zh',
    category: 'Hàng ngày',
    original: '你今天过得怎么样？',
    phoneticsVi: 'Nỉ chin then cua tợ chẩn mơ dang?',
    meaningVi: 'Hôm nay bạn thế nào / trôi qua tốt chứ?',
    intonation: '↘ Hạ nhẹ ở cuối câu hỏi xã giao',
    tip: '今天 (jīntiān) thanh 1 đều và cao. 得 (de) đọc thanh nhẹ lướt "tợ".'
  },

  // 2. Mua sắm
  {
    id: 'zh-shop-1',
    language: 'zh',
    category: 'Mua sắm',
    original: '这个多少钱？可以便宜一点吗？',
    phoneticsVi: 'Chưa cờ tua sao chén? Khở dỉ phiến di di tiển ma?',
    meaningVi: 'Cái này bao nhiêu tiền? Có thể rẻ hơn một chút không?',
    intonation: '↗ Lên nhẹ ở trợ từ nghi vấn "ma" cuối câu',
    tip: '多少 đọc "tua sao" thanh 1 + thanh nhẹ. 可以 (kěyǐ) biến điệu thành "khở dỉ".'
  },
  {
    id: 'zh-shop-2',
    language: 'zh',
    category: 'Mua sắm',
    original: '太贵了，能不能打个折？',
    phoneticsVi: 'Thai cùy lơ, nấng bu nấng tả cờ trớ?',
    meaningVi: 'Đắt quá rồi, có thể giảm giá một chút không?',
    intonation: '↘ Dứt khoát ở thái cùy, ↗ hơi ngân ở trớ',
    tip: '太 (tài) thanh 4 dứt khoát, 打折 (dǎzhé) nghĩa là chiết khấu / giảm giá.'
  },

  // 3. Du lịch
  {
    id: 'zh-travel-1',
    language: 'zh',
    category: 'Du lịch',
    original: '请问，去地铁站怎么走？',
    phoneticsVi: 'Chỉnh uần, chuy ti thiết trang chẩn mơ tẩu?',
    meaningVi: 'Xin hỏi, đến ga tàu điện ngầm đi đường nào?',
    intonation: '↗ Nhấn vào từ hỏi 怎么走 (chẩn mơ tẩu)',
    tip: '请问 (qǐngwèn) có nghĩa lịch sự "xin hỏi", ngắt nhẹ một nhịp trước khi hỏi hướng đi.'
  },
  {
    id: 'zh-travel-2',
    language: 'zh',
    category: 'Du lịch',
    original: '我想去机场，需要多长时间？',
    phoneticsVi: 'Ủa xẻng chuy chi trảng, xuy deo tua tráng sử chen?',
    meaningVi: 'Tôi muốn đi ra sân bay, mất bao lâu thời gian?',
    intonation: '↘ Hạ nhẹ ở từ 时间 (sử chen)',
    tip: '机场 (chi trảng) là sân bay, 多长时间 (tua tráng sử chen) hỏi thời gian.'
  },

  // 4. Công sở
  {
    id: 'zh-work-1',
    language: 'zh',
    category: 'Công sở',
    original: '谢谢你的支持，合作愉快！',
    phoneticsVi: 'Xiê xiê nỉ tợ trư trử, hứa chúa du khoai!',
    meaningVi: 'Cảm ơn sự ủng hộ của bạn, hợp tác vui vẻ!',
    intonation: '↘ Dứt khoát, ấm áp và tự tin',
    tip: '支持 (zhīchí) đọc "trư trử", 合作愉快 (hézuò yúkuài) câu chúc hợp tác chuẩn.'
  },
  {
    id: 'zh-work-2',
    language: 'zh',
    category: 'Công sở',
    original: '我们明天下午开个短会吧。',
    phoneticsVi: 'Ủa mơn mính then xia u khai cờ toản huây ba.',
    meaningVi: 'Chiều mai chúng ta họp nhanh một lát nhé.',
    intonation: '↘ Hạ nhẹ ở trợ từ đề nghị "ba"',
    tip: '明天下午 (mính then xia u) là chiều mai, 开会 (khai huây) là họp.'
  },

  // 5. Cafe & Ăn uống
  {
    id: 'zh-cafe-1',
    language: 'zh',
    category: 'Cafe & Ăn uống',
    original: '服务员，请结账，我们要买单！',
    phoneticsVi: 'Phú u diển, chỉnh chiế trang, ủa mơn deo mải đan!',
    meaningVi: 'Phục vụ ơi, xin tính tiền, chúng tôi muốn thanh toán!',
    intonation: '→ Âm vang to, dứt khoát',
    tip: '结账 (chiế trang) hoặc 买单 (mải đan) đều là từ bản ngữ chỉ thanh toán tiền.'
  },
  {
    id: 'zh-cafe-2',
    language: 'zh',
    category: 'Cafe & Ăn uống',
    original: '我想喝一杯冰美式咖啡，不加糖。',
    phoneticsVi: 'Ủa xẻng hư di phây pinh mảy sư kha phây, pu chia tháng.',
    meaningVi: 'Tôi muốn một ly cà phê Americano đá, không thêm đường.',
    intonation: '↘ Xuống giọng nhẹ khi kết thúc câu gọi món',
    tip: '冰 (pinh) là đá, 不加糖 (pu chia tháng) là không cho đường.'
  },

  // 6. Dạo phố
  {
    id: 'zh-street-1',
    language: 'zh',
    category: 'Dạo phố',
    original: '今天天气真好，我们去散散步吧！',
    phoneticsVi: 'Chin then thiên chi trơn hảo, ủa mơn chuy sàn sàn pu ba!',
    meaningVi: 'Hôm nay thời tiết thật đẹp, chúng ta đi dạo bộ đi!',
    intonation: '↗ Giọng điệu thư thái, vui vẻ',
    tip: '散步 (sànbù) là đi dạo, lặp lại "sàn sàn pu" mang nét tự nhiên, thân mật.'
  },

  // 7. Tình cảm & Tình yêu
  {
    id: 'zh-love-1',
    language: 'zh',
    category: 'Tình cảm & Tình yêu',
    original: '我一直都在这里陪着你，别担心。',
    phoneticsVi: 'Ủa di trứ tâu chai trơ lỉ phấy trơ nỉ, pié tan xin.',
    meaningVi: 'Anh luôn ở đây bên cạnh em, đừng lo lắng nhé.',
    intonation: '↘ Giọng ấm áp, dỗ dành nhẹ nhàng',
    tip: '陪着你 (phấy trơ nỉ) là đồng hành bên cạnh bạn, 别担心 (pié tan xin) là đừng lo.'
  },
  {
    id: 'zh-love-2',
    language: 'zh',
    category: 'Tình cảm & Tình yêu',
    original: '今天好想你，晚安，做个好梦！',
    phoneticsVi: 'Chin then hảo xẻng nỉ, uản an, chua cờ hảo mâng!',
    meaningVi: 'Hôm nay nhớ em nhiều, chúc em ngủ ngon và mơ giấc mơ đẹp!',
    intonation: '↘ Giọng điệu êm dịu, ngọt ngào',
    tip: '晚安 (uản an) là chúc ngủ ngon, 做个好梦 (chua cờ hảo mâng) là có giấc mơ đẹp.'
  },

  // 8. Ngày lễ & Chúc mừng
  {
    id: 'zh-holiday-1',
    language: 'zh',
    category: 'Ngày lễ & Chúc mừng',
    original: '祝你新年快乐，万事如意，身体健康！',
    phoneticsVi: 'Tru nỉ xin nén khoai lơ, oàn sư rú di, sân thỉ chiên khang!',
    meaningVi: 'Chúc bạn Năm Mới vui vẻ, vạn sự như ý, sức khỏe dồi dào!',
    intonation: '↗ Hân hoan, tràn đầy năng lượng tích cực',
    tip: '新年快乐 (xin nén khoai lơ), 万事如意 (oàn sư rú di) là lời chúc kinh điển.'
  },
  {
    id: 'zh-holiday-2',
    language: 'zh',
    category: 'Ngày lễ & Chúc mừng',
    original: '祝你生日快乐，心想事成！',
    phoneticsVi: 'Tru nỉ sâng rư khoai lơ, xin xẻng sư trấng!',
    meaningVi: 'Chúc bạn sinh nhật vui vẻ, ước gì được nấy!',
    intonation: '↗ Tươi vui, phấn khởi',
    tip: '生日快乐 (sâng rư khoai lơ) là chúc mừng sinh nhật.'
  },

  // 9. Cuối tuần
  {
    id: 'zh-weekend-1',
    language: 'zh',
    category: 'Cuối tuần',
    original: '这个周末你有什么打算？',
    phoneticsVi: 'Chưa cờ trâu mua nỉ dẩu sấn mơ tả soan?',
    meaningVi: 'Cuối tuần này bạn có dự định gì chưa?',
    intonation: '↘ Xuống nhẹ ở câu hỏi dǎsuàn',
    tip: '周末 (zhōumò) đọc là "trâu mua", 打算 (dǎsuàn) đọc là "tả soan".'
  },
  {
    id: 'zh-weekend-2',
    language: 'zh',
    category: 'Cuối tuần',
    original: '周末我想好好睡个懒觉。',
    phoneticsVi: 'Trâu mua ủa xẻng hảo hảo suây cờ lản chiao.',
    meaningVi: 'Cuối tuần tôi muốn ngủ nướng một giấc thật đã.',
    intonation: '↘ Giọng điệu thư giãn, dễ chịu',
    tip: '睡懒觉 (shuì lǎnjiào) nghĩa là ngủ nướng, 好好 (hǎohǎo) là thỏa thích.'
  },

  // 10. Khách sạn
  {
    id: 'zh-hotel-1',
    language: 'zh',
    category: 'Khách sạn',
    original: '我预订了一间大床房，这是我的护照。',
    phoneticsVi: 'Ủa duy ting lơ di chiên ta troáng pháng, chưa sư ủa tợ hu trao.',
    meaningVi: 'Tôi đã đặt trước một phòng giường đôi, đây là hộ chiếu của tôi.',
    intonation: '↘ Giọng điệu lịch sự khi làm thủ tục check-in',
    tip: '预订 (yùdìng) đọc là "duy ting", 护照 (hùzhào) là hộ chiếu.'
  },
  {
    id: 'zh-hotel-2',
    language: 'zh',
    category: 'Khách sạn',
    original: '请问酒店有免费无线网络吗？',
    phoneticsVi: 'Chỉnh oân chiểu tiện dẩu miễn phây ú xen oảng luô ma?',
    meaningVi: 'Xin hỏi khách sạn có mạng Wi-Fi miễn phí không?',
    intonation: '↗ Lên giọng ở trợ từ nghi vấn 吗 (ma)',
    tip: '免费 (miǎnfèi) là miễn phí, 无线网络 (wúxiàn wǎngluò) là mạng Wi-Fi.'
  },

  // 11. Siêu thị
  {
    id: 'zh-supermarket-1',
    language: 'zh',
    category: 'Siêu thị',
    original: '请问新鲜牛奶和面包在哪个货架？',
    phoneticsVi: 'Chỉnh oân xin xen niếu nải hơ miên pao chai nả cờ hua chia?',
    meaningVi: 'Xin hỏi sữa tươi và bánh mì ở quầy kệ nào vậy ạ?',
    intonation: '↘ Xuống nhẹ ở câu hỏi có từ để hỏi 哪个 (nả cờ)',
    tip: '牛奶 (niúnǎi) đọc "niếu nải", 面包 (miànbāo) đọc "miên pao".'
  },
  {
    id: 'zh-supermarket-2',
    language: 'zh',
    category: 'Siêu thị',
    original: '我需要一个环保购物袋。',
    phoneticsVi: 'Ủa xuy dao di cờ hoán pảo câu u tai.',
    meaningVi: 'Cho tôi một chiếc túi mua sắm bảo vệ môi trường.',
    intonation: '→ Giọng điệu rõ ràng, lịch sự',
    tip: '环保 (huánbǎo) là bảo vệ môi trường, 购物袋 (gòuwùdài) là túi mua hàng.'
  },

  // 12. Máy tính & Công nghệ
  {
    id: 'zh-computer-1',
    language: 'zh',
    category: 'Máy tính & Công nghệ',
    original: '我的电脑快没电了，请问有充电器吗？',
    phoneticsVi: 'Ủa tợ tiện nảo khoai mấy tiện lơ, chỉnh oân dẩu trung tiện chi ma?',
    meaningVi: 'Máy tính của tôi sắp hết pin, xin hỏi có đồ sạc pin không?',
    intonation: '↗ Lên giọng ở câu hỏi 吗 (ma)',
    tip: '电脑 (diànnǎo) đọc "tiện nảo", 充电器 (chōngdiànqì) đọc "trung tiện chi".'
  },
  {
    id: 'zh-computer-2',
    language: 'zh',
    category: 'Máy tính & Công nghệ',
    original: '你可以把这个文件发到我的邮箱吗？',
    phoneticsVi: 'Nỉ khở dỉ bả chưa cờ uấn chiên pha tao ủa tợ dâu xênh ma?',
    meaningVi: 'Bạn có thể gửi tệp tài liệu này vào hòm thư điện tử của tôi không?',
    intonation: '↗ Lên giọng thỉnh cầu',
    tip: '文件 (wénjiàn) đọc "uấn chiên", 邮箱 (yóuxiāng) đọc "dâu xênh".'
  },

  // ==========================================
  // TIẾNG CAM (KHMER)
  // ==========================================
  {
    id: 'km-daily-1',
    language: 'km',
    category: 'Hàng ngày',
    original: 'សួស្តី តើអ្នកសុខសប្បាយជាទេ?',
    phoneticsVi: 'Xua-s-đây, tơ nặc xục-xặp-bay chia tê?',
    meaningVi: 'Xin chào, bạn có khỏe không?',
    intonation: '↗ Lên giọng nhẹ ở cuối câu hỏi chia tê?',
    tip: 'សួស្តី (Suostei) phát âm gọn "Xua-s-đây", câu hỏi lên nhẹ ở trợ từ "tê?".'
  },
  {
    id: 'km-daily-2',
    language: 'km',
    category: 'Hàng ngày',
    original: 'សូមអរគុណច្រើន！',
    phoneticsVi: 'Xum oóc-kun ch-rơn!',
    meaningVi: 'Cảm ơn bạn rất nhiều!',
    intonation: '↘ Âm điệu trầm ấm, chân thành',
    tip: 'សូម (Soum) là xin/làm ơn, អរគុណ (Orkun) đọc "oóc-kun", ច្រើន (chraen) đọc "ch-rơn".'
  },
  {
    id: 'km-shop-1',
    language: 'km',
    category: 'Mua sắm',
    original: 'អាវនេះថ្លៃប៉ុន្មាន?',
    phoneticsVi: 'Ao nít th-lay pon-man?',
    meaningVi: 'Cái áo này giá bao nhiêu tiền?',
    intonation: '↘ Xuống nhẹ ở từ hỏi pon-man',
    tip: 'ថ្លៃប៉ុន្មាន (thlay ponman) đọc là "th-lay pon-man" có nghĩa là bao nhiêu tiền.'
  },
  {
    id: 'km-cafe-1',
    language: 'km',
    category: 'Cafe & Ăn uống',
    original: 'ខ្ញុំចង់បានកាហ្វេទឹកដោះគោមួយកែវ。',
    phoneticsVi: 'Kh-nhom chơng ban ca-phê tức-đớ-cô muôi keo.',
    meaningVi: 'Tôi muốn một ly cà phê sữa.',
    intonation: '→ Nhịp đọc đều, dứt khoát',
    tip: 'កាហ្វេទឹកដោះគោ (cafe teuk dah ko) là cà phê sữa, មួយកែវ là một ly.'
  },
  {
    id: 'km-travel-1',
    language: 'km',
    category: 'Du lịch',
    original: 'សូមជួយខ្ញុំបន្តិចបានទេ?',
    phoneticsVi: 'Xum chuôi kh-nhom bơn-tếch ban tê? ↗',
    meaningVi: 'Làm ơn giúp tôi một chút được không?',
    intonation: '↗ Lên giọng lịch sự ở cuối câu',
    tip: 'សូមជួយ (Soum chuoy) là làm ơn giúp, ខ្ញុំ (khnhom) là tôi.'
  },
  {
    id: 'km-street-1',
    language: 'km',
    category: 'Dạo phố',
    original: 'តើកន្លែងនេះស្អាតណាស់មែនទេ?',
    phoneticsVi: 'Tơ cơn-leng nít x-át nát mèn tê?',
    meaningVi: 'Nơi này đẹp lắm đúng không?',
    intonation: '↗ Lên giọng cảm thán vui vẻ',
    tip: 'ស្អាតណាស់ (s-at nah) có nghĩa là rất đẹp.'
  },
  {
    id: 'km-work-1',
    language: 'km',
    category: 'Công sở',
    original: 'ខ្ញុំនឹងផ្ញើរបាយការណ៍ជូនអ្នកនៅរសៀលនេះ។',
    phoneticsVi: 'Kh-nhom nưng ph-nhơ rơ-bai-ka chun nặc nâu rô-xil nít.',
    meaningVi: 'Tôi sẽ gửi báo cáo cho bạn vào chiều nay.',
    intonation: '↘ Giọng điệu chuyên nghiệp, dứt khoát',
    tip: 'ផ្ញើរបាយការណ៍ (phnheu robaykar) là gửi báo cáo, នៅរសៀលនេះ là chiều nay.'
  },
  {
    id: 'km-love-1',
    language: 'km',
    category: 'Tình cảm & Tình yêu',
    original: 'ខ្ញុំស្រឡាញ់អ្នកខ្លាំងណាស់！',
    phoneticsVi: 'Kh-nhom s-ro-lanh nặc kh-laing nát!',
    meaningVi: 'Anh yêu em nhiều lắm!',
    intonation: '↘ Giọng điệu chân thành, da diết',
    tip: 'ស្រឡាញ់ (srolanh) là yêu thương, ខ្លាំងណាស់ là rất nhiều.'
  },
  {
    id: 'km-holiday-1',
    language: 'km',
    category: 'Ngày lễ & Chúc mừng',
    original: 'រីករាយថ្ងៃចូលឆ្នាំថ្មី！',
    phoneticsVi: 'Rích-riên th-ngay chôl chh-năm th-mây!',
    meaningVi: 'Chúc mừng Năm Mới (Tết Chôl Chhnăm Thmây)!',
    intonation: '↗ Tươi vui, rộn ràng',
    tip: 'Lời chúc Tết truyền thống của người Campuchia.'
  },
  {
    id: 'km-weekend-1',
    language: 'km',
    category: 'Cuối tuần',
    original: 'ចុងសប្តាហ៍នេះ តើអ្នកមានគម្រោងទៅណា?',
    phoneticsVi: 'Chung xốp-đa nít, tơ nặc miên côm-roang nâu na?',
    meaningVi: 'Cuối tuần này, bạn có kế hoạch đi đâu không?',
    intonation: '↘ Xuống nhẹ ở từ hỏi nâu na?',
    tip: 'ចុងសប្តាហ៍ (chong sobah) là cuối tuần, គម្រោង (komroang) là kế hoạch.'
  },
  {
    id: 'km-hotel-1',
    language: 'km',
    category: 'Khách sạn',
    original: 'ខ្ញុំបានកក់បន្ទប់មួយរួចហើយ。',
    phoneticsVi: 'Kh-nhom ban cóc bơn-túp muôi ruốc hơi.',
    meaningVi: 'Tôi đã đặt trước một phòng rồi.',
    intonation: '↘ Lịch sự, rõ ràng',
    tip: 'កក់បន្ទប់ (kok bontob) là đặt phòng, រួចហើយ là đã xong rồi.'
  },
  {
    id: 'km-supermarket-1',
    language: 'km',
    category: 'Siêu thị',
    original: 'តើទឹកដោះគោ និងនំប៉័ងនៅកន្លែងណា?',
    phoneticsVi: 'Tơ tức-đớ-cô nưng num-păng nâu cơn-leng na?',
    meaningVi: 'Sữa tươi và bánh mì ở chỗ nào vậy ạ?',
    intonation: '↘ Xuống nhẹ ở câu hỏi vị trí cơn-leng na?',
    tip: 'ទឹកដោះគោ (teuk dah ko) là sữa tươi, នំប៉័ង (nompang) là bánh mì.'
  },
  {
    id: 'km-computer-1',
    language: 'km',
    category: 'Máy tính & Công nghệ',
    original: 'តើអ្នកមានឆ្នាំងសាកកុំព្យូទ័រទេ?',
    phoneticsVi: 'Tơ nặc miên chh-năng xạc côm-phiu-tơ tê? ↗',
    meaningVi: 'Bạn có cục sạc máy vi tính không?',
    intonation: '↗ Lên giọng thỉnh cầu ở trợ từ tê?',
    tip: 'ឆ្នាំងសាក (chhnang sak) là đồ sạc, កុំព្យូទ័រ (computer) là máy tính.'
  },

  // ==========================================
  // TIẾNG LÀO (LAO)
  // ==========================================
  {
    id: 'lo-daily-1',
    language: 'lo',
    category: 'Hàng ngày',
    original: 'ສະບາຍດີ ເຈົ້າສະບາຍດີບໍ່?',
    phoneticsVi: 'Xa-bai-đi, chậu xa-bai-đi bo?',
    meaningVi: 'Xin chào, bạn có khỏe không?',
    intonation: '↗ Ngân nhẹ và hơi lên ở từ ບໍ່ (bo) cuối câu',
    tip: 'ສະບາຍດີ (Sabaidee) là lời chào quốc dân của người Lào, phát âm "Xa-bai-đi" êm ái.'
  },
  {
    id: 'lo-daily-2',
    language: 'lo',
    category: 'Hàng ngày',
    original: 'ຂອບໃຈຫຼາຍໆເດີ້！',
    phoneticsVi: 'Khọp-chay lai lai đơ!',
    meaningVi: 'Cảm ơn bạn nhiều nhiều nha!',
    intonation: '↘ Giọng điệu chân thành, thân thiện',
    tip: 'ຂອບໃຈ (Khop chai) là cảm ơn, ຫຼາຍໆ (lai lai) là rất nhiều, ເດີ້ (der) là nha/nhé.'
  },
  {
    id: 'lo-shop-1',
    language: 'lo',
    category: 'Mua sắm',
    original: 'ອັນນີ້ລາຄາເທົ່າໃດ?',
    phoneticsVi: 'Ăn-ni la-kha thau-đai?',
    meaningVi: 'Cái này giá bao nhiêu tiền?',
    intonation: '↘ Xuống nhẹ ở từ hỏi ເທົ່າໃດ (thau-đai)',
    tip: 'ອັນນີ້ (An nee) là cái này, ລາຄາເທົ່າໃດ (la kha thao dai) là giá bao nhiêu.'
  },
  {
    id: 'lo-travel-1',
    language: 'lo',
    category: 'Du lịch',
    original: 'ຊ່ວຍຂ້ອຍແດ່ໄດ້ບໍ່?',
    phoneticsVi: 'Xuồi khọi đe đai bo? ↗',
    meaningVi: 'Có thể giúp tôi một chút được không?',
    intonation: '↗ Lên giọng thỉnh cầu lịch sự',
    tip: 'ຊ່ວຍ (Souay) là giúp đỡ, ຂ້ອຍ (khoy) là tôi, ໄດ້ບໍ່ (dai bor) là được không.'
  },
  {
    id: 'lo-cafe-1',
    language: 'lo',
    category: 'Cafe & Ăn uống',
    original: 'ຂໍກາເຟເຢັນຈອກໜຶ່ງ，ບໍ່ຫວານ.',
    phoneticsVi: 'Khỏ ca-phê den chọc nừng, bo oản.',
    meaningVi: 'Cho tôi một ly cà phê đá, không ngọt (ít đường).',
    intonation: '→ Rõ ràng, dứt khoát khi gọi đồ uống',
    tip: 'ກາເຟເຢັນ (kafe yen) là cà phê đá, ບໍ່ຫວານ (bor wan) là không ngọt.'
  },
  {
    id: 'lo-street-1',
    language: 'lo',
    category: 'Dạo phố',
    original: 'ເມືອງນີ້ງາມຫຼາຍເນາະ！',
    phoneticsVi: 'Mương ni ngam lai nọ!',
    meaningVi: 'Thành phố này đẹp quá nhỉ!',
    intonation: '↗ Ngân vui tươi, thân thiện',
    tip: 'ງາມ (ngam) là đẹp, ຫຼາຍ (lai) là nhiều, ເນາະ (nor) là nhỉ/nha.'
  },
  {
    id: 'lo-work-1',
    language: 'lo',
    category: 'Công sở',
    original: 'ມື້ນີ້ເຮົາມີປະຊຸມຕອນບ່າຍ.',
    phoneticsVi: 'Mự ni hau mi pa-xum ton bài.',
    meaningVi: 'Hôm nay chúng ta có cuộc họp vào buổi chiều.',
    intonation: '↘ Rõ ràng, ngữ điệu công sở lịch thiệp',
    tip: 'ປະຊຸມ (pasum) là cuộc họp, ຕອນບ່າຍ (ton bai) là buổi chiều.'
  },
  {
    id: 'lo-love-1',
    language: 'lo',
    category: 'Tình cảm & Tình yêu',
    original: 'ຂ້ອຍຮັກເຈົ້າຫຼາຍເດີ້！',
    phoneticsVi: 'Khọi hắc chậu lai đơ!',
    meaningVi: 'Anh yêu em nhiều lắm nha!',
    intonation: '↘ Giọng điệu ngọt ngào, ấm áp',
    tip: 'ຮັກ (hak) phát âm là "hắc", nghĩa là yêu.'
  },
  {
    id: 'lo-holiday-1',
    language: 'lo',
    category: 'Ngày lễ & Chúc mừng',
    original: 'ສະບາຍດີປີໃໝ່！',
    phoneticsVi: 'Xa-bai-đi pi mày!',
    meaningVi: 'Chúc mừng Năm Mới (Tết Bunpimay)!',
    intonation: '↗ Rộn rã, tưng bừng',
    tip: 'Lời chúc Năm Mới truyền thống của đất nước triệu voi.'
  },
  {
    id: 'lo-weekend-1',
    language: 'lo',
    category: 'Cuối tuần',
    original: 'ທ້າຍອາທິດນີ້ ເຈົ້າມີແຜນໄປໃສບໍ່?',
    phoneticsVi: 'Thai a-thít ni, chậu mi phẻn pay xải bo? ↗',
    meaningVi: 'Cuối tuần này, bạn có kế hoạch đi đâu không?',
    intonation: '↗ Lên nhẹ ở từ hỏi bo?',
    tip: 'ທ້າຍອາທິດ (thay a thit) là cuối tuần, ແຜນ (phaen) là kế hoạch, ໄປໃສ (pay sai) là đi đâu.'
  },
  {
    id: 'lo-hotel-1',
    language: 'lo',
    category: 'Khách sạn',
    original: 'ຂ້ອຍໄດ້ຈອງຫ້ອງໄວ້ແລ້ວ，ຊື່ພົງ.',
    phoneticsVi: 'Khọi đai chong họng oạy leo, xừ Phông.',
    meaningVi: 'Tôi đã đặt phòng trước rồi, tên là Phong.',
    intonation: '↘ Lịch thiệp, rõ ràng khi check in',
    tip: 'ຈອງຫ້ອງ (chong hong) là đặt phòng, ຊື່ (seua) là tên.'
  },
  {
    id: 'lo-supermarket-1',
    language: 'lo',
    category: 'Siêu thị',
    original: 'ນົມສົດ ແລະ ເຂົ້າຈີ່ ຢູ່ລັອກໃດ?',
    phoneticsVi: 'Nôm xốt lé khẩu-chì dù lóc đai?',
    meaningVi: 'Sữa tươi và bánh mì ở dãy nào vậy ạ?',
    intonation: '↘ Xuống nhẹ ở từ hỏi dù lóc đai',
    tip: 'ນົມສົດ (nom sot) là sữa tươi, ເຂົ້າຈີ່ (khao chee) là bánh mì baguette.'
  },
  {
    id: 'lo-computer-1',
    language: 'lo',
    category: 'Máy tính & Công nghệ',
    original: 'ຄອມພິວເຕີຂ້ອຍແບັດໝົດ，ເຈົ້າມີສາຍສາກບໍ່?',
    phoneticsVi: 'Khom-phiu-tơ khọi bẹt mốt, chậu mi xải xạc bo? ↗',
    meaningVi: 'Máy tính của tôi hết pin rồi, bạn có dây sạc không?',
    intonation: '↗ Lên giọng thỉnh cầu ở bo?',
    tip: 'ແບັດໝົດ (bat mot) là hết pin, ສາຍສາກ (say sak) là dây sạc.'
  }
];

export const PRONUNCIATION_RULES: PronunciationRule[] = [
  // 1. QUY TẮC NGẮT NHỊP (THOUGHT GROUPS)
  {
    title: '1. Quy tắc ngắt nhịp theo cụm nghĩa (Thought Groups / Breath Groups)',
    language: 'all',
    summary: 'Không đọc rời rạc từng từ đơn lẻ, cũng không nói liền một mạch gây hụt hơi. Hãy ngắt câu theo các cụm nghĩa hoàn chỉnh (Chủ ngữ - Cụm động từ - Tân ngữ/Bổ ngữ - Giới ngữ). Giữa các cụm, người bản xứ dừng nhẹ 0.2 - 0.5s để lấy hơi và giúp người nghe tiếp nhận thông tin rõ ràng.',
    examples: [
      {
        text: 'When I arrived at the airport, / the flight was already delayed.',
        phoneticsVi: '[Guen nai ơ-rai-v đợt đi e-pót] / [đờ phlai-t uơ-z ôn-re-đi đi-lây-đ].',
        note: 'Ngắt ngay sau dấu phẩy giữa mệnh đề phụ và mệnh đề chính để thở tự nhiên.'
      },
      {
        text: 'If you have any questions, / please feel free to ask me.',
        phoneticsVi: '[Íp diu hép én-ni quét-s-chừn] / [phli-z phiu ph-ri thừ át-s-k mi].',
        note: 'Chia làm 2 khối ý nghĩa trọn vẹn: [Nếu bạn có câu hỏi] / [xin cứ thoải mái hỏi tôi].'
      }
    ]
  },

  // 2. QUY TẮC NỐI ÂM (LINKING SOUNDS)
  {
    title: '2. Quy tắc nối âm tự nhiên (Linking Sounds)',
    language: 'en',
    summary: 'Khi từ phía trước kết thúc bằng một phụ âm và từ liền sau bắt đầu bằng một nguyên âm (a, e, i, o, u), người bản xứ sẽ tự động nối phụ âm sang nguyên âm để lời nói trôi chảy như một dòng nước.',
    examples: [
      {
        text: 'Check it out -> Check-it-out',
        phoneticsVi: 'Che-khi-đao (thay vì đọc ngắt check / it / out)',
        note: 'Âm /k/ nối với /ɪ/ thành "khi", âm /t/ giữa hai nguyên âm biến thành Flap T nhẹ "đao".'
      },
      {
        text: 'Wake up early -> Wake-up-early',
        phoneticsVi: 'Uê-khắp bơ-li',
        note: 'Wake up nối thành "Uê-khắp", up early nối tiếp thành "bơ-li".'
      },
      {
        text: 'Hold on a second -> Hold-on-a second',
        phoneticsVi: 'Hâu-đon-nơ sé-khừn',
        note: 'Nối âm liên hoàn: Hold on -> Hâu-đon, on a -> đon-nơ.'
      }
    ]
  },

  // 3. QUY TẮC ÂM LƯỚT SCHWA /ə/
  {
    title: '3. Quy tắc âm lướt Schwa /ə/ (Âm nhẹ nhất trong tiếng Anh)',
    language: 'en',
    summary: 'Trong tiếng Anh, các từ chức năng không mang trọng âm (như to, for, at, can, of, and, today, tomorrow) sẽ bị suy giảm thành âm Schwa /ə/ siêu ngắn và nhẹ. Không bao giờ nhấn mạnh vào các từ này.',
    examples: [
      {
        text: 'I want to go to the store today.',
        phoneticsVi: 'Ai oán tu gâu thừ đờ s-to tu-đây.',
        note: '"to go" đọc là "tu gâu", "to the" đọc là "thừ đờ", "today" đọc gọn là "tu-đây".'
      },
      {
        text: 'A cup of tea for you.',
        phoneticsVi: 'Ơ cắp-bóp thi pho diu.',
        note: '"of" bị nuốt thành "ơ/bóp", "for" đọc nhẹ lướt thành "pho".'
      }
    ]
  },

  // 4. BIẾN ĐIỆU HAI THANH 3 TIẾNG TRUNG
  {
    title: '4. Quy tắc biến điệu hai thanh 3 trong Tiếng Trung (Tone Sandhi)',
    language: 'zh',
    summary: 'Khi hai chữ mang thanh 3 (thanh hỏi) đi liền kề nhau, chữ thứ nhất BẮT BUỘC phải đọc thành thanh 2 (thanh sắc), chỉ có chữ thứ hai giữ nguyên thanh 3.',
    examples: [
      {
        text: '你好 (Nǐ hǎo)',
        phoneticsVi: 'Đọc là: Ní hảo (thay vì nỉ hảo)',
        note: 'Nǐ (thanh 3) chuyển thành Ní (thanh 2).'
      },
      {
        text: '可以 (Kěyǐ)',
        phoneticsVi: 'Đọc là: Khở dỉ (thay vì khỉ dỉ)',
        note: 'Kě chuyển thành Khở / Khởi.'
      },
      {
        text: '很好 (Hěn hǎo)',
        phoneticsVi: 'Đọc là: Hển hảo',
        note: 'Hěn (rất) thanh 3 chuyển thành Hển thanh 2.'
      }
    ]
  },

  // 5. BIẾN ĐIỆU CHỮ 不 VÀ 一 TRONG TIẾNG TRUNG
  {
    title: '5. Biến điệu chữ 不 (bù) và 一 (yī) trong Tiếng Trung',
    language: 'zh',
    summary: '• Chữ 不 (bù - gốc là thanh 4): khi đứng trước chữ mang thanh 4 khác sẽ biến âm thành thanh 2 "bú" (chữ Việt: pú/bú). Đứng trước thanh 1, 2, 3 giữ nguyên thanh 4.\n• Chữ 一 (yī - gốc là thanh 1): đứng trước thanh 4 biến thành thanh 2 "yí" (chữ Việt: di); đứng trước thanh 1, 2, 3 biến thành thanh 4 "yì" (chữ Việt: dị).',
    examples: [
      {
        text: '不是 (bù shì) -> bú shì',
        phoneticsVi: 'Pú sư (thanh 2 + thanh 4 dứt khoát)',
        note: 'Chữ shì là thanh 4 nên bù chuyển thành pú.'
      },
      {
        text: '不客气 (bù kèqi) -> bú kèqi',
        phoneticsVi: 'Pú khưa chi',
        note: 'Kè là thanh 4 nên bù biến thành pú.'
      },
      {
        text: '一下 (yī xià) -> yí xià',
        phoneticsVi: 'Di xia (thanh 2 + thanh 4)',
        note: 'Xià là thanh 4 nên yī chuyển thành yí (di).'
      },
      {
        text: '一天 (yī tiān) -> yì tiān',
        phoneticsVi: 'Dị then (thanh 4 + thanh 1)',
        note: 'Tiān là thanh 1 nên yī chuyển thành yì (dị).'
      }
    ]
  },

  // 6. QUY TẮC THANH NHẸ TRONG TIẾNG TRUNG (NEUTRAL TONE / 轻声)
  {
    title: '6. Quy tắc thanh nhẹ trong Tiếng Trung (Neutral Tone / 轻声)',
    language: 'zh',
    summary: 'Thanh nhẹ không có ký hiệu dấu trên pinyin. Âm tiết mang thanh nhẹ cần được phát âm ngắn, nhẹ, thả lỏng môi miệng và lướt nhanh bằng khoảng 1/2 độ dài của âm tiết bình thường.\n• Trợ từ ngữ khí và trợ từ kết cấu: 的 (de), 了 (le), 吗 (ma), 呢 (ne), 吧 (ba).\n• Hậu tố danh từ: 们 (men trong 我们), 子 (zi trong 桌子), 头 (tou trong 木头).\n• Âm tiết thứ hai trong từ láy xưng hô: 爸爸 (bàba), 妈妈 (māma), 哥哥 (gēge).',
    examples: [
      {
        text: '我的书 (wǒ de shū)',
        phoneticsVi: 'Ủa tợ su (de đọc lướt nhẹ thành tợ)',
        note: 'Chữ 的 không nhấn mạnh, lướt siêu nhanh như nốt đệm nhẹ.'
      },
      {
        text: '走吧！(zǒu ba!)',
        phoneticsVi: 'Tẩu ba! (ba đọc ngắn gọn)',
        note: 'Trợ từ ngữ khí cuối câu biểu thị sự rủ rê, đề xuất.'
      },
      {
        text: '谢谢你 (xièxie nǐ)',
        phoneticsVi: 'Xiê xiê nỉ (tiếng "xiê" thứ 2 đọc nhẹ hơn nhiều)',
        note: 'Từ láy hai âm tiết giống nhau: âm đầu giữ nguyên thanh 4, âm sau biến thành thanh nhẹ.'
      }
    ]
  },

  // 7. QUY TẮC ÂM UỐN LƯỠI 儿 TRONG TIẾNG TRUNG (ERHUA / 儿化音)
  {
    title: '7. Quy tắc âm uốn lưỡi 儿 trong Tiếng Trung (Erhua / 儿化音)',
    language: 'zh',
    summary: '• Trong khẩu ngữ tiếng Trung chuẩn và giọng Bắc Kinh, âm "儿" (er - viết tắt là "r" trong Pinyin) thường được kết hợp vào cuối âm tiết trước đó tạo thành âm uốn lưỡi (儿化).\n• Cách phát âm: Khi phát âm nguyên âm chính, đầu lưỡi đồng thời cong nhẹ hướng lên vòm họng ngạc cứng trên.\n• Tác dụng: Biểu thị sự nhỏ nhắn, đáng yêu, thân mật gần gũi trong giao tiếp hoặc để phân biệt ý nghĩa của từ.',
    examples: [
      {
        text: '这儿 (zhèr) - Ở đây / Chỗ này',
        phoneticsVi: 'Chơ-r (cong lưỡi nhẹ ở âm đuôi r)',
        note: 'Bằng nghĩa với 这里 (zhèlǐ), là từ rất thông dụng trong khẩu ngữ thường ngày.'
      },
      {
        text: '哪儿 (nǎr) - Ở đâu',
        phoneticsVi: 'Nả-r (hạ thấp nả rồi uốn lưỡi)',
        note: 'Bằng nghĩa với 哪里 (nǎlǐ), dùng khi hỏi đường xá, vị trí.'
      },
      {
        text: '一点儿 (yìdiǎnr) - Một chút / Một ít',
        phoneticsVi: 'Di tiển-r',
        note: 'Dùng sau động từ hoặc tính từ biểu thị số lượng hoặc mức độ ít.'
      },
      {
        text: '玩儿 (wánr) - Đi chơi / Chơi đùa',
        phoneticsVi: 'Oán-r',
        note: 'Bỏ âm n cuối, uốn cong lưỡi từ nguyên âm a.'
      },
      {
        text: '花儿 (huār) - Bông hoa',
        phoneticsVi: 'Hoa-r',
        note: 'Biểu thị sự nhỏ nhắn, đáng yêu của đóa hoa.'
      }
    ]
  },

  // 8. ĐẶC TRƯNG NGỮ ĐIỆU & PHÁT ÂM TIẾNG CAMPUCHIA (KHMER)
  {
    title: '8. Đặc trưng phát âm & cụm phụ âm Tiếng Khmer (Campuchia)',
    language: 'km',
    summary: '• Tiếng Khmer không có thanh điệu (non-tonal) nhưng có sự phân biệt giữa giọng O (âm cao, trong) và giọng Ô (âm trầm, sâu).\n• Cụm phụ âm đầu kép: Nhiều từ bắt đầu bằng 2 phụ âm đứng liền nhau (như kh-nhom, s-ro-lanh, ph-nhơ, th-lay), người đọc lướt cực nhẹ âm đầu rồi nhấn vào âm chính.\n• Âm cuối gọn ghẽ: Các phụ âm cuối (k, t, p) thường giữ lại trong vòm miệng mà không bật mạnh ra ngoài.',
    examples: [
      {
        text: 'ខ្ញុំ (Khnhom) - Tôi / Em',
        phoneticsVi: 'Kh-nhom (lướt kh, nhấn nhom)',
        note: 'Phụ âm kẹp kh-nh phát âm liền khối mượt mà.'
      },
      {
        text: 'ស្រឡាញ់ (Srolanh) - Yêu thương',
        phoneticsVi: 'S-ro-lanh (xì nhẹ s, đọc ro-lanh)',
        note: 'Cụm sr lướt nhẹ, kết thúc bằng âm -nh êm ái.'
      },
      {
        text: 'អរគុណ (Orkun) - Cảm ơn',
        phoneticsVi: 'Oóc-kun (nhấn cun rõ ràng)',
        note: 'Từ cửa miệng khi giao tiếp tại Campuchia.'
      }
    ]
  },

  // 9. ĐẶC TRƯNG THANH ĐIỆU & PHÁT ÂM TIẾNG LÀO (LAO)
  {
    title: '9. Đặc trưng thanh điệu & ngữ điệu Tiếng Lào (Lao)',
    language: 'lo',
    summary: '• Tiếng Lào có hệ thống 6 thanh điệu rất tương đồng với các dấu thanh trong tiếng Việt (ngang, sắc, hỏi, huyền, nặng, ngã), giúp người Việt học phát âm cực kỳ nhanh chóng.\n• Giọng nói mềm mại, thân thiện: Người Lào thường kéo dài âm cuối nhẹ nhàng với các từ tình thái như "đơ" (ເດີ້), "nọ" (ເນາະ), "bo" (ບໍ່).\n• Phân biệt nguyên âm ngắn và dài: Cần giữ trường độ đúng để tránh biến đổi ý nghĩa của từ.',
    examples: [
      {
        text: 'ສະບາຍດີ (Sabaidee) - Xin chào',
        phoneticsVi: 'Xa-bai-đi (ngân dài đi ấm áp)',
        note: 'Lời chào truyền thống thể hiện sự bình an, vui vẻ.'
      },
      {
        text: 'ຂອບໃຈ (Khop chai) - Cảm ơn',
        phoneticsVi: 'Khọp-chay (âm khọp dứt khoát, chay mềm mại)',
        note: 'Mang hàm ý "đáp lại tấm lòng tốt".'
      },
      {
        text: 'ແຊບຫຼາຍ (Saep lai) - Rất ngon',
        phoneticsVi: 'Xẹp lai (xẹp thanh nặng, lai thanh ngang)',
        note: 'Câu khen ẩm thực phổ biến nhất tại đất nước Lào.'
      }
    ]
  },

  // 10. QUY TẮC TRỌNG ÂM CÂU & NGỮ ĐIỆU CHUNG (SENTENCE STRESS & INTONATION)
  {
    title: '10. Quy tắc trọng âm câu & hướng đi của ngữ điệu (Intonation Flow)',
    language: 'all',
    summary: '• Từ mang nội dung (Content words - danh từ, động từ chính, tính từ, từ hỏi): Luôn được nhấn mạnh, đọc to, rõ và vang hơn.\n• Từ chức năng (Function words - mạo từ a/an/the, giới từ in/on/at, trợ động từ): Bị giảm nhẹ, đọc lướt qua.\n• Ngữ điệu xuống giọng ↘ (Falling): Dùng cho câu trần thuật khẳng định, câu mệnh lệnh và câu hỏi có từ để hỏi (Wh-questions).\n• Ngữ điệu lên giọng ↗ (Rising): Dùng cho câu hỏi Yes/No, câu hỏi xác nhận và câu biểu lộ cảm xúc ngạc nhiên, thân thiện.',
    examples: [
      {
        text: 'Do you speak Vietnamese? ↗',
        phoneticsVi: 'Diu s-phích Vi-ét-na-mít? ↗',
        note: 'Câu hỏi Yes/No: Vút cao giọng ở âm cuối mít để mời người nghe phản hồi.'
      },
      {
        text: 'Where are you staying tonight? ↘',
        phoneticsVi: 'Ue a diu s-tê-ing thừ-nait? ↘',
        note: 'Câu hỏi bắt đầu bằng Where: Hạ giọng trầm và dứt khoát ở từ tonight.'
      }
    ]
  }
];

// BẢNG ĐỐI CHIẾU ÂM QUỐC TẾ (IPA / PINYIN / TIẾNG CAM / TIẾNG LÀO) SANG CHỮ VIỆT DỄ NHỚ
export interface CheatSheetEntry {
  symbol: string;
  vietnameseEquivalent: string;
  example: string;
  note: string;
}

export const IPA_ENGLISH_CHEAT_SHEET: CheatSheetEntry[] = [
  { symbol: '/θ/', vietnameseEquivalent: 'th (kẹp lưỡi)', example: 'thank /θæŋk/ -> Thenk', note: 'Đặt đầu lưỡi giữa 2 hàm răng và thổi hơi nhẹ ra ngoài' },
  { symbol: '/ð/', vietnameseEquivalent: 'đ / z (rung cổ)', example: 'this /ðɪs/ -> Đít', note: 'Đặt lưỡi giữa 2 hàm răng nhưng rung mạnh thanh quản' },
  { symbol: '/ʃ/', vietnameseEquivalent: 's (chu môi/nặng)', example: 'she /ʃiː/ -> Xi', note: 'Chu môi tròn, uốn lưỡi nhẹ, thổi hơi mạnh như suỵt' },
  { symbol: '/ʒ/', vietnameseEquivalent: 'gi / r (rung mềm)', example: 'vision /ˈvɪʒn/ -> Vi-giừn', note: 'Khẩu hình giống /ʃ/ nhưng rung dây thanh âm' },
  { symbol: '/tʃ/', vietnameseEquivalent: 'ch (bật hơi)', example: 'check /tʃek/ -> Check', note: 'Chặn hơi ở đầu lưỡi rồi bật mạnh thành tiếng "ch"' },
  { symbol: '/dʒ/', vietnameseEquivalent: 'gi / tr (rung)', example: 'job /dʒɑːb/ -> Troóc', note: 'Khẩu hình giống /tʃ/ nhưng rung dây thanh âm' },
  { symbol: '/ə/', vietnameseEquivalent: 'ờ / tu / thừ (lướt)', example: 'today /təˈdeɪ/ -> tu-đây', note: 'Âm Schwa siêu nhẹ, thả lỏng môi miệng' },
  { symbol: '/iː/', vietnameseEquivalent: 'i (ngân dài)', example: 'meet /miːt/ -> Mít', note: 'Cười nhẹ, kéo dài khóe miệng' },
  { symbol: '/ɪ/', vietnameseEquivalent: 'i (ngắn, dứt)', example: 'it /ɪt/ -> It', note: 'Mở miệng hơi hờ, phát âm dứt khoát' },
  { symbol: '/æ/', vietnameseEquivalent: 'e bẹt (a-e)', example: 'cat /kæt/ -> Két', note: 'Hạ cằm thấp, mở to miệng đọc giữa a và e' },
  { symbol: '/ɔː/', vietnameseEquivalent: 'o (tròn sâu)', example: 'coffee /ˈkɔːfi/ -> Có-phi', note: 'Tròn môi, đưa cuống lưỡi về phía sau' },
  { symbol: '/ʊ/', vietnameseEquivalent: 'u (ngắn)', example: 'good /ɡʊd/ -> Gút', note: 'Môi hơi tròn, âm ngắn gọn không kéo dài' },
  { symbol: '/uː/', vietnameseEquivalent: 'u (ngân dài)', example: 'you /juː/ -> Diu', note: 'Chu tròn môi về phía trước, ngân dài' },
  { symbol: '/eɪ/', vietnameseEquivalent: 'ây (mượt mà)', example: 'day /deɪ/ -> Đây', note: 'Trượt từ âm e sang âm i nhẹ' },
  { symbol: '/aɪ/', vietnameseEquivalent: 'ai (rõ ràng)', example: 'nice /naɪs/ -> Nai-s', note: 'Mở rộng miệng rồi khép dần về âm i' },
  { symbol: '/aʊ/', vietnameseEquivalent: 'ao (tròn môi)', example: 'how /haʊ/ -> Hao', note: 'Mở rộng âm a rồi khép tròn môi về u' },
  { symbol: '/oʊ/', vietnameseEquivalent: 'âu / ô-u', example: 'hello /həˈloʊ/ -> Hê-lâu', note: 'Âm ô trượt mượt mà sang âm u' },
];

export const PINYIN_CHINESE_CHEAT_SHEET: CheatSheetEntry[] = [
  { symbol: 'Thanh 1 (¯)', vietnameseEquivalent: 'Thanh ngang cao', example: '天 tiān -> Then', note: 'Giữ đều cao độ (mức 5-5) và ngân dài ổn định' },
  { symbol: 'Thanh 2 (´)', vietnameseEquivalent: 'Dấu sắc đi lên', example: '钱 qián -> Chén', note: 'Đi từ độ cao trung bình vút lên cao (3-5)' },
  { symbol: 'Thanh 3 (ˇ)', vietnameseEquivalent: 'Dấu hỏi trầm', example: '好 hǎo -> Hảo', note: 'Hạ thấp giọng xuống đáy rồi nâng nhẹ lên (2-1-4)' },
  { symbol: 'Thanh 4 (`)', vietnameseEquivalent: 'Dứt khoát (nặng-sắc)', example: '太 tài -> Thai!', note: 'Rơi nhanh dứt khoát từ đỉnh cao xuống đáy (5-1)' },
  { symbol: 'Thanh nhẹ', vietnameseEquivalent: 'Lướt siêu nhẹ', example: '的 de -> tợ, 吗 ma -> ma', note: 'Đọc ngắn, nhỏ và lướt nhanh bằng 1/2 âm thường' },
  { symbol: 'zh', vietnameseEquivalent: 'tr (uốn lưỡi)', example: '这个 zhège -> Chưa cờ', note: 'Uốn cong đầu lưỡi lên vòm họng ngạc cứng trên' },
  { symbol: 'ch', vietnameseEquivalent: 'th / tr (bật hơi)', example: '吃 chī -> Chư', note: 'Uốn lưỡi đồng thời đẩy luồng hơi ma sát mạnh ra' },
  { symbol: 'sh', vietnameseEquivalent: 's (uốn lưỡi)', example: '什么 shénme -> Sấn mơ', note: 'Uốn đầu lưỡi nhẹ, thổi luồng hơi êm' },
  { symbol: 'r', vietnameseEquivalent: 'r (uốn rung)', example: '热 rè -> Rưa', note: 'Uốn lưỡi như âm sh nhưng rung dây thanh âm' },
  { symbol: 'j / q / x', vietnameseEquivalent: 'ch / x (mặt lưỡi)', example: '去 qù -> Chuy, 谢谢 xièxie -> Xiê xiê', note: 'Áp mặt lưỡi vào ngạc cứng, q bật hơi mạnh' },
  { symbol: 'z / c / s', vietnameseEquivalent: 'ch / x (đầu lưỡi)', example: '在 zài -> Chai, 错 cuò -> Thua', note: 'Đầu lưỡi chạm mặt trong răng cửa dưới, c bật hơi' },
  { symbol: 'er (儿化)', vietnameseEquivalent: 'ơ-r (uốn lưỡi)', example: '哪儿 nǎr -> Nả-r, 这儿 zhèr -> Chơ-r', note: 'Vừa phát âm vừa cong lưỡi hướng lên ngạc trên' },
];

export const KHMER_CHEAT_SHEET: CheatSheetEntry[] = [
  { symbol: 'សួស្តី', vietnameseEquivalent: 'Xua-s-đây', example: 'Suostei', note: 'Lời chào thân thiện phổ biến tại Campuchia' },
  { symbol: 'អរគុណ', vietnameseEquivalent: 'Oóc-kun', example: 'Orkun', note: 'Cảm ơn lịch sự chân thành' },
  { symbol: 'ខ្ញុំ', vietnameseEquivalent: 'Kh-nhom', example: 'Khnhom', note: 'Tôi, em (đại từ nhân xưng ngôi 1)' },
  { symbol: 'បាទ / ចាស', vietnameseEquivalent: 'Bạt / Chạ', example: 'Baat (nam) / Chaa (nữ)', note: 'Dạ, vâng (thể hiện sự lễ phép)' },
  { symbol: 'ថ្លៃប៉ុន្មាន', vietnameseEquivalent: 'Th-lay pon-man', example: 'Thlay ponman', note: 'Hỏi giá tiền khi mua bán' },
  { symbol: 'ឆ្ងាញ់', vietnameseEquivalent: 'Ch-nganh', example: 'Chnganh', note: 'Ngon miệng khi ăn uống' },
];

export const LAO_CHEAT_SHEET: CheatSheetEntry[] = [
  { symbol: 'ສະບາຍດີ', vietnameseEquivalent: 'Xa-bai-đi', example: 'Sabaidee', note: 'Lời chào quốc dân của người Lào' },
  { symbol: 'ຂອບໃຈ', vietnameseEquivalent: 'Khọp-chay', example: 'Khop chai', note: 'Cảm ơn chân thành' },
  { symbol: 'ຂ້ອຍ', vietnameseEquivalent: 'Khọi', example: 'Khoy', note: 'Tôi, mình (ngôi thứ nhất)' },
  { symbol: 'ເຈົ້າ', vietnameseEquivalent: 'Chậu', example: 'Chao', note: 'Dạ, vâng (hoặc bạn/anh/chị)' },
  { symbol: 'ແຊບ', vietnameseEquivalent: 'Xẹp', example: 'Saep', note: 'Món ăn ngon miệng' },
  { symbol: 'ຫຼາຍ', vietnameseEquivalent: 'Lai', example: 'Lai', note: 'Nhiều, lắm' },
];

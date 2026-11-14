import { PracticeItem } from './pronunciationRules';

interface FinanceSeed {
  original: string;
  phoneticsVi: string;
  meaningVi: string;
  intonation: string;
  tip: string;
  isQuestion?: boolean;
}

// 50 core Economics, Finance & Accounting dialogue sentences in English tailored for Vietnamese learners & professionals
const FINANCE_EN_SEEDS: FinanceSeed[] = [
  // Kế toán & Chứng từ hóa đơn (Accounting & Invoices)
  {
    original: 'Could you please issue a red VAT invoice for this corporate payment today?',
    phoneticsVi: 'Kút diu phli-z ít-siu ơ rét VAT in-voi-s pho đít co-phơ-rợt phê-mừn-t tu-đây? ↗',
    meaningVi: 'Bạn có thể vui lòng xuất hóa đơn đỏ VAT cho khoản thanh toán doanh nghiệp này hôm nay không?',
    intonation: '↗ Lên giọng lịch sự ở cuối câu yêu cầu hóa đơn',
    tip: 'Issue đọc là "ít-siu", invoice đọc "in-voi-s". VAT có thể đọc V-A-T hoặc "vát".',
    isQuestion: true,
  },
  {
    original: 'Please double-check our company tax code and legal address before issuing the e-invoice.',
    phoneticsVi: 'Phli-z đắp-bồ check ao-ơ căm-pơ-ni tác-s cốt en li-gồ ét-đ-rét-s bi-pho ít-siu-ing đí i-in-voi-s.',
    meaningVi: 'Vui lòng kiểm tra kỹ mã số thuế và địa chỉ pháp lý của công ty trước khi xuất hóa đơn điện tử.',
    intonation: '↘ Xuống giọng dứt khoát, cẩn trọng',
    tip: 'Tax code là mã số thuế, e-invoice là hóa đơn điện tử.',
  },
  {
    original: 'We need to reconcile all bank statements with the general ledger before the fifth.',
    phoneticsVi: 'Uy nít thừ ré-cừn-xai-ồ ôn bêng-k s-thết-mừn-t-s uýt đờ chén-nơ-rồ lét-chơ bi-pho đờ phíp-th.',
    meaningVi: 'Chúng ta cần đối chiếu toàn bộ sao kê ngân hàng với sổ cái trước ngày mùng 5.',
    intonation: '↘ Nhấn mạnh thời hạn "before the fifth"',
    tip: 'Reconcile đọc "ré-cừn-xai-ồ", general ledger là sổ cái kế toán.',
  },
  {
    original: 'Have all supporting vouchers and delivery notes been attached to this payment request?',
    phoneticsVi: 'Hép ôn xắp-pho-tinh vao-chơ-z en đi-lí-vơ-ri nốt-s bin ơ-tát-ch-đ thừ đít phê-mừn-t ri-quét-s-t? ↗',
    meaningVi: 'Tất cả chứng từ gốc và phiếu giao hàng đã được đính kèm vào đề nghị thanh toán này chưa?',
    intonation: '↗ Lên giọng cuối câu hỏi Yes/No',
    tip: 'Vouchers đọc "vao-chơ-z", attached đọc nối âm "ơ-tát-ch-đ".',
    isQuestion: true,
  },
  {
    original: 'Our accounting team is closing the monthly books and finalizing the trial balance.',
    phoneticsVi: 'Ao-ơ ơ-khao-n-tinh thim i-z c-lâu-zinh đờ măn-th-li búc-s en phai-nồ-lai-zinh đờ t-rai-ồ bá-lừn-s.',
    meaningVi: 'Bộ phận kế toán đang khóa sổ tháng và hoàn tất bảng cân đối số phát sinh.',
    intonation: '↘ Rõ ràng, nhịp độ chuyên nghiệp',
    tip: 'Trial balance là bảng cân đối thử / cân đối số phát sinh.',
  },
  {
    original: 'Why is there a discrepancy between the purchase order and the supplier invoice?',
    phoneticsVi: 'Uai i-z đe ơ đít-s-c-ré-phừn-xi bi-thuin đờ phơ-chợt o-đơ en đờ xắp-p-lai-ơ in-voi-s?',
    meaningVi: 'Tại sao lại có sự chênh lệch giữa đơn đặt hàng và hóa đơn của nhà cung cấp vậy?',
    intonation: '↘ Xuống giọng ở cuối câu hỏi có từ để hỏi Why',
    tip: 'Discrepancy nhấn âm 2 "c-ré": đít-s-C-RÉ-phừn-xi.',
    isQuestion: true,
  },
  {
    original: 'Please record this prepaid annual software subscription under deferred expenses.',
    phoneticsVi: 'Phli-z ri-co-đ đít p-ri-phết én-niu-ồ xóp-ph-t-ue xắp-s-c-ríp-sừn ăn-đơ đi-phơ-đ ích-s-phen-xịt.',
    meaningVi: 'Vui lòng hạch toán khoản thuê phần mềm trả trước cả năm này vào chi phí trả trước.',
    intonation: '↘ Giọng hướng dẫn nghiệp vụ mạch lạc',
    tip: 'Deferred expenses là chi phí trả trước / phân bổ nhiều kỳ.',
  },
  {
    original: 'Did the external auditors request any additional adjustments to our depreciation schedule?',
    phoneticsVi: 'Đít đí ích-s-thơ-nồ o-đi-thơ-z ri-quét-s-t én-ni ơ-đí-sừn-nồ ơ-chắt-s-t-mừn-t-s thừ ao-ơ đi-p-ri-si-ê-sừn s-kê-diu? ↗',
    meaningVi: 'Kiểm toán độc lập có yêu cầu điều chỉnh bổ sung nào cho bảng khấu hao tài sản không?',
    intonation: '↗ Lên giọng hỏi xác nhận kiểm toán',
    tip: 'Depreciation đọc "đi-p-ri-si-ê-sừn", auditors là kiểm toán viên.',
    isQuestion: true,
  },
  {
    original: 'All employee business travel expenses must be submitted with valid receipts by Friday.',
    phoneticsVi: 'Ôn im-p-loi-i bít-z-nịt t-ra-vồ ích-s-phen-xịt mát-s-t bi xắp-mí-thịt uýt vá-lịt ri-sít-s bai Ph-rai-đây.',
    meaningVi: 'Mọi chi phí công tác của nhân viên phải được nộp kèm hóa đơn hợp lệ trước thứ Sáu.',
    intonation: '↘ Nhấn mạnh quy định nội bộ rõ ràng',
    tip: 'Receipts có âm p câm, đọc là "ri-sít-s".',
  },
  {
    original: 'We classify office laptops over thirty million dong as fixed assets for depreciation.',
    phoneticsVi: 'Uy c-lát-s-si-phai ớp-phít láp-thóp-s ô-vơ thớ-ti mi-li-ừn đồng ét phích-s-t át-xét-s pho đi-p-ri-si-ê-sừn.',
    meaningVi: 'Chúng tôi ghi nhận máy tính văn phòng trên ba mươi triệu đồng là tài sản cố định để trích khấu hao.',
    intonation: '↘ Giải thích chuẩn mực kế toán Việt Nam',
    tip: 'Fixed assets là tài sản cố định.',
  },

  // Thuế & Tuân thủ (Tax & Compliance)
  {
    original: 'When is the statutory deadline for filing the quarterly value-added tax return?',
    phoneticsVi: 'Uen i-z đờ s-tá-chiu-tô-ri đét-lai-n pho phai-linh đờ qua-tơ-li vá-liu-át-địt tác-s ri-thơn?',
    meaningVi: 'Hạn chót theo luật định để nộp tờ khai thuế giá trị gia tăng theo quý là khi nào?',
    intonation: '↘ Xuống giọng câu hỏi thời hạn thuế',
    tip: 'Tax return là tờ khai thuế, statutory là theo quy định pháp luật.',
    isQuestion: true,
  },
  {
    original: 'Invoices over twenty million dong require bank transfer proof to claim input VAT deduction.',
    phoneticsVi: 'In-voi-xịt ô-vơ thuổn-ti mi-li-ừn đồng ri-quai-ơ bêng-k t-ren-s-phơ p-rúp-ph thừ c-lêm in-phút VAT đi-đắc-sừn.',
    meaningVi: 'Các hóa đơn trên hai mươi triệu đồng bắt buộc phải có chứng từ chuyển khoản để được khấu trừ thuế GTGT đầu vào.',
    intonation: '↘ Nhấn mạnh điều kiện khấu trừ thuế',
    tip: 'Bank transfer proof là chứng từ ủy nhiệm chi / chuyển khoản.',
  },
  {
    original: 'Have we calculated the corporate income tax provision accurately for this fiscal year?',
    phoneticsVi: 'Hép uy cál-kiu-lê-thịt đờ co-phơ-rợt in-căm tác-s p-rô-ví-giừn ác-kiu-rợt-li pho đít phít-s-cồ dia? ↗',
    meaningVi: 'Chúng ta đã tính toán chính xác khoản dự phòng thuế thu nhập doanh nghiệp cho năm tài chính này chưa?',
    intonation: '↗ Lên giọng kiểm tra lại cuối năm',
    tip: 'Corporate income tax (CIT) là thuế thu nhập doanh nghiệp.',
    isQuestion: true,
  },
  {
    original: 'Please ensure personal income tax is withheld properly before transferring monthly salaries.',
    phoneticsVi: 'Phli-z in-sua phớ-xừn-nồ in-căm tác-s i-z uýt-heo-đ p-ró-phơ-li bi-pho t-ren-s-phơ-rinh măn-th-li xá-lơ-ri-z.',
    meaningVi: 'Vui lòng đảm bảo đã khấu trừ thuế thu nhập cá nhân đúng quy định trước khi chi trả lương hàng tháng.',
    intonation: '↘ Dặn dò quy trình tính lương',
    tip: 'Withheld đọc "uýt-heo-đ" nghĩa là khấu trừ tại nguồn.',
  },
  {
    original: 'Does this cross-border consulting service contract trigger foreign contractor withholding tax?',
    phoneticsVi: 'Đơ-z đít c-rót-s bo-đơ cơn-xăn-tinh sơ-vịt cơn-t-rác-t t-rí-gơ pho-rừn cơn-t-rác-thơ uýt-hôu-đinh tác-s? ↗',
    meaningVi: 'Hợp đồng dịch vụ tư vấn xuyên biên giới này có phát sinh thuế nhà thầu nước ngoài không?',
    intonation: '↗ Lên giọng hỏi rủi ro thuế',
    tip: 'Foreign contractor tax (FCT) là thuế nhà thầu nước ngoài.',
    isQuestion: true,
  },
  {
    original: 'We received a tax refund approval notice from the local tax department this morning.',
    phoneticsVi: 'Uy ri-xi-v-đ ơ tác-s ri-phăn-đ ơ-p-ru-vồ nâu-thịt-s ph-rầm đờ lâu-cồ tác-s đi-pa-t-mừn-t đít mo-ninh.',
    meaningVi: 'Sáng nay chúng tôi đã nhận được thông báo chấp thuận hoàn thuế từ cơ quan thuế địa phương.',
    intonation: '↘ Giọng phấn khởi, tin vui tài chính',
    tip: 'Tax refund là hoàn thuế.',
  },

  // Báo cáo tài chính & Dòng tiền (Financial Statements & Cash Flow)
  {
    original: 'Let us review the income statement and net profit margin for the third quarter.',
    phoneticsVi: 'Lét ắt ri-viu đí in-căm s-thết-mừn-t en nét p-ró-phịt ma-chin pho đờ thơ-đ qua-thơ.',
    meaningVi: 'Chúng ta hãy cùng xem xét báo cáo kết quả kinh doanh và biên lợi nhuận ròng quý ba nhé.',
    intonation: '↘ Giọng điều hành cuộc họp chuyên môn',
    tip: 'Net profit margin là biên lợi nhuận ròng.',
  },
  {
    original: 'How is our operating cash flow looking compared to the budget forecast this month?',
    phoneticsVi: 'Hao i-z ao-ơ o-phơ-rê-tinh cát-s ph-lâu lúc-kinh cơn-phe-đ thừ đờ bát-chịt pho-cát-s-t đít măn-th?',
    meaningVi: 'Dòng tiền từ hoạt động kinh doanh tháng này thế nào so với dự báo ngân sách?',
    intonation: '↘ Xuống giọng câu hỏi phân tích',
    tip: 'Budget đọc "bát-chịt", forecast đọc "pho-cát-s-t".',
    isQuestion: true,
  },
  {
    original: 'Although revenue grew by eighteen percent, rising logistics costs squeezed our gross margin.',
    phoneticsVi: 'Ôn-đâu ré-vơ-niu g-ru bai ê-thinh phơ-xen-t, rai-zinh lô-chít-s-tịch cót-s s-qui-z-đ ao-ơ g-rốt-s ma-chin.',
    meaningVi: 'Mặc dù doanh thu tăng mười tám phần trăm, chi phí vận tải tăng cao đã thu hẹp biên lợi nhuận gộp.',
    intonation: '↘ Nhấn vào hai vế tương phản',
    tip: 'Gross margin là biên lợi nhuận gộp.',
  },
  {
    original: 'Could you prepare a weekly cash flow projection covering the next ninety days?',
    phoneticsVi: 'Kút diu p-ri-phe ơ uých-li cát-s ph-lâu p-rô-chéc-sừn cá-vơ-rinh đờ nét-s-t nai-n-ti đây-z? ↗',
    meaningVi: 'Bạn có thể lập bảng dự phóng dòng tiền theo tuần cho chín mươi ngày tới không?',
    intonation: '↗ Lên giọng giao việc tài chính',
    tip: 'Projection đọc "p-rô-chéc-sừn" nghĩa là dự phóng.',
    isQuestion: true,
  },
  {
    original: 'Our accounts receivable turnover improved significantly after tightening customer credit terms.',
    phoneticsVi: 'Ao-ơ ơ-khao-n-t-s ri-xi-vơ-bồ thơn-ô-vơ im-p-ru-v-đ xích-ní-phi-cừn-t-li áp-tơ thai-thừn-ninh cất-s-thơ-mơ c-ré-địt thơm-z.',
    meaningVi: 'Vòng quay khoản phải thu đã cải thiện đáng kể sau khi siết chặt hạn mức tín dụng khách hàng.',
    intonation: '↘ Tự tin, báo cáo kết quả tích cực',
    tip: 'Accounts receivable là khoản phải thu khách hàng.',
  },
  {
    original: 'We need to closely monitor overdue payables to maintain strong relationships with key suppliers.',
    phoneticsVi: 'Uy nít thừ c-lâu-s-li mo-ni-thơ ô-vơ-điu phây-ơ-bồ-z thừ mên-thên s-t-rong ri-lây-sừn-síp-s uýt khi xắp-p-lai-ơ-z.',
    meaningVi: 'Chúng ta cần theo dõi sát sao các khoản phải trả quá hạn để giữ quan hệ tốt với nhà cung cấp chủ chốt.',
    intonation: '↘ Nhấn mạnh quản trị công nợ',
    tip: 'Payables là khoản phải trả, overdue là quá hạn.',
  },
  {
    original: 'What is our current debt-to-equity ratio on the latest consolidated balance sheet?',
    phoneticsVi: 'Oát i-z ao-ơ cớ-rừn-t đét-thừ-éc-qui-ti rê-sâu on đờ lết-thịt-s-t cơn-xó-li-đê-thịt bá-lừn-s sít?',
    meaningVi: 'Hệ số nợ trên vốn chủ sở hữu hiện tại trên bảng cân đối kế toán hợp nhất là bao nhiêu?',
    intonation: '↘ Xuống giọng câu hỏi chỉ số',
    tip: 'Debt chữ b câm đọc "đét". Balance sheet là bảng cân đối kế toán.',
    isQuestion: true,
  },
  {
    original: 'Reducing slow-moving inventory freed up nearly five billion dong in working capital.',
    phoneticsVi: 'Ri-điu-xing s-lâu-mu-ving in-vừn-tô-ri ph-ri-đ áp nia-li phai-v bí-li-ừn đồng in uợc-kinh cá-phi-thồ.',
    meaningVi: 'Việc giảm hàng tồn kho luân chuyển chậm đã giải phóng gần năm tỷ đồng vốn lưu động.',
    intonation: '↘ Báo cáo hiệu quả quản trị vốn',
    tip: 'Working capital là vốn lưu động.',
  },

  // Ngân hàng, Tỷ giá & Thanh toán quốc tế (Banking, FX & Trade Finance)
  {
    original: 'What is today’s USD to VND selling exchange rate for corporate wire transfers?',
    phoneticsVi: 'Oát i-z tu-đây-z USD thừ VND xéo-linh ích-s-chên-ch rết pho co-phơ-rợt oai-ơ t-ren-s-phơ-z?',
    meaningVi: 'Tỷ giá bán đô la Mỹ sang tiền Việt hôm nay cho giao dịch chuyển khoản doanh nghiệp là bao nhiêu?',
    intonation: '↘ Xuống giọng hỏi tỷ giá ngân hàng',
    tip: 'Exchange rate là tỷ giá hối đoái, wire transfer là chuyển tiền ngân hàng.',
    isQuestion: true,
  },
  {
    original: 'Could you send me the SWIFT payment confirmation slip once the overseas transfer clears?',
    phoneticsVi: 'Kút diu sen mi đờ S-uíp-ph phê-mừn-t cơn-phơ-mây-sừn s-líp uăn-s đí ô-vơ-xi-z t-ren-s-phơ c-lia-z? ↗',
    meaningVi: 'Bạn có thể gửi giúp tôi điện SWIFT xác nhận thanh toán ngay khi lệnh chuyển tiền quốc tế hoàn tất không?',
    intonation: '↗ Lên giọng nhờ gửi chứng từ ngân hàng',
    tip: 'SWIFT slip là điện chuyển tiền quốc tế.',
    isQuestion: true,
  },
  {
    original: 'The bank approved our working capital credit facility at a competitive floating interest rate.',
    phoneticsVi: 'Đờ bêng-k ơ-p-ru-v-đ ao-ơ uợc-kinh cá-phi-thồ c-ré-địt phơ-xí-li-ti đợt ơ cơn-phé-thơ-thíp ph-lâu-tinh in-t-rít-s-t rết.',
    meaningVi: 'Ngân hàng đã phê duyệt hạn mức tín dụng vốn lưu động cho chúng ta với lãi suất thả nổi cạnh tranh.',
    intonation: '↘ Tin tốt về nguồn vốn vay',
    tip: 'Interest rate đọc gọn "in-t-rít-s-t rết".',
  },
  {
    original: 'We prefer settling import shipments via an irrevocable Letter of Credit at sight.',
    phoneticsVi: 'Uy p-ri-phơ xét-tồ-linh im-phót síp-mừn-t-s va-ia ần i-ri-vô-cơ-bồ Lét-thơ óp C-ré-địt đợt xait.',
    meaningVi: 'Chúng tôi ưu tiên thanh toán các lô hàng nhập khẩu bằng Thư tín dụng L/C trả ngay không hủy ngang.',
    intonation: '↘ Dứt khoát khi đàm phán thanh toán quốc tế',
    tip: 'Letter of Credit (L/C) at sight là thư tín dụng trả ngay.',
  },
  {
    original: 'Can we hedge our foreign currency exposure using a three-month forward contract?',
    phoneticsVi: 'Cen uy hét-ch ao-ơ pho-rừn cớ-rừn-xi ích-s-pâu-giơ diu-zinh ơ t-ri-măn-th pho-uợt cơn-t-rác-t? ↗',
    meaningVi: 'Chúng ta có thể phòng ngừa rủi ro tỷ giá bằng hợp đồng ngoại hối kỳ hạn ba tháng không?',
    intonation: '↗ Lên giọng đề xuất giải pháp tài chính',
    tip: 'Hedge đọc là "hét-ch" nghĩa là phòng ngừa rủi ro.',
    isQuestion: true,
  },
  {
    original: 'Please verify the beneficiary bank account name and IBAN before releasing the wire.',
    phoneticsVi: 'Phli-z vé-ri-phai đờ be-nơ-phí-sơ-ri bêng-k ơ-khao-n-t nêm en ai-ban bi-pho ri-li-zing đờ oai-ơ.',
    meaningVi: 'Vui lòng kiểm tra kỹ tên tài khoản thụ hưởng và mã IBAN trước khi duyệt lệnh chuyển tiền.',
    intonation: '↘ Cẩn trọng an toàn giao dịch',
    tip: 'Beneficiary là người thụ hưởng.',
  },

  // Đàm phán giá, Công nợ & Ngân sách (Pricing, Credit & Budgeting)
  {
    original: 'Could we negotiate a sixty-day payment term instead of paying upfront upon delivery?',
    phoneticsVi: 'Kút uy ni-gâu-si-ết ơ xích-s-ti-đây phê-mừn-t thơm in-s-tét óp phây-ing áp-ph-răn-t ơ-phon đi-lí-vơ-ri? ↗',
    meaningVi: 'Chúng ta có thể thương lượng thời hạn thanh toán 60 ngày thay vì trả trước khi giao hàng không?',
    intonation: '↗ Lên giọng khéo léo khi đàm phán công nợ',
    tip: 'Payment term là điều khoản thanh toán, upfront là trả trước.',
    isQuestion: true,
  },
  {
    original: 'Our annual operating budget prioritizes digital transformation and strict cost optimization.',
    phoneticsVi: 'Ao-ơ én-niu-ồ o-phơ-rê-tinh bát-chịt ph-rai-o-ri-thai-zịt đí-chi-thồ t-ren-s-pho-mây-sừn en s-t-ríc-t cót-s óp-thi-mai-zây-sừn.',
    meaningVi: 'Ngân sách vận hành hàng năm ưu tiên chuyển đổi số và tối ưu hóa chi phí chặt chẽ.',
    intonation: '↘ Trang trọng, định hướng chiến lược',
    tip: 'Cost optimization là tối ưu hóa chi phí.',
  },
  {
    original: 'If your company settles the invoice within ten days, we offer a two percent early discount.',
    phoneticsVi: 'Íp gio căm-pơ-ni xét-tồ-z đí in-voi-s uýt-đin then đây-z, uy óp-phơ ơ thu phơ-xen-t ơ-li đít-s-khao-t.',
    meaningVi: 'Nếu công ty bạn thanh toán hóa đơn trong vòng mười ngày, chúng tôi chiết khấu thanh toán sớm hai phần trăm.',
    intonation: '↘ Đề xuất điều kiện có lợi đôi bên',
    tip: 'Early discount là chiết khấu thanh toán sớm.',
  },
  {
    original: 'Why did marketing expenses exceed the approved budget by twelve percent this quarter?',
    phoneticsVi: 'Uai đít ma-két-tinh ích-s-phen-xịt ích-xít đí ơ-p-ru-v-đ bát-chịt bai thuẹo-v phơ-xen-t đít qua-thơ?',
    meaningVi: 'Tại sao chi phí tiếp thị quý này lại vượt ngân sách đã duyệt mười hai phần trăm vậy?',
    intonation: '↘ Xuống giọng hỏi nguyên nhân vượt ngân sách',
    tip: 'Exceed đọc "ích-xít" nghĩa là vượt mức.',
    isQuestion: true,
  },
  {
    original: 'Let us conduct a variance analysis comparing actual spending against the quarterly plan.',
    phoneticsVi: 'Lét ắt cơn-đắc-t ơ ve-ri-ừn-s ơ-ná-lơ-xịt cơn-phe-rinh ác-chu-ồ s-pen-đinh ơ-gen-s-t đờ qua-tơ-li p-len.',
    meaningVi: 'Chúng ta hãy thực hiện phân tích biến động để so sánh chi tiêu thực tế với kế hoạch quý.',
    intonation: '↘ Đề xuất chuyên môn rành mạch',
    tip: 'Variance analysis là phân tích chênh lệch kế hoạch - thực tế.',
  },
  {
    original: 'Every capital expenditure above two hundred million dong requires CFO sign-off.',
    phoneticsVi: 'Év-ri cá-phi-thồ ích-s-phen-đi-chơ ơ-bắp-v thu hăn-đ-rợt mi-li-ừn đồng ri-quai-ơ-z CFO xain-óp.',
    meaningVi: 'Mọi khoản chi đầu tư tài sản cố định trên hai trăm triệu đồng đều cần Giám đốc Tài chính phê duyệt.',
    intonation: '↘ Nhấn mạnh quy trình phân quyền phê duyệt',
    tip: 'Capital expenditure (CapEx) là chi phí đầu tư vốn.',
  },

  // Lương thưởng & Bảo hiểm (Payroll & Insurance)
  {
    original: 'The payroll sheet and social insurance contributions have been verified for this month.',
    phoneticsVi: 'Đờ phây-râu sít en sâu-sồ in-sua-rừn-s cơn-t-ri-biu-sừn-z hép bin vé-ri-phai-đ pho đít măn-th.',
    meaningVi: 'Bảng lương và các khoản trích đóng bảo hiểm xã hội tháng này đã được kiểm tra xác minh xong.',
    intonation: '↘ Báo cáo hoàn thành công việc định kỳ',
    tip: 'Payroll là bảng lương, social insurance là bảo hiểm xã hội.',
  },
  {
    original: 'Could you explain the overtime calculation and performance bonus deductions on my payslip?',
    phoneticsVi: 'Kút diu ích-s-p-lên đí ô-vơ-thaim cál-kiu-lây-sừn en phơ-pho-mừn-s bâu-nợt đi-đắc-sừn-z on mai phây-s-líp? ↗',
    meaningVi: 'Bạn có thể giải thích cách tính tiền tăng ca và các khoản khấu trừ thưởng trên phiếu lương của tôi không?',
    intonation: '↗ Lên giọng hỏi nhẹ nhàng, lịch sự',
    tip: 'Payslip là phiếu lương hàng tháng.',
    isQuestion: true,
  },
  {
    original: 'Please update the dependent registration list for employee tax relief before year-end.',
    phoneticsVi: 'Phli-z áp-đét đờ đi-phén-đừn-t rê-chít-s-t-rây-sừn lít-s-t pho im-p-loi-i tác-s ri-líp bi-pho dia-ren-đ.',
    meaningVi: 'Vui lòng cập nhật danh sách đăng ký người phụ thuộc để giảm trừ gia cảnh trước cuối năm.',
    intonation: '↘ Nhắc nhở nhân sự kế toán tiền lương',
    tip: 'Dependent là người phụ thuộc giảm trừ gia cảnh.',
  },

  // Đầu tư, Kinh tế vĩ mô & Kiểm soát nội bộ (Investment, Macro & Internal Control)
  {
    original: 'What is the projected return on investment and payback period for this factory expansion?',
    phoneticsVi: 'Oát i-z đờ p-rô-chéc-thịt ri-thơn on in-vét-s-t-mừn-t en phây-béc pi-ri-ợt pho đít phác-thơ-ri ích-s-phen-sừn?',
    meaningVi: 'Tỷ suất hoàn vốn dự kiến và thời gian hoàn vốn cho dự án mở rộng nhà máy này là bao lâu?',
    intonation: '↘ Xuống giọng hỏi chỉ số hiệu quả đầu tư',
    tip: 'Return on investment (ROI) là tỷ suất lợi nhuận đầu tư.',
    isQuestion: true,
  },
  {
    original: 'Vietnam’s steady GDP growth and export recovery continue attracting strong foreign direct investment.',
    phoneticsVi: 'Viết-nam-z s-té-đi GDP g-râu-th en ích-s-pót ri-cá-vơ-ri cơn-thí-niu ơ-t-rác-tinh s-t-rong pho-rừn đai-réc-t in-vét-s-t-mừn-t.',
    meaningVi: 'Tăng trưởng GDP ổn định và đà phục hồi xuất khẩu của Việt Nam tiếp tục thu hút mạnh dòng vốn FDI.',
    intonation: '↘ Giọng thuyết trình kinh tế tự tin',
    tip: 'Foreign direct investment (FDI) là đầu tư trực tiếp nước ngoài.',
  },
  {
    original: 'Rising inflation and central bank policy rates directly impact corporate borrowing costs.',
    phoneticsVi: 'Rai-zinh in-ph-lây-sừn en xen-t-rồ bêng-k pho-li-xi rết-s đai-réc-li im-phác-t co-phơ-rợt bo-râu-ing cót-s.',
    meaningVi: 'Lạm phát gia tăng và lãi suất điều hành của ngân hàng trung ương tác động trực tiếp đến chi phí vay vốn.',
    intonation: '↘ Nhận định kinh tế vĩ mô sâu sắc',
    tip: 'Inflation đọc "in-ph-lây-sừn" nghĩa là lạm phát.',
  },
  {
    original: 'Should we diversify our investment portfolio into government bonds and blue-chip stocks?',
    phoneticsVi: 'Xút uy đai-vớ-xi-phai ao-ơ in-vét-s-t-mừn-t pót-phô-li-ô in-thừ gắp-vừn-mừn-t bon-đ-z en b-lu-chíp s-tóc-s? ↗',
    meaningVi: 'Chúng ta có nên đa dạng hóa danh mục đầu tư vào trái phiếu chính phủ và cổ phiếu đầu ngành không?',
    intonation: '↗ Lên giọng thảo luận chiến lược đầu tư',
    tip: 'Portfolio là danh mục đầu tư, bonds là trái phiếu.',
    isQuestion: true,
  },
  {
    original: 'The board of directors requested an updated company valuation using discounted cash flow.',
    phoneticsVi: 'Đờ bo-đ óp đai-réc-thơ-z ri-quét-s-thịt ần áp-đê-thịt căm-pơ-ni vá-liu-ê-sừn diu-zinh đít-s-khao-thịt cát-s ph-lâu.',
    meaningVi: 'Hội đồng quản trị đã yêu cầu cập nhật định giá doanh nghiệp theo phương pháp chiết khấu dòng tiền.',
    intonation: '↘ Trang trọng, chuẩn thuật ngữ tài chính doanh nghiệp',
    tip: 'Discounted cash flow (DCF) là chiết khấu dòng tiền.',
  },
  {
    original: 'Our gross domestic product forecast remains positive thanks to robust domestic consumption.',
    phoneticsVi: 'Ao-ơ g-rốt-s đơ-mét-s-tịch p-ró-đắc-t pho-cát-s-t ri-mên-z phó-zi-thíp thenk-s thừ râu-bắt-s-t đơ-mét-s-tịch cơn-xăm-p-sừn.',
    meaningVi: 'Dự báo tổng sản phẩm quốc nội vẫn tích cực nhờ sức tiêu dùng nội địa vững mạnh.',
    intonation: '↘ Tự tin, lạc quan về kinh tế vĩ mô',
    tip: 'Consumption đọc "cơn-xăm-p-sừn" là sự tiêu dùng.',
  },
  {
    original: 'Do you have the signed debt confirmation letter ready for our annual audit?',
    phoneticsVi: 'Đu diu hép đờ xain-đ đét cơn-phơ-mây-sừn lét-thơ ré-đi pho ao-ơ én-niu-ồ o-địt? ↗',
    meaningVi: 'Bạn đã có sẵn thư xác nhận công nợ đã ký cho đợt kiểm toán năm chưa?',
    intonation: '↗ Lên giọng kiểm tra hồ sơ kiểm toán',
    tip: 'Debt confirmation letter là thư xác nhận công nợ.',
    isQuestion: true,
  },
  {
    original: 'Separating maker and checker roles strengthens internal financial controls and prevents errors.',
    phoneticsVi: 'Xé-phơ-rê-tinh mếk-cơ en check-cơ râu-z s-t-reng-thừn-z in-thơ-nồ phai-nén-sồ cơn-t-râu-z en p-ri-ven-t-s e-rơ-z.',
    meaningVi: 'Việc tách bạch vai trò người lập và người duyệt giúp tăng cường kiểm soát nội bộ và ngăn ngừa sai sót.',
    intonation: '↘ Giải thích nguyên tắc quản trị rủi ro',
    tip: 'Internal controls là kiểm soát nội bộ.',
  },
  {
    original: 'How much net working capital do we need to finance upcoming seasonal inventory?',
    phoneticsVi: 'Hao mát nét uợc-kinh cá-phi-thồ đu uy nít thừ phai-nen-s áp-căm-minh xi-zừn-nồ in-vừn-tô-ri?',
    meaningVi: 'Chúng ta cần bao nhiêu vốn lưu động ròng để tài trợ cho lượng hàng tồn kho theo mùa sắp tới?',
    intonation: '↘ Xuống giọng hỏi nhu cầu vốn',
    tip: 'Finance (động từ) đọc "phai-nen-s" nghĩa là cấp vốn/tài trợ.',
    isQuestion: true,
  },
  {
    original: 'We achieved break-even point two months ahead of our original business plan schedule.',
    phoneticsVi: 'Uy ơ-chi-v-đ b-rếc-í-vừn phoi-n-t thu măn-th-s ơ-hét óp ao-ơ ơ-rí-chơ-nồ bít-z-nịt p-len s-kê-diu.',
    meaningVi: 'Chúng ta đã đạt điểm hòa vốn sớm hơn hai tháng so với lịch trình kế hoạch kinh doanh ban đầu.',
    intonation: '↘ Phấn khởi, chúc mừng kết quả kinh doanh',
    tip: 'Break-even point là điểm hòa vốn.',
  },
  {
    original: 'Please archive all electronic invoices and accounting ledgers securely for ten years.',
    phoneticsVi: 'Phli-z a-khai-v ôn i-léc-t-ró-nịch in-voi-xịt en ơ-khao-n-tinh lét-chơ-z xi-kiu-li pho then dia-z.',
    meaningVi: 'Vui lòng lưu trữ an toàn toàn bộ hóa đơn điện tử và sổ sách kế toán trong thời hạn mười năm.',
    intonation: '↘ Nhắc nhở tuân thủ Luật Kế toán Việt Nam',
    tip: 'Archive đọc "a-khai-v" nghĩa là lưu trữ hồ sơ lâu dài.',
  },
];

// 10 conversational context prefixes for English (cycle 0 = original, cycles 1..9 = 9 natural business finance openers)
const EN_FINANCE_STATEMENT_PREFIXES = [
  { en: 'During our monthly financial review, ', viPhonetics: 'Điu-rinh ao-ơ măn-th-li phai-nén-sồ ri-viu, ', viMeaning: 'Trong buổi rà soát tài chính hàng tháng, ', intonation: '↘ Giọng báo cáo chuyên nghiệp' },
  { en: 'From a corporate accounting standpoint, ', viPhonetics: 'Ph-rầm ơ co-phơ-rợt ơ-khao-n-tinh s-ten-đ-phoi-n-t, ', viMeaning: 'Đứng trên góc độ kế toán doanh nghiệp, ', intonation: '↘ Phân tích rành mạch' },
  { en: 'To stay fully compliant with Vietnamese regulations, ', viPhonetics: 'Thừ s-tây phu-li cơn-p-lai-ừn-t uýt Viết-na-mít ré-giu-lây-sừn-z, ', viMeaning: 'Để tuân thủ đầy đủ quy định pháp luật Việt Nam, ', intonation: '↘ Trang trọng, tuân thủ quy chuẩn' },
  { en: 'Before submitting the quarterly financial package, ', viPhonetics: 'Bi-pho xắp-mít-tinh đờ qua-tơ-li phai-nén-sồ phác-kịt-ch, ', viMeaning: 'Trước khi nộp bộ báo cáo tài chính quý, ', intonation: '↘ Cẩn trọng kiểm tra lại' },
  { en: 'According to the Chief Financial Officer, ', viPhonetics: 'Ơ-co-đinh thừ đờ Chíp Phai-nén-sồ Óp-phi-xơ, ', viMeaning: 'Theo chỉ đạo của Giám đốc Tài chính, ', intonation: '↘ Dứt khoát, truyền đạt chỉ thị' },
  { en: 'In today’s budget planning meeting, ', viPhonetics: 'In tu-đây-z bát-chịt p-len-ninh mít-tinh, ', viMeaning: 'Trong cuộc họp lập kế hoạch ngân sách hôm nay, ', intonation: '↘ Trình bày mạch lạc' },
  { en: 'To optimize cash flow and reduce financial risks, ', viPhonetics: 'Thừ óp-thi-mai-z cát-s ph-lâu en ri-điu-s phai-nén-sồ rít-s-k-s, ', viMeaning: 'Nhằm tối ưu dòng tiền và giảm thiểu rủi ro tài chính, ', intonation: '↘ Nhấn mạnh mục tiêu quản trị' },
  { en: 'Just as a quick reminder for the finance team, ', viPhonetics: 'Chắt ét ơ quých ri-main-đơ pho đờ phai-nen-s thim, ', viMeaning: 'Nhắc nhẹ một chút cho đội ngũ tài chính kế toán, ', intonation: '↘ Thân thiện, phối hợp nội bộ' },
  { en: 'Following the bank reconciliation check, ', viPhonetics: 'Pho-lâu-ing đờ bêng-k ré-cừn-xi-li-ê-sừn check, ', viMeaning: 'Sau bước kiểm tra đối chiếu ngân hàng, ', intonation: '↘ Cập nhật tiến độ công việc' },
];

const EN_FINANCE_QUESTION_PREFIXES = [
  { en: 'Excuse me, for our accounting records, ', viPhonetics: 'Ích-s kiu-z mi, pho ao-ơ ơ-khao-n-tinh ré-cọt-s, ', viMeaning: 'Xin lỗi, để lưu hồ sơ kế toán, ', intonation: '↗ Hỏi thăm lịch sự trong công việc' },
  { en: 'Before we finalize the monthly closing, ', viPhonetics: 'Bi-pho uy phai-nồ-lai-z đờ măn-th-li c-lâu-zinh, ', viMeaning: 'Trước khi chúng ta chốt sổ cuối tháng, ', intonation: '↗ Lên giọng kiểm tra lại' },
  { en: 'Regarding the Vietnam tax audit checklist, ', viPhonetics: 'Ri-ga-đinh đờ Viết-nam tác-s o-địt check-lít-s-t, ', viMeaning: 'Liên quan đến danh mục kiểm tra thuế tại Việt Nam, ', intonation: '↗ Hỏi xác minh chi tiết' },
  { en: 'In preparation for tomorrow’s finance briefing, ', viPhonetics: 'In p-re-phơ-rây-sừn pho thừ-mo-râu-z phai-nen-s b-ri-phinh, ', viMeaning: 'Để chuẩn bị cho buổi họp báo cáo tài chính ngày mai, ', intonation: '↗ Chủ động trao đổi' },
  { en: 'Quick question from the treasury desk: ', viPhonetics: 'Quých quét-s-chừn ph-rầm đờ t-ré-giơ-ri đét-s-k: ', viMeaning: 'Bộ phận ngân quỹ xin hỏi nhanh một chút: ', intonation: '↗ Trao đổi nhanh giữa các phòng ban' },
  { en: 'Just to make sure there are no discrepancies, ', viPhonetics: 'Chắt thừ mếk sua đe a nâu đít-s-c-ré-phừn-xi-z, ', viMeaning: 'Để chắc chắn không có bất kỳ chênh lệch nào, ', intonation: '↗ Cẩn trọng xác nhận' },
  { en: 'As we review this quarter’s balance sheet, ', viPhonetics: 'Ét uy ri-viu đít qua-thơ-z bá-lừn-s sít, ', viMeaning: 'Khi chúng ta xem xét bảng cân đối kế toán quý này, ', intonation: '↗ Đặt câu hỏi thảo luận' },
  { en: 'For transparency with our business partners, ', viPhonetics: 'Pho t-ren-s-phe-rừn-xi uýt ao-ơ bít-z-nịt pát-nơ-z, ', viMeaning: 'Để minh bạch với các đối tác kinh doanh của chúng ta, ', intonation: '↗ Lịch sự, chuyên nghiệp' },
  { en: 'While processing this supplier payment batch, ', viPhonetics: 'Uai-ồ p-rô-xét-s-sinh đít xắp-p-lai-ơ phê-mừn-t bát-ch, ', viMeaning: 'Trong lúc xử lý đợt thanh toán nhà cung cấp này, ', intonation: '↗ Xác nhận chứng từ' },
];

export function getFinanceEnglishSentence(index: number): PracticeItem {
  const seed = FINANCE_EN_SEEDS[(index - 1) % FINANCE_EN_SEEDS.length];
  const cycle = Math.floor((index - 1) / FINANCE_EN_SEEDS.length);
  const id = `en-kinh-t-t-i-ch-nh-k-to-n-${index}`;

  if (cycle === 0) {
    return {
      id,
      language: 'en',
      category: 'Kinh tế, tài chính, kế toán',
      original: seed.original,
      phoneticsVi: seed.phoneticsVi,
      meaningVi: seed.meaningVi,
      intonation: seed.intonation,
      tip: seed.tip,
    };
  }

  const prefixes = seed.isQuestion ? EN_FINANCE_QUESTION_PREFIXES : EN_FINANCE_STATEMENT_PREFIXES;
  const mod = prefixes[(cycle - 1) % prefixes.length];
  const lowerOrig = seed.original.charAt(0).toLowerCase() + seed.original.slice(1);
  const lowerPhonetics = seed.phoneticsVi.charAt(0).toLowerCase() + seed.phoneticsVi.slice(1);
  const lowerMeaning = seed.meaningVi.charAt(0).toLowerCase() + seed.meaningVi.slice(1);

  return {
    id,
    language: 'en',
    category: 'Kinh tế, tài chính, kế toán',
    original: `${mod.en}${lowerOrig}`,
    phoneticsVi: `${mod.viPhonetics}${lowerPhonetics}`,
    meaningVi: `${mod.viMeaning}${lowerMeaning}`,
    intonation: mod.intonation,
    tip: `${seed.tip} Ngắt nhịp nhẹ ở dấu phẩy để nói trôi chảy như dân tài chính bản ngữ.`,
  };
}

// 50 core Economics, Finance & Accounting dialogue sentences in Chinese tailored for Vietnamese learners
const FINANCE_ZH_SEEDS: FinanceSeed[] = [
  {
    original: '麻烦您今天帮我们开一张公司增值税专用发票。',
    phoneticsVi: 'Má phán nín chin then bang ủa mơn khai di trang cung xư trâng trư suây troan dung pha pheo.',
    meaningVi: 'Phiền bạn hôm nay xuất giúp chúng tôi một hóa đơn VAT giá trị gia tăng doanh nghiệp.',
    intonation: '↘ Lịch sự yêu cầu xuất hóa đơn đỏ',
    tip: '增值税发票 đọc là "trâng trư suây pha pheo" (hóa đơn GTGT).',
  },
  {
    original: '开票前请先核对一下我们公司的税号和开户银行信息。',
    phoneticsVi: 'Khai pheo chén chỉnh xiên hứa tuây di xà ủa mơn cung xư tợ suây hao hơ khai hu dính háng xin xi.',
    meaningVi: 'Trước khi xuất hóa đơn vui lòng đối chiếu lại mã số thuế và thông tin tài khoản ngân hàng của công ty.',
    intonation: '↘ Cẩn trọng nhắc kiểm tra thông tin',
    tip: '税号 (shuìhào) là mã số thuế, 核对 (héduì) là đối chiếu.',
  },
  {
    original: '每个月五号之前，我们需要把银行流水和总账核对清楚。',
    phoneticsVi: 'Mẩy cờ duyê ủ hao trư chén, ủa mơn xuy deo bả dính háng liểu suẩy hơ tủng trang hứa tuây ching chủ.',
    meaningVi: 'Trước ngày mùng 5 hàng tháng, chúng ta cần đối chiếu rõ ràng sao kê ngân hàng với sổ cái.',
    intonation: '↘ Nhấn mạnh mốc thời gian khóa sổ',
    tip: '银行流水 là sao kê ngân hàng, 总账 là sổ cái.',
  },
  {
    original: '这份付款申请单后面已经附齐所有原始凭证和入库单了吗？',
    phoneticsVi: 'Chưa phẩn phu khoản sân chỉnh đan hâu miên dỉ ching phu chí suổ dẩu duển sử phính trâng hơ ru khu đan lơ ma?',
    meaningVi: 'Sau giấy đề nghị thanh toán này đã đính kèm đầy đủ chứng từ gốc và phiếu nhập kho chưa?',
    intonation: '↗ Lên giọng cuối câu hỏi 了吗',
    tip: '原始凭证 là chứng từ gốc, 入库单 là phiếu nhập kho.',
    isQuestion: true,
  },
  {
    original: '财务部正在进行月底结账，并编制试算平衡表。',
    phoneticsVi: 'Chải u bu trâng chai chin xính duyê tỉ chiế trang, binh piên trư sư xoan phính hấng piểu.',
    meaningVi: 'Phòng tài chính kế toán đang tiến hành khóa sổ cuối tháng và lập bảng cân đối số phát sinh.',
    intonation: '↘ Báo cáo tiến độ công việc kế toán',
    tip: '结账 là khóa sổ, 试算平衡表 là bảng cân đối thử.',
  },
  {
    original: '为什么采购订单的金额和供应商发票不一致？',
    phoneticsVi: 'Uây sấn mơ chải câu ting đan tợ chin ứa hơ cung ding sang pha pheo pu di trư?',
    meaningVi: 'Tại sao số tiền trên đơn đặt hàng và hóa đơn của nhà cung cấp lại không khớp nhau?',
    intonation: '↘ Xuống giọng hỏi nguyên nhân chênh lệch',
    tip: '金额 là số tiền, 不一致 là không khớp / không thống nhất.',
    isQuestion: true,
  },
  {
    original: '请把这笔年度软件服务费计入长期待摊费用。',
    phoneticsVi: 'Chỉnh bả chưa bỉ nén tu roản chiên phú u phây chi ru tráng chi tai than phây dung.',
    meaningVi: 'Vui lòng hạch toán khoản phí dịch vụ phần mềm cả năm này vào chi phí trả trước dài hạn.',
    intonation: '↘ Hướng dẫn hạch toán rõ ràng',
    tip: '长期待摊费用 là chi phí trả trước dài hạn.',
  },
  {
    original: '外部审计师对我们的固定资产折旧表有提出调整意见吗？',
    phoneticsVi: 'Oai bu sẩn chi sư tuây ủa mơn tợ cu ting tư trản trớ chiêu piểu dẩu thí chu théo trẩng di chiên ma?',
    meaningVi: 'Kiểm toán viên độc lập có đưa ra ý kiến điều chỉnh nào cho bảng khấu hao tài sản cố định không?',
    intonation: '↗ Lên giọng hỏi ý kiến kiểm toán',
    tip: '审计师 là kiểm toán viên, 折旧 là khấu hao.',
    isQuestion: true,
  },
  {
    original: '所有员工的出差报销单必须在周五前贴好发票提交。',
    phoneticsVi: 'Suổ dẩu duển cung tợ chu chai pao xeo đan pi xuy chai trâu ủ chén thiê hảo pha pheo thí cheo.',
    meaningVi: 'Mọi chứng từ thanh toán công tác phí của nhân viên phải dán đủ hóa đơn và nộp trước thứ Sáu.',
    intonation: '↘ Dứt khoát về thời hạn thanh toán',
    tip: '报销 là thanh toán hoàn ứng chi phí.',
  },
  {
    original: '按越南会计准则，三千万越南盾以上的电脑要列入固定资产。',
    phoneticsVi: 'An Duyê Nán khoai chi truẩn trớ, xan chiên oàn Duyê Nán tuân dỉ sang tợ tiện nảo deo liê ru cu ting tư trản.',
    meaningVi: 'Theo chuẩn mực kế toán Việt Nam, máy tính trên 30 triệu đồng phải ghi nhận là tài sản cố định.',
    intonation: '↘ Giải thích quy định kế toán tại Việt Nam',
    tip: '会计准则 là chuẩn mực kế toán.',
  },
  {
    original: '本季度的增值税纳税申报表截止日期是哪一天？',
    phoneticsVi: 'Pển chi tu tợ trâng trư suây na suây sân pao piểu chiế trử rư chi sư nả di then?',
    meaningVi: 'Hạn chót nộp tờ khai thuế giá trị gia tăng quý này là ngày nào?',
    intonation: '↘ Xuống giọng hỏi thời hạn thuế',
    tip: '纳税申报表 là tờ khai thuế, 截止日期 là hạn chót.',
    isQuestion: true,
  },
  {
    original: '两千万越南盾以上的发票必须对公转账才能抵扣进项税。',
    phoneticsVi: 'Lẻng chiên oàn Duyê Nán tuân dỉ sang tợ pha pheo pi xuy tuây cung troản trang chải nấng tỉ khấu chin xeng suây.',
    meaningVi: 'Hóa đơn từ hai mươi triệu đồng trở lên bắt buộc phải chuyển khoản công ty mới được khấu trừ thuế đầu vào.',
    intonation: '↘ Nhấn mạnh điều kiện khấu trừ thuế GTGT',
    tip: '对公转账 là chuyển khoản tài khoản công ty, 抵扣 là khấu trừ.',
  },
  {
    original: '本财年的企业所得税预提金额核算准确了吗？',
    phoneticsVi: 'Pển chải nén tợ chỉ diê suổ tớ suây duy thí chin ứa hứa xoan truẩn chuê lơ ma?',
    meaningVi: 'Số tiền tạm trích thuế thu nhập doanh nghiệp năm tài chính này đã tính toán chính xác chưa?',
    intonation: '↗ Lên giọng kiểm tra số liệu thuế',
    tip: '企业所得税 là thuế thu nhập doanh nghiệp.',
    isQuestion: true,
  },
  {
    original: '发放月度工资前，请务必核实个人所得税的代扣代缴明细。',
    phoneticsVi: 'Pha phang duyê tu cung tư chén, chỉnh u bi hứa sử cưa rấn suổ tớ suây tợ tai khấu tai chẻo mính xi.',
    meaningVi: 'Trước khi trả lương tháng, vui lòng kiểm tra kỹ bảng kê khấu trừ nộp thay thuế thu nhập cá nhân.',
    intonation: '↘ Cẩn trọng khi chi trả lương',
    tip: '个人所得税 là thuế thu nhập cá nhân.',
  },
  {
    original: '这份跨境咨询服务合同是否涉及越南的外国承包商税？',
    phoneticsVi: 'Chưa phẩn khoa ching tư xuýn phú u hứa thúng sư phẩu sưa chí Duyê Nán tợ oai của trấng pao sang suây?',
    meaningVi: 'Hợp đồng dịch vụ tư vấn xuyên biên giới này có phát sinh thuế nhà thầu nước ngoài tại Việt Nam không?',
    intonation: '↗ Lên giọng hỏi nghĩa vụ thuế nhà thầu',
    tip: '外国承包商税 là thuế nhà thầu nước ngoài (FCT).',
    isQuestion: true,
  },
  {
    original: '今天早上我们收到了当地税务局批准出口退税的通知。',
    phoneticsVi: 'Chin then tảo sang ủa mơn sâu tao lơ tang ti suây u chuy phi truẩn chu khẩu thuây suây tợ thung trư.',
    meaningVi: 'Sáng nay chúng tôi đã nhận được thông báo chấp thuận hoàn thuế xuất khẩu của cục thuế địa phương.',
    intonation: '↘ Phấn khởi báo tin tài chính',
    tip: '出口退税 là hoàn thuế xuất khẩu.',
  },
  {
    original: '我们一起来审阅第三季度的利润表和净利润率。',
    phoneticsVi: 'Ủa mơn di chỉ sẩn duê ti xan chi tu tợ lì ruận piểu hơ ching lì ruận luy.',
    meaningVi: 'Chúng ta hãy cùng xem xét báo cáo kết quả kinh doanh và tỷ suất lợi nhuận ròng quý ba.',
    intonation: '↘ Điều hành họp phân tích tài chính',
    tip: '利润表 là báo cáo lãi lỗ (P&L), 净利润率 là biên lợi nhuận ròng.',
  },
  {
    original: '本月经营性现金流与预算预测相比情况怎么样？',
    phoneticsVi: 'Pển duyê ching dính xing xiên chin liểu dủ duy xoan duy xưa xeng bỉ chính khoang chẩn mơ dang?',
    meaningVi: 'Dòng tiền từ hoạt động kinh doanh tháng này so với dự báo ngân sách thế nào?',
    intonation: '↘ Xuống giọng hỏi tình hình dòng tiền',
    tip: '现金流 là dòng tiền, 预算 là ngân sách.',
    isQuestion: true,
  },
  {
    original: '虽然营业收入增长了百分之十八，但物流成本上涨压缩了毛利率。',
    phoneticsVi: 'Xuây rán dính diê sâu ru trẩng trảng lơ bải phẩn trư sử pa, tan u liểu trấng pển sang trảng da xua lơ máo lì luy.',
    meaningVi: 'Tuy doanh thu tăng mười tám phần trăm nhưng chi phí logistics tăng đã thu hẹp biên lợi nhuận gộp.',
    intonation: '↘ Nhấn mạnh hai vế tương phản kinh doanh',
    tip: '毛利率 là biên lợi nhuận gộp.',
  },
  {
    original: '您能帮我做一份未来九十天的每周现金流滚动预测表吗？',
    phoneticsVi: 'Nín nấng bang ủa trua di phẩn uây lai chiểu sử then tợ mẩy trâu xiên chin liểu cuẩn tung duy xưa piểu ma?',
    meaningVi: 'Bạn có thể lập giúp tôi bảng dự báo dòng tiền cuốn chiếu hàng tuần cho 90 ngày tới không?',
    intonation: '↗ Lên giọng giao việc lập kế hoạch',
    tip: '滚动预测 là dự báo cuốn chiếu (rolling forecast).',
    isQuestion: true,
  },
  {
    original: '收紧客户信用账期后，我们的应收账款周转率明显提高了。',
    phoneticsVi: 'Sâu chỉnh khưa hu xin dung trang chi hâu, ủa mơn tợ ding sâu trang khoản trâu troản luy mính xẻn thí cao lơ.',
    meaningVi: 'Sau khi siết chặt kỳ hạn tín dụng khách hàng, vòng quay khoản phải thu của chúng ta đã tăng rõ rệt.',
    intonation: '↘ Tự tin chia sẻ kết quả cải thiện',
    tip: '应收账款 là khoản phải thu, 周转率 là vòng quay.',
  },
  {
    original: '我们需要密切跟踪逾期应付账款，维护好核心供应商的合作关系。',
    phoneticsVi: 'Ủa mơn xuy deo mi chiê cân tung duy chi ding phu trang khoản, uây hu hảo hứa xin cung ding sang tợ hứa trua quan xi.',
    meaningVi: 'Chúng ta cần theo dõi sát các khoản phải trả quá hạn để giữ quan hệ hợp tác tốt với nhà cung cấp cốt lõi.',
    intonation: '↘ Nhắc nhở quản trị công nợ phải trả',
    tip: '应付账款 là khoản phải trả, 逾期 là quá hạn.',
  },
  {
    original: '最新合并资产负债表上的资产负债率是多少？',
    phoneticsVi: 'Chuây xin hứa binh tư trản phu chai piểu sang tợ tư trản phu chai luy sư tua sao?',
    meaningVi: 'Tỷ lệ nợ trên tổng tài sản trên bảng cân đối kế toán hợp nhất mới nhất là bao nhiêu?',
    intonation: '↘ Xuống giọng hỏi chỉ số bảng cân đối',
    tip: '资产负债表 là bảng cân đối kế toán.',
    isQuestion: true,
  },
  {
    original: '清理滞销库存为我们释放了将近五十亿越南盾的流动资金。',
    phoneticsVi: 'Ching lỉ trư xeo khu thuẩn uây ủa mơn sư phang lơ cheng chin ủ sử di Duyê Nán tuân tợ liểu tung tư chin.',
    meaningVi: 'Việc giải phóng hàng tồn kho chậm luân chuyển đã mang lại gần năm tỷ đồng vốn lưu động cho chúng ta.',
    intonation: '↘ Báo cáo kết quả tối ưu vốn',
    tip: '流动资金 là vốn lưu động, 库存 là hàng tồn kho.',
  },
  {
    original: '请问今天银行对公电汇美元兑越南盾的卖出汇率是多少？',
    phoneticsVi: 'Chỉnh oân chin then dính háng tuây cung tiện huây Mẩy duển tuây Duyê Nán tuân tợ mai chu huây luy sư tua sao?',
    meaningVi: 'Xin hỏi hôm nay tỷ giá bán chuyển khoản USD sang VND tại ngân hàng là bao nhiêu?',
    intonation: '↘ Xuống giọng hỏi tỷ giá giao dịch',
    tip: '汇率 là tỷ giá hối đoái, 电汇 là chuyển tiền điện tử.',
    isQuestion: true,
  },
  {
    original: '跨境汇款完成后，请把银行的SWIFT水单发给我存档。',
    phoneticsVi: 'Khoa ching huây khoản oán trấng hâu, chỉnh bả dính háng tợ SWIFT suẩy đan pha cấy ủa thuẩn tảng.',
    meaningVi: 'Sau khi chuyển tiền quốc tế xong, vui lòng gửi giúp tôi điện SWIFT ngân hàng để lưu hồ sơ.',
    intonation: '↘ Dặn dò rõ ràng lưu chứng từ',
    tip: '水单 (shuǐdān) là giấy báo / phiếu xác nhận chuyển tiền ngân hàng.',
  },
  {
    original: '银行已经批准了我们的流动资金授信额度，浮动利率非常有竞争力。',
    phoneticsVi: 'Dính háng dỉ ching phi truẩn lơ ủa mơn tợ liểu tung tư chin sâu xin ứa tu, phú tung lì luy phây tráng dẩu ching trâng lì.',
    meaningVi: 'Ngân hàng đã phê duyệt hạn mức tín dụng vốn lưu động với lãi suất thả nổi rất cạnh tranh.',
    intonation: '↘ Phấn khởi thông báo nguồn vốn',
    tip: '授信额度 là hạn mức tín dụng, 浮动利率 là lãi suất thả nổi.',
  },
  {
    original: '这批进口货物我们倾向于采用即期不可撤销信用证来结算。',
    phoneticsVi: 'Chưa phi chin khẩu hua u ủa mơn ching xeng duy chải dung chí chi pu khở chưa xeo xin dung trâng lái chiế xoan.',
    meaningVi: 'Lô hàng nhập khẩu này chúng tôi ưu tiên thanh toán bằng thư tín dụng L/C trả ngay không hủy ngang.',
    intonation: '↘ Chuyên nghiệp khi đàm phán ngoại thương',
    tip: '信用证 là Thư tín dụng L/C, 即期 là trả ngay.',
  },
  {
    original: '我们是否可以通过三个月远期外汇合约来对冲汇率波动风险？',
    phoneticsVi: 'Ủa mơn sư phẩu khở dỉ thung cua xan cờ duyê duển chi oai huây hứa duê lái tuây trung huây luy pua tung phâng xẻn?',
    meaningVi: 'Chúng ta có thể dùng hợp đồng ngoại hối kỳ hạn ba tháng để phòng ngừa rủi ro biến động tỷ giá không?',
    intonation: '↗ Lên giọng đề xuất công cụ tài chính',
    tip: '对冲风险 là phòng ngừa rủi ro (hedging).',
    isQuestion: true,
  },
  {
    original: '提交汇款指令前，请再次核对收款人户名和银行代码。',
    phoneticsVi: 'Thí cheo huây khoản trử linh chén, chỉnh chai xư hứa tuây sâu khoản rấn hu mính hơ dính háng tai mả.',
    meaningVi: 'Trước khi gửi lệnh chuyển tiền, vui lòng kiểm tra lại lần nữa tên người thụ hưởng và mã ngân hàng.',
    intonation: '↘ Thận trọng tránh sai sót chuyển khoản',
    tip: '收款人 là người thụ hưởng.',
  },
  {
    original: '我们可以把货到付款改成月结六十天的账期吗？',
    phoneticsVi: 'Ủa mơn khở dỉ bả hua tao phu khoản cải trấng duyê chiế liêu sử then tợ trang chi ma?',
    meaningVi: 'Chúng ta có thể chuyển từ thanh toán khi giao hàng sang công nợ trả chậm 60 ngày được không?',
    intonation: '↗ Lên giọng thương lượng điều khoản',
    tip: '账期 là kỳ hạn công nợ, 货到付款 là thanh toán khi nhận hàng.',
    isQuestion: true,
  },
  {
    original: '今年公司的年度运营预算重点放在数字化转型和严格降本增效上。',
    phoneticsVi: 'Chin nén cung xư tợ nén tu duyn dính duy xoan trung tiện phang chai su trư hoa troản xính hơ dén cứa cheng pển trâng xeo sang.',
    meaningVi: 'Ngân sách vận hành năm nay của công ty tập trung vào chuyển đổi số và tiết giảm chi phí nâng cao hiệu suất.',
    intonation: '↘ Trình bày định hướng ngân sách',
    tip: '降本增效 là giảm chi phí tăng hiệu quả.',
  },
  {
    original: '如果贵司能在十天内结清货款，我们可以给予百分之二的现金折扣。',
    phoneticsVi: 'Rú của cuây xư nấng chai sử then nây chiế ching hua khoản, ủa mơn khở dỉ cấy dủ bải phẩn trư ơ tợ xiên chin trớ khấu.',
    meaningVi: 'Nếu quý công ty thanh toán dứt điểm trong 10 ngày, chúng tôi có thể chiết khấu thanh toán sớm 2%.',
    intonation: '↘ Đàm phán đôi bên cùng có lợi',
    tip: '现金折扣 là chiết khấu thanh toán sớm.',
  },
  {
    original: '为什么本季度市场推广费用比批准预算超支了百分之十二？',
    phoneticsVi: 'Uây sấn mơ pển chi tu sư trảng thuây quảng phây dung bỉ phi truẩn duy xoan trao trư lơ bải phẩn trư sử ơ?',
    meaningVi: 'Tại sao chi phí tiếp thị quý này lại vượt ngân sách đã duyệt mười hai phần trăm?',
    intonation: '↘ Xuống giọng hỏi nguyên nhân vượt chi',
    tip: '超支 (chāozhī) là chi vượt ngân sách.',
    isQuestion: true,
  },
  {
    original: '我们来做一次预算差异分析，把实际支出和季度计划逐项对比。',
    phoneticsVi: 'Ủa mơn lái trua di xư duy xoan tra di phơn xi, bả sử chi trư chu hơ chi tu chi hoa trú xeng tuây bỉ.',
    meaningVi: 'Chúng ta hãy làm một bản phân tích chênh lệch ngân sách, so sánh từng hạng mục thực chi với kế hoạch quý.',
    intonation: '↘ Đề xuất rà soát chi tiêu',
    tip: '差异分析 là phân tích chênh lệch (variance analysis).',
  },
  {
    original: '两亿越南盾以上的资本性支出项目都必须由财务总监签字审批。',
    phoneticsVi: 'Lẻng di Duyê Nán tuân dỉ sang tợ tư pển xing trư chu xeng mu tâu pi xuy dâu chải u tủng chiên chen tư sẩn phi.',
    meaningVi: 'Mọi khoản chi đầu tư tài sản trên hai trăm triệu đồng đều phải có chữ ký phê duyệt của Giám đốc Tài chính.',
    intonation: '↘ Nhấn mạnh quy trình phân quyền phê duyệt',
    tip: '财务总监 là Giám đốc Tài chính (CFO).',
  },
  {
    original: '本月的工资表和社保缴纳明细已经全部核对无误。',
    phoneticsVi: 'Pển duyê tợ cung tư piểu hơ sưa pảo chẻo na mính xi dỉ ching choán bu hứa tuây ú u.',
    meaningVi: 'Bảng lương tháng này và bảng kê đóng bảo hiểm xã hội đã được kiểm tra chính xác hoàn toàn.',
    intonation: '↘ Báo cáo hoàn tất kỳ lương',
    tip: '工资表 là bảng lương, 社保 là bảo hiểm xã hội.',
  },
  {
    original: '您能帮我解释一下工资条上的加班费计算和绩效扣款吗？',
    phoneticsVi: 'Nín nấng bang ủa chiể sư di xà cung tư théo sang tợ chia pan phây chi xoan hơ chi xeo khấu khoản ma?',
    meaningVi: 'Bạn có thể giải thích giúp tôi cách tính tiền tăng ca và khoản khấu trừ hiệu suất trên phiếu lương không?',
    intonation: '↗ Lên giọng hỏi nhẹ nhàng, tôn trọng',
    tip: '工资条 là phiếu lương chi tiết.',
    isQuestion: true,
  },
  {
    original: '年底前请通知员工及时更新个人所得税的赡养亲属减免名单。',
    phoneticsVi: 'Nén tỉ chén chỉnh thung trư duển cung chí sử câng xin cưa rấn suổ tớ suây tợ san dang chin sử chiển miển mính đan.',
    meaningVi: 'Trước cuối năm vui lòng nhắc nhân viên cập nhật kịp thời danh sách người phụ thuộc giảm trừ gia cảnh.',
    intonation: '↘ Nhắc nhở thủ tục thuế TNCN',
    tip: '减免名单 là danh sách giảm trừ.',
  },
  {
    original: '这个扩建厂房项目的预期投资回报率和回收期是多少？',
    phoneticsVi: 'Chưa cờ khua chiên trảng pháng xeng mu tợ duy chi thấu tư huây pao luy hơ huây sâu chi sư tua sao?',
    meaningVi: 'Tỷ suất hoàn vốn dự kiến và thời gian thu hồi vốn của dự án mở rộng nhà xưởng này là bao nhiêu?',
    intonation: '↘ Xuống giọng hỏi hiệu quả đầu tư',
    tip: '投资回报率 là ROI, 回收期 là thời gian hoàn vốn.',
    isQuestion: true,
  },
  {
    original: '越南稳定的GDP增长和出口复苏持续吸引着大量外商直接投资。',
    phoneticsVi: 'Duyê Nán uẩn ting tợ GDP trẩng trảng hơ chu khẩu phu xu trử xuy xi dỉn trơ ta lieng oai sang trứ chiế thấu tư.',
    meaningVi: 'Tăng trưởng GDP ổn định và đà phục hồi xuất khẩu của Việt Nam tiếp tục thu hút lượng lớn vốn FDI.',
    intonation: '↘ Tự tin thuyết trình kinh tế Việt Nam',
    tip: '外商直接投资 là đầu tư trực tiếp nước ngoài (FDI).',
  },
  {
    original: '通胀上升和央行基准利率调整会直接增加企业的融资成本。',
    phoneticsVi: 'Thung trang sang sâng hơ dang háng chi truẩn lì luy théo trẩng huây trứ chiế trâng chia chỉ diê tợ rúng tư trấng pển.',
    meaningVi: 'Lạm phát tăng và việc điều chỉnh lãi suất cơ bản của ngân hàng trung ương làm tăng trực tiếp chi phí vốn.',
    intonation: '↘ Nhận định chuyên sâu kinh tế vĩ mô',
    tip: '通胀 là lạm phát, 融资成本 là chi phí huy động vốn.',
  },
  {
    original: '我们是否应该把部分资金分散配置到国债和蓝筹股中？',
    phoneticsVi: 'Ủa mơn sư phẩu ding cai bả bu phẩn tư chin phơn xan phây trư tao của chai hơ lán trấu củ trung?',
    meaningVi: 'Chúng ta có nên phân bổ một phần vốn vào trái phiếu chính phủ và cổ phiếu đầu ngành không?',
    intonation: '↗ Lên giọng thảo luận danh mục đầu tư',
    tip: '国债 là trái phiếu chính phủ, 蓝筹股 là cổ phiếu blue-chip.',
    isQuestion: true,
  },
  {
    original: '董事会要求采用现金流折现法重新评估公司最新的估值。',
    phoneticsVi: 'Tủng sư huây deo chiểu chải dung xiên chin liểu trớ xiên phả trúng xin phính cu cung xư chuây xin tợ cu trư.',
    meaningVi: 'Hội đồng quản trị yêu cầu áp dụng phương pháp chiết khấu dòng tiền để định giá lại công ty.',
    intonation: '↘ Trang trọng, đúng chuẩn tài chính doanh nghiệp',
    tip: '现金流折现法 là phương pháp DCF, 估值 là định giá.',
  },
  {
    original: '得益于强劲的国内消费需求，今年宏观经济预期依然保持乐观。',
    phoneticsVi: 'Tớ di duy chéng chin tợ của nây xeo phây xuy chiểu, chin nén húng quan ching chi duy xưa di rán pảo trử lưa quan.',
    meaningVi: 'Nhờ nhu cầu tiêu dùng nội địa mạnh mẽ, triển vọng kinh tế vĩ mô năm nay vẫn rất khả quan.',
    intonation: '↘ Lạc quan, rõ ràng trong báo cáo vĩ mô',
    tip: '宏观经济 là kinh tế vĩ mô.',
  },
  {
    original: '配合年度审计的往来账款询证函都已经签字盖章了吗？',
    phoneticsVi: 'Phây hứa nén tu sẩn chi tợ oảng lái trang khoản xuýn trâng hán tâu dỉ ching chen tư cai trang lơ ma?',
    meaningVi: 'Thư xác nhận công nợ phục vụ kiểm toán năm đã được ký tên đóng dấu hết chưa?',
    intonation: '↗ Lên giọng kiểm tra hồ sơ kiểm toán',
    tip: '询证函 là thư xác nhận kiểm toán, 盖章 là đóng dấu.',
    isQuestion: true,
  },
  {
    original: '实行制单与复核分离制度能有效强化内部财务控制并减少差错。',
    phoneticsVi: 'Sứ xính trư đan dủ phu hứa phơn lí trư tu nấng dẩu xeo chéng hoa nây bu chải u khung trư binh chiển sảo tra xua.',
    meaningVi: 'Tách bạch người lập chứng từ và người kiểm soát giúp tăng cường kiểm soát nội bộ và giảm sai sót.',
    intonation: '↘ Giải thích quy trình kiểm soát nội bộ',
    tip: '内部控制 là kiểm soát nội bộ.',
  },
  {
    original: '为了备货迎接旺季销售，我们还需要补充多少净营运资金？',
    phoneticsVi: 'Uây lơ pây hua dính chiê oang chi xeo sâu, ủa mơn hái xuy deo bủ trung tua sao ching dính duyn tư chin?',
    meaningVi: 'Để chuẩn bị hàng cho mùa cao điểm bán hàng, chúng ta cần bổ sung thêm bao nhiêu vốn lưu động ròng?',
    intonation: '↘ Xuống giọng hỏi nhu cầu vốn mùa vụ',
    tip: '营运资金 là vốn lưu động.',
    isQuestion: true,
  },
  {
    original: '公司比原定商业计划提前两个月实现了盈亏平衡点。',
    phoneticsVi: 'Cung xư bỉ duển ting sang diê chi hoa thí chén lẻng cờ duyê sử xiên lơ dính khuây phính hấng tiện.',
    meaningVi: 'Công ty đã đạt điểm hòa vốn sớm hơn hai tháng so với kế hoạch kinh doanh ban đầu.',
    intonation: '↘ Phấn khởi báo cáo cột mốc lợi nhuận',
    tip: '盈亏平衡点 là điểm hòa vốn.',
  },
  {
    original: '请按越南会计法规定，将所有电子发票和账簿妥善保存十年。',
    phoneticsVi: 'Chỉnh an Duyê Nán khoai chi phả cuây ting, cheng suổ dẩu tiện tư pha pheo hơ trang bu thuổ san pảo thuẩn sử nén.',
    meaningVi: 'Vui lòng lưu trữ an toàn toàn bộ hóa đơn điện tử và sổ sách kế toán đủ 10 năm theo Luật Kế toán Việt Nam.',
    intonation: '↘ Nhắc nhở lưu trữ chứng từ đúng luật',
    tip: '妥善保存 là bảo quản lưu trữ cẩn thận.',
  },
];

const ZH_FINANCE_STATEMENT_PREFIXES = [
  { zh: '在月度财务复盘会上，', viPhonetics: 'Chai duyê tu chải u phu phán huây sang, ', viMeaning: 'Trong buổi họp rà soát tài chính hàng tháng, ', intonation: '↘ Giọng báo cáo chuyên nghiệp' },
  { zh: '从企业财务合规的角度来看，', viPhonetics: 'Trúng chỉ diê chải u hứa cuây tợ chẻo tu lái khan, ', viMeaning: 'Xét trên góc độ tuân thủ tài chính doanh nghiệp, ', intonation: '↘ Phân tích chuẩn mực' },
  { zh: '为了严格遵守越南财税法规，', viPhonetics: 'Uây lơ dén cứa truẩn sâu Duyê Nán chải suây phả cuây, ', viMeaning: 'Để tuân thủ chặt chẽ quy định tài chính thuế Việt Nam, ', intonation: '↘ Trang trọng, nhấn mạnh tuân thủ' },
  { zh: '在提交季度财务报表之前，', viPhonetics: 'Chai thí cheo chi tu chải u pao piểu trư chén, ', viMeaning: 'Trước khi nộp báo cáo tài chính quý, ', intonation: '↘ Cẩn trọng kiểm tra số liệu' },
  { zh: '根据财务总监的最新指示，', viPhonetics: 'Cân chuy chải u tủng chiên tợ chuây xin trử sư, ', viMeaning: 'Theo chỉ đạo mới nhất của Giám đốc Tài chính, ', intonation: '↘ Truyền đạt rõ ràng' },
  { zh: '在今天的预算规划会议上，', viPhonetics: 'Chai chin then tợ duy xoan cuây hoa huây di sang, ', viMeaning: 'Trong cuộc họp lập kế hoạch ngân sách hôm nay, ', intonation: '↘ Trình bày mạch lạc' },
  { zh: '为了优化现金流并控制财务风险，', viPhonetics: 'Uây lơ dâu hoa xiên chin liểu binh khung trư chải u phâng xẻn, ', viMeaning: 'Nhằm tối ưu dòng tiền và kiểm soát rủi ro tài chính, ', intonation: '↘ Nhấn mạnh mục tiêu quản trị' },
  { zh: '顺便提醒一下财务团队的同事，', viPhonetics: 'Xoan piên thí xỉnh di xà chải u thoán tuây tợ thúng sư, ', viMeaning: 'Nhắc nhẹ một chút với anh chị em đội ngũ tài chính, ', intonation: '↘ Thân thiện, phối hợp nội bộ' },
  { zh: '完成银行对账核查之后，', viPhonetics: 'Oán trấng dính háng tuây trang hứa trá trư hâu, ', viMeaning: 'Sau khi hoàn tất kiểm tra đối chiếu ngân hàng, ', intonation: '↘ Cập nhật tiến độ công việc' },
];

const ZH_FINANCE_QUESTION_PREFIXES = [
  { zh: '请问一下，为了完善会计档案，', viPhonetics: 'Chỉnh oân di xà, uây lơ oán san khoai chi tảng an, ', viMeaning: 'Xin hỏi một chút, để hoàn thiện hồ sơ kế toán, ', intonation: '↗ Hỏi thăm lịch sự' },
  { zh: '在正式完成月底关账之前，', viPhonetics: 'Chai trâng sư oán trấng duyê tỉ quan trang trư chén, ', viMeaning: 'Trước khi chính thức khóa sổ cuối tháng, ', intonation: '↗ Lên giọng kiểm tra lại' },
  { zh: '针对越南税务稽查清单，', viPhonetics: 'Trân tuây Duyê Nán suây u chi trá ching đan, ', viMeaning: 'Đối với danh mục kiểm tra thuế tại Việt Nam, ', intonation: '↗ Xác minh chi tiết' },
  { zh: '为了准备明天早上的财务简报，', viPhonetics: 'Uây lơ truẩn pây mính then tảo sang tợ chải u chiển pao, ', viMeaning: 'Để chuẩn bị cho buổi báo cáo tài chính sáng mai, ', intonation: '↗ Chủ động trao đổi' },
  { zh: '资金管理部门想确认一下：', viPhonetics: 'Tư chin quản lỉ bu mấn xẻng chuê rấn di xà: ', viMeaning: 'Bộ phận ngân quỹ muốn xác nhận một chút: ', intonation: '↗ Trao đổi nhanh giữa các bộ phận' },
  { zh: '为了确保账实完全相符，', viPhonetics: 'Uây lơ chuê pảo trang sử oán choán xeng phú, ', viMeaning: 'Để đảm bảo sổ sách và thực tế khớp hoàn toàn, ', intonation: '↗ Cẩn trọng đối chiếu' },
  { zh: '在复核本季度资产负债表时，', viPhonetics: 'Chai phu hứa pển chi tu tư trản phu chai piểu sử, ', viMeaning: 'Khi rà soát bảng cân đối kế toán quý này, ', intonation: '↗ Đặt câu hỏi thảo luận' },
  { zh: '为了保障与合作伙伴的账目透明，', viPhonetics: 'Uây lơ pảo trang dủ hứa trua huổ pan tợ trang mu thâu mính, ', viMeaning: 'Để đảm bảo minh bạch sổ sách với đối tác, ', intonation: '↗ Lịch sự, chuyên nghiệp' },
  { zh: '在处理这批供应商付款时，', viPhonetics: 'Chai chủ lỉ chưa phi cung ding sang phu khoản sử, ', viMeaning: 'Khi xử lý đợt thanh toán nhà cung cấp này, ', intonation: '↗ Xác nhận chứng từ' },
];

export function getFinanceChineseSentence(index: number): PracticeItem {
  const seed = FINANCE_ZH_SEEDS[(index - 1) % FINANCE_ZH_SEEDS.length];
  const cycle = Math.floor((index - 1) / FINANCE_ZH_SEEDS.length);
  const id = `zh-kinh-t-t-i-ch-nh-k-to-n-${index}`;

  if (cycle === 0) {
    return {
      id,
      language: 'zh',
      category: 'Kinh tế, tài chính, kế toán',
      original: seed.original,
      phoneticsVi: seed.phoneticsVi,
      meaningVi: seed.meaningVi,
      intonation: seed.intonation,
      tip: seed.tip,
    };
  }

  const prefixes = seed.isQuestion ? ZH_FINANCE_QUESTION_PREFIXES : ZH_FINANCE_STATEMENT_PREFIXES;
  const mod = prefixes[(cycle - 1) % prefixes.length];
  const lowerMeaning = seed.meaningVi.charAt(0).toLowerCase() + seed.meaningVi.slice(1);
  const lowerPhonetics = seed.phoneticsVi.charAt(0).toLowerCase() + seed.phoneticsVi.slice(1);

  return {
    id,
    language: 'zh',
    category: 'Kinh tế, tài chính, kế toán',
    original: `${mod.zh}${seed.original}`,
    phoneticsVi: `${mod.viPhonetics}${lowerPhonetics}`,
    meaningVi: `${mod.viMeaning}${lowerMeaning}`,
    intonation: mod.intonation,
    tip: `${seed.tip} Đọc rõ thanh điệu khi trao đổi công việc tài chính.`,
  };
}

export const FINANCE_KHMER_SEEDS: FinanceSeed[] = [
  {
    original: 'សូមចេញវិក្កយបត្រអាករលើតម្លៃបន្ថែមសម្រាប់ការទូទាត់នេះ។',
    phoneticsVi: 'Xum chênh vịt-cơ-dơ-bắt a-co lơ tơm-lay bơn-them xơm-rắp ca thu-thoát nít.',
    meaningVi: 'Vui lòng xuất hóa đơn thuế giá trị gia tăng (VAT) cho khoản thanh toán này.',
    intonation: '↘ Lịch sự yêu cầu chứng từ',
    tip: 'វិក្កយបត្រ (vikkeuyobat) là hóa đơn.',
  },
  {
    original: 'យើងត្រូវផ្ទៀងផ្ទាត់របាយការណ៍ធនាគារមុនថ្ងៃទី ៥ នៃខែនីមួយៗ។',
    phoneticsVi: 'Yơng t-râu ph-tiêng ph-toát rơ-bai-ka thô-niê-kia mun th-ngay ti 5 nây khe ni-muôi muôi.',
    meaningVi: 'Chúng ta cần đối chiếu sao kê ngân hàng trước ngày mùng 5 hàng tháng.',
    intonation: '↘ Nhấn mạnh thời hạn đối chiếu',
    tip: 'ធនាគារ (thoneakear) là ngân hàng.',
  },
  {
    original: 'តើអត្រាប្តូរប្រាក់ថ្ងៃនេះសម្រាប់ដុល្លារ និងដុងប៉ុន្មាន?',
    phoneticsVi: 'Tơ ắt-t-ra p-đô p-rắc th-ngay nít xơm-rắp đô-la nưng đồng pon-man?',
    meaningVi: 'Tỷ giá hối đoái hôm nay giữa Đô la và Đồng Việt Nam là bao nhiêu?',
    intonation: '↘ Xuống giọng ở từ hỏi pon-man',
    tip: 'អត្រាប្តូរប្រាក់ là tỷ giá ngoại tệ.',
  },
  {
    original: 'សូមផ្ញើរបាយការណ៍ហិរញ្ញវត្ថុប្រចាំត្រីមាសមកខ្ញុំតាមអ៊ីមែល។',
    phoneticsVi: 'Xum ph-nhơ rơ-bai-ka hê-ranh-vắt-thu p-rơ-chăm t-rây-miê-s mọc kh-nhom tam i-meo.',
    meaningVi: 'Vui lòng gửi báo cáo tài chính hàng quý cho tôi qua email.',
    intonation: '↘ Lịch thiệp, chuyên nghiệp',
    tip: 'ហិរញ្ញវត្ថុ (heranhvatthu) là tài chính.',
  },
  {
    original: 'ផ្នែកគណនេយ្យកំពុងបិទបញ្ជីប្រចាំខែ និងពិនិត្យសមតុល្យ។',
    phoneticsVi: 'Ph-nec cơ-nơ-nây côm-pung bật bơn-chi p-rơ-chăm khe nưng pi-nít xơ-mơ-tôl.',
    meaningVi: 'Bộ phận kế toán đang khóa sổ hàng tháng và kiểm tra số dư cân đối.',
    intonation: '↘ Thông báo tiến độ khóa sổ',
    tip: 'គណនេយ្យ (kononey) là kế toán.',
  },
  {
    original: 'តើយើងអាចបង់ប្រាក់តាមការផ្ទេរប្រាក់ធនាគារក្នុងរយៈពេល ៣០ ថ្ងៃបានទេ?',
    phoneticsVi: 'Tơ yơng át bông p-rắc tam ca ph-tê p-rắc thô-niê-kia kh-nong rơ-dặc pêl 30 th-ngay ban tê? ↗',
    meaningVi: 'Chúng tôi có thể thanh toán qua chuyển khoản ngân hàng trong vòng 30 ngày không?',
    intonation: '↗ Lên giọng đàm phán công nợ',
    tip: 'ផ្ទេរប្រាក់ là chuyển khoản tiền.',
  },
  {
    original: 'កំណើនសេដ្ឋកិច្ច និងលំហូរសាច់ប្រាក់របស់ក្រុមហ៊ុនមានភាពល្អប្រសើរ។',
    phoneticsVi: 'Cơm-nơn xết-thơ-kếch nưng lum-hô xách p-rắc rơ-bóh c-rum-hun miên phiếp lo-o p-rơ-xơ.',
    meaningVi: 'Tăng trưởng kinh tế và dòng tiền của công ty đang ở trạng thái rất tích cực.',
    intonation: '↘ Tự tin trình bày kết quả',
    tip: 'សេដ្ឋកិច្ច là kinh tế, លំហូរសាច់ប្រាក់ là dòng tiền.',
  },
  {
    original: 'សូមពិនិត្យលេខកូដពន្ធ និងអាសយដ្ឋានក្រុមហ៊ុនឱ្យបានត្រឹមត្រូវ។',
    phoneticsVi: 'Xum pi-nít lếch-cốt pôn nưng a-xay-đơ-than c-rum-hun oi ban t-râm t-râu.',
    meaningVi: 'Vui lòng kiểm tra mã số thuế và địa chỉ công ty cho thật chính xác.',
    intonation: '↘ Cẩn trọng xác minh chứng từ thuế',
    tip: 'ពន្ធ (pon) là thuế.',
  },
  {
    original: 'យើងត្រូវគ្រប់គ្រងថវិកាចំណាយ និងបង្កើនប្រាក់ចំណេញសុទ្ធ។',
    phoneticsVi: 'Yơng t-râu c-rúp c-roang thăk-vi-ka chơm-nai nưng bông-cơn p-rắc chơm-nênh xốt.',
    meaningVi: 'Chúng ta cần kiểm soát ngân sách chi tiêu và gia tăng lợi nhuận ròng.',
    intonation: '↘ Dứt khoát về mục tiêu tài chính',
    tip: 'ប្រាក់ចំណេញ là lợi nhuận.',
  },
  {
    original: 'សូមភ្ជាប់បង្កាន់ដៃទទួលប្រាក់ និងកិច្ចសន្យាទាំងអស់នៅទីនេះ។',
    phoneticsVi: 'Xum ph-choáp bông-kăn-đay tơ-tuôl p-rắc nưng kếch xoan-nha teăng óh nâu ti nít.',
    meaningVi: 'Vui lòng đính kèm toàn bộ biên lai thu tiền và hợp đồng tại đây.',
    intonation: '↘ Hướng dẫn hoàn thiện hồ sơ',
    tip: 'កិច្ចសន្យា là hợp đồng kinh tế.',
  },
];

export const FINANCE_LAO_SEEDS: FinanceSeed[] = [
  {
    original: 'ກະລຸນາອອກໃບເກັບເງິນອາກອນມູນຄ່າເພີ່ມສຳລັບການຊຳລະນີ້.',
    phoneticsVi: 'Ca-lu-na oọc bay kép ngân a-con mun-kha phờm xăm-lắp can xăm-lăk ni.',
    meaningVi: 'Vui lòng xuất hóa đơn thuế giá trị gia tăng (VAT) cho khoản thanh toán này.',
    intonation: '↘ Lịch sự yêu cầu hóa đơn',
    tip: 'ໃບເກັບເງິນ là hóa đơn thanh toán.',
  },
  {
    original: 'ພວກເຮົາຕ້ອງກວດສອບລາຍການທະນາຄານກ່ອນວັນທີ 5 ຂອງທຸກເດືອນ.',
    phoneticsVi: 'Phuộc hau tọng cuột xọp lai-can thă-na-khan còn oăn-thi 5 khỏng thúc đơn.',
    meaningVi: 'Chúng ta cần đối chiếu sao kê ngân hàng trước ngày mùng 5 hàng tháng.',
    intonation: '↘ Nhấn mạnh thời hạn đối chiếu',
    tip: 'ທະນາຄານ là ngân hàng.',
  },
  {
    original: 'ອັດຕາແລກປ່ຽນເງິນໂດລາ ແລະ ເງິນດົງມື້ນີ້ແມ່ນເທົ່າໃດ?',
    phoneticsVi: 'Ắt-ta lẹc-piên ngân đô-la lé ngân đồng mự ni mèn thau-đai?',
    meaningVi: 'Tỷ giá quy đổi giữa Đô la và Đồng Việt Nam hôm nay là bao nhiêu?',
    intonation: '↘ Xuống giọng ở từ hỏi thau-đai',
    tip: 'ອັດຕາແລກປ່ຽນ là tỷ giá ngoại tệ.',
  },
  {
    original: 'ກະລຸນາສົ່ງບົດລາຍງານການເງິນປະຈຳໄຕມາດໃຫ້ຂ້ອຍທາງອີເມວ.',
    phoneticsVi: 'Ca-lu-na xồng bốt lai-ngan can-ngân pa-chăm tay-mát hạy khọi thang i-meo.',
    meaningVi: 'Vui lòng gửi báo cáo tài chính hàng quý cho tôi qua email.',
    intonation: '↘ Lịch thiệp trong công việc',
    tip: 'ການເງິນ là tài chính.',
  },
  {
    original: 'ພະແນກບັນຊີກຳລັງປິດບັນຊີປະຈຳເດືອນ ແລະ ກວດສອບຍອດເຫຼືອ.',
    phoneticsVi: 'Phă-nẹc băn-xi căm-lăng pít băn-xi pa-chăm đơn lé cuột xọp nhọt lưa.',
    meaningVi: 'Phòng kế toán đang khóa sổ hàng tháng và kiểm tra số dư.',
    intonation: '↘ Thông báo tiến độ khóa sổ',
    tip: 'ບັນຊີ là kế toán / tài khoản.',
  },
  {
    original: 'ພວກເຮົາສາມາດຊຳລະຜ່ານການໂອນເງິນທະນາຄານພາຍໃນ 30 ວັນໄດ້ບໍ່?',
    phoneticsVi: 'Phuộc hau xả-mát xăm-lăk phàn can ôn ngân thă-na-khan phai-nay 30 oăn đai bo? ↗',
    meaningVi: 'Chúng tôi có thể thanh toán chuyển khoản ngân hàng trong vòng 30 ngày không?',
    intonation: '↗ Lên giọng đàm phán công nợ',
    tip: 'ໂອນເງິນ là chuyển khoản tiền.',
  },
  {
    original: 'ການເຕີບໂຕທາງເສດຖະກິດ ແລະ ກະແສເງິນສົດຂອງບໍລິສັດມີຄວາມໝັ້ນຄົງ.',
    phoneticsVi: 'Can tớp-tô thang xệt-thă-kít lé ca-xẻ ngân xốt khỏng bo-li-xắt mi khoam măn-không.',
    meaningVi: 'Tăng trưởng kinh tế và dòng tiền của công ty đang rất ổn định.',
    intonation: '↘ Tự tin báo cáo tài chính',
    tip: 'ເສດຖະກິດ là kinh tế.',
  },
  {
    original: 'ກະລຸນາກວດເບິ່ງເລກປະຈຳຕົວຜູ້ເສຍພາສີ ແລະ ທີ່ຢູ່ບໍລິສັດໃຫ້ຖືກຕ້ອງ.',
    phoneticsVi: 'Ca-lu-na cuột bâng lếc pa-chăm-tua phu xia pha-xỉ lé thi-dù bo-li-xắt hạy thức-tọng.',
    meaningVi: 'Vui lòng kiểm tra mã số thuế và địa chỉ công ty cho chính xác.',
    intonation: '↘ Thận trọng kiểm tra thông tin thuế',
    tip: 'ພາສີ là thuế.',
  },
  {
    original: 'ພວກເຮົາຕ້ອງຄວບຄຸມງົບປະມານລາຍຈ່າຍ ແລະ ເພີ່ມກຳໄລສຸດທິ.',
    phoneticsVi: 'Phuộc hau tọng khuốp-khum ngốp-pa-man lai-chài lé phờm căm-lay xút-thi.',
    meaningVi: 'Chúng ta cần kiểm soát ngân sách chi tiêu và gia tăng lợi nhuận ròng.',
    intonation: '↘ Dứt khoát mục tiêu tài chính',
    tip: 'ງົບປະມານ là ngân sách, ກຳໄລ là lợi nhuận.',
  },
  {
    original: 'ກະລຸນາແນບໃບຮັບເງິນ ແລະ ສັນຍາທັງໝົດໃສ່ໃນແຟ້ມເອກະສານນີ້.',
    phoneticsVi: 'Ca-lu-na nẹp bay hắp ngân lé xăn-nha thăng-mốt xày nay phẹm ê-ca-xản ni.',
    meaningVi: 'Vui lòng đính kèm toàn bộ biên lai thu tiền và hợp đồng vào hồ sơ này.',
    intonation: '↘ Hướng dẫn lưu trữ chứng từ',
    tip: 'ສັນຍາ là hợp đồng.',
  },
];

// ============================================================
// CẤU HÌNH API
// ============================================================
const API_CONFIG = {
  baseUrl: "https://api.vilao.ai/v1",
  apiKey: "sk-cab44d8a1592f10c2abaf5c77a87f7845cef7e0aed056b8bc9ffe260e5f202f7",
  model: "gemini-3.8-flash",
};

// ============================================================
// THÔNG TIN DOANH NGHIỆP
// ============================================================
const BUSINESS_INFO = {
  name: "Glow Beauty",
  tagline: "Tỏa sáng theo cách của bạn",
  phone: "0901 234 567",
  email: "hello@glowbeauty.vn",
  address: "123 Nguyễn Huệ, Q.1, TP.HCM",
  hours: "8:00 – 21:00, Thứ 2 – Chủ nhật",
};

// ============================================================
// BỘ KIẾN THỨC FAQ GỐC (Mặc định 10 câu hỏi)
// ============================================================
const DEFAULT_FAQ_DATA = [
  {
    id: 1,
    tags: ["giờ", "mở cửa", "hoạt động", "thời gian", "làm việc"],
    question: "Shop mở cửa lúc mấy giờ?",
    answer:
      "Glow Beauty mở cửa từ 8:00 đến 21:00, tất cả các ngày trong tuần kể cả Thứ 7 và Chủ nhật. Bạn có thể ghé thăm hoặc đặt hàng online bất kỳ lúc nào trong khung giờ đó nhé!",
    related: [2, 3, 9],
  },
  {
    id: 2,
    tags: ["địa chỉ", "cửa hàng", "ở đâu", "vị trí", "địa điểm"],
    question: "Cửa hàng ở đâu?",
    answer:
      "Glow Beauty hiện có 1 cửa hàng chính tại **123 Nguyễn Huệ, Quận 1, TP.HCM**. Ngoài ra bạn có thể mua hàng qua website hoặc Shopee/TikTok Shop của chúng mình với dịch vụ giao hàng toàn quốc.",
    related: [1, 9, 10],
  },
  {
    id: 3,
    tags: ["ship", "giao hàng", "vận chuyển", "nhận hàng", "bao lâu"],
    question: "Giao hàng mất bao lâu?",
    answer:
      "Thời gian giao hàng như sau:\n- **Nội thành TP.HCM:** 2–4 giờ (hỏa tốc) hoặc 1 ngày (tiêu chuẩn)\n- **Các tỉnh thành khác:** 2–4 ngày\n\nĐơn hàng trên 499.000đ được **miễn phí vận chuyển** toàn quốc!",
    related: [4, 5, 8],
  },
  {
    id: 4,
    tags: ["đổi trả", "trả hàng", "hoàn tiền", "lỗi", "đổi", "bảo hành"],
    question: "Chính sách đổi trả như thế nào?",
    answer:
      "Glow Beauty chấp nhận đổi/trả trong vòng **7 ngày** kể từ ngày nhận hàng nếu:\n- Sản phẩm bị lỗi do nhà sản xuất\n- Giao sai sản phẩm so với đơn hàng\n- Sản phẩm còn nguyên seal, chưa qua sử dụng\n\n❌ Không áp dụng đổi trả với lý do đơn giản là không thích hoặc mua nhầm.",
    related: [3, 5, 10],
  },
  {
    id: 5,
    tags: ["thanh toán", "trả tiền", "chuyển khoản", "COD", "momo", "vnpay", "thẻ"],
    question: "Có thể thanh toán bằng cách nào?",
    answer:
      "Glow Beauty hỗ trợ nhiều hình thức thanh toán:\n- 💵 **COD** – thanh toán khi nhận hàng\n- 🏦 **Chuyển khoản ngân hàng**\n- 📱 **MoMo, ZaloPay, VNPay**\n- 💳 **Thẻ tín dụng/ghi nợ** (Visa, Mastercard)\n\nTất cả đều an toàn và được xác nhận ngay lập tức!",
    related: [3, 4, 8],
  },
  {
    id: 6,
    tags: ["sản phẩm", "bán", "có", "loại", "dòng", "mặt hàng"],
    question: "Shop bán những sản phẩm gì?",
    answer:
      "Glow Beauty chuyên cung cấp các dòng sản phẩm:\n- 🧴 **Skincare:** serum, toner, kem dưỡng, mặt nạ\n- 💄 **Makeup:** son, phấn, mascara, kem nền\n- 🧖 **Body care:** sữa tắm, kem dưỡng thể, tẩy tế bào chết\n- 🌿 **Thiên nhiên & organic:** dòng sản phẩm lành tính cho da nhạy cảm\n\nTất cả đều là hàng chính hãng, có tem nhập khẩu rõ ràng.",
    related: [7, 8, 1],
  },
  {
    id: 7,
    tags: ["da", "loại da", "tư vấn", "phù hợp", "chọn", "dầu", "khô", "nhạy cảm", "mụn"],
    question: "Làm sao biết sản phẩm nào phù hợp với da tôi?",
    answer:
      "Để chọn đúng sản phẩm cho da, bạn cần xác định loại da trước:\n- **Da dầu/hỗn hợp:** ưu tiên sản phẩm oil-free, không cồn\n- **Da khô:** cần sản phẩm có độ ẩm cao, chứa hyaluronic acid\n- **Da nhạy cảm/mụn:** dùng dòng gentle, không fragrance, có niacinamide\n\nBạn có thể **chat với mình để được tư vấn chi tiết hơn** hoặc đặt lịch gặp chuyên gia da liễu của chúng mình!",
    related: [6, 8, 9],
  },
  {
    id: 8,
    tags: ["giảm giá", "khuyến mãi", "sale", "voucher", "coupon", "ưu đãi", "discount"],
    question: "Có chương trình khuyến mãi nào không?",
    answer:
      "Glow Beauty có nhiều ưu đãi thường xuyên:\n- 🎁 **Thành viên mới:** giảm 15% đơn đầu tiên\n- 💎 **Thành viên VIP:** tích điểm đổi quà, giảm 10–20%\n- 🎉 **Flash sale:** hàng tuần vào Thứ 6 (8pm)\n- 📦 **Mua combo:** tiết kiệm 20–30%\n\nTheo dõi fanpage và Zalo OA **Glow Beauty** để không bỏ lỡ deal nào nhé!",
    related: [5, 6, 3],
  },
  {
    id: 9,
    tags: ["liên hệ", "hotline", "zalo", "facebook", "fanpage", "hỗ trợ", "tư vấn viên"],
    question: "Liên hệ hỗ trợ bằng cách nào?",
    answer:
      "Bạn có thể liên hệ với Glow Beauty qua:\n- 📞 **Hotline:** 0901 234 567 (8:00–21:00)\n- 💬 **Zalo OA:** Glow Beauty\n- 📘 **Facebook:** fb.com/glowbeautyvn\n- 📧 **Email:** hello@glowbeauty.vn\n\nHoặc đơn giản nhất là **chat ngay tại đây** – mình luôn sẵn sàng hỗ trợ!",
    related: [1, 2, 10],
  },
  {
    id: 10,
    tags: ["hàng thật", "chính hãng", "giả", "xuất xứ", "nguồn gốc", "chứng nhận"],
    question: "Sản phẩm có chính hãng không?",
    answer:
      "Glow Beauty cam kết **100% hàng chính hãng**, nhập khẩu chính thống:\n- ✅ Có hóa đơn nhập khẩu, CO/CQ đầy đủ\n- ✅ Tem phụ tiếng Việt theo quy định Bộ Y tế\n- ✅ Hạn sử dụng rõ ràng, còn dài\n- ✅ Có thể tra cứu mã vạch sản phẩm\n\nNếu phát hiện hàng không đúng như cam kết, chúng mình **hoàn tiền 100%** không cần điều kiện.",
    related: [4, 6, 8],
  },
];

// Giữ alias cho tương thích ngược
const FAQ_DATA = DEFAULT_FAQ_DATA;

// ============================================================
// QUẢN LÝ FAQ ĐỘNG (LƯU LOCALSTORAGE)
// ============================================================
function getFAQs() {
  try {
    const stored = localStorage.getItem("glow_faqs");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Lỗi đọc glow_faqs từ localStorage:", e);
  }
  // Nếu chưa có, khởi tạo từ bộ mẫu mặc định
  localStorage.setItem("glow_faqs", JSON.stringify(DEFAULT_FAQ_DATA));
  return DEFAULT_FAQ_DATA;
}

function saveFAQs(faqs) {
  localStorage.setItem("glow_faqs", JSON.stringify(faqs));
}

function resetDefaultFAQs() {
  localStorage.setItem("glow_faqs", JSON.stringify(DEFAULT_FAQ_DATA));
  return DEFAULT_FAQ_DATA;
}

// ============================================================
// HÀM TÌM KIẾM FAQ (DỰA TRÊN DỮ LIỆU ĐỘNG)
// ============================================================
function searchFAQ(query) {
  const q = query.toLowerCase().trim();
  const faqs = getFAQs();
  let bestMatch = null;
  let bestScore = 0;

  for (const faq of faqs) {
    let score = 0;
    const tags = Array.isArray(faq.tags) ? faq.tags : [];

    // Khớp theo tags
    for (const tag of tags) {
      if (q.includes(tag.toLowerCase())) score += 3;
    }

    // Khớp theo câu hỏi
    const questionLower = (faq.question || "").toLowerCase();
    if (q.includes(questionLower) || questionLower.includes(q)) {
      score += 5;
    }

    // Kiểm tra từng từ trong câu hỏi của khách
    const words = q.split(/\s+/);
    for (const word of words) {
      if (word.length < 2) continue;
      for (const tag of tags) {
        if (tag.toLowerCase().includes(word)) score += 1;
      }
      if (questionLower.includes(word)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  return bestScore >= 2 ? bestMatch : null;
}

// Lấy câu hỏi liên quan
function getRelatedQuestions(faqItem) {
  const faqs = getFAQs();
  if (!faqItem) return faqs.slice(0, 3).map((f) => f.question);

  if (Array.isArray(faqItem.related) && faqItem.related.length > 0) {
    const list = faqItem.related
      .map((id) => faqs.find((f) => String(f.id) === String(id)))
      .filter(Boolean)
      .map((f) => f.question);
    if (list.length >= 2) return list.slice(0, 3);
  }

  // Fallback: chọn 3 câu hỏi khác câu hiện tại
  return faqs
    .filter((f) => String(f.id) !== String(faqItem.id))
    .slice(0, 3)
    .map((f) => f.question);
}

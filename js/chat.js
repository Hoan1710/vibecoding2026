// ============================================================
// CHAT ENGINE – Glow Beauty Chatbot
// ============================================================

// ----- State -----
let chatHistory = []; // Lưu lịch sử hội thoại để gửi lên AI
let isTyping = false;
let chatInitialized = false;

// ----- DOM refs -----
const chatFab = document.getElementById("chat-fab");
const chatWindow = document.getElementById("chat-window");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const closeChatBtn = document.getElementById("close-chat");
const bookingModal = document.getElementById("booking-modal");

// ============================================================
// MỞ / ĐÓNG CHAT
// ============================================================
function toggleChat(forceOpen) {
  if (typeof forceOpen === "boolean") {
    chatWindow.classList.toggle("hidden", !forceOpen);
  } else {
    chatWindow.classList.toggle("hidden");
  }

  const isOpen = !chatWindow.classList.contains("hidden");
  if (isOpen) {
    chatFab.querySelector(".badge")?.remove();
    if (!chatInitialized) {
      chatInitialized = true;
      setTimeout(() => {
        addBotMessage(
          `Xin chào! 👋 Mình là **Glow AI** – trợ lý ảo của **Glow Beauty**.\n\nMình có thể giúp bạn:\n- Tư vấn sản phẩm skincare & makeup\n- Giải đáp thắc mắc về đơn hàng, giao hàng\n- Đặt lịch tư vấn với chuyên gia\n\nBạn cần hỏi gì nào? ✨`,
          [
            "Shop mở cửa lúc mấy giờ?",
            "Làm sao biết sản phẩm phù hợp với da tôi?",
            "Có chương trình khuyến mãi không?",
          ]
        );
      }, 300);
    }
    chatInput?.focus();
  }
}

function openChat() {
  toggleChat(true);
}

function closeChat() {
  toggleChat(false);
}

if (chatFab) {
  chatFab.onclick = (e) => {
    e.stopPropagation();
    toggleChat();
  };
}
if (closeChatBtn) {
  closeChatBtn.onclick = (e) => {
    e.stopPropagation();
    closeChat();
  };
}

// ============================================================
// GỬI TIN NHẮN
// ============================================================
async function sendMessage(text) {
  const msg = (text || chatInput?.value || "").trim();
  if (!msg || isTyping) return;

  if (chatInput) chatInput.value = "";
  addUserMessage(msg);

  // Ẩn starter chips sau lần nhắn đầu
  document.querySelector(".starter-chips")?.remove();

  await processMessage(msg);
}

// Lắng nghe nút gửi & Enter
if (sendBtn) sendBtn.addEventListener("click", () => sendMessage());
if (chatInput) {
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  // Auto-resize textarea
  chatInput.addEventListener("input", () => {
    chatInput.style.height = "42px";
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + "px";
  });
}

// ============================================================
// XỬ LÝ TIN NHẮN (STREAMING & GIẢM LATENCY)
// ============================================================
async function processMessage(userMsg) {
  isTyping = true;
  if (sendBtn) sendBtn.disabled = true;

  // 1. Tìm FAQ matching trước
  const faqMatch = searchFAQ(userMsg);

  if (faqMatch) {
    // Có FAQ: Khởi tạo bubble streaming ngay lập tức
    const botStream = createStreamingBotMessage();
    const relatedQ = getRelatedQuestions(faqMatch);

    let streamedText = "";
    try {
      const systemPrompt = `Bạn là Glow AI của Glow Beauty. Diễn đạt lại câu trả lời FAQ một cách tự nhiên, thân thiện (tiếng Việt), ngắn gọn, đúng sự thật, không bịa giá/thông tin.`;
      const prompt = `Khách hỏi: "${userMsg}"\nNội dung trả lời: ${faqMatch.answer}`;

      const aiText = await callStreamAPI(
        [
          { role: "system", content: systemPrompt },
          ...chatHistory.slice(-2),
          { role: "user", content: prompt },
        ],
        (chunkText) => {
          streamedText = chunkText;
          botStream.update(chunkText);
        },
        180
      );

      const finalText = aiText || streamedText || faqMatch.answer;
      botStream.complete(finalText, relatedQ, false);

      chatHistory.push(
        { role: "user", content: userMsg },
        { role: "assistant", content: finalText }
      );
    } catch (err) {
      console.warn("Stream error, falling back to instant answer:", err);
      botStream.complete(faqMatch.answer, relatedQ, false);
      chatHistory.push(
        { role: "user", content: userMsg },
        { role: "assistant", content: faqMatch.answer }
      );
    }
  } else {
    // Không có trong FAQ: Gọi AI fallback
    const botStream = createStreamingBotMessage();

    try {
      const systemPrompt = `Bạn là Glow AI, trợ lý shop Glow Beauty (123 Nguyễn Huệ Q1 TP.HCM, hotline 0901 234 567, mở 8:00-21:00). Tư vấn ngắn gọn, thân thiện bằng tiếng Việt. Nếu vấn đề da phức tạp cần bác sĩ/chuyên gia tư vấn kỹ thì nhắc khách đặt lịch hẹn.`;

      let streamedText = "";
      const aiText = await callStreamAPI(
        [
          { role: "system", content: systemPrompt },
          ...chatHistory.slice(-2),
          { role: "user", content: userMsg },
        ],
        (chunkText) => {
          streamedText = chunkText;
          botStream.update(chunkText);
        },
        200
      );

      const finalText = aiText || streamedText || "";
      const lower = finalText.toLowerCase();
      const needBooking =
        lower.includes("đặt lịch") ||
        lower.includes("chuyên gia") ||
        lower.includes("bác sĩ") ||
        lower.includes("tư vấn trực tiếp");

      const relatedQ = getRelatedQuestions(null);
      botStream.complete(finalText, relatedQ, needBooking);

      chatHistory.push(
        { role: "user", content: userMsg },
        { role: "assistant", content: finalText }
      );
    } catch (err) {
      console.error("AI fallback error:", err);
      botStream.complete(
        `Dạ mình là Glow AI. Câu hỏi của bạn có thể cần tư vấn trực tiếp từ chuyên viên Glow Beauty. Bạn có thể đặt lịch hẹn tư vấn miễn phí ngay bên dưới nhé! 😊`,
        null,
        true
      );
    }
  }

  isTyping = false;
  if (sendBtn) sendBtn.disabled = false;
}

// ============================================================
// HÀM GỌI STREAMING API (SSE) - TỐI ƯU TỐC ĐỘ & TTFT
// ============================================================
async function callStreamAPI(messages, onChunk, maxTokens = 180) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000); // 9s timeout

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: API_CONFIG.model,
        messages: messages,
        max_tokens: maxTokens,
        temperature: 0.6,
        stream: true,
        reasoning_effort: "low",
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error HTTP ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let accumulatedText = "";
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(":")) continue;
        if (trimmed === "data: [DONE]") break;

        if (trimmed.startsWith("data: ")) {
          try {
            const parsed = JSON.parse(trimmed.slice(6));
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              accumulatedText += delta;
              if (onChunk) onChunk(accumulatedText);
            }
          } catch (_) {
            // bỏ qua chunk JSON chưa hoàn chỉnh
          }
        }
      }
    }

    return accumulatedText.trim();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// ============================================================
// BUBBLE TIN NHẮN STREAMING (HIỂN THỊ CHỮ TỪNG KÝ TỰ REAL-TIME)
// ============================================================
function createStreamingBotMessage() {
  const time = getTime();
  const el = document.createElement("div");
  el.className = "msg bot";
  el.innerHTML = `
    <div class="msg-avatar">✨</div>
    <div class="msg-content">
      <div class="msg-bubble">
        <div class="typing-indicator" style="padding: 2px 4px; border: none; background: transparent; width: auto;">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
      <div class="bot-extra"></div>
      <div class="msg-time">${time}</div>
    </div>`;

  chatMessages.appendChild(el);
  scrollToBottom();

  const bubble = el.querySelector(".msg-bubble");
  const extra = el.querySelector(".bot-extra");

  return {
    update(text) {
      bubble.innerHTML = markdownToHtml(text);
      scrollToBottom();
    },
    complete(finalText, relatedQuestions = null, showBookingBtn = false) {
      bubble.innerHTML = markdownToHtml(finalText);

      let relatedHtml = "";
      if (relatedQuestions && relatedQuestions.length > 0) {
        const buttons = relatedQuestions
          .map(
            (q) =>
              `<button class="related-btn" onclick="sendMessage('${escapeAttr(q)}')">${escapeHtml(q)}</button>`
          )
          .join("");
        relatedHtml = `
          <div class="related-questions">
            <label>💡 Bạn có thể hỏi thêm</label>
            ${buttons}
          </div>`;
      }

      let bookingHtml = "";
      if (showBookingBtn) {
        bookingHtml = `
          <div class="booking-suggestion">
            <p>📅 Đặt lịch tư vấn miễn phí với chuyên gia của chúng mình!</p>
            <button class="btn btn-primary" onclick="openBookingModal()">
              🗓️ Đặt lịch ngay
            </button>
          </div>`;
      }

      extra.innerHTML = relatedHtml + bookingHtml;
      scrollToBottom();
    },
    remove() {
      el.remove();
    },
  };
}

// ============================================================
// RENDER TIN NHẮN
// ============================================================
function addUserMessage(text) {
  const time = getTime();
  const el = document.createElement("div");
  el.className = "msg user";
  el.innerHTML = `
    <div class="msg-avatar">👤</div>
    <div class="msg-content">
      <div class="msg-bubble">${escapeHtml(text)}</div>
      <div class="msg-time">${time}</div>
    </div>`;
  chatMessages.appendChild(el);
  scrollToBottom();
}

function addBotMessage(text, relatedQuestions = null, showBookingBtn = false) {
  const time = getTime();
  const el = document.createElement("div");
  el.className = "msg bot";

  let relatedHtml = "";
  if (relatedQuestions && relatedQuestions.length > 0) {
    const buttons = relatedQuestions
      .map((q) => `<button class="related-btn" onclick="sendMessage('${escapeAttr(q)}')">${escapeHtml(q)}</button>`)
      .join("");
    relatedHtml = `
      <div class="related-questions">
        <label>💡 Bạn có thể hỏi thêm</label>
        ${buttons}
      </div>`;
  }

  let bookingHtml = "";
  if (showBookingBtn) {
    bookingHtml = `
      <div class="booking-suggestion">
        <p>📅 Đặt lịch tư vấn miễn phí với chuyên gia của chúng mình!</p>
        <button class="btn btn-primary" onclick="openBookingModal()">
          🗓️ Đặt lịch ngay
        </button>
      </div>`;
  }

  el.innerHTML = `
    <div class="msg-avatar">✨</div>
    <div class="msg-content">
      <div class="msg-bubble">${markdownToHtml(text)}</div>
      ${relatedHtml}
      ${bookingHtml}
      <div class="msg-time">${time}</div>
    </div>`;

  chatMessages.appendChild(el);
  scrollToBottom();
}

// ============================================================
// TYPING INDICATOR
// ============================================================
let typingEl = null;

function showTyping() {
  isTyping = true;
  if (sendBtn) sendBtn.disabled = true;

  typingEl = document.createElement("div");
  typingEl.className = "msg bot";
  typingEl.id = "typing-msg";
  typingEl.innerHTML = `
    <div class="msg-avatar">✨</div>
    <div class="msg-content">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>`;
  chatMessages.appendChild(typingEl);
  scrollToBottom();
}

function hideTyping() {
  isTyping = false;
  if (sendBtn) sendBtn.disabled = false;
  typingEl?.remove();
  typingEl = null;
}

// ============================================================
// BOOKING MODAL
// ============================================================
function openBookingModal() {
  if (bookingModal) {
    bookingModal.classList.remove("hidden");
    // Set min date = today
    const dateInput = document.getElementById("booking-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
    }
  }
}

function closeBookingModal() {
  if (bookingModal) bookingModal.classList.add("hidden");
}

// Đóng khi click nền
bookingModal?.addEventListener("click", (e) => {
  if (e.target === bookingModal) closeBookingModal();
});

// Xử lý submit form đặt lịch
const bookingForm = document.getElementById("booking-form");
bookingForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBooking();
});

function submitBooking() {
  // Lấy dữ liệu form
  const name = document.getElementById("booking-name")?.value.trim();
  const phone = document.getElementById("booking-phone")?.value.trim();
  const date = document.getElementById("booking-date")?.value;
  const time = document.getElementById("booking-time")?.value;
  const topic = document.getElementById("booking-topic")?.value.trim();

  // Validate
  let valid = true;

  if (!name || name.length < 2) {
    showFieldError("name-error", "Vui lòng nhập họ tên (ít nhất 2 ký tự)");
    valid = false;
  } else hideFieldError("name-error");

  const phoneRegex = /^(0|\+84)[0-9]{9}$/;
  if (!phone || !phoneRegex.test(phone)) {
    showFieldError("phone-error", "Số điện thoại không hợp lệ (VD: 0901234567)");
    valid = false;
  } else hideFieldError("phone-error");

  if (!date) {
    showFieldError("date-error", "Vui lòng chọn ngày");
    valid = false;
  } else {
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      showFieldError("date-error", "Không thể đặt lịch trong quá khứ");
      valid = false;
    } else hideFieldError("date-error");
  }

  if (!time) {
    showFieldError("time-error", "Vui lòng chọn giờ");
    valid = false;
  } else hideFieldError("time-error");

  if (!valid) return;

  // Lưu vào localStorage
  const booking = {
    id: Date.now().toString(),
    name,
    phone,
    date,
    time,
    topic: topic || "Tư vấn chung",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const bookings = JSON.parse(localStorage.getItem("glow_bookings") || "[]");
  bookings.unshift(booking);
  localStorage.setItem("glow_bookings", JSON.stringify(bookings));

  // Đóng modal, reset form
  closeBookingModal();
  bookingForm.reset();

  // Hiển thị toast thành công
  showToast(`🎉 Đặt lịch thành công! Glow Beauty sẽ liên hệ xác nhận trong 30 phút.`, "success");

  // Gửi tin nhắn xác nhận vào chat
  setTimeout(() => {
    addBotMessage(
      `✅ **Đặt lịch thành công!**\n\nMình đã ghi nhận lịch hẹn của bạn:\n- 👤 **Tên:** ${name}\n- 📞 **SĐT:** ${phone}\n- 📅 **Ngày:** ${formatDate(date)}\n- ⏰ **Giờ:** ${time}\n- 💬 **Nội dung:** ${topic || "Tư vấn chung"}\n\nGlow Beauty sẽ gọi xác nhận trong vòng **30 phút**. Hẹn gặp bạn! 🌸`,
      ["Có chương trình khuyến mãi không?", "Shop ở đâu?", "Sản phẩm có chính hãng không?"]
    );
  }, 500);
}

// ============================================================
// HELPERS
// ============================================================
function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = msg;
    el.classList.add("show");
  }
}

function hideFieldError(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("show");
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getTime() {
  return new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  return String(str).replace(/'/g, "\\'");
}

// Markdown cơ bản → HTML (bold, newline, list)
function markdownToHtml(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n- /g, "\n• ")
    .replace(/\n/g, "<br>");
}

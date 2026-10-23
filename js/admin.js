// ============================================================
// ADMIN DASHBOARD – Glow Beauty
// ============================================================

// ----- Constants -----
const STATUS_LABELS = {
  pending: { label: "Chờ xác nhận", cls: "badge-pending" },
  confirmed: { label: "Đã xác nhận", cls: "badge-confirmed" },
  done: { label: "Hoàn thành", cls: "badge-done" },
  cancelled: { label: "Đã hủy", cls: "badge-cancelled" },
};

// ----- State -----
let currentFilter = "all";
let currentSearch = "";

// ============================================================
// LOAD & RENDER LỊCH HẸN
// ============================================================
function loadBookings() {
  return JSON.parse(localStorage.getItem("glow_bookings") || "[]");
}

function saveBookings(bookings) {
  localStorage.setItem("glow_bookings", JSON.stringify(bookings));
}

function renderBookingsTable() {
  const bookings = loadBookings();
  const tbody = document.getElementById("bookings-tbody");
  const emptyState = document.getElementById("bookings-empty");
  const countEl = document.getElementById("bookings-count");
  const totalEl = document.getElementById("stat-total");
  const pendingEl = document.getElementById("stat-pending");
  const doneEl = document.getElementById("stat-done");

  // Cập nhật stats
  if (totalEl) totalEl.textContent = bookings.length;
  if (pendingEl) pendingEl.textContent = bookings.filter((b) => b.status === "pending").length;
  if (doneEl) doneEl.textContent = bookings.filter((b) => b.status === "done").length;

  // Filter
  let filtered = bookings;
  if (currentFilter !== "all") {
    filtered = filtered.filter((b) => b.status === currentFilter);
  }
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        (b.topic || "").toLowerCase().includes(q)
    );
  }

  if (countEl) countEl.textContent = filtered.length;

  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }
  if (emptyState) emptyState.classList.add("hidden");

  tbody.innerHTML = filtered
    .map(
      (b, idx) => `
    <tr>
      <td><span style="color:var(--text-muted);font-size:12px;">#${String(bookings.indexOf(b) + 1).padStart(3, "0")}</span></td>
      <td>
        <div style="font-weight:600;">${escapeHtml(b.name)}</div>
        <div style="font-size:12px;color:var(--text-muted);">${b.phone}</div>
      </td>
      <td>
        <div style="font-weight:500;">${formatDate(b.date)}</div>
        <div style="font-size:12px;color:var(--text-muted);">${b.time}</div>
      </td>
      <td style="max-width:200px;">
        <div style="font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(b.topic || "Tư vấn chung")}</div>
      </td>
      <td>
        <select class="filter-select" style="padding:5px 8px;font-size:12px;" onchange="updateStatus('${b.id}', this.value)">
          ${Object.entries(STATUS_LABELS)
            .map(([val, { label }]) => `<option value="${val}" ${b.status === val ? "selected" : ""}>${label}</option>`)
            .join("")}
        </select>
      </td>
      <td>
        <div style="font-size:11px;color:var(--text-muted);">${formatDateTime(b.createdAt)}</div>
      </td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteBooking('${b.id}')">🗑️ Xóa</button>
      </td>
    </tr>`
    )
    .join("");
}

// ============================================================
// CẬP NHẬT TRẠNG THÁI
// ============================================================
function updateStatus(id, newStatus) {
  const bookings = loadBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return;
  bookings[idx].status = newStatus;
  saveBookings(bookings);
  renderBookingsTable();
  showAdminToast(`✅ Đã cập nhật trạng thái: ${STATUS_LABELS[newStatus]?.label}`, "success");
}

// ============================================================
// XÓA LỊCH HẸN
// ============================================================
function deleteBooking(id) {
  if (!confirm("Bạn có chắc muốn xóa lịch hẹn này không?")) return;
  const bookings = loadBookings().filter((b) => b.id !== id);
  saveBookings(bookings);
  renderBookingsTable();
  showAdminToast("🗑️ Đã xóa lịch hẹn", "success");
}

function deleteAllDone() {
  const bookings = loadBookings();
  const filtered = bookings.filter((b) => b.status !== "done" && b.status !== "cancelled");
  if (filtered.length === bookings.length) {
    showAdminToast("Không có lịch hẹn đã hoàn thành hoặc đã hủy để xóa", "error");
    return;
  }
  if (!confirm(`Xóa tất cả ${bookings.length - filtered.length} lịch đã hoàn thành/hủy?`)) return;
  saveBookings(filtered);
  renderBookingsTable();
  showAdminToast("✅ Đã dọn dẹp lịch hẹn", "success");
}

// ============================================================
// SEARCH & FILTER
// ============================================================
document.getElementById("search-input")?.addEventListener("input", (e) => {
  currentSearch = e.target.value.trim();
  renderBookingsTable();
});

document.getElementById("status-filter")?.addEventListener("change", (e) => {
  currentFilter = e.target.value;
  renderBookingsTable();
});

// ============================================================
// QUẢN LÝ KIẾN THỨC FAQ (THÊM / SỬA / XÓA)
// ============================================================
let currentFAQSearch = "";

function renderFAQList(searchQuery = currentFAQSearch) {
  currentFAQSearch = searchQuery;
  const container = document.getElementById("faq-list");
  const emptyState = document.getElementById("faq-empty");
  const countBadge = document.getElementById("faq-count-badge");
  const statCount = document.getElementById("stat-faq-count");

  const faqs = getFAQs();

  // Cập nhật số lượng
  if (countBadge) countBadge.textContent = faqs.length;
  if (statCount) statCount.textContent = faqs.length;

  if (!container) return;

  // Lọc theo tìm kiếm
  let filtered = faqs;
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = faqs.filter(
      (f) =>
        (f.question || "").toLowerCase().includes(q) ||
        (f.answer || "").toLowerCase().includes(q) ||
        (f.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }
  if (emptyState) emptyState.classList.add("hidden");

  container.innerHTML = filtered
    .map(
      (faq) => `
    <div class="faq-item">
      <div class="faq-q">
        <span style="font-weight:700;font-size:15px;color:var(--text);">❓ ${escapeHtml(faq.question)}</span>
        <div style="display:flex;gap:8px;flex-shrink:0;align-items:center;">
          <span style="font-size:11px;background:rgba(201,110,255,0.12);border:1px solid rgba(201,110,255,0.25);color:var(--primary);padding:3px 8px;border-radius:6px;font-weight:600;">
            ID #${faq.id}
          </span>
          <button class="btn btn-secondary btn-sm" onclick="openFAQModal('${faq.id}')" title="Chỉnh sửa câu hỏi">
            ✏️ Sửa
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteFAQ('${faq.id}')" title="Xóa câu hỏi">
            🗑️ Xóa
          </button>
        </div>
      </div>
      <div class="faq-a" style="-webkit-line-clamp:3;margin:8px 0;line-height:1.6;color:var(--text-soft);font-size:13.5px;">
        ${escapeHtml(faq.answer)}
      </div>
      <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
        <span style="font-size:11px;color:var(--text-muted);margin-right:2px;">Từ khóa:</span>
        ${(faq.tags || [])
          .map(
            (t) =>
              `<span style="font-size:11px;background:var(--bg);border:1px solid var(--border);color:var(--text-muted);padding:2px 8px;border-radius:4px;">#${escapeHtml(t)}</span>`
          )
          .join("")}
      </div>
    </div>`
    )
    .join("");
}

function handleFAQSearch(val) {
  renderFAQList(val);
}

// MỞ MODAL THÊM / SỬA FAQ
function openFAQModal(faqId = null) {
  const modal = document.getElementById("faq-modal");
  const title = document.getElementById("faq-modal-title");
  const submitBtn = document.getElementById("faq-submit-btn");
  const idInput = document.getElementById("faq-id");
  const qInput = document.getElementById("faq-question");
  const tagsInput = document.getElementById("faq-tags");
  const aInput = document.getElementById("faq-answer");

  // Reset errors
  hideFieldError("faq-q-error");
  hideFieldError("faq-tags-error");
  hideFieldError("faq-a-error");

  if (faqId) {
    const faqs = getFAQs();
    const item = faqs.find((f) => String(f.id) === String(faqId));
    if (!item) return;

    if (idInput) idInput.value = item.id;
    if (qInput) qInput.value = item.question;
    if (tagsInput) tagsInput.value = (item.tags || []).join(", ");
    if (aInput) aInput.value = item.answer;

    if (title) title.textContent = "✏️ Chỉnh sửa câu hỏi FAQ";
    if (submitBtn) submitBtn.textContent = "💾 Cập nhật câu hỏi";
  } else {
    document.getElementById("faq-form")?.reset();
    if (idInput) idInput.value = "";
    if (title) title.textContent = "➕ Thêm câu hỏi FAQ mới";
    if (submitBtn) submitBtn.textContent = "💾 Lưu câu hỏi";
  }

  modal?.classList.remove("hidden");
  qInput?.focus();
}

function closeFAQModal() {
  document.getElementById("faq-modal")?.classList.add("hidden");
}

// Đóng modal khi bấm nền
document.getElementById("faq-modal")?.addEventListener("click", (e) => {
  if (e.target === document.getElementById("faq-modal")) closeFAQModal();
});

// LƯU FORM FAQ (THÊM HOẶC CẬP NHẬT)
function handleSaveFAQ(e) {
  e.preventDefault();

  const idVal = document.getElementById("faq-id")?.value;
  const question = document.getElementById("faq-question")?.value.trim();
  const tagsRaw = document.getElementById("faq-tags")?.value.trim();
  const answer = document.getElementById("faq-answer")?.value.trim();

  let valid = true;

  if (!question || question.length < 3) {
    showFieldError("faq-q-error", "Vui lòng nhập câu hỏi rõ ràng (tối thiểu 3 ký tự)");
    valid = false;
  } else hideFieldError("faq-q-error");

  if (!answer || answer.length < 5) {
    showFieldError("faq-a-error", "Vui lòng nhập câu trả lời chi tiết (tối thiểu 5 ký tự)");
    valid = false;
  } else hideFieldError("faq-a-error");

  if (!valid) return;

  const tags = (tagsRaw || "")
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0);

  const faqs = getFAQs();

  if (idVal) {
    // Chế độ CẬP NHẬT
    const idx = faqs.findIndex((f) => String(f.id) === String(idVal));
    if (idx !== -1) {
      faqs[idx].question = question;
      faqs[idx].tags = tags;
      faqs[idx].answer = answer;
      saveFAQs(faqs);
      showAdminToast("✅ Đã cập nhật câu hỏi FAQ thành công!", "success");
    }
  } else {
    // Chế độ THÊM MỚI
    const newFAQ = {
      id: Date.now(),
      question,
      tags: tags.length > 0 ? tags : question.toLowerCase().split(/\s+/).filter((w) => w.length > 2),
      answer,
      related: [],
    };
    faqs.unshift(newFAQ);
    saveFAQs(faqs);
    showAdminToast("🎉 Đã thêm câu hỏi FAQ mới! Chatbot đã cập nhật kiến thức ngay.", "success");
  }

  closeFAQModal();
  renderFAQList();
}

// XÓA CÂU HỎI FAQ
function deleteFAQ(id) {
  const faqs = getFAQs();
  const item = faqs.find((f) => String(f.id) === String(id));
  const qTitle = item ? item.question : "câu hỏi này";

  if (!confirm(`Bạn có chắc muốn xóa câu hỏi:\n"${qTitle}"?`)) return;

  const updated = faqs.filter((f) => String(f.id) !== String(id));
  saveFAQs(updated);
  renderFAQList();
  showAdminToast("🗑️ Đã xóa câu hỏi khỏi bộ kiến thức", "success");
}

// KHÔI PHỤC MẶC ĐỊNH
function handleResetFAQs() {
  if (!confirm("Bạn có muốn khôi phục lại 10 câu hỏi FAQ mặc định của Glow Beauty?")) return;
  resetDefaultFAQs();
  renderFAQList();
  showAdminToast("🔄 Đã khôi phục 10 câu hỏi FAQ mặc định!", "success");
}

// ============================================================
// TOAST TRONG ADMIN
// ============================================================
function showAdminToast(message, type = "success") {
  const container = document.getElementById("admin-toast");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.style.cssText = "position:relative;pointer-events:auto;";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// ============================================================
// SIDEBAR NAVIGATION
// ============================================================
function showSection(sectionId) {
  document.querySelectorAll(".admin-section").forEach((s) => s.classList.add("hidden"));
  document.querySelectorAll(".sidebar-menu a").forEach((a) => a.classList.remove("active"));

  const section = document.getElementById(sectionId);
  if (section) section.classList.remove("hidden");

  const link = document.querySelector(`.sidebar-menu a[data-section="${sectionId}"]`);
  if (link) link.classList.add("active");

  if (sectionId === "section-bookings") renderBookingsTable();
  if (sectionId === "section-faq") renderFAQList();
}

document.querySelectorAll(".sidebar-menu a[data-section]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    showSection(a.dataset.section);
  });
});

// ============================================================
// UTILS
// ============================================================
function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(dateStr) {
  if (!dateStr) return "–";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("vi-VN", { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" });
}

function formatDateTime(isoStr) {
  if (!isoStr) return "–";
  const d = new Date(isoStr);
  return d.toLocaleString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

// ============================================================
// SEED DỮ LIỆU MẪU
// ============================================================
function seedDemoData() {
  const existing = loadBookings();
  if (existing.length > 0) return; // Đã có data rồi

  const demoBookings = [
    {
      id: "demo1",
      name: "Nguyễn Thị Mai",
      phone: "0901234001",
      date: getTodayPlus(1),
      time: "09:00",
      topic: "Tư vấn routine skincare cho da dầu",
      status: "confirmed",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: "demo2",
      name: "Trần Văn Hùng",
      phone: "0912345002",
      date: getTodayPlus(2),
      time: "14:30",
      topic: "Chọn serum phù hợp cho da nhạy cảm",
      status: "pending",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "demo3",
      name: "Lê Thị Hoa",
      phone: "0978901003",
      date: getTodayPlus(0),
      time: "16:00",
      topic: "Tư vấn mua combo dưỡng ẩm",
      status: "pending",
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: "demo4",
      name: "Phạm Quỳnh Anh",
      phone: "0965432004",
      date: getTodayPlus(-1),
      time: "10:00",
      topic: "Hỏi về chính sách đổi trả",
      status: "done",
      createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    },
    {
      id: "demo5",
      name: "Hoàng Minh Tuấn",
      phone: "0934567005",
      date: getTodayPlus(3),
      time: "11:00",
      topic: "Tư vấn sản phẩm chống nắng",
      status: "confirmed",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ];

  saveBookings(demoBookings);
}

function getTodayPlus(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

// ============================================================
// KHỞI ĐỘNG
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  seedDemoData();
  showSection("section-overview");
  renderBookingsTable();
  renderFAQList();

  // Cập nhật sidebar badge
  const pending = loadBookings().filter((b) => b.status === "pending").length;
  const badge = document.querySelector(".sidebar-badge");
  if (badge) badge.textContent = pending;
});

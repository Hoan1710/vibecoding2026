# AI BUSINESS HUB – ĐỀ BÀI MỞ RỘNG VIBE-CODING 2026

**Đề gốc:** Đề 4 – Chatbot FAQ & đặt lịch tư vấn  
**Định hướng:** Nền tảng AI hỗ trợ chăm sóc khách hàng, thu thập lead và marketing cho doanh nghiệp nhỏ.  
**Lưu ý:** Đây là đề xuất mở rộng của nhóm, không phải yêu cầu chính thức của ban tổ chức.

## 1. Bối cảnh

Doanh nghiệp nhỏ thường thiếu nhân sự tư vấn 24/7, quản lý lịch hẹn và khách hàng tiềm năng thủ công, đồng thời gặp khó khăn khi tạo nội dung marketing, triển khai chiến dịch và đánh giá hiệu quả. Nhóm xây dựng một ứng dụng web tích hợp các công cụ này, lấy **chatbot AI và đặt lịch tư vấn** làm trung tâm.

## 2. Mục tiêu

- Trả lời FAQ và tư vấn khách hàng tự động, có kiểm soát theo dữ liệu doanh nghiệp.
- Chuyển nhu cầu tư vấn thành lịch hẹn và lead có thể quản lý.
- Tạo nội dung quảng cáo, email, chiến dịch, landing page và minigame.
- Hỗ trợ lựa chọn thương hiệu, tên miền, hosting và đánh giá website.
- Theo dõi chỉ số marketing trên dashboard thống nhất.
- Tái sử dụng dữ liệu giữa các module thay vì xây dựng 10 ứng dụng rời rạc.

## 3. Vai trò người dùng

- **Khách hàng:** Chat, xem tư vấn, tham gia quiz, đăng ký sự kiện, đặt lịch.
- **Nhân viên tư vấn:** Theo dõi và xử lý lịch hẹn, chăm sóc lead.
- **Nhân viên marketing:** Tạo chiến dịch, nội dung, landing page, xem KPI.
- **Quản trị viên:** Quản lý kiến thức chatbot, khách hàng, lịch hẹn và dữ liệu hệ thống.

## 4. Yêu cầu chức năng

### Module 1 – AI Chatbot & đặt lịch tư vấn (Đề 4, bắt buộc)

1. Giao diện chat hỗ trợ ít nhất **8–10 FAQ** từ bộ kiến thức mẫu; admin thêm/sửa/xóa nội dung.
2. Nhận diện câu hỏi tương đương, trả lời dựa trên dữ liệu đã có; AI diễn đạt tự nhiên bằng tiếng Việt, không bịa giá hay chính sách.
3. Gợi ý **3 câu hỏi liên quan** sau mỗi lượt trả lời; duy trì ngữ cảnh phiên chat.
4. Khi không đủ thông tin, chủ động đề xuất đặt lịch tư vấn thay vì tự đoán.
5. Form đặt lịch gồm ngày, giờ, tên, số điện thoại, nội dung cần tư vấn; kiểm tra dữ liệu và không cho đặt trong quá khứ.
6. Lưu lịch hẹn trong **localStorage** theo yêu cầu đề gốc; hiển thị xác nhận thành công.
7. Admin xem, tìm kiếm, lọc, cập nhật trạng thái (chờ xác nhận/đã xác nhận/hoàn thành/đã hủy), xóa lịch đã xử lý.
8. Liên kết lịch hẹn với thông tin lead và ngữ cảnh tư vấn nếu người dùng đồng ý.

### Module 2 – Hosting & Domain Advisor (Đề 1)

1. Form: loại website (bán hàng/giới thiệu/blog), lượng truy cập dự kiến, ngân sách, nhu cầu tên miền.
2. AI chọn **1 gói phù hợp nhất và 2 gói thay thế** từ danh sách gói mẫu.
3. Bảng so sánh 3 gói: giá, dung lượng, băng thông, tính năng.
4. Giải thích dễ hiểu và cho phép đăng ký tư vấn; chuyển gói quan tâm vào CRM.
5. Phân biệt rõ dữ liệu demo và báo giá thực tế.

### Module 3 – AI Content Studio (Đề 2 + Đề 6)

**Caption quảng cáo:**

1. Nhập tên sản phẩm, mô tả, khách hàng mục tiêu, nền tảng và tông giọng.
2. AI tạo **3 caption, 3 headline, 5 hashtag**.
3. Copy từng mục, tạo lại, chỉnh sửa trực tiếp; đếm ký tự và cảnh báo theo giới hạn được cấu hình.
4. Lưu lịch sử tạo nội dung vào localStorage, cho phép xem lại/xóa.

**Email marketing:**

1. Nhập mục tiêu (ra mắt/khuyến mãi/chăm sóc), thương hiệu, ngành hàng, ưu đãi.
2. AI tạo **3 email**, mỗi email gồm subject, nội dung, CTA.
3. Xem trước như hộp thư thật; copy, viết lại theo tông giọng khác.
4. AI gợi ý thời điểm gửi theo ngành hàng, ghi rõ đây là gợi ý tham khảo.
5. Có thể tạo nội dung trực tiếp từ chiến dịch đã chọn ở Module 8.

### Module 4 – Minigame Quiz & Lead Generation (Đề 3)

1. Tạo quiz **5 câu hỏi, mỗi câu 4 đáp án**, thủ công hoặc nhờ AI gợi ý theo chủ đề.
2. Màn hình chơi lần lượt từng câu, đếm ngược **30 giây/câu**.
3. Tính điểm theo độ chính xác và tốc độ, hiển thị kết quả.
4. Form tên/số điện thoại để đăng ký nhận quà; lưu localStorage sau khi thông báo mục đích thu thập.
5. Bảng xếp hạng **Top 10**; copy nội dung chia sẻ Facebook.
6. Chuyển người tham gia thành lead với nguồn `Minigame`.

### Module 5 – Website Analyzer (Đề 5)

1. Nhập URL; kiểm tra các yếu tố có thể truy cập: title, meta description, viewport, favicon, heading.
2. Chấm điểm **/100** theo checklist và trọng số công khai; phân biệt đạt/chưa đạt/không kiểm tra được.
3. AI nêu **3 điểm mạnh, 3 điểm cần cải thiện** dựa trên kết quả kiểm tra thực.
4. Copy báo cáo dạng text; lưu lịch sử localStorage, xem lại/xóa.
5. **Ràng buộc:** Trình duyệt không thể đọc tùy ý HTML website bên ngoài do CORS. Cần backend/proxy hợp lệ hoặc chế độ dán HTML; tuyệt đối không giả vờ đã quét thành công.

### Module 6 – Marketing KPI Dashboard (Đề 7)

1. Nhập nhiều dòng dữ liệu theo ngày: reach, click, chi phí, đơn hàng, tên chiến dịch.
2. Lưu localStorage, lọc theo thời gian/chiến dịch.
3. Biểu đồ đường/cột theo ngày cho reach, chi phí và đơn hàng.
4. Tự tính **CTR = click/reach × 100%**, **CPC = chi phí/click**, **chi phí/đơn = chi phí/số đơn**; xử lý mẫu số bằng 0.
5. AI phân tích xu hướng và đưa **3 đề xuất cải thiện** có căn cứ từ dữ liệu.
6. Xuất báo cáo tóm tắt dạng text để copy.

### Module 7 – AI Landing Page Builder (Đề 8)

1. Form: tên sự kiện, thời gian, địa điểm, diễn giả, ưu đãi đăng ký sớm.
2. AI tạo headline, đoạn giới thiệu, **3 lợi ích** tham dự.
3. Render landing page có hero, đếm ngược đến giờ G, agenda, form đăng ký.
4. Lưu danh sách đăng ký localStorage, hiển thị số đăng ký từ dữ liệu thực của bản demo.
5. Tạo trang mới; liên kết người đăng ký với CRM theo nguồn `Landing Page`.

### Module 8 – AI Marketing Campaign Planner (Đề 9)

1. Form: ngành hàng, sản phẩm, ngân sách (thấp/trung bình/cao), mục tiêu chiến dịch.
2. AI tạo **5 ý tưởng**, mỗi ý tưởng có tên, kênh triển khai và nội dung chính.
3. Mỗi ý tưởng có timeline **4 tuần**, cụ thể theo ý tưởng.
4. Lưu ý tưởng yêu thích vào shortlist; xem lại, xóa, copy tóm tắt.
5. Từ chiến dịch đã chọn, chuyển dữ liệu sang Content Studio, Email, Landing Page, Quiz và KPI Dashboard.

### Module 9 – Brand & Domain Assistant (Đề 10)

1. Nhập tên thương hiệu và ngành hàng.
2. AI đánh giá độ dễ nhớ, dễ đọc/phát âm; gợi ý **5 biến thể tên miền** (.com/.vn/.shop...).
3. Kiểm tra tình trạng tên miền ở **chế độ demo**, có nhãn rõ ràng; không khẳng định khả dụng thực tế nếu chưa tích hợp dịch vụ tra cứu.
4. AI gợi ý **3 slogan và 1 tagline**.
5. Copy toàn bộ kết quả; chuyển sang Hosting Advisor hoặc đặt lịch tư vấn.

### Module 10 – Admin Dashboard & Mini CRM (mở rộng Đề 4)

1. Tổng quan: số lượt chat, lead, lịch hẹn, đăng ký sự kiện, người chơi quiz và chiến dịch.
2. CRM lưu tên, số điện thoại, nguồn lead, nhu cầu, thời điểm, trạng thái chăm sóc.
3. Tìm kiếm/lọc/cập nhật/xóa; phát hiện lead trùng số điện thoại nhưng vẫn giữ các lượt tương tác riêng.
4. Quản lý FAQ, danh sách lịch hẹn, chiến dịch, nội dung đã tạo, dữ liệu minigame và landing page.
5. Phân biệt giao diện công khai và admin. **Chỉ dùng localStorage không phải cơ chế xác thực/bảo mật thật.**

## 5. Luồng tích hợp chính

### Luồng A: Khách hàng → Chatbot → Đặt lịch → CRM

Khách hàng hỏi sản phẩm → chatbot tìm FAQ và trả lời → gợi ý câu hỏi → nhận diện nhu cầu chuyên sâu → đề xuất đặt lịch → khách chọn thời gian và nhập liên hệ → lưu lịch hẹn → CRM cập nhật lead → nhân viên xử lý.

### Luồng B: Chiến dịch → Nội dung → Lead → Chăm sóc

Marketer nhập sản phẩm/ngân sách → AI tạo 5 chiến dịch → chọn chiến dịch → tạo caption/email → tạo landing page hoặc quiz → khách đăng ký → CRM ghi nhận nguồn lead → chatbot hỗ trợ tư vấn → KPI theo dõi hiệu quả.

### Luồng C: Khởi nghiệp → Thương hiệu → Hạ tầng → Website

Nhập tên thương hiệu → AI đánh giá, đề xuất slogan/tên miền → tư vấn hosting → đăng ký lịch hỗ trợ → nhập URL website → kiểm tra SEO cơ bản → nhận khuyến nghị cải thiện.

## 6. Yêu cầu giao diện

**Trang công khai:** Trang chủ, chatbot nổi, đặt lịch, trang quiz, landing page sự kiện.

**Trang quản trị:** Sidebar gồm Tổng quan, Chatbot/FAQ, Lịch hẹn, CRM, Content Studio, Email, Campaign Planner, Quiz, Landing Page, KPI, Website Analyzer, Brand & Domain, Hosting Advisor, Cài đặt.

- Responsive trên desktop/tablet/mobile.
- Có loading, trạng thái rỗng, thông báo lỗi/thành công.
- Dữ liệu demo nhất quán, dễ trình diễn.
- Thao tác giữa các module không bắt nhập lại dữ liệu đã có.

## 7. Kiến trúc kỹ thuật đề xuất

- **Frontend:** React + TypeScript + Tailwind CSS + shadcn/ui.
- **Biểu đồ:** Recharts.
- **Điều hướng:** React Router.
- **AI:** API mô hình ngôn ngữ qua backend/serverless function để bảo vệ API key; đầu ra JSON có schema và validation.
- **FAQ:** Tìm kiếm bộ kiến thức trước, dùng AI diễn đạt lại có căn cứ; fallback khi thiếu thông tin.
- **Demo:** localStorage cho lịch hẹn, lead, lịch sử nội dung, chiến dịch và quiz.
- **Nâng cao:** Supabase/PostgreSQL + authentication + phân quyền, đồng bộ nhiều thiết bị.
- **Website Analyzer:** Backend fetch có kiểm soát và phòng chống SSRF; không quét URL tùy ý từ client.
- **Bảo mật:** Kiểm tra đầu vào, chống XSS, giới hạn dữ liệu cá nhân, thông báo đồng ý thu thập thông tin, không công khai khóa API.

## 8. Phạm vi và ưu tiên triển khai

| Giai đoạn | Phạm vi | Ưu tiên |
|---|---|---|
| 1 – MVP | Toàn bộ 5 yêu cầu gốc Đề 4; chatbot, gợi ý câu hỏi, đặt lịch, localStorage, admin | Bắt buộc |
| 2 – Luồng chuyển đổi | Mini CRM, Content Studio, Campaign Planner, Landing Page, Quiz | Cao |
| 3 – Công cụ bổ sung | KPI, Hosting Advisor, Brand & Domain, Website Analyzer, Email nâng cao | Trung bình |
| 4 – Nâng cao | AI agent điều phối công cụ, lead scoring, đồng bộ backend, tích hợp lịch | Tùy thời gian |

**Phân bổ thời gian tham khảo:** 45% chatbot/đặt lịch/CRM; 30% content/chiến dịch/landing page; 15% quiz/KPI/công cụ khác; 10% kiểm thử/UI/demo.

## 9. Tiêu chí nghiệm thu

1. **Đúng đề gốc:** Đủ 5 yêu cầu Đề 4 và chạy ổn định.
2. **Tính tích hợp:** Có ít nhất một luồng chatbot → đặt lịch → CRM và một luồng marketing → thu thập lead.
3. **AI có căn cứ:** Không bịa FAQ, giá, tình trạng domain hoặc kết quả quét website.
4. **Tính sử dụng:** Form hợp lệ, thao tác copy/lưu/xóa/tra cứu hoạt động; có responsive và thông báo lỗi.
5. **Trình diễn:** Có dữ liệu mẫu, kịch bản demo đầu-cuối và giải thích rõ chức năng demo so với tích hợp thực.

## 10. Kịch bản demo cuộc thi

**Bối cảnh:** Một shop mỹ phẩm nhỏ muốn giới thiệu sản phẩm mới.

1. Admin cấu hình bộ kiến thức sản phẩm, giá và chính sách.
2. Marketer nhập ngân sách; AI đề xuất 5 chiến dịch.
3. Chọn chiến dịch, sinh caption và email.
4. Tạo landing page hoặc minigame thu hút khách hàng.
5. Khách truy cập, tham gia minigame, hỏi chatbot về sản phẩm.
6. Chatbot trả lời theo dữ liệu, gợi ý 3 câu hỏi; khi cần, mời đặt lịch.
7. Khách đặt lịch; admin thấy lịch hẹn và lead trong CRM.
8. Admin nhập dữ liệu chiến dịch và xem KPI, nhận 3 gợi ý cải thiện.

**Thông điệp trình diễn:** **Marketing → Thu hút khách hàng → AI tư vấn → Đặt lịch → CRM → Phân tích và tối ưu.**

## 11. Điểm khác biệt chiến lược

Thay vì 10 tính năng rời rạc, phát triển **chatbot như một trợ lý điều phối**: khi khách nói “Tôi muốn mở shop mỹ phẩm online, ngân sách 3 triệu”, chatbot có thể hỏi thêm, đề xuất thương hiệu, gợi ý hosting, tạo kế hoạch marketing và hỗ trợ đặt lịch. Các module dùng chung dữ liệu và có hành động chuyển tiếp rõ ràng.

**Lưu ý về phạm vi:** Đây là hướng mở rộng để tăng tính ứng dụng và chất lượng demo. Nhóm cần hoàn thành Đề 4 trước, chỉ triển khai các module phụ khi còn thời gian và phù hợp quy định cuộc thi.

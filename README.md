# 💖 Wedding-Inspired Happy Birthday Landing Page (Thiệp Sinh Nhật Phong Cách Cưới Cao Cấp)

Dự án chuyển đổi phong cách từ các mẫu **Landing Page Cưới / Thiệp Cưới Online sang trọng (như Biihappy, iWedding, Joy, The Knot)** thành một **Landing Page Chúc Mừng Sinh Nhật Người Yêu** tinh tế, thanh lịch, tập trung 100% vào **kỷ niệm, hình ảnh và những lời chúc đong đầy yêu thương**.

Trang web sử dụng **Frontend thuần (HTML5, CSS3, JavaScript)**, tối ưu hoàn hảo cho điện thoại (Mobile-First) và sẵn sàng đẩy lên **GitHub Pages**.

---

## ✨ Điểm Nhấn Kiến Trúc Phong Cách Wedding Chuyển Đổi

1. 🌸 **Cánh Hoa Hồng Rơi & Ánh Kim (Falling Rose Petals)**:
   - Hiệu ứng Canvas cánh hoa hồng 3D bay lượn nhẹ nhàng trong gió kết hợp những đốm sáng vàng kim lấp lánh như trong lễ đường cưới.
2. 💌 **Thiệp Mở Đầu Dấu Sáp (Wax Seal Envelope)**:
   - Phong bì thiệp mừng sang trọng đóng dấu sáp đỏ mận; khi chạm vào, nhạc piano du dương tự phát và chuyển cảnh mượt mà vào trang chính.
3. 👑 **Save The Special Day (Hero Section)**:
   - Khắc tên người yêu bằng font chữ Serif & Cursive cổ điển, huy hiệu ngày sinh trang trọng, câu trích dẫn ngọt ngào.
4. 🏛️ **The Birthday Girl (Khung Vòm Cung Cưới Nghệ Thuật)**:
   - Khung ảnh vòm cung (Arch shape) chuẩn phong cách thiệp cưới Châu Âu, thông tin cung hoàng đạo, sở thích và nét đáng yêu của cô ấy.
5. 📅 **Lịch Tháng Kỷ Niệm Có Trái Tim (Birthday Calendar Widget)**:
   - Khối lịch tháng thanh lịch với **con dấu trái tim đỏ khoanh tròn đúng vào ngày sinh nhật** của cô ấy, kèm bộ đếm ngày bên nhau trực tiếp.
6. 📖 **Những Mùa Kỷ Niệm (Our Story Timeline)**:
   - Dòng thời gian câu chuyện tình yêu phong cách tạp chí thời trang, lưu giữ từ ngày đầu gặp gỡ, chuyến đi xa đầu tiên đến sinh nhật hôm nay.
7. 🖼️ **Album Khoảnh Khắc (Photo Gallery)**:
   - Lưới ảnh phong cách tạp chí Kinfolk / Pinterest, viền mỏng nghệ thuật, chạm để phóng to (Lightbox Zoom) và thả tim.
8. ✍️ **Sổ Lời Chúc Sinh Nhật (Guestbook Tương Tác)**:
   - Kế thừa tính năng sổ lưu bút của web cưới: hiển thị các lời chúc ngọt ngào và có form nhập lời chúc mới trực tiếp, tự động lưu vào bộ nhớ máy (`localStorage`).
9. 🎵 **Nhạc Nền Tự Động (Web Audio Synth & MP3)**:
   - Tự động phát hợp âm arpeggio piano lofi nhẹ nhàng mà không cần file nhạc ngoài, hoặc có thể chép bài hát yêu thích vào `assets/audio/bgm.mp3`.

---

## 🚀 Cách Xem Ngay

Bạn chỉ cần **nhấp đúp chuột vào file `index.html`** để mở ngay trên trình duyệt điện thoại hoặc máy tính.

---

## 🎨 Hướng Dẫn Tùy Chỉnh Thông Tin (Tại file `js/app.js`)

Mọi thông tin được gom gọn gàng ngay đầu file **[`js/app.js`](js/app.js)**:

```javascript
const CONFIG = {
  // 1. Tên & Biệt danh
  loverName: "Em Bé Của Anh",
  loverNickname: "Công Chúa Nhỏ",

  // 2. Ngày sinh nhật (để hiển thị và khoanh tim trên lịch)
  birthday: "2026-09-15",
  birthdayMonth: 9, // Tháng 9
  birthdayDay: 15,  // Ngày 15 (sẽ được khoanh tròn trái tim trên lịch)
  birthdayYear: 2026,

  // 3. Ngày bắt đầu yêu nhau (tính bộ đếm ngày bên nhau)
  relationshipStartDate: "2023-10-20T00:00:00",

  // 4. Thông tin cá nhân "The Birthday Girl"
  profile: {
    zodiac: "Xử Nữ (Virgo) ♍",
    hobbies: "Chụp ảnh, du lịch, trà sữa",
    cutestTrait: "Nụ cười tỏa nắng siêu ngọt ngào",
    ...
  },
  ...
```

### Cách Thay Ảnh Của Hai Bạn:
- Thư mục `assets/images/` đã có sẵn 5 ảnh mẫu chất lượng cao:
  - `memory_4.jpg`: Ảnh chân dung đại diện làm khung vòm cung "Cô gái tuổi mới".
  - `memory_1.jpg`, `memory_2.jpg`, `memory_3.jpg`, `memory_5.jpg`: Các ảnh kỷ niệm trên dòng thời gian và album.
- Bạn chỉ cần chép đè ảnh của bạn và người yêu vào thư mục này với tên tương ứng.

---

## 🌐 Đưa Lên GitHub Pages Trong 2 Phút (Miễn Phí)

1. Tạo repository mới trên GitHub (chọn **Public**).
2. Chạy các lệnh sau trong terminal:
   ```bash
   git init
   git add .
   git commit -m "Wedding Style Birthday Landing Page"
   git branch -M main
   git remote add origin https://github.com/TÊN-GITHUB-CỦA-BẠN/TÊN-REPO.git
   git push -u origin main
   ```
3. Vào **Settings** > **Pages** trên GitHub, chọn branch **`main`** và thư mục **`/(root)`** rồi bấm **Save**.
4. Chờ 1 phút để nhận đường link trực tiếp gửi cho người yêu mở trên điện thoại!

/**
 * Wedding-Style Birthday Landing Page Logic
 * ========================================================
 * DỄ DÀNG CHỈNH SỬA CÁC THÔNG TIN DƯỚI ĐÂY:
 * ========================================================
 */

const CONFIG = {
  // 1. Tên & Biệt danh
  loverName: "Trần Thị Ngọc Ánh",
  loverNickname: "Công Chúa Nhỏ của anh",

  // 2. Ngày sinh nhật (Năm-Tháng-Ngày)
  birthday: "2003-09-15",
  birthdayMonth: 9, // Tháng 9
  birthdayDay: 15,  // Ngày 15
  birthdayYear: 2026,

  // 3. Ngày bắt đầu yêu nhau (tính bộ đếm ngày bên nhau)
  relationshipStartDate: "2023-10-20T00:00:00",

  // 4. Thông tin cá nhân "The Birthday Girl"
  profile: {
    titleTag: "The Birthday Star",
    zodiac: "Xử Nữ (Virgo) ♍",
    hobbies: "Trà sữa, dỗi, tồ tề",
    cutestTrait: "Nụ cười siuuu đáng iuuuu",
    favoriteSong: "Our Melody ♫",
    avatar: "assets/images/memory_4.jpg"
  },

  // 5. Câu chuyện tình yêu / Kỷ niệm (Wedding Story Timeline)
  storyEvents: [
    {
      date: "Khoảnh khắc ban đầu",
      title: "Lần đầu tiên gặp gỡ",
      desc: "Giữa quán cà phê góc phố quen thuộc, nụ cười ngượng ngùng và ánh mắt trong veo của em đã làm trái tim anh rung động từ cái nhìn đầu tiên.",
      image: "assets/images/memory_2.jpg",
      tag: "First Sight ☕"
    },
    {
      date: "Chuyến đi xa cùng nhau",
      title: "Hoàng hôn bên bờ biển",
      desc: "Nắm chặt tay em đi trên bãi cát mịn, cùng ngắm mặt trời buông xuống đại dương. Khoảnh khắc ấy anh biết mình đã tìm thấy người đồng hành của cả cuộc đời.",
      image: "assets/images/memory_1.jpg",
      tag: "Sunset Love 🌅"
    },
    {
      date: "Đêm ngắm sao trời",
      title: "Triệu vì sao ước nguyện",
      desc: "Ngồi tựa vào vai nhau ngắm bầu trời đầy sao lấp lánh. Anh đã gửi vào vũ trụ một điều ước: mong cho người con gái bên cạnh anh luôn luôn bình an và mỉm cười.",
      image: "assets/images/memory_3.jpg",
      tag: "Starry Night ✨"
    },
    {
      date: "Hôm nay - Sinh nhật em",
      title: "Tuổi mới rạng rỡ",
      desc: "Chúc em tuổi mới luôn xinh đẹp, nhiều niềm vui và mọi điều may mắn, tốt đẹp nhất sẽ luôn đến với em nhé!",
      image: "assets/images/memory_5.jpg",
      tag: "Happy Birthday 🎂"
    }
  ],

  // 6. Album ảnh phong cách tạp chí cưới (Photo Gallery)
  gallery: [
    { image: "assets/images/1.3.jfif" },
    { image: "assets/images/3.2.jpg" },
    { image: "assets/images/3.3.jpg" },
    { image: "assets/images/3.4.jpg" },
    { image: "assets/images/3.5.jpg" },
    { image: "assets/images/3.6.jpg" },
    { image: "assets/images/3.7.jpg" },
    { image: "assets/images/3.8.jpg" },
    { image: "assets/images/3.9.jpg" },
    { image: "assets/images/3.10.jpg" },
    { image: "assets/images/3.11.jpg" },
    { image: "assets/images/3.12.jpg" }
  ],

  // 7. Lời chúc ban đầu trong Sổ Lưu Bút Sinh Nhật
  presetWishes: [
    {
      author: "Người luôn thương em",
      time: "Vừa xong",
      content: "Chúc em tuổi mới luôn vui vẻ, xinh đẹp và mọi điều may mắn, tốt lành nhất sẽ luôn đến với em nhé! 🎂💖"
    },
    {
      author: "Your Number One Fan",
      time: "Hôm nay",
      content: "Chúc em một ngày sinh nhật thật nhiều tiếng cười và luôn ngập tràn niềm vui! ✨"
    }
  ]
};

/**
 * ========================================================
 * HỆ THỐNG XỬ LÝ GIAO DIỆN & TƯƠNG TÁC
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoverInfo();
  initCurtain();
  renderCalendar();
  renderStoryTimeline();
  renderGallery();
  initGuestbook();
  initHeartsShower();
  initLightbox();
  initScrollAnimations();
});

// Điền tên & profile
function initLoverInfo() {
  document.querySelectorAll('.lover-name').forEach(el => el.textContent = CONFIG.loverName);
  document.querySelectorAll('.lover-nickname').forEach(el => el.textContent = CONFIG.loverNickname);

  const zEl = document.getElementById('profile-zodiac');
  if (zEl) zEl.textContent = CONFIG.profile.zodiac;

  const hEl = document.getElementById('profile-hobbies');
  if (hEl) hEl.textContent = CONFIG.profile.hobbies;

  const cEl = document.getElementById('profile-trait');
  if (cEl) cEl.textContent = CONFIG.profile.cutestTrait;
}

// Màn mở đầu (Thiệp mời mở rèm)
function initCurtain() {
  const curtain = document.getElementById('intro-curtain');
  const openBtn = document.getElementById('btn-open-curtain');

  if (!curtain || !openBtn) return;

  openBtn.addEventListener('click', () => {
    // Pháo hoa bung nở
    if (window.Confetti) {
      window.Confetti.burst({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, 70);
    }

    // Bật nhạc nền piano
    if (window.RomanticAudio) {
      window.RomanticAudio.play();
    }

    curtain.classList.add('fade-out');
    setTimeout(() => {
      curtain.style.display = 'none';
      if (window.Confetti) {
        window.Confetti.floatingHearts({ x: window.innerWidth / 2, y: window.innerHeight - 80 }, 10);
      }
    }, 850);
  });
}

// Vẽ Lịch Tháng Cưới / Sinh Nhật có khoanh tròn trái tim
function renderCalendar() {
  const grid = document.getElementById('calendar-days-grid');
  const monthTitle = document.getElementById('calendar-month-name');
  if (!grid) return;

  const year = CONFIG.birthdayYear;
  const month = CONFIG.birthdayMonth; // 1-12
  const specialDay = CONFIG.birthdayDay;

  if (monthTitle) {
    monthTitle.textContent = `Tháng ${String(month).padStart(2, '0')} • ${year}`;
  }

  // Ngày đầu tiên của tháng rơi vào thứ mấy (0: CN, 1: T2, ...)
  const firstDayIndex = new Date(year, month - 1, 1).getDay();
  // Điều chỉnh để Thứ 2 là cột đầu tiên (0: T2, ..., 6: CN)
  const adjustedFirstDay = (firstDayIndex === 0) ? 6 : firstDayIndex - 1;

  // Số ngày trong tháng
  const daysInMonth = new Date(year, month, 0).getDate();

  let html = '';

  // Ô trống đầu tháng
  for (let i = 0; i < adjustedFirstDay; i++) {
    html += `<div class="cal-date empty"></div>`;
  }

  // Các ngày trong tháng
  for (let day = 1; day <= daysInMonth; day++) {
    const isSpecial = (day === specialDay);
    html += `
      <div class="cal-date ${isSpecial ? 'special-day' : ''}" title="${isSpecial ? 'Sinh nhật người yêu!' : ''}">
        ${day}
      </div>
    `;
  }

  grid.innerHTML = html;
}

// Bộ đếm ngày yêu nhau / đếm ngược
function initCountdown() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl) return;

  const startDate = new Date(CONFIG.relationshipStartDate).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = Math.max(0, now - startDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// Vẽ Dòng thời gian tình yêu (Wedding Storyline)
function renderStoryTimeline() {
  const container = document.getElementById('story-timeline-container');
  if (!container) return;

  container.innerHTML = CONFIG.storyEvents.map((item, index) => `
    <div class="story-item reveal" style="--delay: ${index * 0.1}s">
      <div class="story-img-box" onclick="openLightbox('${item.image}', '${item.title}', '${item.desc}')">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <span class="story-img-badge">${item.tag}</span>
      </div>
      <div class="story-content">
        <div class="story-date">${item.date}</div>
        <h3 class="story-title">${item.title}</h3>
        <p class="story-text">${item.desc}</p>
      </div>
    </div>
  `).join('');
}

// Vẽ Album ảnh tạp chí (Gallery)
function renderGallery() {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  container.innerHTML = CONFIG.gallery.map((item, index) => `
    <div class="gallery-photo-card reveal" style="--delay: ${(index % 4) * 0.06}s" onclick="openLightbox('${item.image}')">
      <div class="gallery-photo-img-wrap">
        <img src="${item.image}" alt="Khoảnh khắc ${index + 1}" loading="lazy" />
      </div>
    </div>
  `).join('');
}

// Sổ Lưu Bút Sinh Nhật (Guestbook với LocalStorage)
function initGuestbook() {
  const listEl = document.getElementById('guestbook-list');
  const form = document.getElementById('guestbook-form');
  const authorInput = document.getElementById('wish-author-input');
  const contentInput = document.getElementById('wish-content-input');

  if (!listEl) return;

  // Lấy lời chúc đã lưu trong máy
  let savedWishes = [];
  try {
    const raw = localStorage.getItem('birthday_guestbook_wishes');
    if (raw) savedWishes = JSON.parse(raw);
  } catch (e) { }

  const allWishes = [...CONFIG.presetWishes, ...savedWishes];

  function renderWishes() {
    listEl.innerHTML = allWishes.map(w => `
      <div class="wish-bubble">
        <div class="wish-author-row">
          <span class="wish-author-name">${w.author}</span>
          <span class="wish-time-badge">${w.time}</span>
        </div>
        <p class="wish-body-text">${w.content}</p>
      </div>
    `).reverse().join('');
  }

  renderWishes();

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = authorInput.value.trim() || 'Người gửi yêu thương';
      const content = contentInput.value.trim();

      if (!content) return;

      const newWish = {
        author: author,
        time: 'Vừa gửi',
        content: content
      };

      allWishes.push(newWish);
      savedWishes.push(newWish);
      try {
        localStorage.setItem('birthday_guestbook_wishes', JSON.stringify(savedWishes));
      } catch (e) { }

      renderWishes();
      form.reset();

      // Bắn tim bay chúc mừng
      if (window.Confetti) {
        window.Confetti.floatingHearts({ x: window.innerWidth / 2, y: window.innerHeight - 100 }, 15);
      }
    });
  }
}

// Thả tim chúc mừng cuối trang
function initHeartsShower() {
  const btn = document.getElementById('btn-shower-hearts');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    if (window.Confetti) {
      window.Confetti.burst({
        x: rect.left + rect.width / 2,
        y: rect.top
      }, 50);
      window.Confetti.floatingHearts({
        x: rect.left + rect.width / 2,
        y: rect.top
      }, 15);
    }
  });
}

// Lightbox xem ảnh to (chỉ hiển thị ảnh thuần túy)
function initLightbox() {
  const modal = document.getElementById('photo-lightbox');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal) return;

  window.openLightbox = (imgSrc) => {
    const modalImg = document.getElementById('lightbox-img');
    if (modalImg) modalImg.src = imgSrc;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-content') || e.target.classList.contains('lightbox-img-box')) {
      closeLightbox();
    }
  });
}

// Scroll animation
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// Logic Modal 6 Ảnh Kỷ Niệm Chung
window.openMemoryModal = function () {
  const modal = document.getElementById('memory-six-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.Confetti) {
      window.Confetti.floatingHearts({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, 6);
    }
  }
};

window.closeMemoryModal = function () {
  const modal = document.getElementById('memory-six-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const memoryModal = document.getElementById('memory-six-modal');
  if (memoryModal) {
    memoryModal.addEventListener('click', (e) => {
      if (e.target === memoryModal) closeMemoryModal();
    });
  }
});

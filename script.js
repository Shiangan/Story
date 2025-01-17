// 1. 平滑滾動功能
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

// 2. 圖片延遲加載（Lazy Load）
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(image => {
    imageObserver.observe(image);
  });
});

// 3. 表單驗證與送出通知
const form = document.getElementById('contact-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // 表單驗證
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let isValid = true;

  if (name === '') {
    alert('請輸入姓名');
    isValid = false;
  }

  if (!validateEmail(email)) {
    alert('請輸入有效的電子郵件');
    isValid = false;
  }

  if (message === '') {
    alert('請輸入訊息');
    isValid = false;
  }

  if (isValid) {
    alert('您的訊息已送出，我們將儘快與您聯絡！');
    form.reset();
  }
});

// 驗證 Email 格式的函數
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 4. 返回頂部按鈕（Back to Top）
const backToTopButton = document.createElement('button');
backToTopButton.textContent = '⬆ 返回頂部';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

// 顯示/隱藏返回頂部按鈕
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

// 點擊返回頂部
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// 5. 漢堡選單切換（適合行動裝置）
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});

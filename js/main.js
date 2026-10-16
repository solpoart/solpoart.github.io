/* ============================================================
   曉山波 SOLPO Design Studio — main.js
   共用 Header / Footer / Contact、首頁輪播、專案列表與詳情頁
   互動邏輯沿用 Merlin Portfolio（見 CLAUDE.md 的手機版規則）
   ============================================================ */

/* ---- 站台設定：社群連結與聯絡資訊（之後補上正式資料）---- */
var SITE = {
  instagram: 'https://www.instagram.com/podoart/',
  facebook:  'https://www.facebook.com/podo.tw/',
  behance:   'https://www.behance.net/podoart',
  email:     'hello@solpoart.com',
  // 聯絡表單：到 web3forms.com 用 hello@solpoart.com 申請免費 Access Key 後貼在這裡。
  // 還沒填之前，送出時會改開使用者的郵件程式（內容自動帶入），一樣能聯絡得到
  formKey:   '',
  copyright: 'Copyright © 2026 Po Hsu.',
  footerEgg: '歡迎來到曉山波設計',   // 游標移到 Copyright 上時出現的彩蛋文字
};

/* ---- Icons（Material Symbols wght300 + SNS）---- */
var ICONS = {
  arrow56: '<svg class="i" viewBox="0 -960 960 960" aria-hidden="true"><path d="M693.69-457.31h-491q-9.91 0-16.3-6.39-6.39-6.39-6.39-16.31 0-9.91 6.39-16.3 6.39-6.38 16.3-6.38h491L464-732q-6.31-6.76-6.69-15.84-.39-9.08 6.69-15.99 7.08-7.25 16-7.25t16 7.08l263.85 263.85q4.53 4.53 6.73 9.39 2.19 4.86 2.19 10.81t-2.19 10.76q-2.2 4.81-6.73 9.34L496-196q-6.69 6.69-15.73 6.88-9.04.2-16.27-6.88-7.08-7.23-7.08-16.08 0-8.84 7.08-15.54l229.69-229.69Z"/></svg>',
  arrow24: '<svg class="i i-24" viewBox="0 -960 960 960" aria-hidden="true"><path d="M665.08-450H210q-12.77 0-21.38-8.62Q180-467.23 180-480t8.62-21.38Q197.23-510 210-510h455.08L458.31-716.77q-8.92-8.92-8.81-20.88.12-11.96 9.42-21.27 9.31-8.69 21.08-9 11.77-.31 21.08 9l253.61 253.61q5.62 5.62 7.92 11.85 2.31 6.23 2.31 13.46t-2.31 13.46q-2.3 6.23-7.92 11.85L501.08-201.08q-8.31 8.31-20.58 8.5-12.27.19-21.58-8.5-9.3-9.31-9.3-21.38 0-12.08 9.3-21.39L665.08-450Z"/></svg>',
  chevL: '<svg class="i" viewBox="0 -960 960 960" aria-hidden="true"><path d="m399.08-480.62 178.53 178.16q6.7 6.69 6.39 15.81-.31 9.11-7.39 16.19-7.07 7.07-16.3 7.07T544-270.46L354.08-460.38q-4.62-4.62-6.62-9.62-2-5-2-10.62 0-6 2-10.8 2-4.81 6.62-9.43l190.54-190.92q6.69-6.69 16.3-6.88 9.62-.2 16.69 6.88 6.7 7.08 6.7 16.5t-6.7 16.12L399.08-480.62Z"/></svg>',
  chevL24: '<svg class="i i-24" viewBox="0 -960 960 960" aria-hidden="true"><path d="m418.15-480 162.93 162.92q8.3 8.31 8.5 20.89.19 12.57-8.5 21.27-8.7 8.69-21.08 8.69-12.38 0-21.08-8.69L359.15-454.69q-5.61-5.62-7.92-11.85-2.31-6.23-2.31-13.46t2.31-13.46q2.31-6.23 7.92-11.85l179.77-179.77q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L418.15-480Z"/></svg>',
  chevR: '<svg class="i" viewBox="0 -960 960 960" aria-hidden="true"><path d="M536.92-480.62 358.77-659.15q-7.08-6.7-6.77-15.81.31-9.12 7.39-15.81 7.07-7.08 16.3-7.08t16.31 7.08l189.92 189.92q4.62 4.62 6.81 9.43 2.19 4.8 2.19 10.8 0 5.62-2.19 10.62-2.19 5-6.81 9.62L391.38-269.85q-6.69 6.7-15.8 6.58-9.12-.12-16.19-7.19-7.08-7.08-7.08-16.31 0-9.23 7.08-16.31l177.53-177.54Z"/></svg>',
  check: '<svg class="i i-24" viewBox="0 -960 960 960" aria-hidden="true"><path d="m400-401.77 242.92-243.31q8.28-8.3 21.06-8.3 12.79 0 21.1 8.28 8.3 8.28 8.3 21.07 0 12.8-8.3 21.11L425.31-343.54q-10.85 10.85-25.31 10.85-14.46 0-25.31-10.85l-99.77-99.38q-8.3-8.28-8.3-21.06 0-12.79 8.28-21.1 8.28-8.3 21.07-8.3 12.8 0 21.11 8.3L400-401.77Z"/></svg>',
  ig: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path transform="translate(-284 -7279)" d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792"/></svg>',
  fb: '<svg class="i" viewBox="0 0 48 48" aria-hidden="true"><rect x="2" y="2" width="44" height="44" rx="12.5" fill="none" stroke="currentColor" stroke-width="4"/><path d="M38.6615 17.887H34.3074H33.7929C32.4429 17.887 31.3485 18.9814 31.3485 20.3314V25.2218H38.6615L37.5904 32.5526H31.3485V46H23.3065V32.5526H16.6667V25.2218H23.2207L23.3065 18.2634L23.2825 15.7694C23.2487 12.2477 26.0762 9.36546 29.5978 9.33164C29.6182 9.33144 29.6386 9.33134 29.6591 9.33134H38.6615V17.887Z"/></svg>',
  copy: '<svg class="i i-24" viewBox="0 -960 960 960" aria-hidden="true"><path d="M362.31-260Q332-260 311-281q-21-21-21-51.31v-455.38Q290-818 311-839q21-21 51.31-21h335.38Q728-860 749-839q21 21 21 51.31v455.38Q770-302 749-281q-21 21-51.31 21H362.31Zm0-60h335.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-140 200Q192-120 171-141q-21-21-21-51.31v-485.38q0-12.77 8.62-21.39 8.61-8.61 21.38-8.61t21.39 8.61q8.61 8.62 8.61 21.39v485.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h365.38q12.77 0 21.39 8.61 8.61 8.62 8.61 21.39 0 12.77-8.61 21.38-8.62 8.62-21.39 8.62H222.31ZM350-320v-480 480Z"/></svg>',
  mail: '<svg class="i" viewBox="0 -960 960 960" aria-hidden="true"><path d="M172.31-180Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h615.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31ZM800-662.31 499.46-469.92q-4.61 2.61-9.54 4.11-4.92 1.5-9.92 1.5t-9.92-1.5q-4.93-1.5-9.54-4.11L160-662.31v410q0 5.39 3.46 8.85t8.85 3.46h615.38q5.39 0 8.85-3.46t3.46-8.85v-410ZM480-520l313.85-200h-627.7L480-520ZM160-662.31v9.23-45.73 1.19V-720v22.38-1.27V-653.08v-9.23V-240v-422.31Z"/></svg>',
  menu: '<svg class="i" width="32" height="32" viewBox="0 -960 960 960" aria-hidden="true"><path d="M165.13-254.62q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.86q7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.87q-7.22 7.12-17.9 7.12H165.13Zm0-200.25q-10.68 0-17.9-7.27-7.23-7.26-7.23-17.99 0-10.74 7.23-17.87 7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.27 7.23 7.26 7.23 17.99 0 10.74-7.23 17.87-7.22 7.13-17.9 7.13H165.13Zm0-200.26q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.87q7.22-7.12 17.9-7.12h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.86q-7.22 7.13-17.9 7.13H165.13Z"/></svg>',
  close: '<svg class="i" width="32" height="32" viewBox="0 -960 960 960" aria-hidden="true"><path d="m480-444.62-209.69 209.7q-7.23 7.23-17.5 7.42-10.27.19-17.89-7.42-7.61-7.62-7.61-17.7 0-10.07 7.61-17.69L444.62-480l-209.7-209.69q-7.23-7.23-7.42-17.5-.19-10.27 7.42-17.89 7.62-7.61 17.7-7.61 10.07 0 17.69 7.61L480-515.38l209.69-209.7q7.23-7.23 17.5-7.42 10.27-.19 17.89 7.42 7.61 7.62 7.61 17.7 0 10.07-7.61 17.69L515.38-480l209.7 209.69q7.23 7.23 7.42 17.5.19 10.27-7.42 17.89-7.62 7.61-17.7 7.61-10.07 0-17.69-7.61L480-444.62Z"/></svg>',
};

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function extAttrs(href) { return href && href.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : ''; }

/* ---- Header / Mobile menu / Footer / Contact modal ---- */
function renderChrome() {
  var page = document.body.dataset.page || '';
  var header = document.querySelector('[data-slot="header"]');
  if (header) {
    header.outerHTML =
      '<header class="site-header"><div class="container">' +
        '<a href="index.html" class="header-logo glass" aria-label="曉山波 首頁"><img src="assets/logo.webp" alt="曉山波 SOLPO Design Studio" width="169" height="80"></a>' +
        '<nav class="header-menu glass" aria-label="主選單">' +
          '<a class="sns-link" href="' + SITE.instagram + '"' + extAttrs(SITE.instagram) + ' aria-label="Instagram">' + ICONS.ig + '</a>' +
          '<a class="sns-link" href="' + SITE.facebook + '"' + extAttrs(SITE.facebook) + ' aria-label="Facebook">' + ICONS.fb + '</a>' +
          '<span class="header-divider" aria-hidden="true"></span>' +
          '<a class="text-btn' + (page === 'about' ? ' is-active' : '') + '" href="about.html">About</a>' +
          '<a class="text-btn' + (page === 'projects' || page === 'project' ? ' is-active' : '') + '" href="projects.html">Projects</a>' +
          '<button class="btn-primary js-contact" type="button">Contact ' + ICONS.arrow24 + '</button>' +
        '</nav>' +
        '<button class="nav-hamburger glass" type="button" aria-label="開啟選單">' + ICONS.menu + '</button>' +
      '</div></header>' +
      '<div class="mobile-menu" role="dialog" aria-modal="true" aria-label="選單">' +
        '<button class="mobile-menu-close" type="button" aria-label="關閉選單">' + ICONS.close + '</button>' +
        '<a class="text-btn" href="index.html">Home</a>' +
        '<a class="text-btn" href="about.html">About</a>' +
        '<a class="text-btn" href="projects.html">Projects</a>' +
        '<button class="btn-primary js-contact" type="button">Contact ' + ICONS.arrow24 + '</button>' +
        '<div class="mobile-menu-sns">' +
          '<a class="sns-link" href="' + SITE.instagram + '"' + extAttrs(SITE.instagram) + ' aria-label="Instagram">' + ICONS.ig + '</a>' +
          '<a class="sns-link" href="' + SITE.facebook + '"' + extAttrs(SITE.facebook) + ' aria-label="Facebook">' + ICONS.fb + '</a>' +
        '</div>' +
      '</div>';
  }

  var footer = document.querySelector('[data-slot="footer"]');
  if (footer) {
    footer.outerHTML = '<footer class="site-footer"><div class="container">' +
      '<span class="footer-egg"><span class="egg-a">' + esc(SITE.copyright) + '</span>' +
      '<span class="egg-b" aria-hidden="true">' + esc(SITE.footerEgg) + '</span></span>' +
    '</div></footer>';
    // 觸控裝置沒有游標：點一下顯示 2.5 秒再換回來
    var egg = document.querySelector('.footer-egg'), eggT;
    if (egg && !window.matchMedia('(hover: hover)').matches) {
      egg.addEventListener('click', function () {
        egg.classList.add('is-on'); clearTimeout(eggT);
        eggT = setTimeout(function () { egg.classList.remove('is-on'); }, 2500);
      });
    }
  }

  var items = '';
  if (SITE.email) items +=
    '<div class="modal-row">' +
      '<a class="modal-item" href="mailto:' + SITE.email + '">' + ICONS.mail + esc(SITE.email) + '</a>' +
      '<button class="copy-btn js-copy" type="button" data-copy="' + esc(SITE.email) + '" aria-label="複製信箱">' +
        '<span class="copy-icon">' + ICONS.copy + '</span><span class="copy-done">' + ICONS.check + '</span>' +
      '</button>' +
      '<span class="copy-tip" role="status" aria-live="polite"></span>' +
    '</div>';
  document.body.insertAdjacentHTML('beforeend',
    '<div class="modal-overlay" role="dialog" aria-modal="true" aria-label="Contact">' +
      '<div class="modal-box">' +
        '<button class="btn-icon modal-close" type="button" aria-label="關閉">' + ICONS.close + '</button>' +
        '<h2 class="modal-title">Contact</h2>' +
        '<div class="modal-items">' + items + '</div>' +
      '</div>' +
    '</div>');
}

/* ---- 卡片 HTML ---- */
// 卡片標籤：先放大分類（與篩選按鈕一致），再放細項標籤（# 開頭）；跟大分類重複的細項不再顯示
// 封面放大（例如照片兩側有多餘背景）：資料裡加 coverZoom: 1.1
function zoomAttr(p) { return p.coverZoom ? ' style="--zoom:' + p.coverZoom + '"' : ''; }
// 類別一律照篩選器（SITE_CATEGORIES）的順序排列
function catList(p) {
  return p.categories.slice().sort(function (a, b) { return SITE_CATEGORIES.indexOf(a) - SITE_CATEGORIES.indexOf(b); });
}
function tagList(p) {
  return p.tags.filter(function (t) { return p.categories.indexOf(t) < 0; });
}
function tagsHTML(p) {
  return '<div class="card-tags">' +
    catList(p).map(function (c) { return '<span class="cat">' + esc(c) + '</span>'; }).join('') +
    tagList(p).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>';
}
function cardH(p) {
  return '<a class="card-h reveal" href="project.html?id=' + p.id + '">' +
    '<div class="card-img"><img' + zoomAttr(p) + ' src="' + projectImage(p.id, p.cover) + '" alt="' + esc(p.title) + '" loading="lazy"></div>' +
    '<div class="card-h-body"><div>' + tagsHTML(p) + '<h3 class="card-h-title">' + esc(p.title) + '</h3></div>' +
    '<div class="card-h-foot"><span class="card-arrow">' + ICONS.arrow56 + '</span></div></div>' +
  '</a>';
}
function cardV(p) {
  return '<a class="card-v reveal" href="project.html?id=' + p.id + '" data-cats="' + esc(p.categories.join('|')) + '">' +
    '<div class="card-img"><img' + zoomAttr(p) + ' src="' + projectImage(p.id, p.cover) + '" alt="' + esc(p.title) + '" loading="lazy"></div>' +
    '<div class="card-v-body">' + tagsHTML(p) +
      '<div class="card-v-row"><h3 class="card-v-title">' + esc(p.title) + '</h3><span class="card-arrow">' + ICONS.arrow56 + '</span></div>' +
    '</div>' +
  '</a>';
}

/* ---- 首頁：Hero 輪播 ---- */
function initHero() {
  var root = document.querySelector('.hero');
  if (!root || !window.SITE_HERO) return;
  var slidesWrap = root.querySelector('.hero-viewport');
  var dotsWrap = root.querySelector('.hero-dots');
  var prev = root.querySelector('.hero-prev');
  var next = root.querySelector('.hero-next');
  var data = SITE_HERO.map(function (h) { return { h: h, p: findProject(h.id) }; }).filter(function (d) { return d.p; });

  slidesWrap.innerHTML = data.map(function (d, i) {
    return '<div class="hero-slide' + (i === 0 ? ' is-active' : '') + '" aria-hidden="' + (i !== 0) + '">' +
      '<img' + (d.h.zoom ? ' style="--zoom:' + d.h.zoom + '"' : '') + ' src="' + projectImage(d.p.id, d.h.image) + '" alt="' + esc(d.p.title) + '"' + (i === 0 ? ' fetchpriority="high"' : ' loading="lazy"') + '>' +
      '</div>';
  }).join('') +
  '<div class="hero-card-wrap"><div class="container"><div class="hero-card">' +
    '<div class="hero-card-text fade"><h2 class="hero-card-title"></h2><p class="hero-card-desc"></p></div>' +
    '<div class="hero-card-action"><div><div class="hero-card-action-pad"><a class="btn-text-icon hero-card-link" href="#">Show Detail<span class="icon-wrap">' + ICONS.arrow24 + '</span></a></div></div></div>' +
  '</div></div></div>';

  dotsWrap.innerHTML = data.map(function (d, i) {
    return '<button class="hero-dot' + (i === 0 ? ' is-active' : '') + '" type="button" aria-label="第 ' + (i + 1) + ' 張：' + esc(d.p.title) + '"></button>';
  }).join('');

  var slides = slidesWrap.querySelectorAll('.hero-slide');
  var dots = dotsWrap.querySelectorAll('.hero-dot');
  var card = slidesWrap.querySelector('.hero-card');
  var title = card.querySelector('.hero-card-title');
  var desc = card.querySelector('.hero-card-desc');
  var link = card.querySelector('.hero-card-link');
  var cur = 0, timer = null;

  function fill(i) {
    title.textContent = data[i].p.title;
    desc.textContent = data[i].p.summary || data[i].p.desc[0];
    link.href = 'project.html?id=' + data[i].p.id;
    link.setAttribute('aria-label', 'Show Detail：' + data[i].p.title);
  }
  function go(i, user) {
    i = (i + data.length) % data.length;   // 無限輪播：第一張往前接最後一張、最後一張往後接第一張
    if (i === cur) return;
    slides[cur].classList.remove('is-active'); slides[cur].setAttribute('aria-hidden', 'true');
    dots[cur].classList.remove('is-active');
    cur = i;
    slides[cur].classList.add('is-active'); slides[cur].setAttribute('aria-hidden', 'false');
    dots[cur].classList.add('is-active');
    card.classList.add('is-switching');
    setTimeout(function () { fill(cur); card.classList.remove('is-switching'); }, 300);
  }

  /* 自動輪播：計時直接用色塊條上的 CSS 進度動畫（hero-progress），
     動畫跑完（animationend）就換下一張，所以進度條和換頁永遠同步；
     滑鼠移到輪播上、或輪播捲出畫面時暫停，回來後從暫停處繼續。 */
  var DURATION = 6000;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.style.setProperty('--hero-duration', DURATION + 'ms');
    root.classList.add('is-autoplay');
    dotsWrap.addEventListener('animationend', function (e) {
      if (e.target === dots[cur] && e.animationName === 'hero-progress') go(cur + 1);
    });
    // 只有游標停在「說明卡片」或「切換控制列」上（代表正在閱讀或準備操作）才暫停；
    // 游標停在大圖上不暫停，避免筆電上 Banner 佔滿畫面時永遠不輪播
    var hovering = false, offscreen = false;
    var syncPause = function () { root.classList.toggle('is-paused', hovering || offscreen); };
    [card, root.querySelector('.hero-controls')].forEach(function (el) {
      el.addEventListener('mouseenter', function () { hovering = true; syncPause(); });
      el.addEventListener('mouseleave', function () { hovering = false; syncPause(); });
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { offscreen = !en[0].isIntersecting; syncPause(); }, { threshold: 0.25 }).observe(root);
    }
  }

  fill(0);
  prev.addEventListener('click', function () { go(cur - 1, true); });
  next.addEventListener('click', function () { go(cur + 1, true); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i, true); }); });

  // 手機左右滑動切換
  var sx = null;
  slidesWrap.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  slidesWrap.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) go(dx < 0 ? cur + 1 : cur - 1, true);
    sx = null;
  });
}

/* ---- 首頁：精選專案（前 3 個）---- */
function initHomeProjects() {
  var list = document.querySelector('.js-home-projects');
  if (!list) return;
  list.innerHTML = SITE_PROJECTS.slice(0, 3).map(cardH).join('');
}

/* ---- Projects 頁：列表 + 篩選 ---- */
var FILTER_KEY = 'solpo-projects-filter';   // 記住上次篩選（sessionStorage：關掉分頁才重置）
function initProjects() {
  var grid = document.querySelector('.js-projects-grid');
  var chipsWrap = document.querySelector('.js-filter');
  if (!grid || !chipsWrap) return;
  grid.innerHTML = SITE_PROJECTS.map(cardV).join('');

  var cats = ['全部類別'].concat(SITE_CATEGORIES);
  chipsWrap.innerHTML = cats.map(function (c, i) {
    return '<button class="chip' + (i === 0 ? ' is-selected' : '') + '" type="button" data-cat="' + (i === 0 ? '' : esc(c)) + '" aria-pressed="' + (i === 0) + '">' + esc(c) + ICONS.check + '</button>';
  }).join('');

  var empty = document.querySelector('.js-projects-empty');
  function apply(cat) {
    var shownCards = [];
    grid.querySelectorAll('.card-v').forEach(function (card) {
      var ok = !cat || card.dataset.cats.split('|').indexOf(cat) > -1;
      card.classList.toggle('is-hidden', !ok);
      if (ok) shownCards.push(card);
    });
    if (empty) empty.hidden = shownCards.length > 0;
    replayReveal(shownCards);
  }
  /* 每次切換類別都重播卡片浮現動畫：畫面內的卡片依序浮現，畫面外的等捲到時再浮現（跟往下捲的效果一致）*/
  function replayReveal(cards) {
    // 先在「關閉過渡」的狀態下瞬間回到隱藏，強制重排後再恢復過渡，動畫才會每次從頭播
    cards.forEach(function (c) { c.style.transition = 'none'; c.style.transitionDelay = '0s'; c.classList.remove('visible'); });
    void grid.offsetWidth;
    cards.forEach(function (c) { c.style.transition = ''; });
    var i = 0, vh = window.innerHeight;
    cards.forEach(function (c) {
      var r = c.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        c.style.transitionDelay = (i++ * 0.08) + 's';
        c.classList.add('visible');
      } else if (window.revealIO) {
        window.revealIO.observe(c);
      } else if (!('IntersectionObserver' in window)) {
        c.classList.add('visible');
      }   // 頁面剛載入時 revealIO 還沒建立：不處理，稍後的捲動浮現會自動接手
    });
  }
  chipsWrap.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    chipsWrap.querySelectorAll('.chip').forEach(function (c) {
      c.classList.toggle('is-selected', c === chip);
      c.setAttribute('aria-pressed', c === chip);
    });
    apply(chip.dataset.cat);
    var url = new URL(location.href);
    if (chip.dataset.cat) url.searchParams.set('cat', chip.dataset.cat); else url.searchParams.delete('cat');
    history.replaceState(history.state, '', url);
    try { sessionStorage.setItem(FILTER_KEY, chip.dataset.cat); } catch (err) {}
  });
  // 優先用網址上的 ?cat=，沒有的話用這個分頁上次選的篩選（從專案頁返回、點 Header 的 Projects 都會記得）
  var initCat = new URLSearchParams(location.search).get('cat');
  if (initCat === null) { try { initCat = sessionStorage.getItem(FILTER_KEY); } catch (err) {} }
  if (initCat) {
    var chip = chipsWrap.querySelector('.chip[data-cat="' + initCat + '"]');
    if (chip) chip.click();
  }
}

/* ---- 專案詳情頁 ---- */
function initDetail() {
  var root = document.querySelector('.js-detail');
  if (!root) return;
  var id = new URLSearchParams(location.search).get('id');
  var idx = SITE_PROJECTS.findIndex(function (p) { return p.id === id; });
  if (idx < 0) { location.replace('404.html'); return; }
  var p = SITE_PROJECTS[idx];
  document.title = p.title + '｜曉山波 SOLPO Design Studio';
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', p.summary || p.desc[0]);
  document.querySelector('.js-back-label').textContent = p.title;

  var imgs = '';
  var caps = p.captions || {}, heads = p.headings || {};
  // 圖說：「名稱｜說明」或「名稱：說明」→ 名稱加粗
  function capHTML(t) {
    var i = t.indexOf('：'); if (i < 0) i = t.indexOf('｜');
    if (i < 0) return esc(t);
    return '<strong>' + esc(t.slice(0, i)) + '</strong>' + esc(t.slice(i + 1));
  }
  for (var n = 1; n <= p.images; n++) {
    // 封面也會出現在下方圖片列表（依原本順序），不另外略過
    imgs += '<figure class="detail-figure reveal' + (heads[n] ? ' has-heading' : '') + '">' +
      (heads[n] ? '<h3 class="detail-heading">' + esc(heads[n]) + '</h3>' : '') +
      '<button class="zoomable" type="button" aria-label="放大檢視第 ' + n + ' 張圖">' +
      '<img src="' + projectImage(p.id, n) + '" alt="' + esc(caps[n] || heads[n] || (p.title + ' 圖 ' + n)) + '" loading="lazy"></button>' +
      (caps[n] ? '<figcaption class="detail-caption">' + capHTML(caps[n]) + '</figcaption>' : '') +
      '</figure>';
  }
  // 或許你也想看看：從其他專案隨機挑 3 個（每次進入頁面都重新挑）
  var others = SITE_PROJECTS.filter(function (q) { return q.id !== p.id; });
  for (var k = others.length - 1; k > 0; k--) { var r = Math.floor(Math.random() * (k + 1)); var tmp = others[k]; others[k] = others[r]; others[r] = tmp; }
  var picks = others.slice(0, 3);

  root.innerHTML =
    '<div class="detail-hero"><img' + zoomAttr(p) + ' src="' + projectImage(p.id, p.cover) + '" alt="' + esc(p.title) + '" fetchpriority="high"></div>' +
    '<div class="detail-body">' +
      '<h1 class="detail-title">' + esc(p.title) + '</h1>' +
      '<p class="detail-meta">類別：' + catList(p).map(esc).join('、') +
        (tagList(p).length ? '<span class="detail-meta-sep"></span><span class="detail-tags">標籤：' + tagList(p).map(esc).join('、') + '</span>' : '') + '</p>' +
      '<div class="detail-divider" role="presentation"></div>' +
      '<div class="detail-desc">' + p.desc.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
        (p.list ? '<ul class="detail-list">' + p.list.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') +
      '</div>' +
      (imgs ? '<div class="detail-images">' + imgs + '</div>' : '') +
    '</div>' +
    '<section class="related" aria-labelledby="related-title">' +
      '<h2 class="related-title" id="related-title">或許你也想看看...</h2>' +
      '<div class="card-list">' + picks.map(cardH).join('') + '</div>' +
    '</section>';
  var heroImg = root.querySelector('.detail-hero img');
  // 直式圖預設對齊上方；資料有 coverPos 時改用指定位置（例如 'center'）
  if (p.coverPos) heroImg.style.objectPosition = p.coverPos;
  var markTall = function () { if (!p.coverPos && heroImg.naturalHeight / heroImg.naturalWidth > 1.2) heroImg.classList.add('is-tall'); };
  if (heroImg.complete) markTall(); else heroImg.addEventListener('load', markTall);
  initLightbox(root);
}

/* ---- 燈箱：詳情頁圖片點擊放大 ----
   一般圖片：完整比例塞進畫面（以可視範圍為準）
   長形圖片（高 / 寬 > 2，例如網頁長圖、書籤、型錄）：以寬度為主等比例顯示，上下滑動瀏覽 */
var LONG_RATIO = 2;
function initLightbox(root) {
  var btns = root.querySelectorAll('.zoomable');
  if (!btns.length) return;
  document.body.insertAdjacentHTML('beforeend',
    '<div class="lightbox" role="dialog" aria-modal="true" aria-label="圖片檢視" hidden>' +
      '<button class="btn-icon lightbox-close" type="button" aria-label="關閉圖片檢視">' + ICONS.close + '</button>' +
      '<div class="lightbox-stage"><img class="lightbox-img" alt=""></div>' +
    '</div>');
  var lb = document.querySelector('.lightbox');
  var stage = lb.querySelector('.lightbox-stage');
  var img = lb.querySelector('.lightbox-img');
  var closeBtn = lb.querySelector('.lightbox-close');
  var opener = null;

  function layout() {
    var long = img.naturalWidth && img.naturalHeight / img.naturalWidth > LONG_RATIO;
    lb.classList.toggle('is-long', !!long);
    // 原圖寬度存成 CSS 變數，長形圖以「畫面寬、1200px、原圖寬」三者最小值顯示，不放大到糊掉
    img.style.setProperty('--natural-w', img.naturalWidth ? img.naturalWidth + 'px' : '100%');
  }
  function open(btn) {
    var src = btn.querySelector('img');
    opener = btn;
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    if (img.complete) layout(); else img.onload = layout;
    lb.hidden = false;
    lb.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { lb.classList.add('open'); });
    closeBtn.focus({ preventScroll: true });
  }
  function close() {
    if (lb.hidden) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { lb.hidden = true; img.removeAttribute('src'); }, 250);
    if (opener) opener.focus({ preventScroll: true });
  }
  window.closeLightbox = close;
  window.isLightboxOpen = function () { return !lb.hidden && lb.classList.contains('open'); };

  btns.forEach(function (b) { b.addEventListener('click', function () { open(b); }); });
  closeBtn.addEventListener('click', close);
  // 點圖片以外的深色區域也可以關閉
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target === stage) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
}

/* ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  // HTML 內的 <span data-icon="名稱"> 換成對應的 SVG
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    if (ICONS[el.dataset.icon]) el.outerHTML = ICONS[el.dataset.icon];
  });
  renderChrome();
  initHero();
  initHomeProjects();
  initProjects();
  initDetail();

  /* ---- Mobile menu ---- */
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var openMenu = function () { mobileMenu && mobileMenu.classList.add('open'); hamburger && hamburger.classList.add('is-open'); };
  var closeMenu = function () { mobileMenu && mobileMenu.classList.remove('open'); hamburger && hamburger.classList.remove('is-open'); };
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', openMenu);
    mobileMenu.querySelector('.mobile-menu-close').addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }

  /* ---- Android 返回手勢：先關選單，不直接跳出網站 ---- */
  history.pushState(null, '');
  window.addEventListener('popstate', function () {
    // 返回手勢依序關閉：燈箱 → 選單 → Contact 彈窗；都沒開就留在本頁
    if (window.isLightboxOpen && window.isLightboxOpen()) window.closeLightbox();
    else if (mobileMenu && mobileMenu.classList.contains('open')) closeMenu();
    else if (modal && modal.classList.contains('open')) closeModal();
    history.pushState(null, '');
  });

  /* ---- Header：手機往下滑隱藏（累積距離 40px），往上滑顯示 ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    // 捲離 Banner（首頁）或離開頁面頂端（其他頁）後，Header 才加上毛玻璃背景
    var heroEl = document.querySelector('.hero-viewport');
    var updateHeaderBg = function () {
      var scrolled = heroEl
        ? heroEl.getBoundingClientRect().bottom <= header.getBoundingClientRect().bottom
        : window.scrollY > 8;
      header.classList.toggle('is-scrolled', scrolled);
    };
    updateHeaderBg();
    window.addEventListener('scroll', updateHeaderBg, { passive: true });
    window.addEventListener('resize', updateHeaderBg, { passive: true });

    var lastY = window.scrollY, downDelta = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      // 所有尺寸：往下捲（累積 40px）隱藏 Header，往上捲再出現；選單打開時不隱藏
      var menuOpen = mobileMenu && mobileMenu.classList.contains('open');
      if (y < 80 || menuOpen) { header.classList.remove('nav-hidden'); downDelta = 0; }
      else if (y > lastY) { downDelta += y - lastY; if (downDelta > 40) header.classList.add('nav-hidden'); }
      else if (y < lastY - 4) { header.classList.remove('nav-hidden'); downDelta = 0; }
      document.body.classList.toggle('header-hidden', header.classList.contains('nav-hidden'));
      lastY = y;
    }, { passive: true });
  }

  /* ---- 返回按鈕：固定左上角；往下捲（累積 40px）隱藏，往上捲或停住 3 秒再出現 ---- */
  var backBtn = document.querySelector('.btn-back');
  if (backBtn) {
    var slot = backBtn.parentNode;
    slot.classList.add('back-slot');
    backBtn.classList.add('is-fixed');
    var placeBack = function () { backBtn.style.left = slot.getBoundingClientRect().left + 'px'; };
    placeBack();
    window.addEventListener('resize', placeBack, { passive: true });

    // About 頁 Info 區釘住時，返回按鈕的位置剛好壓在「Info」大標上，這段期間不顯示
    var infoTrack = document.querySelector('.info-track');
    var inPinnedInfo = function () {
      if (!infoTrack || !infoTrack.classList.contains('is-pinned')) return false;
      var r = infoTrack.getBoundingClientRect();
      return r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
    };
    var showBack = function () { if (!inPinnedInfo()) backBtn.classList.remove('is-hidden'); };
    var hideBack = function () { backBtn.classList.add('is-hidden'); };
    var bLast = window.scrollY, bDown = 0, idleT;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < 80) { showBack(); bDown = 0; }
      else if (y > bLast) { bDown += y - bLast; if (bDown > 40) hideBack(); }
      else if (y < bLast - 4) { bDown = 0; showBack(); }
      if (inPinnedInfo()) hideBack();
      bLast = y;
      clearTimeout(idleT);
      idleT = setTimeout(showBack, 3000);          // 畫面停住 3 秒後再出現
    }, { passive: true });
  }

  /* ---- Contact modal ---- */
  var modal = document.querySelector('.modal-overlay');
  function openModal() { closeMenu(); modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }
  document.querySelectorAll('.js-contact').forEach(function (b) { b.addEventListener('click', openModal); });
  modal.querySelector('.modal-close').addEventListener('click', closeModal);

  /* ---- 複製信箱 ---- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {      // 本機直接開檔（file://）時的備援
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (err) { reject(err); }
      ta.remove();
    });
  }
  modal.querySelectorAll('.js-copy').forEach(function (btn) {
    var tip = btn.parentNode.querySelector('.copy-tip'), t;
    btn.addEventListener('click', function () {
      copyText(btn.dataset.copy).then(function () {
        btn.classList.add('is-copied'); tip.textContent = '已複製'; tip.classList.add('show');
      }, function () {
        tip.textContent = '請手動複製'; tip.classList.add('show');
      });
      clearTimeout(t);
      t = setTimeout(function () { btn.classList.remove('is-copied'); tip.classList.remove('show'); }, 1800);
    });
  });
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeMenu(); } });

  /* ---- 觸控按壓回饋（touchstart/touchend，不依賴 transition）---- */
  var pressSel = '.btn-primary, .btn-icon, .zoomable, .copy-btn, .btn-text-icon, .btn-back, .chip, .card-h, .card-v, .text-btn';
  document.addEventListener('touchstart', function (e) {
    var el = e.target.closest(pressSel); if (el) el.classList.add('is-pressed');
  }, { passive: true });
  ['touchend', 'touchcancel'].forEach(function (ev) {
    document.addEventListener(ev, function () {
      document.querySelectorAll('.is-pressed').forEach(function (el) { el.classList.remove('is-pressed'); });
    });
  });

  /* ---- 換頁淡出 ---- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    var href = a.getAttribute('href');
    if (!href || href[0] === '#' || /^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault();
    document.body.style.animation = 'none';
    document.body.style.transition = 'opacity .2s ease-out';
    document.body.style.opacity = '0';
    setTimeout(function () { location.href = href; }, 200);
  });
  // 從上一頁快取返回時恢復顯示
  window.addEventListener('pageshow', function (e) { if (e.persisted) document.body.style.opacity = '1'; });

  /* ---- 圖片防右鍵儲存與拖曳（含之後才產生的圖片：專案卡片、詳情頁、燈箱） ---- */
  document.addEventListener('contextmenu', function (e) {
    if (e.target.closest && e.target.closest('img, .zoomable, .lightbox')) e.preventDefault();
  });
  document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  /* ---- About 聯絡表單：驗證＋防機器人（隱藏欄位陷阱、填寫時間太短直接擋）＋送出 ---- */
  var cform = document.querySelector('.js-contact-form');
  if (cform) {
    var startedAt = Date.now();
    // 自訂下拉選單（原生 select 展開後的樣式改不了，所以自己做）：滑鼠、觸控、鍵盤（↑↓ Enter Esc）都能操作
    cform.querySelectorAll('.js-select').forEach(function (box) {
      var hidden = box.querySelector('input[type="hidden"]'), trig = box.querySelector('.select-trigger'),
          valEl = box.querySelector('.select-value'), list = box.querySelector('.select-list'),
          opts = [].slice.call(list.querySelectorAll('[role="option"]')), placeholder = valEl.textContent, active = -1;
      var mark = function (i) { active = i; opts.forEach(function (o, k) { o.classList.toggle('is-active', k === i); }); };
      var open = function () { box.classList.add('is-open'); trig.setAttribute('aria-expanded', 'true');
        mark(Math.max(0, opts.findIndex(function (o) { return o.getAttribute('aria-selected') === 'true'; }))); };
      var close = function () { box.classList.remove('is-open'); trig.setAttribute('aria-expanded', 'false'); };
      var choose = function (i) {
        opts.forEach(function (o, k) { o.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
        hidden.value = i < 0 ? '' : opts[i].dataset.value;
        valEl.textContent = i < 0 ? placeholder : opts[i].textContent;
        trig.classList.toggle('is-empty', i < 0);
      };
      trig.addEventListener('click', function () { box.classList.contains('is-open') ? close() : open(); });
      opts.forEach(function (o, k) {
        o.addEventListener('click', function () { choose(k); close(); trig.focus(); });
        o.addEventListener('mousemove', function () { mark(k); });
      });
      trig.addEventListener('keydown', function (e) {
        var isOpen = box.classList.contains('is-open');
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); if (!isOpen) return open();
          mark((active + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length);
        } else if ((e.key === 'Enter' || e.key === ' ') && isOpen) { e.preventDefault(); choose(active); close(); }
        else if (e.key === 'Escape' || e.key === 'Tab') close();
      });
      document.addEventListener('click', function (e) { if (!box.contains(e.target)) close(); });
      cform.addEventListener('reset', function () { setTimeout(function () { choose(-1); }, 0); });
    });
    var statusEl = cform.querySelector('.form-status');
    var setStatus = function (type, msg) { statusEl.className = 'form-status is-' + type; statusEl.textContent = msg; };
    var fieldErr = function (input, msg) {
      var wrap = input.closest('.form-field'); wrap.classList.toggle('has-error', !!msg);
      wrap.querySelector('.form-error').textContent = msg || '';
    };
    var check = function (input) {
      var v = input.value.trim(), msg = '';
      if (input.required && !v) msg = '請填寫' + input.dataset.label;
      else if (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = '信箱格式好像不太對';
      else if (input.type === 'tel' && v && !/^[\d\s()+\-#轉]{7,}$/.test(v)) msg = '電話格式好像不太對';
      fieldErr(input, msg); return !msg;
    };
    cform.querySelectorAll('[data-label]').forEach(function (inp) {
      inp.addEventListener('blur', function () { if (inp.value) check(inp); });
      inp.addEventListener('input', function () { if (inp.closest('.form-field').classList.contains('has-error')) check(inp); });
    });
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      cform.querySelectorAll('[data-label]').forEach(function (inp) { if (!check(inp)) { ok = false; first = first || inp; } });
      if (!ok) { first.focus(); setStatus('error', '還有欄位需要補上喔'); return; }
      // 機器人防護：隱藏欄位有值、或 3 秒內就送出 → 當作機器人，假裝成功但不寄出
      if (cform.querySelector('[name="botcheck"]').checked || cform.querySelector('[name="website"]').value || Date.now() - startedAt < 3000) {
        cform.reset(); setStatus('success', '已收到你的訊息，我們會盡快回覆！'); return;
      }
      var data = {
        '公司或單位名稱': cform.company.value.trim(), '電話': cform.phone.value.trim(),
        '聯絡信箱': cform.email.value.trim(), '需求': cform.need.value || '未選擇', '說明': cform.message.value.trim() || '（未填）'
      };
      if (!SITE.formKey) {   // 尚未申請表單服務：改開郵件程式
        var body = Object.keys(data).map(function (k) { return k + '：' + data[k]; }).join('\n');
        location.href = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent('網站聯絡｜' + data['公司或單位名稱']) + '&body=' + encodeURIComponent(body);
        setStatus('info', '已幫你開啟郵件程式，確認內容後按下寄出就完成了。');
        return;
      }
      var btn = cform.querySelector('button[type="submit"]'); btn.disabled = true; setStatus('info', '傳送中⋯');
      var payload = Object.assign({ access_key: SITE.formKey, subject: '曉山波網站聯絡｜' + data['公司或單位名稱'], from_name: '曉山波官網', replyto: data['聯絡信箱'], botcheck: false }, data);
      fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) { cform.reset(); setStatus('success', '已收到你的訊息，我們會盡快回覆！'); }
          else throw new Error(res.message);
        })
        .catch(function () { setStatus('error', '送出失敗，請稍後再試，或直接寫信到 ' + SITE.email); })
        .then(function () { btn.disabled = false; });
    });
  }

  /* ---- About Service icon 動態：桌機滑入播一次；觸控裝置捲到畫面上播一次 ---- */
  var svcBlocks = document.querySelectorAll('.block-service');
  if (svcBlocks.length) {
    var playFx = function (block) {
      if (block._fxTimer) return;                       // 播放中不重來，避免游標來回時閃爍
      block.classList.remove('is-playing'); void block.offsetWidth;
      block.classList.add('is-playing');
      block._fxTimer = setTimeout(function () { block.classList.remove('is-playing'); block._fxTimer = null; }, 2100);
    };
    if (window.matchMedia('(hover: hover)').matches) {
      // 以 icon 方塊為觸發範圍：游標移出 icon 再移入就會再播一次（不必離開整個服務區塊）
      svcBlocks.forEach(function (b) {
        var icon = b.querySelector('.service-icon');
        (icon || b).addEventListener('mouseenter', function () { playFx(b); });
      });
    }
    // 自動輪播：Service 區在畫面上時，每 AUTO_GAP 毫秒依序播一輪，每個 icon 錯開 STAGGER 毫秒
    // 讓沒去滑 icon 的人也看得到動態；捲出畫面、分頁切走或「減少動態效果」時不播
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var AUTO_GAP = 9000, STAGGER = 450, FIRST_DELAY = 600;
      var svcArr = Array.prototype.slice.call(svcBlocks);
      var inView = new Set(), autoTimer = null, waveTimers = [];
      var wave = function () {
        var k = 0; waveTimers = [];
        svcArr.forEach(function (b) {
          if (!inView.has(b)) return;
          waveTimers.push(setTimeout(function () { playFx(b); }, k++ * STAGGER));
        });
      };
      var stopAuto = function () {
        clearTimeout(autoTimer); autoTimer = null;
        waveTimers.forEach(clearTimeout); waveTimers = [];
      };
      var startAuto = function () {
        if (autoTimer || !inView.size || document.hidden) return;
        var loop = function () { wave(); autoTimer = setTimeout(loop, AUTO_GAP); };
        autoTimer = setTimeout(loop, FIRST_DELAY);
      };
      var autoIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { en.isIntersecting ? inView.add(en.target) : inView.delete(en.target); });
        inView.size ? startAuto() : stopAuto();
      }, { threshold: 0.6 });
      svcArr.forEach(function (b) { autoIO.observe(b); });
      document.addEventListener('visibilitychange', function () { document.hidden ? stopAuto() : startAuto(); });
    }
  }

  /* ---- About Info 釘選切換（桌機 >1024px）----
     軌道（.info-track）高度 = 釘住區塊的高度 + 3 段捲動距離；捲到哪一段就顯示哪一段，第三段看完才放開 */
  var track = document.querySelector('.js-info-scrolly');
  if (track) {
    var pin = track.querySelector('.info-pin');
    var blocks = track.querySelectorAll('.info-block');
    var pics = track.querySelectorAll('.info-media .info-pic');
    var dots = track.querySelectorAll('.info-progress span');
    var STEP = 0.6;           // 每段佔 0.6 個畫面高度的捲動距離
    var curStep = -1, ticking = false;
    var setStep = function (i) {
      if (i === curStep) return; curStep = i;
      [blocks, pics, dots].forEach(function (list) {
        list.forEach(function (el, k) { el.classList.toggle('is-active', k === i); });
      });
    };
    var layoutTrack = function () {
      track.style.height = '';
      var enable = window.innerWidth > 1024;
      track.classList.toggle('is-pinned', enable);
      if (enable) {
        // 釘住後整塊（大標＋圖＋最長的一段文字）要完整放進畫面，放不下（螢幕太矮）就改回一般排版
        var pinTop = parseFloat(getComputedStyle(pin).top) || 0;
        if (pin.offsetHeight + pinTop + 8 > window.innerHeight) { enable = false; track.classList.remove('is-pinned'); }
      }
      track.style.height = enable ? (pin.offsetHeight + blocks.length * window.innerHeight * STEP) + 'px' : '';
      update();
    };
    var update = function () {
      ticking = false;
      if (!track.classList.contains('is-pinned')) { setStep(0); return; }
      var pinTop = parseFloat(getComputedStyle(pin).top) || 0;
      var scrolled = pinTop - track.getBoundingClientRect().top;
      var idx = Math.floor(Math.max(0, scrolled) / (window.innerHeight * STEP));
      setStep(Math.min(blocks.length - 1, idx));
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    var rT; window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(layoutTrack, 150); });
    layoutTrack();
  }

  /* ---- Scroll reveal ---- */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.filter(function (en) { return en.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; })
        .forEach(function (en, i) {
          en.target.style.transitionDelay = (i * 0.08) + 's';
          en.target.classList.add('visible');
          io.unobserve(en.target);
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function (el) { io.observe(el); });
    window.revealIO = io;                         // 讓 Projects 篩選切換時可以重新觀察畫面外的卡片
  } else {
    els.forEach(function (el) { el.classList.add('visible'); });
  }
});

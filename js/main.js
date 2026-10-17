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
  formKey:   '3a766e2f-3f50-46bb-afa2-a6872a138e95',
  copyright: 'Copyright © 2026 Po Hsu.',
  footerEgg: '歡迎來到曉山波設計',   // 游標移到 Copyright 上時出現的彩蛋文字
};

/* ---- Icons（Material Symbols wght300 + SNS）---- */
var ICONS = {
  /* 全站功能圖示：線條版 Material Symbols 造型，線條固定 1.75px（不隨圖示尺寸變粗），樣式見 css .i-line */
  arrow56: '<svg class="i i-line" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrow24: '<svg class="i i-line i-24" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chevL: '<svg class="i i-line" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5 9 12l5.5 5.5"/></svg>',
  chevL24: '<svg class="i i-line i-24" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5 9 12l5.5 5.5"/></svg>',
  chevR: '<svg class="i i-line" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 6.5 15 12l-5.5 5.5"/></svg>',
  check: '<svg class="i i-line i-24" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 9.5 17 19 7.5"/></svg>',
  ig: '<svg class="i i-line" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="f" cx="17.1" cy="6.9" r="1.1"/></svg>',
  fb: '<svg class="i i-line" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M15.5 8.25h-1.25a2.25 2.25 0 0 0-2.25 2.25v10M9.5 13.25h5.5"/></svg>',
  copy: '<svg class="i i-line i-24" viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="3.75" width="11" height="13.5" rx="2"/><path d="M5 8.25v10.5a2 2 0 0 0 2 2h8.25"/></svg>',
  mail: '<svg class="i i-line" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7.5 8 5.5 8-5.5"/></svg>',
  menu: '<svg class="i i-line" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg class="i i-line" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
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
        '<a href="index.html" class="header-logo glass" aria-label="曉山波 首頁"><img src="assets/logo.webp" alt="曉山波 SOLPO Design Studio" width="231" height="60"></a>' +
        '<nav class="header-menu glass" aria-label="主選單">' +
          '<a class="sns-link" href="' + SITE.instagram + '"' + extAttrs(SITE.instagram) + ' aria-label="Instagram">' + ICONS.ig + '</a>' +
          '<a class="sns-link" href="' + SITE.facebook + '"' + extAttrs(SITE.facebook) + ' aria-label="Facebook">' + ICONS.fb + '</a>' +
          '<span class="header-divider" aria-hidden="true"></span>' +
          '<a class="text-btn' + (page === 'about' ? ' is-active' : '') + '" href="about.html">About</a>' +
          '<a class="text-btn' + (page === 'projects' || page === 'project' ? ' is-active' : '') + '" href="projects.html">Projects</a>' +
          '<a class="btn-primary' + (page === 'contact' ? ' is-active' : '') + '" href="contact.html">Contact ' + ICONS.arrow24 + '</a>' +
        '</nav>' +
        '<button class="nav-hamburger glass" type="button" aria-label="開啟選單">' + ICONS.menu + '</button>' +
      '</div></header>' +
      '<div class="mobile-menu" role="dialog" aria-modal="true" aria-label="選單">' +
        '<button class="mobile-menu-close" type="button" aria-label="關閉選單">' + ICONS.close + '</button>' +
        '<a class="text-btn" href="index.html">Home</a>' +
        '<a class="text-btn" href="about.html">About</a>' +
        '<a class="text-btn" href="projects.html">Projects</a>' +
        '<a class="btn-primary" href="contact.html">Contact ' + ICONS.arrow24 + '</a>' +
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
// 卡片封面用：除了 coverZoom，也套用 cardPos（調整卡片裁切位置，例如 'center 40%'）
function cardImgAttr(p) {
  var st = (p.coverZoom ? '--zoom:' + p.coverZoom + ';' : '') + (p.cardPos ? 'object-position:' + p.cardPos + ';' : '');
  return st ? ' style="' + st + '"' : '';
}
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
    '<div class="card-img"><img' + cardImgAttr(p) + ' src="' + projectImage(p.id, p.cover) + '" alt="' + esc(p.title) + '" loading="lazy"></div>' +
    '<div class="card-h-body"><div>' + tagsHTML(p) + '<h3 class="card-h-title">' + esc(p.title) + '</h3>' +
      '<p class="card-h-desc">' + esc(p.summary || p.desc[0] || '') + '</p></div>' +
    '<div class="card-h-foot"><span class="card-arrow">' + ICONS.arrow56 + '</span></div></div>' +
  '</a>';
}
function cardV(p) {
  return '<a class="card-v reveal" href="project.html?id=' + p.id + '" data-cats="' + esc(p.categories.join('|')) + '">' +
    '<div class="card-img"><img' + cardImgAttr(p) + ' src="' + projectImage(p.id, p.cover) + '" alt="' + esc(p.title) + '" loading="lazy"></div>' +
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
    '<div class="hero-card-action"><div><div class="hero-card-action-pad"><a class="btn-text-icon hero-card-link" href="#">View Detail<span class="icon-wrap">' + ICONS.arrow24 + '</span></a></div></div></div>' +
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

  /* .hero 加上 hero--below 時，說明與切換控制移到圖片下方的同一列 */
  if (root.classList.contains('hero--below')) {
    var bar = document.createElement('div');
    bar.className = 'hero-bar';
    bar.innerHTML = '<div class="container hero-bar-inner"></div>';
    var inner = bar.firstChild;
    var oldWrap = card.closest('.hero-card-wrap');
    inner.appendChild(card);
    inner.appendChild(root.querySelector('.hero-controls'));
    oldWrap.remove();
    slidesWrap.after(bar);
  }

  function fill(i) {
    title.textContent = data[i].p.title;
    desc.textContent = data[i].p.summary || data[i].p.desc[0];
    link.href = 'project.html?id=' + data[i].p.id;
    link.setAttribute('aria-label', 'View Detail：' + data[i].p.title);
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
    // 只有游標停在「View Detail」或「切換控制列」上（代表準備點擊）才暫停；
    // 停在大圖、標題、說明文字上都繼續輪播
    var hovering = false, offscreen = false;
    var syncPause = function () { root.classList.toggle('is-paused', hovering || offscreen); };
    [link, root.querySelector('.hero-controls')].forEach(function (el) {
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
  var pDesc = String(p.summary || p.desc[0] || '').replace(/\s+/g, ' ').slice(0, 150);
  if (meta) meta.setAttribute('content', pDesc);
  /* SEO：專案頁的 canonical 與分享預覽 */
  var pUrl = 'https://www.solpoart.com/project.html?id=' + encodeURIComponent(p.id);
  var head = document.head;
  var canon = document.createElement('link');
  canon.rel = 'canonical'; canon.href = pUrl; head.appendChild(canon);
  function setOg(prop, val) {
    var m = head.querySelector('meta[property="' + prop + '"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('property', prop); head.appendChild(m); }
    m.setAttribute('content', val);
  }
  setOg('og:title', document.title);
  setOg('og:description', pDesc);
  setOg('og:url', pUrl);
  setOg('og:type', 'article');
  setOg('og:image', 'https://www.solpoart.com/' + projectImage(p.id, p.cover || 1));
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
/* ---- About：Process 卡片按壓 3D 互動（游標所在的那一側被壓下去）----
   外層 .process-card-slot 不動、負責感應游標；內層 .process-card 才傾斜，避免傾斜後邊緣離開游標而抖動。
   數值：傾斜 2.5°、下壓 0.5%、透視 1000px、跟手速度 0.15；陰影偏移 12px、下落 0、模糊 24px、濃度 5%；觸控裝置與「減少動態」設定下不啟用。 */
function initProcessTilt() {
  var cards = document.querySelectorAll('.process-card');
  if (!cards.length) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var DEG = 2.5, PRESS = 0.5, EASE = 0.15;
  cards.forEach(function (card) {
    var slot = document.createElement('div');
    slot.className = 'process-card-slot';
    card.parentNode.insertBefore(slot, card);
    slot.appendChild(card);
    var cur = { x: 0, y: 0, p: 0 }, tgt = { x: 0, y: 0, p: 0 }, raf = null;
    function frame() {
      cur.x += (tgt.x - cur.x) * EASE; cur.y += (tgt.y - cur.y) * EASE; cur.p += (tgt.p - cur.p) * EASE;
      card.style.transform = 'rotateX(' + (-cur.y * DEG).toFixed(3) + 'deg) rotateY(' + (cur.x * DEG).toFixed(3) + 'deg) scale(' + (1 - cur.p * PRESS / 100).toFixed(4) + ')';
      // 陰影偏向卡片翹起的那一側：偏移 12px、模糊 24px、濃度 5%（顏色見 css .process-card-slot）
      card.style.setProperty('--tsx', (-cur.x * 12).toFixed(2) + 'px');
      card.style.setProperty('--tsy', (-cur.y * 12).toFixed(2) + 'px');
      card.style.setProperty('--tsb', (24 * cur.p).toFixed(2) + 'px');
      card.style.setProperty('--tso', (0.05 * cur.p).toFixed(4));
      var moving = Math.abs(tgt.x - cur.x) + Math.abs(tgt.y - cur.y) + Math.abs(tgt.p - cur.p) > 0.001;
      if (moving) { raf = requestAnimationFrame(frame); } else { raf = null; if (!tgt.p) card.style.transform = ''; }
    }
    function kick() { if (!raf) raf = requestAnimationFrame(frame); }
    slot.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = slot.getBoundingClientRect();
      tgt.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tgt.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      tgt.p = 1; kick();
    });
    slot.addEventListener('pointerleave', function () { tgt.x = 0; tgt.y = 0; tgt.p = 0; kick(); });
  });
}

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
  initProcessTilt();

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
  document.querySelectorAll('.js-copy').forEach(function (btn) {   // 彈窗與 Contact 頁共用
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
        '公司或單位名稱': cform.company.value.trim(), '市話/手機': cform.phone.value.trim(),
        '聯絡信箱': cform.email.value.trim(), '需求類別': cform.need.value || '未選擇', '說明': cform.message.value.trim() || '（未填）'
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

/* ============================================================
   入站轉場：水彩渲染（2026-10-24 試作、2026-10-30 上線）
   - 什麼時候播：從外面進來（打網址、書籤、搜尋結果、別的網站連過來）和「重新整理」都會播；
     點網站裡的連結換頁、按上一頁／下一頁時不播，維持原本的淡入淡出
   - 怎麼分辨：點站內連結時先在 sessionStorage 留一個記號，下一頁一載入就讀掉它；
     有記號 = 站內換頁，沒有記號 = 從外面來或重新整理
   - 做法：先用一張和背景同色（N-50）的「紙」蓋住畫面，從畫面正中間像一滴水彩暈開，
     暈開的地方露出頁面。邊緣是一段很寬（半徑的 45%）的柔和漸層（由好幾層微微錯開的不規則形狀疊出來），
     不會有硬邊或色線
   - 全程約 1.5 秒；系統開「減少動態效果」時不播
   - 這支檔案要放在 <head>，才能在頁面第一次畫出來之前就先蓋上紙
   ============================================================ */
(function () {
  var KEY = 'solpo-internal-nav';
  // 點站內連結時留記號（條件跟 main.js 的換頁淡出一樣：新分頁開啟、#錨點、外部連結、mailto 都不算）
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    var href = a.getAttribute('href');
    if (!href || href[0] === '#' || /^(https?:|mailto:|tel:)/.test(href)) return;
    try { sessionStorage.setItem(KEY, '1'); } catch (err) {}
  }, true);

  var internal = false;
  try { internal = sessionStorage.getItem(KEY) === '1'; sessionStorage.removeItem(KEY); } catch (e) {}
  var nav = window.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  if (internal || (nav && nav.type === 'back_forward')) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 紙的顏色 = 這一頁頂端的背景色（head 階段還讀不到 body，先依網址判斷；body 出現後改讀實際的 --bg-top / --bg-bottom）
  var isDetail = /\/project\.html$/.test(location.pathname);
  var PAPER_TOP = isDetail ? '#f4f4f4' : '#e0eef8', PAPER_BOTTOM = isDetail ? '#f4f4f4' : '#e9edf3';
  var GROW_MS = 1300;              // 暈開
  var FADE_MS = 150;               // 收尾（理論上已經全部露出，只是保險）
  var DELAY_MS = 50;               // 1.3 + 0.15 + 0.05 ≈ 1.5 秒
  var LAYERS = 22;                 // 柔邊的層數：越多越細緻
  var FEATHER = .45;               // 柔邊寬度：半徑的 45%

  // 播放期間關掉 body 原本的 0.2 秒淡入（不然會跟暈染疊在一起）
  var st = document.createElement('style');
  st.textContent = 'html.intro-playing body{animation:none!important}';
  document.head.appendChild(st);
  document.documentElement.classList.add('intro-playing');

  var cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:100000;pointer-events:none;';
  document.documentElement.appendChild(cv);
  var ctx = cv.getContext('2d');
  var W, H, dpr;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paper();
  }
  function paper() {
    // 頁面已經有 body 時，直接讀這一頁實際的背景色（各頁濃淡不同）
    var top = PAPER_TOP, bottom = PAPER_BOTTOM;
    if (document.body) { var cs = getComputedStyle(document.body); top = cs.getPropertyValue('--bg-top').trim() || top; bottom = cs.getPropertyValue('--bg-bottom').trim() || bottom; }
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, top); g.addColorStop(1, bottom);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  size();

  var seed = (Date.now() % 100000) + 1;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  // 一滴，在畫面正中間
  var drop;
  function makeDrop() {
    var waves = [];
    // 和緩的大起伏（水往紙紋比較鬆的方向多流一點）＋ 很細的毛邊
    for (var k = 0; k < 3; k++) waves.push({ f: 2 + k, a: .025 + rnd() * .03, p: rnd() * 6.28, s: (rnd() - .5) * 1.2 });
    for (k = 0; k < 2; k++) waves.push({ f: 9 + Math.floor(rnd() * 6), a: .006 + rnd() * .006, p: rnd() * 6.28, s: (rnd() - .5) * 2 });
    var amp = waves.reduce(function (s, w) { return s + w.a; }, 0);
    // 最終半徑：柔邊最內層（完全露出的部分）也要蓋過四個角
    var half = Math.hypot(W, H) / 2;
    drop = { x: W / 2, y: H / 2, waves: waves, R: half / ((1 - FEATHER) * (1 - amp)) * 1.02 };
  }

  function blobPath(rad, tm, shift) {
    var n = 140;
    ctx.beginPath();
    for (var i = 0; i <= n; i++) {
      var a = i / n * 6.2832, k = 1;
      for (var j = 0; j < drop.waves.length; j++) { var w = drop.waves[j]; k += Math.sin(a * w.f + w.p + tm * w.s + shift) * w.a; }
      var x = drop.x + Math.cos(a) * rad * k, y = drop.y + Math.sin(a) * rad * k;
      if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    }
    ctx.closePath();
  }

  // 起步輕、中段流動、最後慢慢停住（sine 曲線，比較柔和，不會中段突然衝很快）
  function ease(t) { return -(Math.cos(Math.PI * t) - 1) / 2; }

  var start = 0, ended = false;
  function frame(now) {
    if (ended) return;
    if (!start) start = now;
    var T = Math.min(1, (now - start) / GROW_MS);
    var r = ease(T) * drop.R, tm = T * 3;
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, W, H);
    paper();
    if (r > 1) {
      // 由外往內疊很多層「擦掉」：外層很淡、越往內越實，形狀每層微微錯開，交界就是一段柔和的漸層
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,' + (1.8 / LAYERS).toFixed(3) + ')';
      for (var i = 0; i < LAYERS; i++) {
        var f = 1 - FEATHER * (i / (LAYERS - 1));   // 1 → 1 - FEATHER
        blobPath(r * f, tm, i * .22);
        ctx.fill();
      }
      ctx.fillStyle = '#000'; blobPath(r * (1 - FEATHER), tm, LAYERS * .22); ctx.fill();
    }
    if (T < 1) requestAnimationFrame(frame);
    else finish();
  }
  function finish() {
    if (ended) return; ended = true;
    cv.style.transition = 'opacity ' + FADE_MS + 'ms ease-out';
    cv.style.opacity = '0';
    // 注意：intro-playing 不要移除！移除後 body 原本的 0.2 秒淡入動畫會重新播一次，整頁會閃一下
    setTimeout(function () { cv.remove(); }, FADE_MS + 50);
  }
  function go() { size(); makeDrop(); requestAnimationFrame(frame); }
  // 頁面內容畫好後才開始（最多等 600ms，避免網路慢時一直蓋著）
  var begun = false;
  function begin() { if (begun) return; begun = true; setTimeout(go, DELAY_MS); }
  document.addEventListener('DOMContentLoaded', begin);
  setTimeout(begin, 600);
  window.addEventListener('resize', function () { if (!ended) finish(); });
  window.addEventListener('pageshow', function (e) { if (e.persisted && !ended) { ended = true; cv.remove(); } });
})();

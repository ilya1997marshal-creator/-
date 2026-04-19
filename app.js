(function () {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalList = document.getElementById("modalList");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const tabsEl = document.getElementById("tabs");

  const pdfViewer = document.getElementById("pdfViewer");
  const pdfFrame = document.getElementById("pdfFrame");
  const pdfTitle = document.getElementById("pdfTitle");
  const pdfClose = document.getElementById("pdfClose");
  const pdfOpenSafari = document.getElementById("pdfOpenSafari");

  let data = null;

  function openInNewTab(href) {
    const a = document.createElement("a");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    if (pdfViewer.hidden) document.body.style.overflow = "";
  }

  function openPdfViewer(url, title) {
    if (!pdfFrame || !pdfViewer) return;
    
    // 1. Прямая ссылка на PDF
    const pdfAbsolute = new URL(url, window.location.href).href;
    
    // 2. Ссылка для PDF.js (для ПК и iPhone)
    const viewerUrl = new URL("pdfjs/web/viewer.html", window.location.href);
    viewerUrl.searchParams.set("file", pdfAbsolute);

    pdfTitle.textContent = title || "Документ";
    if (pdfOpenSafari) pdfOpenSafari.href = pdfAbsolute;

    // Определяем браузер и устройство
    const ua = navigator.userAgent;
    const isYaBrowser = ua.includes("YaBrowser") || ua.includes("YandexSearch");
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua) || 
                  (navigator.maxTouchPoints > 0 && window.matchMedia("(max-width: 900px)").matches);

    // СПЕЦИАЛЬНАЯ ЛОГИКА ДЛЯ ЯНДЕКСА И АНДРОИД
    if (isAndroid || isYaBrowser) {
      // Открываем файл напрямую. Яндекс предложит либо открыть его внутри, либо скачать.
      // Это исключает ошибку "пустого экрана" вьюера.
      openInNewTab(pdfAbsolute);
      return;
    }

    if (isIOS) {
      openInNewTab(viewerUrl.href);
      return;
    }

    // Для обычных компьютеров (Chrome/Edge/Firefox на Windows/Mac)
    pdfFrame.src = viewerUrl.href;
    pdfViewer.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closePdfViewer() {
    if (!pdfFrame || !pdfViewer) return;
    pdfViewer.hidden = true;
    pdfFrame.src = "about:blank";
    if (modal.hidden) document.body.style.overflow = "";
  }

  function showBlock(category) {
    const items = (data.items || []).filter(i => i.categoryId === category.id);
    modalTitle.textContent = category.title;
    modalList.innerHTML = "";

    if (items.length === 0) {
      const p = document.createElement("p");
      p.className = "empty-hint";
      p.textContent = "В этом блоке пока нет PDF.";
      modalList.appendChild(p);
    } else {
      items.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.pdf;
        a.textContent = item.title;
        a.addEventListener("click", e => {
          e.preventDefault();
          openPdfViewer(item.pdf, item.title);
        });
        li.appendChild(a);
        modalList.appendChild(li);
      });
    }
    openModal();
  }

  function renderTabs() {
    if (!tabsEl) return;
    tabsEl.innerHTML = "";
    data.categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = cat.title;
      btn.addEventListener("click", () => showBlock(cat));
      tabsEl.appendChild(btn);
    });
  }

  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (pdfClose) pdfClose.addEventListener("click", closePdfViewer);

  fetch("data/instructions.json")
    .then(r => r.json())
    .then(json => {
      data = json;
      renderTabs();
    })
    .catch(err => console.error("Ошибка загрузки:", err));
})();
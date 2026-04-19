(function () {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalList = document.getElementById("modalList");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const tabsEl = document.getElementById("tabs");

  let data = null;

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  function openPdf(url) {
    // Создаем полную ссылку
    const pdfAbsolute = new URL(url, window.location.href).href;
    const ua = navigator.userAgent;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(ua) || (navigator.maxTouchPoints > 0 && window.matchMedia("(max-width: 900px)").matches);

    if (isMobile) {
      // На мобильных — через Google Viewer в новой вкладке
      const googleViewerUrl = "https://docs.google.com/viewer?url=" + encodeURIComponent(pdfAbsolute);
      window.open(googleViewerUrl, '_blank');
    } else {
      // На ПК — просто в новой вкладке
      window.open(pdfAbsolute, '_blank');
    }
  }

  function showBlock(category) {
    const items = (data.items || []).filter(i => i.categoryId === category.id);
    modalTitle.textContent = category.title;
    modalList.innerHTML = "";

    if (items.length === 0) {
      modalList.innerHTML = "<li>Файлы еще не добавлены</li>";
    } else {
      items.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = item.title;
        a.onclick = (e) => {
          e.preventDefault();
          openPdf(item.pdf);
        };
        li.appendChild(a);
        modalList.appendChild(li);
      });
    }
    openModal();
  }

  function renderTabs() {
    if (!tabsEl || !data) return;
    tabsEl.innerHTML = "";
    data.categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = cat.title;
      btn.onclick = () => showBlock(cat);
      tabsEl.appendChild(btn);
    });
  }

  if (modalBackdrop) modalBackdrop.onclick = closeModal;
  if (modalClose) modalClose.onclick = closeModal;

  // Загрузка данных
  fetch("data/instructions.json")
    .then(r => r.json())
    .then(json => {
      data = json;
      renderTabs();
    })
    .catch(err => console.error("Ошибка загрузки:", err));
})();
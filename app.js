(function () {
  const tabsMain = document.getElementById("tabs-main");
  const navButtons = document.querySelectorAll(".nav-item");
  const screens = document.querySelectorAll(".tab-content");
  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");
  
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalList = document.getElementById("modalList");
  const modalClose = document.getElementById("modalClose");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const themeToggle = document.getElementById("themeToggle");

  let data = null;

  // 1. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК (BOTTOM NAV)
  navButtons.forEach(btn => {
    btn.onclick = () => {
      const screenId = btn.getAttribute("data-screen");

      // Сброс активных классов
      navButtons.forEach(b => b.classList.remove("active"));
      screens.forEach(s => s.classList.remove("active"));

      // Активация выбранной вкладки
      btn.classList.add("active");
      document.getElementById(`screen-${screenId}`).classList.add("active");

      // Динамическая смена заголовка страницы
      switch(screenId) {
        case 'main':
          pageTitle.textContent = "База данных";
          pageSubtitle.textContent = "ЦТАИ АСУ ТП";
          break;
        case 'charts':
          pageTitle.textContent = "Графики";
          pageSubtitle.textContent = "Смены и обучение";
          break;
        case 'edu':
          pageTitle.textContent = "Обучение";
          pageSubtitle.textContent = "Тесты и ПТЭ";
          break;
      }
    };
  });

  // 2. ЛОГИКА ТЕМЫ
  themeToggle.onclick = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // 3. ОТКРЫТИЕ PDF
  function openPdf(url) {
    const absoluteUrl = new URL(url, window.location.href).href;
    const googleViewer = "https://docs.google.com/viewer?url=" + encodeURIComponent(absoluteUrl);
    window.open(googleViewer, '_blank');
  }

  // 4. МОДАЛЬНОЕ ОКНО
  function showCategory(category) {
    const items = (data.items || []).filter(i => i.categoryId === category.id);
    modalTitle.textContent = category.title;
    modalList.innerHTML = "";

    if (items.length === 0) {
      modalList.innerHTML = `<li style="text-align:center; padding: 20px; color: var(--text-muted);">Файлов пока нет</li>`;
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
    modal.hidden = false;
  }

  modalClose.onclick = () => modal.hidden = true;
  modalBackdrop.onclick = () => modal.hidden = true;

  // 5. ЗАГРУЗКА ДАННЫХ
  fetch("data/instructions.json")
    .then(r => r.json())
    .then(json => {
      data = json;
      tabsMain.innerHTML = ""; // Очистка
      data.categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = cat.title;
        btn.onclick = () => showCategory(cat);
        tabsMain.appendChild(btn);
      });
    })
    .catch(err => console.error("Ошибка загрузки данных:", err));
})();
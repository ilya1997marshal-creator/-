(function () {
  // Элементы навигации
  const navButtons = document.querySelectorAll(".nav-item");
  const screens = document.querySelectorAll(".tab-content");
  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");
  const themeToggle = document.getElementById("themeToggle");

  // Элементы управления графиком
  const showScheduleBtn = document.getElementById("showScheduleBtn");
  const backToCharts = document.getElementById("backToCharts");
  const chartsInit = document.getElementById("charts-init");
  const scheduleContainer = document.getElementById("schedule-container");
  const tableEl = document.getElementById("work-schedule");

  // --- ДАННЫЕ ГРАФИКА (Апрель 2026) ---
  const scheduleData = [
    { name: "Лагутенков Р.С.", shifts: { 3: "1219", 4: "1219", 8: "0828", 9: "1202", 13: "1219", 16: "1219", 17: "1202", 19: "1202", 21: "1202", 24: "1219", 25: "1202", 26: "1202", 28: "1219", 29: "1202" } },
    { name: "Миронов С.А.", shifts: { 3: "1219", 4: "1219", 10: "1202", 11: "0804", 12: "1219", 16: "1219", 17: "1202", 19: "1202", 21: "1202", 24: "1219", 25: "1202", 26: "1202", 28: "1219", 29: "1202" } },
    { name: "Куштанов А.А.", shifts: { 1: "1219", 2: "1202", 3: "1202", 7: "0828", 8: "1202", 12: "1219", 13: "1202", 17: "1219", 20: "1219", 23: "1219", 24: "1202", 28: "1202", 30: "1219" } },
    { name: "Рыжих И.Н.", shifts: { 18: "1219", 23: "1219", 24: "1202", 28: "1202", 30: "1219" } },
    { name: "Бондаренко Т.А.", shifts: { 28: "ОТП", 29: "ОТП", 30: "ОТП" } }
  ];

  const weekends = [4, 5, 11, 12, 18, 19, 25, 26]; // Выходные апреля 2026

  function renderTable() {
    let html = `<thead><tr><th class="name-col">Персонал</th>`;
    // Заголовок чисел (1-30)
    for (let i = 1; i <= 30; i++) {
      html += `<th class="${weekends.includes(i) ? 'weekend' : ''}">${i}</th>`;
    }
    html += `</tr></thead><tbody>`;

    // Строки сотрудников
    scheduleData.forEach(row => {
      html += `<tr><td class="name-col">${row.name}</td>`;
      for (let i = 1; i <= 30; i++) {
        const val = row.shifts[i] || "";
        html += `<td class="${weekends.includes(i) ? 'weekend' : ''}">${val}</td>`;
      }
      html += `</tr>`;
    });
    html += `</tbody>`;
    tableEl.innerHTML = html;
  }

  // --- ЛОГИКА НАВИГАЦИИ ---
  navButtons.forEach(btn => {
    btn.onclick = () => {
      const screenId = btn.getAttribute("data-screen");

      navButtons.forEach(b => b.classList.remove("active"));
      screens.forEach(s => s.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(`screen-${screenId}`).classList.add("active");

      // Сброс вида графика, если уходим с вкладки
      if (screenId !== 'charts') {
        chartsInit.hidden = false;
        scheduleContainer.hidden = true;
      }

      // Обновление заголовков
      const config = {
        main: ["База данных", "ЦТАИ АСУ ТП"],
        charts: ["Графики", "Смены персонала"],
        edu: ["Обучение", "Тесты и материалы"],
        support: ["Помощь", "Обратная связь"]
      };
      pageTitle.textContent = config[screenId][0];
      pageSubtitle.textContent = config[screenId][1];
    };
  });

  // Логика кнопок внутри вкладки графиков
  showScheduleBtn.onclick = () => {
    renderTable();
    chartsInit.hidden = true;
    scheduleContainer.hidden = false;
  };

  backToCharts.onclick = () => {
    scheduleContainer.hidden = true;
    chartsInit.hidden = false;
  };

  // --- ТЕМА ---
  themeToggle.onclick = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  // --- МОДАЛЬНОЕ ОКНО И ДАННЫЕ ---
  let appData = null;
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalList = document.getElementById("modalList");

  function openCategory(id) {
    const cat = appData.categories.find(c => c.id === id);
    const items = appData.items.filter(i => i.categoryId === id);
    
    modalTitle.textContent = cat.title;
    modalList.innerHTML = items.length ? "" : "<li style='text-align:center; padding:20px; color:gray;'>Файлов не найдено</li>";
    
    items.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = item.title;
      a.onclick = (e) => {
        e.preventDefault();
        const url = new URL(item.pdf, window.location.href).href;
        window.open("https://docs.google.com/viewer?url=" + encodeURIComponent(url), "_blank");
      };
      li.appendChild(a);
      modalList.appendChild(li);
    });
    modal.hidden = false;
  }

  document.getElementById("modalClose").onclick = () => modal.hidden = true;
  document.getElementById("modalBackdrop").onclick = () => modal.hidden = true;

  // Инициализация кнопок категорий
  fetch("data/instructions.json")
    .then(r => r.json())
    .then(json => {
      appData = json;
      const container = document.getElementById("tabs-main");
      container.innerHTML = "";
      json.categories.forEach(c => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = c.title;
        b.onclick = () => openCategory(c.id);
        container.appendChild(b);
      });
    })
    .catch(e => console.error("Ошибка JSON:", e));

})();
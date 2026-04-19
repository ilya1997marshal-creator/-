(function () {
  const navButtons = document.querySelectorAll(".nav-item");
  const screens = document.querySelectorAll(".tab-content");
  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");
  const themeToggle = document.getElementById("themeToggle");

  const showScheduleBtn = document.getElementById("showScheduleBtn");
  const showEduScheduleBtn = document.getElementById("showEduScheduleBtn");
  const backToCharts = document.getElementById("backToCharts");
  const chartsInit = document.getElementById("charts-init");
  const scheduleContainer = document.getElementById("schedule-container");
  const tableEl = document.getElementById("work-schedule");
  const tableMonthTitle = document.getElementById("tableMonthTitle");
  const scheduleLegend = document.getElementById("schedule-legend");

  const staffNames = ["Лагутенков Р.С.", "Миронов С.А.", "Куштанов А.А.", "Рыжих И.Н.", "Бондаренко Т.А."];
  const workData = [
    { name: "Лагутенков Р.С.", shifts: { 3: "1219", 4: "1219", 7: "0828", 8: "1202", 12: "1219", 15: "1219", 16: "1202", 18: "1202", 20: "1202", 23: "1219", 24: "1202", 25: "1202", 27: "1219", 28: "1202" } },
    { name: "Миронов С.А.", shifts: { 3: "1219", 4: "1219", 9: "1202", 11: "0804", 12: "1219", 15: "1219", 16: "1202", 18: "1202", 20: "1202", 23: "1219", 24: "1202", 25: "1202", 27: "1219", 28: "1202" } },
    { name: "Куштанов А.А.", shifts: { 2: "1219", 3: "1202", 4: "1202", 7: "0828", 8: "1202", 11: "1219", 12: "1202", 14: "1219", 15: "1202", 18: "1219", 21: "1219", 24: "1219", 25: "1202", 28: "1202", 30: "1219" } },
    { name: "Рыжих И.Н.", shifts: { 18: "1219", 21: "1219", 22: "1202", 25: "1202", 30: "1219" } },
    { name: "Бондаренко Т.А.", shifts: { 29: "ОТП", 30: "ОТП" } }
  ];
  const weekends = [4, 5, 11, 12, 18, 19, 25, 26];

  function renderWorkTable() {
    tableMonthTitle.textContent = "Апрель 2026";
    scheduleLegend.innerHTML = `<div class="legend-item"><span class="dot d1219"></span> 08-20</div><div class="legend-item"><span class="dot d1202"></span> 20-08</div>`;
    let html = `<thead><tr><th class="name-col">Сотрудник</th>`;
    for (let i = 1; i <= 30; i++) html += `<th class="${weekends.includes(i) ? 'weekend' : ''}">${i}</th>`;
    html += `</tr></thead><tbody>`;
    workData.forEach(row => {
      html += `<tr><td class="name-col">${row.name}</td>`;
      for (let i = 1; i <= 30; i++) {
        const val = row.shifts[i] || "";
        const c = val === "1219" ? "cell-1219" : val === "1202" ? "cell-1202" : val === "ОТП" ? "cell-otp" : "";
        html += `<td class="${c} ${weekends.includes(i) ? 'weekend' : ''}">${val}</td>`;
      }
      html += `</tr>`;
    });
    tableEl.innerHTML = html + "</tbody>";
  }

  navButtons.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-screen");
      navButtons.forEach(b => b.classList.remove("active"));
      screens.forEach(s => s.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`screen-${id}`).classList.add("active");
    };
  });

  showScheduleBtn.onclick = () => { renderWorkTable(); chartsInit.hidden = true; scheduleContainer.hidden = false; };
  backToCharts.onclick = () => { scheduleContainer.hidden = true; chartsInit.hidden = false; };

  themeToggle.onclick = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  fetch("data/instructions.json")
    .then(r => r.json())
    .then(json => {
      const container = document.getElementById("tabs-main");
      json.categories.forEach(c => {
        const b = document.createElement("button");
        b.className = "action-main-btn";
        b.textContent = c.title;
        b.onclick = () => {
          const items = json.items.filter(it => it.categoryId === c.id);
          document.getElementById("modalTitle").textContent = c.title;
          document.getElementById("modalList").innerHTML = items.map(it => `<li><a href="${it.pdf}" target="_blank">${it.title}</a></li>`).join("");
          document.getElementById("modal").hidden = false;
        };
        container.appendChild(b);
      });
    });

  document.getElementById("modalClose").onclick = () => document.getElementById("modal").hidden = true;
})();
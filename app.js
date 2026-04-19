let appData = null;

async function init() {
    try {
        const res = await fetch('./data/instructions.json');
        appData = await res.json();
        renderMain();
        setupNavigation();
        setupTheme();
        setupCharts();
    } catch (e) { console.error("Ошибка загрузки:", e); }
}

function renderMain() {
    const container = document.getElementById('tabs-main');
    if(!container) return;
    container.innerHTML = appData.blocks.map((b, i) => `
        <button class="action-main-btn" onclick="openBlock(${i})">${b.title}</button>
    `).join('');
}

window.openBlock = (index) => {
    const block = appData.blocks[index];
    document.getElementById('modalTitle').innerText = block.title;
    const list = document.getElementById('modalList');
    list.innerHTML = block.items.map(item => `
        <li><a href="${item.url}" target="_blank" rel="noopener">${item.name}</a></li>
    `).join('');
    document.getElementById('modal').hidden = false;
};

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.tab-content');

    navItems.forEach(btn => {
        btn.onclick = () => {
            const target = btn.getAttribute('data-screen');
            
            // Сбрасываем активные классы
            navItems.forEach(b => b.classList.remove('active'));
            screens.forEach(s => s.classList.remove('active'));
            
            // Активируем нужные
            btn.classList.add('active');
            const screen = document.getElementById(`screen-${target}`);
            if(screen) screen.classList.add('active');
            
            // Закрываем модалку при переходе
            document.getElementById('modal').hidden = true;
        };
    });
}

function setupCharts() {
    const showWorkBtn = document.getElementById('showScheduleBtn');
    const container = document.getElementById('schedule-container');
    const initBox = document.getElementById('charts-init');

    if(showWorkBtn) {
        showWorkBtn.onclick = async () => {
            const res = await fetch('./data/schedule.json');
            const data = await res.json();
            renderSchedule(data);
            initBox.hidden = true;
            container.hidden = false;
        };
    }

    const backBtn = document.getElementById('backToCharts');
    if(backBtn) {
        backBtn.onclick = () => {
            container.hidden = true;
            initBox.hidden = false;
            document.getElementById('work-schedule').classList.remove('has-focus');
        };
    }
}

function renderSchedule(data) {
    const table = document.getElementById('work-schedule');
    document.getElementById('tableMonthTitle').innerText = data.month;

    let html = `<thead><tr><th class="name-col">ФИО</th>`;
    for(let d=1; d<=data.daysInMonth; d++) html += `<th>${d}</th>`;
    html += `</tr></thead><tbody>`;

    data.employees.forEach(emp => {
        html += `<tr onclick="focusRow(this)">
            <td class="name-col">${emp.name}</td>`;
        emp.days.forEach(day => {
            let cls = "";
            if(day === "12/19") cls = "cell-1219";
            else if(day === "12/02") cls = "cell-1202";
            else if(day === "ОТП") cls = "cell-otp";
            else if(day === "УЧ") cls = "cell-edu";
            html += `<td class="${cls}">${day || ""}</td>`;
        });
        html += `</tr>`;
    });
    table.innerHTML = html + `</tbody>`;
}

window.focusRow = (row) => {
    const table = document.getElementById('work-schedule');
    const alreadyFocused = row.classList.contains('focused-row');
    
    document.querySelectorAll('#work-schedule tr').forEach(r => r.classList.remove('focused-row'));
    
    if (!alreadyFocused) {
        table.classList.add('has-focus');
        row.classList.add('focused-row');
    } else {
        table.classList.remove('has-focus');
    }
};

function setupTheme() {
    const btn = document.getElementById('themeToggle');
    btn.onclick = () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    };
}

document.getElementById('modalClose').onclick = () => document.getElementById('modal').hidden = true;
document.getElementById('modalBackdrop').onclick = () => document.getElementById('modal').hidden = true;

init();
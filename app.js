/**
 * app.js - Full logic
 */

let appData = null;

async function startApp() {
    try {
        const res = await fetch('./data/instructions.json');
        appData = await res.json();
        
        renderBlocks();
        initNavigation();
        initTheme();
        initCharts();
        initModalActions();
        
        console.log("App ready");
    } catch (e) {
        console.error("Data load error", e);
    }
}

function renderBlocks() {
    const container = document.getElementById('blocksContainer');
    if (!container || !appData) return;

    container.innerHTML = appData.blocks.map((block, idx) => `
        <button class="action-main-btn" onclick="openModal(${idx})">
            ${block.title}
        </button>
    `).join('');
}

window.openModal = (idx) => {
    const block = appData.blocks[idx];
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').innerText = block.title;
    document.getElementById('modalList').innerHTML = block.items.map(item => `
        <li><a href="${item.url}" target="_blank" rel="noopener">${item.name}</a></li>
    `).join('');
    modal.hidden = false;
};

function initNavigation() {
    const buttons = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
        btn.onclick = () => {
            const screenId = btn.getAttribute('data-screen');
            
            buttons.forEach(b => b.classList.remove('active'));
            screens.forEach(s => s.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`screen-${screenId}`).classList.add('active');
            document.getElementById('modal').hidden = true;
        };
    });
}

function initCharts() {
    const showBtn = document.getElementById('showScheduleBtn');
    const container = document.getElementById('schedule-container');
    const initBox = document.getElementById('charts-init');

    if (showBtn) {
        showBtn.onclick = async () => {
            const res = await fetch('./data/schedule.json');
            const data = await res.json();
            
            const table = document.getElementById('work-schedule');
            document.getElementById('tableMonthTitle').innerText = data.month;
            
            let html = `<thead><tr><th style="position:sticky;left:0;background:var(--panel-color);z-index:2">ФИО</th>`;
            for(let i=1; i<=data.daysInMonth; i++) html += `<th>${i}</th>`;
            html += `</tr></thead><tbody>`;

            data.employees.forEach(emp => {
                html += `<tr><td style="position:sticky;left:0;background:var(--panel-color);font-weight:700">${emp.name}</td>`;
                emp.days.forEach(d => html += `<td>${d || ''}</td>`);
                html += `</tr>`;
            });
            table.innerHTML = html + `</tbody>`;
            
            initBox.hidden = true;
            container.hidden = false;
        };
    }

    document.getElementById('backToCharts').onclick = () => {
        container.hidden = true;
        initBox.hidden = false;
    };
}

function initTheme() {
    document.getElementById('themeToggle').onclick = () => {
        const html = document.documentElement;
        const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    };
}

function initModalActions() {
    const close = () => document.getElementById('modal').hidden = true;
    document.getElementById('modalClose').onclick = close;
    document.getElementById('modalBackdrop').onclick = close;
}

window.onload = startApp;
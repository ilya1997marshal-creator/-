const monthsMap = { "Январь":0, "Февраль":1, "Март":2, "Апрель":3, "Май":4, "Июнь":5, "Июль":6, "Август":7, "Сентябрь":8, "Октябрь":9, "Ноябрь":10, "Декабрь":11 };
let currentlyHighlighted = null;

// ДАННЫЕ БЛОКОВ
const blocksData = {
    1: [{ name: "Инструкция ПЛК 1", file: "docs/block1.pdf" }],
    2: [{ name: "Схема электроснабжения", file: "docs/block2.pdf" }],
    3: [], 4: [], 5: [], 6: [],
    other: [{ name: "Общий регламент", file: "docs/main.pdf" }],
    zip: [{ name: "Перечень ЗИП", file: "docs/zip.pdf" }]
};

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    document.getElementById('theme-icon').textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

function switchTab(index) {
    const tabs = ['tab-home', 'tab-schedule', 'tab-tests', 'tab-help'];
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(tabs[index]).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });

    if(index === 1) renderSchedule(document.getElementById('month-selector').value);
    window.scrollTo(0, 0);
}

// ГРАФИК: ОСНОВНАЯ ЛОГИКА
function renderSchedule(monthName) {
    const display = document.getElementById('current-month-display');
    if (display) display.textContent = `${monthName} 2026`;
    
    const viewport = document.getElementById('schedule-viewport');
    if (!viewport) return;

    viewport.innerHTML = ''; // Очищаем всё

    const data = (typeof scheduleData !== 'undefined') ? scheduleData[monthName] : null;

    // ЕСЛИ ГРАФИК ПУСТОЙ ИЛИ МАЙ-ДЕКАБРЬ
    if (!data || data.length === 0) {
        viewport.innerHTML = `
            <div class="py-32 text-center">
                <div class="text-zinc-500 font-bold uppercase text-[11px] tracking-[0.2em] mb-2">График на ${monthName}</div>
                <div class="text-zinc-400 text-xs italic">Находится в разработке</div>
            </div>`;
        return;
    }

    const year = 2026, monthIdx = monthsMap[monthName];
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
    
    let html = `<table class="schedule-table"><thead><tr><th class="col-name">Ф.И.О.</th>`;
    for(let d=1; d<=daysInMonth; d++) {
        const isWE = [0,6].includes(new Date(year, monthIdx, d).getDay());
        html += `<th class="col-date ${isWE ? 'text-red-500' : ''}">${d}</th>`;
    }
    html += `<th class="col-stat">С</th><th class="col-stat">Ч</th></tr></thead><tbody>`;
    
    data.forEach(person => {
        html += `<tr onclick="highlightRow(this)"><td class="col-name">${person.name}</td>`;
        for(let d=1; d<=daysInMonth; d++) {
            const val = person.shifts[d-1] || '';
            const isVisual = ['D','N','S'].includes(val);
            html += `<td class="shift-${val}">${isVisual ? '' : (val === 'W' ? '' : val)}</td>`;
        }
        html += `<td class="col-stat">${person.s}</td><td class="col-stat">${person.h}</td></tr>`;
    });
    viewport.innerHTML = html + `</tbody></table>`;
}

function highlightRow(row) {
    const rows = document.querySelectorAll('.schedule-table tbody tr');
    if (currentlyHighlighted === row) {
        rows.forEach(r => r.classList.remove('highlighted-row', 'blurred-row'));
        currentlyHighlighted = null;
    } else {
        rows.forEach(r => {
            r.classList.toggle('highlighted-row', r === row);
            r.classList.toggle('blurred-row', r !== row);
        });
        currentlyHighlighted = row;
    }
}

function openBlockModal(key) {
    const data = blocksData[key] || [];
    document.getElementById('modal-block-title').textContent = 
        key === 'other' ? 'Инструкции' : key === 'zip' ? 'ЗИП АСУ ТП' : `Блок ${key}`;
    
    const container = document.getElementById('instructions-list');
    container.innerHTML = '';
    
    if (data.length === 0) {
        container.innerHTML = '<div class="text-center py-10 text-zinc-400 text-xs uppercase tracking-widest font-bold">Данные отсутствуют</div>';
    } else {
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = "p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-4 active:bg-blue-600 active:text-white transition-all cursor-pointer";
            div.innerHTML = `<span class="text-2xl">📄</span><span class="font-bold text-xs uppercase tracking-wide">${item.name}</span>`;
            div.onclick = () => { if(item.file) window.open(item.file, '_blank'); };
            container.appendChild(div);
        });
    }
    document.getElementById('block-modal').classList.remove('hidden');
}

function closeBlockModal() { document.getElementById('block-modal').classList.add('hidden'); }

function updateCurrentDuty() {
    const now = new Date();
    const month = Object.keys(monthsMap)[now.getMonth()];
    const day = now.getDate();
    const list = document.getElementById('duty-list');
    if (typeof scheduleData === 'undefined' || !scheduleData[month]) return;
    const active = scheduleData[month].filter(p => ['D','N'].includes(p.shifts[day-1])).map(p => p.name);
    list.innerHTML = active.length 
        ? active.map(n => `<div class="bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl text-blue-500">${n}</div>`).join('')
        : '<span class="text-zinc-500 text-xs italic">Нет активных смен</span>';
}

window.onload = () => {
    const blocksCont = document.getElementById('blocks-container');
    if (blocksCont) {
        for (let i = 1; i <= 6; i++) {
            blocksCont.innerHTML += `
                <button onclick="openBlockModal(${i})" class="w-full action-btn p-5 rounded-2xl flex items-center justify-between active:scale-[0.97] transition-all mb-1">
                    <div class="flex items-center gap-4">
                        <span class="text-blue-500 font-extrabold text-lg">0${i}</span>
                        <span class="font-bold text-sm uppercase tracking-wide">Блок ${i}</span>
                    </div>
                    <span class="opacity-30">›</span>
                </button>`;
        }
    }
    if(localStorage.getItem('theme') === 'light') toggleTheme();
    const currentMonth = Object.keys(monthsMap)[new Date().getMonth()];
    document.getElementById('month-selector').value = currentMonth;
    renderSchedule(currentMonth);
    updateCurrentDuty();
};
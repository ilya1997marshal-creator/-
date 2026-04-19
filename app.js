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
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  function showBlock(category) {
    const items = (data.items || []).filter((i) => i.categoryId === category.id);

    modalTitle.textContent = category.title;
    modalList.innerHTML = "";

    if (items.length === 0) {
      const p = document.createElement("p");
      p.className = "empty-hint";
      p.textContent =
        "В этом блоке пока нет PDF. Добавьте файлы в папку pdfs и записи в data/instructions.json.";
      modalList.appendChild(p);
    } else {
      items.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.pdf;
        a.textContent = item.title;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        li.appendChild(a);
        modalList.appendChild(li);
      });
    }

    openModal();
  }

  function renderTabs() {
    tabsEl.innerHTML = "";
    data.categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = cat.title;
      btn.addEventListener("click", () => showBlock(cat));
      tabsEl.appendChild(btn);
    });
  }

  modalBackdrop.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  fetch("data/instructions.json")
    .then((r) => {
      if (!r.ok) throw new Error("Не удалось загрузить data/instructions.json");
      return r.json();
    })
    .then((json) => {
      data = json;
      renderTabs();
    })
    .catch((err) => {
      console.error(err);
      tabsEl.innerHTML =
        "<p style='padding:1rem;color:#b91c1c'>Ошибка загрузки данных. Проверьте путь к instructions.json и откройте сайт через Live Server.</p>";
    });
})();
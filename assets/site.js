document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
if (menuButton && navigation) {
  navigation.classList.add("nav-enhanced");
  menuButton.hidden = false;
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(expanded));
    navigation.classList.toggle("is-open", expanded);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".header-inner")) closeMenu();
  });
  window.matchMedia("(min-width: 801px)").addEventListener("change", closeMenu);
}

const controls = document.querySelector(".explorer-controls");
if (controls) {
  const buttons = [...controls.querySelectorAll("[data-filter]")];
  const projects = [...document.querySelectorAll(".project-card")];
  const search = document.querySelector("#project-search");
  const count = document.querySelector("#project-count");
  const emptyState = document.querySelector("#empty-state");
  const suggestion = document.querySelector("#project-suggestion");
  let category = "trading";
  const searchable = new Map(
    projects.map((project) => [
      project,
      [
        project.querySelector("h3").textContent,
        project.querySelector("p").textContent,
        project.querySelector(".project-tag").textContent,
        project.dataset.category,
      ]
        .join(" ")
        .toLowerCase(),
    ]),
  );

  function renderProjects() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    for (const project of projects) {
      const matchesCategory =
        category === "all" || project.dataset.category === category;
      project.hidden = !(
        matchesCategory && searchable.get(project).includes(query)
      );
      if (!project.hidden) visible += 1;
    }
    for (const button of buttons)
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === category),
      );
    const label = buttons.find(
      (button) => button.dataset.filter === category,
    ).textContent;
    count.textContent = `${visible} ${visible === 1 ? "project" : "projects"}${query ? ` matching “${search.value.trim()}”` : ` / ${label}`}`;
    emptyState.hidden = visible !== 0;
    suggestion.hidden = category !== "trading" || Boolean(query);
  }
  for (const button of buttons) {
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      renderProjects();
    });
  }
  search.addEventListener("input", () => {
    category = "all";
    renderProjects();
  });
  document.querySelector("#reset-search").addEventListener("click", () => {
    search.value = "";
    category = "all";
    renderProjects();
    search.focus();
  });
  document.querySelectorAll("[data-project-category]").forEach((link) => {
    link.addEventListener("click", () => {
      category = link.dataset.projectCategory;
      search.value = "";
      renderProjects();
    });
  });
  controls.hidden = false;
  renderProjects();
}

const tabList = document.querySelector(".code-tabs");
if (tabList) {
  const tabs = [...tabList.querySelectorAll('[role="tab"]')];
  const activateTab = (tab) => {
    for (const item of tabs) {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute("aria-controls")).hidden =
        !selected;
    }
  };
  for (const tab of tabs) {
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel.setAttribute("role", "tabpanel");
    panel.tabIndex = 0;
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      const index = tabs.indexOf(tab);
      let next;
      if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
      if (event.key === "ArrowLeft")
        next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === "Home") next = tabs[0];
      if (event.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        event.preventDefault();
        activateTab(next);
        next.focus();
      }
    });
  }
  activateTab(tabs[0]);
  tabList.hidden = false;
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.hidden = false;
  button.addEventListener("click", async () => {
    const code = document.getElementById(button.dataset.copy);
    const status = document.querySelector(".copy-status");
    const original = button.innerHTML;
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      button.textContent = "Copied ✓";
      status.textContent = "Installation commands copied.";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "Code selected. Use your keyboard to copy.";
    }
    window.setTimeout(() => {
      button.innerHTML = original;
    }, 2000);
  });
});

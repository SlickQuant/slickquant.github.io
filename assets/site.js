document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

// Load Kit on request and adapt the request form to Premium licensing.
const premiumRequest = document.querySelector("#premium-request");
if (premiumRequest && typeof premiumRequest.showModal === "function") {
  const embed = document.querySelector("#premium-request-embed");
  const requestLinks = document.querySelectorAll("[data-premium-venue]");
  let trigger;
  let pendingVenue;
  let embedStarted = false;
  const normalize = (value) => value.replace(/\s+/g, "").toLowerCase();
  const prepareForm = () => {
    // Keep the embed consistent while the hosted Kit form is updated separately.
    embed.querySelectorAll('input[name="fields[github_username]"]').forEach((input) => {
      input.closest(".formkit-field")?.remove();
    });
    const textNodes = document.createTreeWalker(embed, NodeFilter.SHOW_TEXT);
    while (textNodes.nextNode()) {
      const node = textNodes.currentNode;
      if (node.parentElement.closest("script, style")) continue;
      const updated = node.nodeValue
        .replace(/private GitHub access/g, "compiled library delivery and runtime licensing")
        .replace(/GitHub access/g, "runtime licensing")
        .replace(/Premium access/g, "Premium license");
      if (updated !== node.nodeValue) node.nodeValue = updated;
    }
    premiumRequest.querySelectorAll("select").forEach((select) => {
      if (!select.labels.length && !select.hasAttribute("aria-label") &&
          !select.hasAttribute("aria-labelledby")) {
        const prompt = select.querySelector('option[value=""]')?.textContent.trim();
        if (prompt) select.setAttribute("aria-label", prompt);
      }
      if (pendingVenue) {
        const option = [...select.options].find((option) =>
          normalize(option.textContent) === normalize(pendingVenue),
        );
        if (option) {
          select.value = option.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          pendingVenue = null;
        }
      }
    });
  };
  new MutationObserver(prepareForm).observe(embed, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  requestLinks.forEach((link) => {
    link.setAttribute("aria-haspopup", "dialog");
    link.setAttribute("aria-controls", "premium-request");
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      pendingVenue = link.dataset.premiumVenue;
      premiumRequest.showModal();
      document.body.classList.add("premium-modal-open");
      if (!embedStarted) {
        const script = document.createElement("script");
        script.async = true;
        script.dataset.uid = "7674493e92";
        script.src = "https://slickquant.kit.com/7674493e92/index.js";
        embedStarted = true;
        embed.append(script);
      }
      prepareForm();
    });
  });
  premiumRequest.querySelector(".premium-request-close").addEventListener("click", () => {
    premiumRequest.close();
  });
  premiumRequest.addEventListener("click", (event) => {
    if (event.target !== premiumRequest) return;
    const bounds = premiumRequest.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      premiumRequest.close();
    }
  });
  premiumRequest.addEventListener("close", () => {
    document.body.classList.remove("premium-modal-open");
    trigger?.focus({ preventScroll: true });
  });
}

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

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      mainNav.classList.remove("is-open");
    });
  });
}

const articleTabs = Array.from(document.querySelectorAll('[role="tab"]'));

function selectArticleTab(tab, moveFocus) {
  articleTabs.forEach((articleTab) => {
    const isSelected = articleTab === tab;
    articleTab.setAttribute("aria-selected", String(isSelected));
    articleTab.tabIndex = isSelected ? 0 : -1;

    const panel = document.getElementById(articleTab.getAttribute("aria-controls"));
    if (panel) {
      panel.hidden = !isSelected;
    }
  });

  if (moveFocus) {
    tab.focus();
  }
}

articleTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectArticleTab(tab, false));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % articleTabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + articleTabs.length) % articleTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = articleTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectArticleTab(articleTabs[nextIndex], true);
  });
});

const contactForm = document.querySelector("#form-contato");
const contactStatus = document.querySelector("#form-status");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const contactEmail = document.body.dataset.contactEmail.trim();

    if (!contactEmail) {
      contactStatus.textContent = "O formulário está pronto. Informe o e-mail de contato do projeto para ativar o envio.";
      return;
    }

    const formData = new FormData(contactForm);
    const subject = encodeURIComponent("Sugestão de história — Do Cacau ao Mandacaru");
    const body = encodeURIComponent(
      `Nome: ${formData.get("name")}\nE-mail: ${formData.get("email")}\n\nSugestão:\n${formData.get("message")}`
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  });
}

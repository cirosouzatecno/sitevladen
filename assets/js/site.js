(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initHeader() {
    const header = document.querySelector("[data-site-header]");
    const toggle = document.querySelector("[data-menu-toggle]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");

    if (!header || !toggle || !mobileMenu) {
      return;
    }

    const rootPath = document.body.dataset.currentPath || "/";

    function updateHeaderState() {
      const shouldBeSolid = rootPath !== "/" || window.scrollY > 24 || header.classList.contains("menu-open");
      header.classList.toggle("is-solid", shouldBeSolid);
    }

    toggle.addEventListener("click", function () {
      const isOpen = header.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
      mobileMenu.hidden = !isOpen;
      updateHeaderState();
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
        mobileMenu.hidden = true;
        updateHeaderState();
      });
    });

    window.addEventListener("scroll", updateHeaderState, { passive: true });
    updateHeaderState();
  }

  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");

    if (!items.length) {
      return;
    }

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initPortfolio() {
    const wrapper = document.querySelector("[data-portfolio]");

    if (!wrapper) {
      return;
    }

    const filterButtons = wrapper.querySelectorAll("[data-filter]");
    const cards = wrapper.querySelectorAll("[data-portfolio-card]");
    const lightbox = wrapper.querySelector("[data-lightbox]");
    const dialog = wrapper.querySelector("[data-lightbox-dialog]");
    const body = document.body;

    function applyFilter(category) {
      cards.forEach(function (card) {
        const shouldShow = category === "Todos" || card.dataset.category === category;
        card.hidden = !shouldShow;
      });

      filterButtons.forEach(function (button) {
        button.classList.toggle("is-active", button.dataset.filter === category);
      });
    }

    function closeLightbox() {
      if (!lightbox) {
        return;
      }

      lightbox.hidden = true;
      body.style.overflow = "";
    }

    function openLightbox(card) {
      if (!lightbox) {
        return;
      }

      const title = lightbox.querySelector("[data-lightbox-title]");
      const category = lightbox.querySelector("[data-lightbox-category]");
      const description = lightbox.querySelector("[data-lightbox-description]");
      const note = lightbox.querySelector("[data-lightbox-note]");
      const image = lightbox.querySelector("[data-lightbox-image]");
      const palette = lightbox.querySelector("[data-lightbox-palette]");

      if (title) {
        title.textContent = card.dataset.title || "";
      }

      if (category) {
        category.textContent = card.dataset.category || "";
      }

      if (description) {
        description.textContent = card.dataset.description || "";
      }

      if (note) {
        note.textContent = card.dataset.note || "";
      }

      if (image) {
        image.setAttribute("src", card.dataset.image || "");
        image.setAttribute("alt", card.dataset.alt || "");
      }

      if (palette) {
        palette.innerHTML = "";

        try {
          const tones = JSON.parse(card.dataset.palette || "[]");

          tones.forEach(function (tone) {
            const chip = document.createElement("span");
            chip.className = "palette-chip";
            chip.innerHTML =
              '<span class="palette-chip__swatch" style="background-color:' +
              tone +
              '"></span>' +
              tone;
            palette.appendChild(chip);
          });
        } catch (error) {
          palette.innerHTML = "";
        }
      }

      lightbox.setAttribute("aria-label", card.dataset.title || "Portfólio");
      lightbox.hidden = false;
      body.style.overflow = "hidden";
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyFilter(button.dataset.filter || "Todos");
      });
    });

    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        openLightbox(card);
      });
    });

    if (lightbox && dialog) {
      lightbox.addEventListener("click", closeLightbox);
      dialog.addEventListener("click", function (event) {
        event.stopPropagation();
      });

      const closeButton = lightbox.querySelector("[data-lightbox-close]");
      if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
      }

      window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          closeLightbox();
        }
      });
    }

    applyFilter("Todos");
  }

  function initContactForm() {
    const form = document.querySelector("[data-contact-form]");

    if (!form) {
      return;
    }

    const status = form.querySelector("[data-testid='contact-status']");
    const generatedLink = form.querySelector("[data-testid='generated-whatsapp-link']");
    const whatsappNumber = form.dataset.whatsappNumber || "";

    function sanitizePhone(value) {
      return value.replace(/\D/g, "");
    }

    function setError(name, message) {
      const slot = form.querySelector("[data-error-for='" + name + "']");
      if (slot) {
        slot.textContent = message;
      }
    }

    function clearErrors() {
      form.querySelectorAll("[data-error-for]").forEach(function (slot) {
        slot.textContent = "";
      });
    }

    function buildMessage(payload) {
      const lines = [
        "Olá, Le Jardin. Gostaria de solicitar um atendimento para um projeto de decoração.",
        "",
        "Nome: " + payload.name,
        "WhatsApp: " + payload.phone,
        "Tipo de evento: " + payload.eventType,
      ];

      if (payload.date) {
        lines.push("Data desejada: " + payload.date);
      }

      if (payload.guests) {
        lines.push("Convidados estimados: " + payload.guests);
      }

      lines.push("", "Mensagem:", payload.message);

      return lines.join("\n");
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors();

      const payload = {
        name: (form.querySelector("#name") || {}).value || "",
        phone: sanitizePhone((form.querySelector("#phone") || {}).value || ""),
        eventType: (form.querySelector("#eventType") || {}).value || "",
        date: (form.querySelector("#date") || {}).value || "",
        guests: (form.querySelector("#guests") || {}).value || "",
        message: (form.querySelector("#message") || {}).value || "",
      };

      const errors = {};

      if (!payload.name.trim()) {
        errors.name = "Informe seu nome para iniciarmos o atendimento.";
      }

      if (!payload.phone) {
        errors.phone = "Informe um WhatsApp válido.";
      }

      if (!payload.eventType) {
        errors.eventType = "Selecione o tipo de evento.";
      }

      if (!payload.message.trim()) {
        errors.message = "Conte um pouco sobre o estilo desejado.";
      }

      Object.keys(errors).forEach(function (key) {
        setError(key, errors[key]);
      });

      if (Object.keys(errors).length) {
        if (status) {
          status.textContent = "Revise os campos destacados para seguir com o briefing.";
        }
        if (generatedLink) {
          generatedLink.hidden = true;
        }
        return;
      }

      const href = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(buildMessage(payload));

      if (status) {
        status.textContent = "Briefing pronto. Abrindo seu atendimento no WhatsApp.";
      }

      if (generatedLink) {
        generatedLink.href = href;
        generatedLink.hidden = false;
      }

      window.open(href, "_blank", "noopener,noreferrer");
    });
  }

  initHeader();
  initReveal();
  initPortfolio();
  initContactForm();
})();

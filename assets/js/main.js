const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

function sendWhatsApp(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const evento = document.getElementById('evento').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  const texto = `Olá! Meu nome é ${nome}. Gostaria de solicitar um orçamento para: ${evento}. ${mensagem}`;

  // Troque o número abaixo pelo WhatsApp oficial da empresa, com DDI e DDD.
  // Exemplo: 5517999999999
  const telefone = '5500000000000';
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');
}

const revealElements = document.querySelectorAll('.card, .portfolio-item, .text-card, .contact-card, .instagram-panel');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 650, easing: 'cubic-bezier(.2,.65,.2,1)', fill: 'both' }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => observer.observe(element));

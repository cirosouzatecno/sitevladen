<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/inc/bootstrap.php';

$siteConfig = site_data('siteConfig');

$meta = page_metadata(
    'Contato | ' . $siteConfig['shortName'],
    'Entre em contato com a Le Jardin Eventos e Decorações e envie seu briefing pelo WhatsApp para solicitar um projeto premium em São José do Rio Preto.',
    '/contato/'
);

render_page_start($meta, '/contato/');
?>
<main class="section-shell page-stack page-stack--top">
  <section data-reveal>
    <?php render_section_heading(
        'Contato',
        'Briefings elegantes começam com conversas objetivas.',
        'Preencha as informações essenciais do seu evento e siga diretamente para o WhatsApp com uma mensagem pronta. Assim, o atendimento começa de forma rápida, clara e personalizada.'
    ); ?>
  </section>

  <section class="contact-layout">
    <div class="contact-card" data-reveal style="--reveal-delay: 90ms;">
      <form
        class="contact-form"
        novalidate
        data-contact-form
        data-whatsapp-number="<?= e($siteConfig['whatsappNumber']) ?>"
        data-testid="contact-form"
      >
        <div class="contact-form__field">
          <label class="form-label" for="name">Nome</label>
          <input class="form-input" id="name" name="name" placeholder="Seu nome">
          <p class="form-error" data-error-for="name"></p>
        </div>

        <div class="contact-form__field">
          <label class="form-label" for="phone">WhatsApp</label>
          <input class="form-input" id="phone" name="phone" type="tel" placeholder="(17) 99999-9999">
          <p class="form-error" data-error-for="phone"></p>
        </div>

        <div class="contact-form__field">
          <label class="form-label" for="eventType">Tipo de evento</label>
          <select class="form-input" id="eventType" name="eventType">
            <option value="">Selecione</option>
            <?php foreach ($siteConfig['leadEventTypes'] as $eventType): ?>
              <option value="<?= e($eventType) ?>"><?= e($eventType) ?></option>
            <?php endforeach; ?>
          </select>
          <p class="form-error" data-error-for="eventType"></p>
        </div>

        <div class="contact-form__field">
          <label class="form-label" for="date">Data do evento</label>
          <input class="form-input" id="date" name="date" type="date">
          <p class="form-error"></p>
        </div>

        <div class="contact-form__field">
          <label class="form-label" for="guests">Convidados estimados</label>
          <input class="form-input" id="guests" name="guests" inputmode="numeric" placeholder="Ex: 180">
          <p class="form-error"></p>
        </div>

        <div class="contact-form__field contact-form__field--full">
          <label class="form-label" for="message">Mensagem</label>
          <textarea class="form-input" id="message" name="message" placeholder="Conte o estilo desejado, local, horário e referências que gostaria de compartilhar."></textarea>
          <p class="form-error" data-error-for="message"></p>
        </div>

        <div class="contact-form__field contact-form__field--full contact-form__actions">
          <div class="contact-form__buttons">
            <button type="submit" class="button-link button-link--primary button-reset">Enviar briefing pelo WhatsApp <span aria-hidden="true">&#8599;</span></button>
            <a
              href="<?= e(build_direct_whatsapp_href()) ?>"
              target="_blank"
              rel="noreferrer"
              class="button-link button-link--secondary"
            >
              <span>Falar agora</span>
              <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
          <p class="contact-note">Atendimento direto via WhatsApp para um processo rápido, elegante e personalizado.</p>
          <p class="contact-status" data-testid="contact-status"></p>
          <a
            href="<?= e(build_direct_whatsapp_href()) ?>"
            target="_blank"
            rel="noreferrer"
            class="contact-link"
            data-testid="generated-whatsapp-link"
            hidden
          >
            Abrir novamente no WhatsApp
          </a>
        </div>
      </form>
    </div>

    <div class="cards-grid">
      <article class="contact-card contact-card--dark" data-reveal style="--reveal-delay: 120ms;">
        <p class="eyebrow eyebrow--light">WhatsApp direto</p>
        <h2>Atendimento principal</h2>
        <p class="contact-note">
          Para orçamentos, disponibilidade e alinhamento inicial de referências, o WhatsApp
          é o canal prioritário da Le Jardin.
        </p>
        <ul class="contact-list contact-list--plain">
          <li><?= e($siteConfig['whatsappDisplay']) ?></li>
          <li><?= e($siteConfig['city']) ?> • <?= e($siteConfig['region']) ?></li>
          <li>Atendimento para casamentos, eventos sociais, corporativos e projetos especiais.</li>
        </ul>
        <div style="margin-top: 1.5rem;">
          <?php render_button_link(build_direct_whatsapp_href(), 'Abrir WhatsApp', 'secondary', ['target' => '_blank', 'rel' => 'noreferrer', 'class' => 'button-link--light']); ?>
        </div>
      </article>

      <article class="contact-card" data-reveal style="--reveal-delay: 180ms;">
        <p class="eyebrow">O que compartilhar</p>
        <h3>Quanto mais contexto, mais preciso o conceito.</h3>
        <ul class="contact-list">
          <li><span>Data ou período desejado</span></li>
          <li><span>Cidade e local do evento</span></li>
          <li><span>Número estimado de convidados</span></li>
          <li><span>Estilo visual, cores e referências</span></li>
          <li><span>Objetivo do ambiente e clima desejado</span></li>
        </ul>
      </article>
    </div>
  </section>
</main>
<?php render_page_end(); ?>

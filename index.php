<?php

declare(strict_types=1);

require_once __DIR__ . '/inc/bootstrap.php';

$siteConfig = site_data('siteConfig');
$heroSlides = site_data('heroSlides');
$signaturePillars = site_data('signaturePillars');
$serviceItems = site_data('serviceItems');
$portfolioItems = site_data('portfolioItems');
$differentials = site_data('differentials');
$testimonials = site_data('testimonials');

$meta = page_metadata(
    $siteConfig['shortName'] . ' | Decoração de eventos de alto padrão em São José do Rio Preto',
    'A Le Jardin cria cenários florais, recepções sofisticadas e experiências visuais exclusivas para eventos de alto padrão em São José do Rio Preto.',
    '/'
);

render_page_start($meta, '/');
?>
<main>
  <section class="section-shell section-shell--hero">
    <div class="hero">
      <div data-reveal>
        <p class="eyebrow">Cenografia floral premium</p>
        <h1><?= e($siteConfig['tagline']) ?></h1>
        <p class="hero__lead">
          Projetos para casamentos, festas de luxo e eventos corporativos com estética
          autoral, atmosfera refinada e direção cuidadosa em cada detalhe.
        </p>
        <div class="hero__actions">
          <?php render_button_link(build_direct_whatsapp_href(), 'Solicitar atendimento', 'primary', ['target' => '_blank', 'rel' => 'noreferrer']); ?>
          <?php render_button_link('/portfolio/', 'Ver portfólio', 'secondary'); ?>
        </div>
        <div class="feature-pill-grid">
          <div class="feature-pill">Composições florais refinadas</div>
          <div class="feature-pill">Iluminação cênica e ambientação</div>
          <div class="feature-pill">Atendimento em São José do Rio Preto e região</div>
        </div>
      </div>

      <div data-reveal style="--reveal-delay: 120ms;">
        <div class="hero-card-grid">
          <?php foreach ($heroSlides as $index => $slide): ?>
            <?php
            $cardClass = 'hero-card';
            if ($index === 0) {
                $cardClass .= ' hero-card--large';
            } elseif ($index === 1) {
                $cardClass .= ' hero-card--secondary';
            } else {
                $cardClass .= ' hero-card--tertiary';
            }
            ?>
            <article class="<?= e($cardClass) ?>">
              <img src="<?= e(asset_url($slide['imageSrc'])) ?>" alt="<?= e($slide['imageAlt']) ?>">
              <div class="hero-card__overlay"></div>
              <div class="hero-card__copy">
                <p>Assinatura visual</p>
                <h2><?= e($slide['title']) ?></h2>
                <p><?= e($slide['subtitle']) ?></p>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </section>

  <section class="section-shell">
    <div data-reveal>
      <?php render_section_heading(
          'Essência',
          'Arte, elegância e exclusividade para celebrar com beleza impecável.',
          'Inspirada em decorações que unem presença floral, sofisticação clássica e acabamento contemporâneo, a Le Jardin desenha cenários pensados para emocionar no olhar e permanecer na lembrança.'
      ); ?>
    </div>
    <div class="cards-grid cards-grid--3" style="margin-top: 2rem;">
      <?php foreach ($signaturePillars as $index => $pillar): ?>
        <article class="card card--soft" data-reveal style="--reveal-delay: <?= e((string) ($index * 90)) ?>ms;">
          <p class="card__number">0<?= e((string) ($index + 1)) ?></p>
          <h3><?= e($pillar['title']) ?></h3>
          <p class="card__text"><?= e($pillar['description']) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </section>

  <section class="section-shell">
    <div class="panel-layout">
      <div data-reveal>
        <?php render_section_heading(
            'Serviços',
            'Projetos desenhados para eventos que pedem presença estética e experiência.',
            'Da decoração completa à assessoria estética, cada serviço é construído para valorizar identidade, atmosfera e acabamento.'
        ); ?>
      </div>
      <div data-reveal style="--reveal-delay: 90ms;">
        <?php render_button_link('/servicos/', 'Explorar serviços', 'secondary'); ?>
      </div>
    </div>

    <div class="cards-grid cards-grid--2" style="margin-top: 2rem;">
      <?php foreach ($serviceItems as $index => $service): ?>
        <article class="split-card" data-reveal style="--reveal-delay: <?= e((string) ($index * 80)) ?>ms;">
          <div class="split-card__media">
            <img src="<?= e(asset_url($service['imageSrc'])) ?>" alt="<?= e($service['imageAlt']) ?>">
          </div>
          <div class="split-card__body">
            <p class="eyebrow"><?= e($service['eyebrow']) ?></p>
            <h3><?= e($service['title']) ?></h3>
            <p><?= e($service['description']) ?></p>
            <ul class="bullet-list">
              <?php foreach ($service['bullets'] as $bullet): ?>
                <li><span><?= e($bullet) ?></span></li>
              <?php endforeach; ?>
            </ul>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </section>

  <section class="section-shell">
    <div class="panel-layout">
      <div data-reveal>
        <?php render_section_heading(
            'Portfólio',
            'Estudos visuais prontos para receber o acervo oficial com a sofisticação que a marca pede.',
            'Enquanto o acervo definitivo está em curadoria, a Le Jardin apresenta um preview editorial da linguagem visual que orienta seus projetos.'
        ); ?>
      </div>
      <div data-reveal style="--reveal-delay: 90ms;">
        <?php render_button_link('/portfolio/', 'Abrir portfólio completo', 'secondary'); ?>
      </div>
    </div>

    <div class="cards-grid cards-grid--4" style="margin-top: 2rem;">
      <?php foreach (array_slice($portfolioItems, 0, 4) as $index => $item): ?>
        <article class="card portfolio-preview-card" data-reveal style="--reveal-delay: <?= e((string) ($index * 90)) ?>ms;">
          <div class="portfolio-preview-card__media">
            <img src="<?= e(asset_url($item['imageSrc'])) ?>" alt="<?= e($item['imageAlt']) ?>">
            <div class="portfolio-preview-card__caption">
              <p class="portfolio-card__category"><?= e($item['category']) ?></p>
              <h3><?= e($item['title']) ?></h3>
            </div>
          </div>
          <div class="portfolio-preview-card__body">
            <p><?= e($item['note']) ?></p>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </section>

  <section class="section-shell">
    <div class="detail-layout">
      <div data-reveal>
        <?php render_section_heading(
            'Diferenciais',
            'Uma presença estética comparável a marcas de luxo internacionais.',
            'A proposta não é apenas decorar. É criar uma atmosfera coerente, autoral e fotogênica, em que cada elemento contribui para uma experiência inesquecível.'
        ); ?>
      </div>
      <div class="number-list">
        <?php foreach ($differentials as $index => $item): ?>
          <article class="number-card" data-reveal style="--reveal-delay: <?= e((string) ($index * 70)) ?>ms;">
            <span class="number-card__badge">0<?= e((string) ($index + 1)) ?></span>
            <p><?= e($item) ?></p>
          </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="section-shell">
    <div class="feature-panel feature-panel--dark" data-reveal>
      <div class="panel-layout panel-layout--wide">
        <div>
          <p class="eyebrow eyebrow--light">Instagram future-ready</p>
          <h2>Espaço preparado para integração com feed social em uma próxima fase.</h2>
          <p class="feature-panel__text">
            Nesta primeira versão, priorizamos performance, narrativa institucional
            e conversão. A área social já está prevista para receber curadoria de
            imagens e bastidores da marca quando o acervo digital estiver pronto.
          </p>
        </div>
        <div class="tag-grid">
          <div class="tag-card">Curadoria visual</div>
          <div class="tag-card">Conteúdo em movimento</div>
          <div class="tag-card">Bastidores</div>
          <div class="tag-card">Novas montagens</div>
        </div>
      </div>
    </div>
  </section>

  <?php if ($siteConfig['testimonialsEnabled']): ?>
    <section class="section-shell">
      <div data-reveal>
        <?php render_section_heading(
            'Depoimentos',
            'Confiança construída em cada detalhe do projeto.',
            'Seção preparada para receber relatos aprovados de clientes da marca.'
        ); ?>
      </div>
      <div class="cards-grid cards-grid--3" style="margin-top: 2rem;">
        <?php foreach ($testimonials as $index => $testimonial): ?>
          <article class="card" data-reveal style="--reveal-delay: <?= e((string) ($index * 90)) ?>ms;">
            <p>“<?= e($testimonial['quote']) ?>”</p>
            <p class="card__number" style="margin-top: 1.5rem;"><?= e($testimonial['name']) ?></p>
            <p class="card__text"><?= e($testimonial['role']) ?></p>
          </article>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

  <section class="section-shell" style="padding-top: 0;">
    <div class="feature-panel" data-reveal>
      <div class="panel-layout">
        <div>
          <p class="eyebrow">Contato</p>
          <h2>Vamos transformar sua ocasião em uma experiência visual inesquecível.</h2>
          <p class="feature-panel__text">
            Se o seu evento pede elegância, cenografia marcante e acabamento impecável,
            a conversa começa aqui.
          </p>
        </div>
        <div class="cta-actions">
          <?php render_button_link('/contato/', 'Montar briefing', 'primary'); ?>
          <?php render_button_link(build_direct_whatsapp_href(), 'WhatsApp direto', 'secondary', ['target' => '_blank', 'rel' => 'noreferrer']); ?>
        </div>
      </div>
    </div>
  </section>
</main>
<?php render_page_end(); ?>

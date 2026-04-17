<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/inc/bootstrap.php';

$siteConfig = site_data('siteConfig');
$serviceItems = site_data('serviceItems');

$meta = page_metadata(
    'Serviços | ' . $siteConfig['shortName'],
    'Conheça os serviços premium da Le Jardin: decoração completa, projetos personalizados, cenografia e assessoria estética para eventos de alto padrão.',
    '/servicos/'
);

render_page_start($meta, '/servicos/');
?>
<main class="section-shell page-stack page-stack--top">
  <section data-reveal>
    <?php render_section_heading(
        'Serviços',
        'Soluções autorais para eventos com presença, refinamento e personalidade.',
        'A Le Jardin atua com direção visual completa, composição cenográfica e curadoria estética para eventos sociais e corporativos de alto padrão.'
    ); ?>
  </section>

  <section class="cards-grid">
    <?php foreach ($serviceItems as $index => $service): ?>
      <article class="split-card<?= $index % 2 === 1 ? ' split-card--reverse' : '' ?>" data-reveal style="--reveal-delay: <?= e((string) ($index * 90)) ?>ms;">
        <div class="split-card__media">
          <img src="<?= e(asset_url($service['imageSrc'])) ?>" alt="<?= e($service['imageAlt']) ?>">
        </div>
        <div class="split-card__body">
          <p class="eyebrow"><?= e($service['eyebrow']) ?></p>
          <h2><?= e($service['title']) ?></h2>
          <p><?= e($service['description']) ?></p>
          <ul class="bullet-list">
            <?php foreach ($service['bullets'] as $bullet): ?>
              <li><span><?= e($bullet) ?></span></li>
            <?php endforeach; ?>
          </ul>
        </div>
      </article>
    <?php endforeach; ?>
  </section>

  <section>
    <div class="feature-panel feature-panel--tint" data-reveal>
      <div class="panel-layout">
        <div>
          <p class="eyebrow">Atendimento premium</p>
          <h2>Cada projeto é tratado como uma direção de arte exclusiva.</h2>
          <p class="feature-panel__text">
            Trabalhamos com atenção ao estilo do anfitrião, ao local do evento e à emoção
            que o cenário precisa transmitir. O objetivo é criar uma experiência visual
            memorável, elegante e coerente do início ao fim.
          </p>
        </div>
        <div>
          <?php render_button_link(build_direct_whatsapp_href(), 'Solicitar briefing', 'primary', ['target' => '_blank', 'rel' => 'noreferrer']); ?>
        </div>
      </div>
    </div>
  </section>
</main>
<?php render_page_end(); ?>

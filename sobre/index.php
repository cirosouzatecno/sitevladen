<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/inc/bootstrap.php';

$siteConfig = site_data('siteConfig');
$signaturePillars = site_data('signaturePillars');
$processSteps = site_data('processSteps');

$meta = page_metadata(
    'Sobre a ' . $siteConfig['shortName'] . ' | Filosofia, estética e processo',
    'Conheça a filosofia da Le Jardin Eventos e Decorações, sua assinatura estética premium e o processo de criação de eventos de alto padrão.',
    '/sobre/'
);

render_page_start($meta, '/sobre/');
?>
<main class="section-shell page-stack page-stack--top">
  <section class="intro-layout" data-reveal>
    <div>
      <p class="eyebrow">Sobre a marca</p>
      <h1 style="margin-top: 1.2rem; font-size: clamp(3rem, 7vw, 5.4rem); line-height: 0.96;">
        Uma casa criativa que traduz elegância em atmosfera.
      </h1>
      <p class="hero__lead">
        Inspirada em uma tradição de decoração refinada, a Le Jardin nasce para criar
        cenários com alma: florais exuberantes, iluminação sensível e composições que
        revelam exclusividade sem excessos.
      </p>
    </div>
    <div class="card" style="padding: 0;">
      <img src="<?= e(asset_url('media/about-signature.svg')) ?>" alt="Composição abstrata de flores, arquitetura e iluminação inspirada na assinatura estética da Le Jardin.">
    </div>
  </section>

  <section class="detail-layout">
    <div data-reveal>
      <?php render_section_heading(
          'Narrativa',
          'Beleza pensada como experiência, não apenas como cenário.',
          'Nossa linguagem visual se inspira no encontro entre elegância clássica, frescor botânico e acabamento contemporâneo. O resultado são eventos que encantam no primeiro impacto e continuam surpreendendo nos detalhes.'
      ); ?>
    </div>
    <div class="cards-grid">
      <?php foreach ($signaturePillars as $index => $pillar): ?>
        <article class="card card--soft" data-reveal style="--reveal-delay: <?= e((string) ($index * 80)) ?>ms;">
          <h2><?= e($pillar['title']) ?></h2>
          <p class="card__text"><?= e($pillar['description']) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </section>

  <section>
    <div data-reveal>
      <?php render_section_heading(
          'Processo',
          'Do conceito à montagem, cada etapa preserva intenção estética e excelência.',
          'Organizamos o trabalho para que a beleza final seja consequência de um processo claro, rigoroso e profundamente personalizado.'
      ); ?>
    </div>
    <div class="cards-grid cards-grid--3" style="margin-top: 2rem;">
      <?php foreach ($processSteps as $index => $step): ?>
        <article class="card" data-reveal style="--reveal-delay: <?= e((string) ($index * 90)) ?>ms;">
          <p class="card__number">Etapa 0<?= e((string) ($index + 1)) ?></p>
          <h3><?= e($step['title']) ?></h3>
          <p class="card__text"><?= e($step['description']) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </section>

  <section>
    <div class="feature-panel" data-reveal>
      <div class="panel-layout">
        <div>
          <p class="eyebrow">Exclusividade</p>
          <h2>Projetos desenhados para clientes que valorizam sofisticação, identidade e acabamento impecável.</h2>
          <p class="feature-panel__text">
            A Le Jardin atende eventos em <?= e($siteConfig['city']) ?> e região com um
            olhar curatorial que equilibra emoção, arquitetura e beleza sensível.
          </p>
        </div>
        <div>
          <?php render_button_link(build_direct_whatsapp_href(), 'Iniciar conversa', 'primary', ['target' => '_blank', 'rel' => 'noreferrer']); ?>
        </div>
      </div>
    </div>
  </section>
</main>
<?php render_page_end(); ?>

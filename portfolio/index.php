<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/inc/bootstrap.php';

$siteConfig = site_data('siteConfig');
$portfolioItems = site_data('portfolioItems');
$categories = ['Todos', 'Casamentos', 'Festas de luxo', 'Eventos corporativos', 'Decorações temáticas'];

$meta = page_metadata(
    'Portfólio | ' . $siteConfig['shortName'],
    'Explore o portfólio editorial da Le Jardin Eventos e Decorações, com linguagem visual sofisticada para casamentos, festas de luxo, eventos corporativos e decorações temáticas.',
    '/portfolio/'
);

render_page_start($meta, '/portfolio/');
?>
<main class="section-shell page-stack page-stack--top" data-portfolio>
  <section data-reveal>
    <?php render_section_heading(
        'Portfólio',
        'Acervo em atualização, linguagem visual pronta.',
        'A estrutura do portfólio já foi desenhada para receber o acervo oficial da marca. Enquanto isso, apresentamos estudos visuais e direcionamentos estéticos que traduzem a assinatura da Le Jardin.'
    ); ?>
  </section>

  <section class="notice-card" data-reveal style="--reveal-delay: 80ms;">
    <strong>Status do acervo:</strong> imagens finais em curadoria. Os cards abaixo
    funcionam como preview editorial da direção de arte da marca, sem simular eventos reais.
  </section>

  <section data-reveal style="--reveal-delay: 120ms;">
    <div class="portfolio-filters">
      <?php foreach ($categories as $index => $category): ?>
        <button
          type="button"
          class="filter-chip<?= $index === 0 ? ' is-active' : '' ?>"
          data-filter="<?= e($category) ?>"
          data-testid="filter-<?= e(slugify($category)) ?>"
        >
          <?= e($category) ?>
        </button>
      <?php endforeach; ?>
    </div>

    <div class="portfolio-grid" data-testid="portfolio-grid" style="margin-top: 2rem;">
      <?php foreach ($portfolioItems as $item): ?>
        <button
          type="button"
          class="portfolio-card"
          data-portfolio-card
          data-category="<?= e($item['category']) ?>"
          data-title="<?= e($item['title']) ?>"
          data-description="<?= e($item['description']) ?>"
          data-note="<?= e($item['note']) ?>"
          data-image="<?= e(asset_url($item['imageSrc'])) ?>"
          data-alt="<?= e($item['imageAlt']) ?>"
          data-palette="<?= e((string) json_encode($item['palette'])) ?>"
          data-testid="portfolio-card-<?= e($item['slug']) ?>"
        >
          <div class="portfolio-card__media">
            <img src="<?= e(asset_url($item['imageSrc'])) ?>" alt="<?= e($item['imageAlt']) ?>">
            <div class="portfolio-card__caption">
              <p class="portfolio-card__category"><?= e($item['category']) ?></p>
              <h3><?= e($item['title']) ?></h3>
            </div>
          </div>
          <div class="portfolio-card__body">
            <p><?= e($item['description']) ?></p>
            <div class="palette-row">
              <?php foreach ($item['palette'] as $tone): ?>
                <span class="palette-chip">
                  <span class="palette-chip__swatch" style="background-color: <?= e($tone) ?>;"></span>
                  <?= e($tone) ?>
                </span>
              <?php endforeach; ?>
            </div>
            <p class="portfolio-card__note"><?= e($item['note']) ?></p>
          </div>
        </button>
      <?php endforeach; ?>
    </div>
  </section>

  <section>
    <div class="feature-panel" data-reveal style="--reveal-delay: 140ms;">
      <div class="panel-layout">
        <div>
          <p class="eyebrow">Projeto sob medida</p>
          <h2>Quer construir um cenário exclusivo para o seu evento?</h2>
          <p class="feature-panel__text">
            Compartilhe a ocasião, a data e a atmosfera desejada. A Le Jardin desenha
            uma proposta visual coerente com o seu momento e o seu nível de exigência.
          </p>
        </div>
        <div>
          <?php render_button_link(build_direct_whatsapp_href(), 'Solicitar proposta', 'primary', ['target' => '_blank', 'rel' => 'noreferrer']); ?>
        </div>
      </div>
    </div>
  </section>

  <div class="lightbox" role="dialog" aria-modal="true" aria-label="Portfólio" hidden data-lightbox data-testid="portfolio-lightbox">
    <div class="lightbox__dialog" data-lightbox-dialog>
      <button type="button" class="lightbox__close" aria-label="Fechar modal" data-lightbox-close>&times;</button>
      <div class="lightbox__layout">
        <div class="lightbox__media">
          <img src="" alt="" data-lightbox-image>
        </div>
        <div class="lightbox__body">
          <p class="lightbox__category" data-lightbox-category></p>
          <h3 data-lightbox-title></h3>
          <p data-lightbox-description></p>
          <div class="palette-row" data-lightbox-palette></div>
          <p class="lightbox__note" data-lightbox-note></p>
        </div>
      </div>
    </div>
  </div>
</main>
<?php render_page_end(); ?>

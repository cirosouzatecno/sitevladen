<?php

declare(strict_types=1);

function site_data(?string $key = null)
{
    static $data = null;

    if ($data === null) {
        $data = require __DIR__ . '/site-data.php';
    }

    if ($key === null) {
        return $data;
    }

    return $data[$key] ?? null;
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function normalize_path(string $path): string
{
    if ($path === '' || $path === '/') {
        return '/';
    }

    return '/' . trim($path, '/') . '/';
}

function asset_url(string $path): string
{
    return '/' . ltrim($path, '/');
}

function current_url(string $path = '/'): string
{
    $config = site_data('siteConfig');

    if ($path === '' || $path === '/') {
        return rtrim($config['url'], '/') . '/';
    }

    return rtrim($config['url'], '/') . '/' . ltrim($path, '/');
}

function sanitize_phone(string $value): string
{
    return preg_replace('/\D+/', '', $value) ?? '';
}

function build_lead_message(array $brief): string
{
    $lines = [
        'Olá, Le Jardin. Gostaria de solicitar um atendimento para um projeto de decoração.',
        '',
        'Nome: ' . trim((string) ($brief['name'] ?? '')),
        'WhatsApp: ' . trim((string) ($brief['phone'] ?? '')),
        'Tipo de evento: ' . trim((string) ($brief['eventType'] ?? '')),
    ];

    if (!empty($brief['date'])) {
        $lines[] = 'Data desejada: ' . (string) $brief['date'];
    }

    if (!empty($brief['guests'])) {
        $lines[] = 'Convidados estimados: ' . (string) $brief['guests'];
    }

    $lines[] = '';
    $lines[] = 'Mensagem:';
    $lines[] = trim((string) ($brief['message'] ?? ''));

    return implode("\n", array_filter($lines, static fn ($line): bool => $line !== null));
}

function build_whatsapp_href(string $message): string
{
    $config = site_data('siteConfig');

    return 'https://wa.me/' . $config['whatsappNumber'] . '?text=' . rawurlencode($message);
}

function build_direct_whatsapp_href(): string
{
    $config = site_data('siteConfig');

    return build_whatsapp_href($config['whatsappBaseMessage']);
}

function slugify(string $value): string
{
    $value = trim($value);
    $ascii = function_exists('iconv') ? iconv('UTF-8', 'ASCII//TRANSLIT', $value) : $value;
    $ascii = $ascii === false ? $value : $ascii;
    $ascii = strtolower($ascii);
    $ascii = preg_replace('/[^a-z0-9]+/', '-', $ascii) ?? '';

    return trim($ascii, '-');
}

function html_attributes(array $attributes): string
{
    $parts = [];

    foreach ($attributes as $name => $value) {
        if ($value === null || $value === false) {
            continue;
        }

        if ($value === true) {
            $parts[] = $name;
            continue;
        }

        $parts[] = sprintf('%s="%s"', $name, e((string) $value));
    }

    return $parts ? ' ' . implode(' ', $parts) : '';
}

function button_classes(string $variant = 'primary', string $extra = ''): string
{
    $classes = [
        'button-link',
        'button-link--' . $variant,
    ];

    if ($extra !== '') {
        $classes[] = $extra;
    }

    return implode(' ', $classes);
}

function render_button_link(string $href, string $label, string $variant = 'primary', array $attributes = []): void
{
    $existingClass = trim((string) ($attributes['class'] ?? ''));
    $attributes['class'] = button_classes($variant, $existingClass);
    $attributes['href'] = $href;
    ?>
    <a<?= html_attributes($attributes) ?>>
      <span><?= e($label) ?></span>
      <span aria-hidden="true">&#8599;</span>
    </a>
    <?php
}

function render_section_heading(string $eyebrow, string $title, string $description, string $align = 'left'): void
{
    $className = 'section-heading';

    if ($align === 'center') {
        $className .= ' section-heading--center';
    }
    ?>
    <div class="<?= e($className) ?>">
      <p class="eyebrow"><?= e($eyebrow) ?></p>
      <h2><?= e($title) ?></h2>
      <p class="section-heading__description"><?= e($description) ?></p>
    </div>
    <?php
}

function page_metadata(string $title, string $description, string $path): array
{
    return [
        'title' => $title,
        'description' => $description,
        'path' => normalize_path($path),
        'keywords' => [
            'decoração de eventos',
            'decoração de casamento',
            'eventos de luxo',
            'São José do Rio Preto',
            'cenografia para eventos',
            'decoração floral refinada',
        ],
    ];
}

function local_business_schema(): array
{
    $config = site_data('siteConfig');

    return [
        '@context' => 'https://schema.org',
        '@type' => ['LocalBusiness', 'ProfessionalService'],
        'name' => $config['name'],
        'description' => $config['description'],
        'url' => $config['url'],
        'telephone' => $config['whatsappDisplay'],
        'areaServed' => array_map(
            static fn (string $area): array => [
                '@type' => 'City',
                'name' => $area,
            ],
            $config['serviceArea']
        ),
        'address' => [
            '@type' => 'PostalAddress',
            'addressLocality' => $config['city'],
            'addressRegion' => $config['region'],
            'addressCountry' => 'BR',
        ],
        'contactPoint' => [
            '@type' => 'ContactPoint',
            'contactType' => 'sales',
            'telephone' => $config['whatsappDisplay'],
            'areaServed' => 'BR',
            'availableLanguage' => ['pt-BR'],
        ],
    ];
}

function is_active_path(string $currentPath, string $itemHref): bool
{
    return normalize_path($currentPath) === normalize_path($itemHref);
}

function render_header(string $currentPath): void
{
    $config = site_data('siteConfig');
    $navigationItems = site_data('navigationItems');
    $isSolid = normalize_path($currentPath) !== '/';
    ?>
    <header class="site-header<?= $isSolid ? ' is-solid' : '' ?>" data-site-header>
      <div class="site-header__bar">
        <a href="/" class="site-brand" aria-label="<?= e($config['shortName']) ?>">
          <span class="site-brand__name"><?= e($config['shortName']) ?></span>
          <span class="site-brand__tag">Eventos e Decorações</span>
        </a>

        <nav class="site-nav" aria-label="Navegação principal">
          <?php foreach ($navigationItems as $item): ?>
            <a
              href="<?= e($item['href']) ?>"
              class="site-nav__link<?= is_active_path($currentPath, $item['href']) ? ' is-active' : '' ?>"
            >
              <?= e($item['label']) ?>
            </a>
          <?php endforeach; ?>
        </nav>

        <div class="site-header__cta">
          <?php render_button_link(build_direct_whatsapp_href(), 'WhatsApp', 'primary', ['target' => '_blank', 'rel' => 'noreferrer']); ?>
        </div>

        <button
          type="button"
          class="site-menu-toggle"
          aria-label="Abrir menu"
          aria-expanded="false"
          data-menu-toggle
        >
          <span class="sr-only">Menu</span>
          <span class="site-menu-toggle__line"></span>
          <span class="site-menu-toggle__line"></span>
          <span class="site-menu-toggle__line"></span>
        </button>
      </div>

      <div class="site-mobile-menu" aria-label="Menu mobile" data-mobile-menu hidden>
        <nav class="site-mobile-menu__links">
          <?php foreach ($navigationItems as $item): ?>
            <a
              href="<?= e($item['href']) ?>"
              class="site-mobile-menu__link<?= is_active_path($currentPath, $item['href']) ? ' is-active' : '' ?>"
            >
              <?= e($item['label']) ?>
            </a>
          <?php endforeach; ?>
          <?php render_button_link(build_direct_whatsapp_href(), 'Solicitar atendimento', 'primary', ['target' => '_blank', 'rel' => 'noreferrer']); ?>
          <p class="site-mobile-menu__note">
            Atendimento em <?= e($config['city']) ?> e região para projetos sociais e corporativos de alto padrão.
          </p>
        </nav>
      </div>
    </header>
    <?php
}

function render_footer(): void
{
    $config = site_data('siteConfig');
    $navigationItems = site_data('navigationItems');
    ?>
    <footer class="site-footer">
      <div class="site-footer__grid section-shell section-shell--tight">
        <div class="site-footer__content">
          <p class="eyebrow eyebrow--light"><?= e($config['shortName']) ?></p>
          <h2>Design que encanta, detalhes que transformam e cenários que permanecem na memória.</h2>
          <p>
            Atuamos em <?= e($config['city']) ?> e região com decoração floral refinada,
            cenografia impactante e direção estética para eventos de alto padrão.
          </p>
          <?php render_button_link(build_direct_whatsapp_href(), 'Conversar pelo WhatsApp', 'secondary', ['target' => '_blank', 'rel' => 'noreferrer', 'class' => 'button-link--light']); ?>
        </div>

        <div class="site-footer__meta">
          <div>
            <p class="site-footer__label">Navegação</p>
            <div class="site-footer__links">
              <?php foreach ($navigationItems as $item): ?>
                <a href="<?= e($item['href']) ?>"><?= e($item['label']) ?></a>
              <?php endforeach; ?>
            </div>
          </div>

          <div>
            <p class="site-footer__label">Atendimento</p>
            <div class="site-footer__contact">
              <p><?= e($config['city']) ?> • <?= e($config['region']) ?></p>
              <p><?= e($config['whatsappDisplay']) ?></p>
              <p>Projetos sociais, corporativos e experiências autorais.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <?php
}

function render_page_start(array $meta, string $currentPath): void
{
    $config = site_data('siteConfig');
    $canonical = current_url($meta['path'] ?? $currentPath);
    $keywords = implode(', ', $meta['keywords'] ?? []);
    $ogImage = current_url('/media/og-le-jardin.svg');
    ?>
    <!doctype html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title><?= e($meta['title']) ?></title>
      <meta name="description" content="<?= e($meta['description']) ?>">
      <meta name="keywords" content="<?= e($keywords) ?>">
      <meta name="theme-color" content="#f6f1e8">
      <link rel="canonical" href="<?= e($canonical) ?>">
      <meta property="og:type" content="website">
      <meta property="og:locale" content="<?= e($config['locale']) ?>">
      <meta property="og:title" content="<?= e($meta['title']) ?>">
      <meta property="og:description" content="<?= e($meta['description']) ?>">
      <meta property="og:url" content="<?= e($canonical) ?>">
      <meta property="og:site_name" content="<?= e($config['name']) ?>">
      <meta property="og:image" content="<?= e($ogImage) ?>">
      <meta property="og:image:width" content="1200">
      <meta property="og:image:height" content="630">
      <meta property="og:image:alt" content="<?= e($config['name']) ?> - identidade visual premium">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="<?= e($meta['title']) ?>">
      <meta name="twitter:description" content="<?= e($meta['description']) ?>">
      <meta name="twitter:image" content="<?= e($ogImage) ?>">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="<?= e(asset_url('assets/css/site.css')) ?>">
    </head>
    <body data-current-path="<?= e(normalize_path($currentPath)) ?>">
      <div class="site-background" aria-hidden="true"></div>
      <div class="site-app">
        <?php render_header($currentPath); ?>
    <?php
}

function render_page_end(): void
{
    $schema = json_encode(local_business_schema(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    ?>
      </div>
      <script src="<?= e(asset_url('assets/js/site.js')) ?>"></script>
      <script type="application/ld+json"><?= $schema ?></script>
    </body>
    </html>
    <?php
}

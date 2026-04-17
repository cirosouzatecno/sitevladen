# Le Jardin Eventos e Decorações

Versão do site convertida para `PHP`, `HTML`, `CSS` e `JavaScript` leve, sem dependência de `Next.js` para renderização das páginas.

## Como rodar

Use o servidor embutido do PHP na raiz do projeto:

```bash
php -S localhost:8000
```

Depois abra:

- `http://localhost:8000/`
- `http://localhost:8000/sobre/`
- `http://localhost:8000/servicos/`
- `http://localhost:8000/portfolio/`
- `http://localhost:8000/contato/`

## Estrutura nova

- `index.php`: página inicial
- `sobre/index.php`, `servicos/index.php`, `portfolio/index.php`, `contato/index.php`: rotas principais
- `inc/`: dados do site, helpers, layout e SEO
- `assets/css/site.css`: estilos globais
- `assets/js/site.js`: menu mobile, animações, filtros do portfólio, lightbox e formulário
- `media/`: imagens e artes do site

## Observações

- O portfólio continua preparado para receber o acervo oficial da marca, usando estudos visuais editoriais enquanto isso.
- O contato continua centrado em `WhatsApp`, agora com formulário HTML e JS leve gerando a mensagem automaticamente.
- A base antiga em `Next.js` foi preservada no repositório como referência até uma limpeza final ser solicitada.

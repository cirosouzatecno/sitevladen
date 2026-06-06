# Site Vladen Joseph Party Design

Site institucional moderno criado para o perfil **Vladen Joseph Party Design** com foco em estética de Instagram, decoração de festas e conversão para orçamento.

## O que foi criado

- Página inicial responsiva em HTML, CSS e JavaScript puro.
- Tema visual moderno inspirado em feed de Instagram.
- Hero section com chamada comercial.
- Área de serviços.
- Galeria/portfólio pronta para receber fotos reais.
- Chamada direta para o Instagram.
- Formulário com direcionamento para WhatsApp.
- Layout otimizado para celular.

## Perfil usado como referência

Instagram: https://www.instagram.com/vladen_joseph_partydesign_/

Observação: como o conteúdo público do perfil não apareceu disponível/indexado para leitura detalhada na busca aberta, o site foi montado com base no nome do perfil, no nicho de party design e em uma direção visual compatível com marcas de decoração de festas no Instagram.

## Como personalizar

### 1. Trocar o WhatsApp

Abra o arquivo:

```txt
assets/js/main.js
```

Substitua:

```js
const telefone = '5500000000000';
```

pelo número oficial com DDI + DDD + número. Exemplo:

```js
const telefone = '5517999999999';
```

### 2. Colocar fotos reais

No arquivo `index.html`, procure a seção:

```html
<section class="section" id="portfolio">
```

Você pode substituir os blocos visuais por imagens reais usando:

```html
<div class="portfolio-item" style="background-image: url('assets/img/foto1.jpg'); background-size: cover; background-position: center;">
  <span>Nome do evento</span>
</div>
```

Crie a pasta:

```txt
assets/img/
```

E envie as fotos para dentro dela.

### 3. Publicar no GitHub Pages

No GitHub:

1. Entre no repositório `sitevladen`.
2. Vá em **Settings**.
3. Clique em **Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha branch `main` e pasta `/root`.
6. Salve.

Depois o site ficará disponível em um endereço parecido com:

```txt
https://cirosouzatecno.github.io/sitevladen/
```

## Estrutura principal

```txt
sitevladen/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
└── README.md
```

## Próximos ajustes recomendados

- Adicionar telefone oficial.
- Inserir fotos reais do portfólio.
- Adicionar depoimentos de clientes.
- Criar uma seção de pacotes/eventos.
- Configurar GitHub Pages.

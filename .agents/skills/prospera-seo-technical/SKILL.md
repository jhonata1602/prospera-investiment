---
name: prospera-seo-technical
description: Diretrizes de SEO técnico, semântica HTML, Open Graph, estruturação de metadados e arquitetura futura bilíngue para a Prospera Investment.
---

# Prospera SEO Technical

Skill dedicada à excelência em SEO técnico, indexabilidade e semântica de alto padrão para posicionar a Prospera Investment perante mecanismos de busca globais e investidores qualificados.

---

## 1. Regras de Ouro de Semântica e Hierarquia

1. **Apenas um `<h1>` por página:** O `<h1>` pertence exclusivamente à proposta de valor central da Hero.
2. **Hierarquia Lógica de Títulos:** Seções subsequentes devem utilizar `<h2>`, e subitens/cards devem adotar `<h3>` ou `<h4>`. Nunca pular níveis semânticos por conveniência de tamanho visual.
3. **HTML5 Semântico:** Utilizar tags estruturadas (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`) em vez de aninhamentos infinitos de `<div>`.
4. **Textos Alternativos (`alt`):**
   - Imagens de conteúdo/autoridade (ex: Adriana Horrocks, maquetes, imóveis): `alt` descritivo, rico e contextual.
   - Imagens meramente decorativas de fundo: `alt=""` acompanhado de `aria-hidden="true"`.
5. **Zero Keyword Stuffing:** Linguagem natural, precisa e institucional. Jamais poluir títulos com repetição artificial de palavras-chave.
6. **Conformidade Regulatória:** Nunca prometer "lucro garantido", "retorno sem risco" ou "enriquecimento acelerado". Manter terminologia patrimonial e de governança.

---

## 2. Metadados e Compartilhamento Social

Toda página deve manter sincronizados:
- `<title>`: Conciso, imponente (ex.: *Prospera Investment | Investimento Imobiliário no Reino Unido*).
- `<meta name="description">`: Resumo persuasivo em até 155 caracteres.
- `<link rel="canonical">`: URL canônica explícita.
- **Open Graph & Twitter Cards:** `og:title`, `og:description`, `og:image` (1200x630px), `og:url` e `og:type="website"`.
- **Favicons:** Conjunto completo com SVG, PNG e webmanifest.

---

## 3. Preparação para Arquitetura Multilíngue Futura

Quando o suporte bilíngue (`/pt/` e `/en/`) for oficialmente ativado:
- **`hreflang`:** Inserir tags cruzadas:
  - `<link rel="alternate" hreflang="pt-BR" href="https://prospera.investments/pt/" />`
  - `<link rel="alternate" hreflang="en-GB" href="https://prospera.investments/en/" />`
  - `<link rel="alternate" hreflang="x-default" href="https://prospera.investments/en/" />`
- **Metadados específicos:** Títulos, descrições e Open Graph traduzidos contextualmente por rota de idioma.
- *Nota: Não instale bibliotecas nem implemente arquivos de tradução sem instrução expressa.*

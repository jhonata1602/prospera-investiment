# Prospera Investment — Asset Plan

Mapeamento de ativos oficiais do projeto Prospera Investment.

## Imagens Oficiais (`public/assets/prospera/`)

### 1. Hero Principal
- **Arquivo:** `hero-adriana-london-house.webp` (1254x1254, WebP otimizado)
- **Composição:** Adriana Horrocks à esquerda, Big Ben / Westminster iluminado ao fundo britânico, modelo arquitetônico de casa inglesa sobre o livro "PROSPERA INVESTMENT", notebook com logotipo oficial da Prospera Investment e ampla área escura com gradiente natural à direita.
- **Uso:** Dobra principal (Hero Premium) do website, com copy de alto contraste posicionada à direita no desktop e adaptada com gradiente e respiro no mobile/tablet.

### 2. Imagens Secundárias / Futuras Seções
- **`adriana-london-wide.webp`**: Variação com MacBook neutro.
- **`logo-prospera-investment.webp`**: Brasão institucional e logotipo de alta definição.
- **`adriana-keys-book.webp`**: Adriana com chaves e livro para seções de autoridade / método / livro.
- **`adriana-keys-house.webp`**: Adriana com chaves e casa inglesa para seções de aquisição / serviços.

## Diretrizes de Uso
- Sempre carregar a imagem da Hero com `fetchpriority="high"`.
- Utilizar `object-cover` e posicionamento refinado (`object-left` / `object-[25%_center]`) para preservar Adriana e os elementos emblemáticos sem distorção.
- Não esticar nem cortar o rosto ou elementos-chave em nenhum breakpoint.
# Prospera Investment — Plano de Ativos Visuais

Este arquivo define como usar fotos reais, logo e imagens institucionais no site.

## Prioridade de ativos

### 1. Logo oficial da Prospera
Usar a versão oficial em alta resolução, preferencialmente PNG com fundo transparente e, se existir, SVG.

Uso sugerido:
- Header principal
- Footer
- Favicon / marca reduzida
- Blocos institucionais específicos

Evitar:
- Recriar a logo por IA
- Alterar proporções
- Aplicar efeitos exagerados
- Usar versões extraídas de criativos quando a arte original estiver disponível

### 2. Adriana Horrocks — foto executiva de braços cruzados
Prioridade alta.

Uso sugerido:
- Seção "Sobre Adriana"
- Bloco de autoridade
- CTA institucional mais abaixo na página

Tratamento visual:
- Corte elegante
- Fundo limpo ou integrado à paleta off-white/verde
- Não distorcer o rosto ou o corpo
- Manter aparência natural e profissional

### 3. Adriana com chave / contexto imobiliário
Uso sugerido:
- Jornada do investidor
- Aquisição
- Diagnóstico / aplicação

### 4. Adriana sentada / pose mais humanizada
Uso sugerido:
- Propósito
- Legado
- Visão da fundadora
- Seção editorial / livro

## Primeira dobra / Hero

A Hero deve vender primeiro:
**Prospera + Reino Unido + patrimônio + investimento imobiliário**.

Composição preferida:
- imóvel britânico premium em primeiro plano;
- Londres ao fundo de forma sutil, preferencialmente Westminster / Big Ben / ponte;
- detalhes dourados discretos;
- off-white como base visual;
- verde profundo para contraste e tipografia;
- Adriana pode aparecer de forma equilibrada, mas sem transformar a Home em site pessoal.

Evitar aparência turística. Londres deve funcionar como sinal de mercado britânico e autoridade internacional.

## Direção de movimento

- parallax leve em fundo de Londres;
- profundidade entre imóvel e skyline;
- entrada suave de texto e CTAs;
- microinterações refinadas;
- sem bounce, neon ou efeitos gamer;
- reduzir efeitos em mobile;
- respeitar prefers-reduced-motion.

## Formatos recomendados

- Fotos: WebP ou AVIF para uso web
- Logo: SVG quando disponível; PNG transparente como fallback
- Hero: WebP/AVIF responsivo
- Ícones: SVG

## Organização sugerida de arquivos

public/
  images/
    brand/
      prospera-logo.svg
      prospera-logo.png
    adriana/
      adriana-executiva.webp
      adriana-chave.webp
      adriana-proposito.webp
      adriana-cta.webp
    hero/
      uk-property-hero.webp
      london-background.webp
    book/
      metodo-prospera-cover.webp

## Observação

O site deve sempre priorizar ativos reais da Adriana e da Prospera quando estiverem disponíveis. Imagens genéricas ou geradas devem ser usadas apenas para cenário, ambientação ou apoio visual, nunca para substituir a identidade real da marca.

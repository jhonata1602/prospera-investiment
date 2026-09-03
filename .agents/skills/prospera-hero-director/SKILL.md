---
name: prospera-hero-director
description: Diretrizes estritas de composição, posicionamento de Adriana, integração visual, copy oficial, CTAs e responsividade da Hero da Prospera Investment.
---

# Prospera Hero Director

Skill permanente que governa a composição, hierarquia, enquadramentos e diretrizes técnicas da primeira dobra (Hero) da Prospera Investment.

---

## 1. Composição Geral da Hero

- **Esquerda:** Adriana Horrocks, notebook com a logo oficial da Prospera nítida, mesa executiva contínua, modelo arquitetônico (maquete de casa britânica), livro institucional da Prospera e iluminação executiva.
- **Fundo:** Vídeos reais de Londres com transição cinematográfica fluida, sem cortes duros, sem linhas, sem grades ou caixas visíveis.
- **Direita:** Copy principal com tipografia editorial nobre, subtítulo de alta legibilidade, CTA principal dominante e CTA secundário discreto.
- **Topo:** Header fino, semitransparente, com brasão e logo oficial da Prospera e menu em branco/off-white de alto contraste.

---

## 2. Adriana & Mesa Executiva (Regras de Ouro)

- **Sem Moldura / Sem Card:** Nunca colocar Adriana dentro de caixas, retângulos, cards flutuantes com borda aparente ou cortes retos nas laterais.
- **Integração Natural:** A imagem deve se fundir suavemente ao vídeo através de máscara horizontal suave (`linear-gradient` com feather longo para a direita).
- **Mesa Contínua:** A mesa executiva e o notebook nunca devem ser cortados abruptamente. A mesa deve parecer contínua a partir do canto inferior da tela.
- **Elementos Preservados:** Notebook com a marca Prospera, livro institucional e maquete da casa inglesa devem permanecer íntegros e visíveis.
- **Posicionamento:** Em desktop, manter Adriana no quadrante esquerdo com leve deslocamento de 4% a 8% em direção à copy para equilibrar o centro da tela, sem sobrepor a tipografia.

---

## 3. Proteção Visual Contra Elementos de Fundo (London Eye & Big Ben)

- **Regra de Sobreposição:** Nenhuma estrutura forte de vídeo (ex: roda gigante da London Eye, torres ou postes) pode atravessar visualmente o rosto, cabelo, corpo ou notebook da Adriana.
- **Ajuste por Cena:** Utilizar `object-position` dedicado por take (ex: deslocando a London Eye para a direita/centro) e/ou máscara protetora suave localizada atrás de Adriana.
- **Visibilidade:** O ícone (London Eye ou Big Ben) continua visível, mas elegantemente recuado no plano de fundo.

---

## 4. Copy e Hierarquia Textual

### Headline Principal
> "Invista no mercado imobiliário britânico com direção, estrutura e visão de longo prazo."

- **Fonte:** Serif nobre (*Cormorant Garamond*).
- **Escala:** `clamp(42px, 4vw, 72px)` (em telas ultrawide pode alcançar até ~76px).
- **Line-height:** `1.05` a `1.12`.
- **Destaque:** "direção, estrutura e visão de longo prazo" com gradiente dourado metálico oficial.

### Subheadline
> "Da análise do seu perfil à aquisição, gestão e crescimento do patrimônio no Reino Unido."

- **Fonte:** Sans-serif (*Plus Jakarta Sans*), peso leve (`font-light`).
- **Escala:** `clamp(17px, 1.2vw, 21px)`.

---

## 5. CTAs — Simplicidade e Decisão

- **CTA Principal (Dominante):**
  - Texto oficial: `DESCOBRIR MINHA ROTA`
  - Estilo: Dourado nobre preenchido (`btn-gold-primary`), sombra refinada, brilho suave em loop, alto contraste.
- **Microcopy de Apoio (Abaixo do CTA Principal):**
  - Texto: `“Descubra a estratégia mais alinhada ao seu perfil.”`
  - Estilo: Tipografia pequena, elegante, discreta, em tom off-white/dourado suave, gerando clareza sem pressão.
- **CTA Secundário (Discreto):**
  - Texto: `CONHECER A PROSPERA`
  - Estilo: Link discreto ou contorno ultra-sutil (`btn-gold-secondary`), sem competir com o botão principal.

---

## 6. Menu Superior (Header)

- **Logo Oficial:** Brasão institucional com escudo verde, coroa e coluna + PROSPERA INVESTMENT.
- **Itens de Navegação:** Sobre • Método PROSPERA • Rotas de Investimento • Como Funciona • Livro • FAQ.
- **Cor Padrão:** `rgba(255, 255, 255, 0.92)` (sempre legível sobre o vídeo).
- **Hover:** `#D4AF37` com linha dourada discreta.
- **Scroll:** Translúcido com leve backdrop-blur; após rolagem, adota verde profundo mais sólido (`#07110D`/95).

---

## 7. Responsividade e Adaptação

- **Telas Padrão (1366x768 / 1440x900 / 1536x864 / 1920x1080):** Equilíbrio lateral estável; Adriana na esquerda (38%–46% da largura), copy na direita (max-w: 600–680px).
- **Ultrawide & Telas Grandes (min-width: 1600px / 1900px):**
  - Camada de Adriana cresce proporcionalmente (`width: clamp(560px, 38vw, 820px)`).
  - Container contido em `max-width: 1600px` a `1720px` com padding lateral elástico.
  - Mesa e fundo preenchem a base sem deixar o retângulo da foto exposto.
- **Tablet & Mobile:**
  - Garantir legibilidade máxima da copy.
  - CTAs adaptados (full-width no mobile se necessário).
  - Menu responsivo com drawer escuro e elegante.

---

## 8. Elementos Estritamente PROIBIDOS na Hero

- ❌ Grids ou linhas decorativas tecnológicas estilo blueprint.
- ❌ Molduras ou caixas fechadas ao redor da copy.
- ❌ Molduras retangulares ou cartões ao redor da Adriana.
- ❌ Selos verdes decorativos acima da headline.
- ❌ Badges não autorizados ("Mayfair & City Advisory", "Governança Patrimonial").
- ❌ Botão grande de CTA no Header que polua a navegação.

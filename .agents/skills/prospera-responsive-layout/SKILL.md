---
name: prospera-responsive-layout
description: Diretrizes de responsividade, proporções fluidas e consistência visual premium em todas as resoluções de tela na Prospera Investment.
---

# Prospera Responsive Layout

Skill especializada na engenharia e harmonia responsiva da Prospera Investment, assegurando elegância, equilíbrio de proporções e legibilidade impecável desde smartphones até monitores ultrawide de alta resolução.

---

## 1. Princípio Fundamental de Design Responsivo

> **"Proporção nobre, hierarquia contínua e conforto visual em qualquer dimensão de viewport."**

O design de alto padrão da Prospera não pode parecer apertado em telas menores nem "perdido" em monitores amplos. A experiência visual deve se adaptar com fluidez, mantendo a sensação de solidez institucional, prestígio e sofisticação.

---

## 2. Matriz de Resoluções e Breakpoints Obrigatórios

Toda composição ou alteração estrutural deve considerar e manter estabilidade nas seguintes dimensões-chave:

| Categoria de Tela | Resolução Típica | Proporção | Foco de Ajuste & Comportamento |
| :--- | :--- | :--- | :--- |
| **Desktop Compacto** | `1366x768` | 16:9 | Garantir respiro vertical, evitar sobreposição de elementos fixos, manter CTAs visíveis sem rolagem excessiva. |
| **Desktop Médio** | `1440x900` | 16:10 | Proporção equilibrada entre elementos visuais (Adriana/mídia) e copy textual. |
| **Desktop Padrão** | `1536x864` | 16:9 | Tipografia fluida com `clamp()`, sem linhas de texto quebrando de forma órfã. |
| **Full HD** | `1920x1080` | 16:9 | Breakpoint de referência clássica; altura confortável (`min-h-[100svh]`), alinhamentos perfeitos. |
| **Ultrawide 21:9** | `2560x1080` | 21:9 | Elementos centrais não podem se espalhar excessivamente; uso obrigatório de `max-w-7xl` ou wrappers limitadores com `mx-auto`. |
| **Quad HD / 2K** | `2560x1440` | 16:9 | Conteúdo não pode parecer minúsculo; tipografia e botões escalam suavemente sem perder nitidez. |
| **Curved Ultrawide** | `3440x1440` | 21:9 | Fundos e vídeos preenchem 100% da largura (`w-full object-cover`), enquanto o conteúdo nobre permanece integrado e focado no centro-ouro. |
| **Tablet** | `768px - 1024px` | Retrato/Paisagem | Adriana e copy em hierarquia vertical harmoniosa; menus touch acessíveis; sem elementos cortados. |
| **Mobile** | `< 640px` (375px–430px) | 9:16 a 9:20 | CTAs em destaque confortável, paddings laterais seguros (`px-4` a `px-6`), sem qualquer overflow horizontal. |

---

## 3. Regras de Ouro de Responsividade

1. **Evitar conteúdo pequeno em Ultrawide:** Elementos centrais e fontes não podem encolher visualmente em 2K ou 3440px. Use escalas relativas (`rem`, `clamp()`).
2. **Evitar grandes áreas vazias desérticas:** Em telas ultrawide, garanta que backgrounds, gradientes ou vídeos preencham as laterais sem deixar o miolo desarticulado.
3. **Uso correto de `max-width`:** Manter containers de leitura e grids contidos (ex.: `max-w-[1280px]` a `max-w-[1536px]` centralizados com `mx-auto`). A copy principal nunca deve exceder `680px` de largura por parágrafo para manter ritmo de leitura.
4. **Tipografia Fluida com `clamp()`:** Preferir funções fluidas para títulos principais:
   ```css
   font-size: clamp(2.25rem, 4vw + 1rem, 4.5rem);
   ```
5. **Zero Overflow Horizontal:** Proibido qualquer elemento extrapolar a largura da tela (`overflow-x: hidden` no container raiz, larguras em `w-full` em vez de valores estáticos em `px` que ultrapassem 100vw).
6. **Manter CTAs Imediatamente Visíveis:** O botão de ação primária nunca deve ficar escondido abaixo da dobra em resoluções comuns (1366x768 / 1920x1080) nem sobreposto por menus.
7. **Paddings Laterais Seguros:** Textos e botões nunca devem encostar nas bordas físicas da tela. Uso mínimo de `px-4 sm:px-6 lg:px-8`.
8. **Inviolabilidade Cruzada:**
   - ❌ **Nunca corrigir desktop quebrando mobile.**
   - ❌ **Nunca corrigir mobile quebrando desktop.**
   - Cada ajuste de mídia deve usar prefixos responsivos do Tailwind (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) ou media queries limpas.

---

## 4. Diretrizes Específicas para a Hero

- **Composição Central Forte:** Manter o equilíbrio entre a figura institucional (Adriana) e a proposta de valor.
- **Legibilidade Absoluta:** O contraste entre a copy e o vídeo/fundo deve ser garantido por overlays de gradiente nobres (ex.: `bg-gradient-to-r from-prospera-navy/95 via-prospera-navy/80 to-transparent`).
- **Vídeo sem Distorção:** Vídeos de Londres e backgrounds devem utilizar sempre `object-cover w-full h-full`, mantendo proporção de aspecto natural sem estiramento.
- **Sem Linhas, Costuras ou Banding:** Overlays de transição devem ter gradientes de alta resolução sem faixas perceptíveis de cor ou bordas recortadas secas.
- **Escala Adequada em Ultrawide:** O elemento de vídeo e a mesa contínua devem se estender suavemente sem expor cantos inacabados ou barras pretas.

---

## 5. Checklist de Verificação Rápida

- [ ] A página rola perfeitamente sem scroll horizontal indesejado?
- [ ] O texto está com margem de segurança nas bordas em telas de 375px?
- [ ] Em 3440x1440, o container principal está centralizado e não esticado infinitamente?
- [ ] Os botões de ação e modais são fáceis de tocar em dispositivos móveis?
- [ ] O menu de navegação fecha e abre fluidamente em telas pequenas?
- [ ] Em 1366x768, a headline e o CTA aparecem sem requerer rolagem excessiva?

---

## 6. Governança e Integração

- **Complementa `prospera-design-system`:** Aplica as escalas tipográficas e espaçamentos dentro das regras de proporção de tela.
- **Complementa `prospera-hero-director`:** Garante o alinhamento da mesa contínua e de Adriana sem moldura em todos os 9 viewports.
- **Complementa `prospera-quality-check`:** Fornece a base de verificação que alimenta o protocolo de auditoria final.

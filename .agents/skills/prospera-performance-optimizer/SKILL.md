---
name: prospera-performance-optimizer
description: Estratégias de otimização de Core Web Vitals, carregamento leve de mídia, contenção de layout shifts e aceleração de renderização para a Prospera Investment.
---

# Prospera Performance Optimizer

Skill de engenharia voltada à conciliação entre estética cinematográfica de luxo e métricas de alta performance (LCP, CLS, INP) no ecossistema Prospera Investment.

---

## 1. Princípio de Otimização

> **"PERFORMANCE WITHOUT LOSING PREMIUM VISUAL QUALITY."**  
> *(Alta velocidade sem sacrificar o acabamento nobre e a estética cinematográfica.)*

Um investidor qualificado exige velocidade imediata. Se a página travar, engasgar ou demorar para responder, a percepção de prestígio é destruída.

---

## 2. Checklist dos 10 Pilares de Performance

1. **Lazy Loading de Imagens Abaixo da Dobra:** Atributos `loading="lazy"` e `decoding="async"` em todas as imagens que não compõem a Hero inicial.
2. **Prioridade Crítica da Hero (LCP):** Imagens e posters da Hero devem usar `fetchPriority="high"` e `preload` seletivo para evitar telas brancas ou atraso perceptual.
3. **Controle de Layout Shifts (CLS = 0):** Todos os containers de mídia e imagens devem possuir proporções explícitas (`aspect-ratio`, classes Tailwind de altura mínima) para que o layout não salte durante o carregamento.
4. **Animações Aceleradas por GPU:** Todas as transições contínuas e marquees devem utilizar exclusivamente `transform: translate3d(...)` ou `opacity`. Nunca animar propriedades que forçam repintura (`margin`, `left`, `top`, `width`, `height`).
5. **Prevenção de Render Looping em React:**
   - Nunca disparar re-renderizações a partir de `scroll` contínuo sem *passive listeners* ou *throttle/debounce*.
   - Preferir animações nativas CSS sobre bibliotecas JavaScript que atualizam o estado React a cada frame.
6. **Desconexão de Observers:** Todo `IntersectionObserver` e `ResizeObserver` instanciado em `useEffect` deve desconectar imediatamente no *cleanup* do componente.
7. **Bundle Size Enxuto:** Não adicionar pacotes NPM pesados (Lodash completo, Moment.js, GSAP com plugins desnecessários, Swiper completo) quando CSS e utilitários leves nativos resolvem o desafio com perfeição.
8. **Font Display Swap:** Tipografias com `font-display: swap` para renderização imediata de texto.
9. **Compressão Moderna de Mídia:** Formatos WebP/AVIF para imagens e MP4 (H.264 perfil baseline/main) para ampla compatibilidade e peso reduzido.
10. **Prevenção de Sobrecarga Mobile:** Desativar decodificações paralelas desnecessárias em telas compactas ou conexões lentas.

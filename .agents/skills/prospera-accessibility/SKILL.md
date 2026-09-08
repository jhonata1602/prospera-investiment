---
name: prospera-accessibility
description: Diretrizes de acessibilidade web (WCAG 2.1 AA), contraste, navegação por teclado e respeito a preferências do sistema na Prospera Investment.
---

# Prospera Accessibility

Skill de conformidade e inclusão voltada a assegurar que o portal Prospera Investment ofereça experiência exemplar a todos os usuários, mantendo o requinte visual e o rigor técnico.

---

## 1. Regras Fundamentais de Acessibilidade

1. **Respeito a `prefers-reduced-motion`:**
   - Para usuários que ativam a preferência de movimento reduzido no sistema operacional, marquees automáticas devem pausar, zooms da Hero devem cessar e transições de tela devem ser instantâneas ou ultra-sutis (`motion-reduce:transition-none`).
2. **Zero Áudio Automático:** Nenhum vídeo ou elemento sonoro pode iniciar com áudio sem consentimento explícito do usuário.
3. **Contraste Mínimo Confortável:**
   - Tipografia branca/off-white (`#FFFDF8`, `#F8F5EE`) sobre fundos verde-escuros (`#07110D`, `#0B1E17`) deve manter contraste superior a 4.5:1.
   - Textos dourados devem possuir sombra sutil ou fundo escuro suficiente para evitar perda de nitidez.
4. **Navegação por Teclado:**
   - Todos os botões (`<button>`), links (`<a>`) e formulários devem ser acessíveis via tecla `Tab`.
   - Estados de foco claros e elegantes via `focus-visible:ring-2 focus-visible:ring-prospera-gold`.
5. **Alvos de Toque Mobile:**
   - Botões e CTAs devem manter área de toque mínima de `44x44px` ou `48x48px` para evitar cliques incorretos em telas sensíveis ao toque.
6. **Atributos ARIA e Leitores de Tela:**
   - Utilizar `aria-label` descritivo em botões que contêm apenas ícones (ex.: botão de fechar modal, rolagem para próxima seção).
   - Elementos decorativos (halos de luz, divisores) devem conter `aria-hidden="true"`.

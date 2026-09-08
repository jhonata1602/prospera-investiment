---
name: prospera-carousel-marquee
description: Engenharia especializada de carrosséis infinitos, esteiras contínuas e vitrines dinâmicas de cards com aceleração por hardware na Prospera Investment.
---

# Prospera Carousel Marquee

Skill de arquitetura de animação dedicada à construção e calibração de esteiras contínuas (*conveyor belts* / *marquees*), eliminando gaps, engasgos e comportamentos de slider genérico.

---

## 1. Padrão Tecnológico Obrigatório

- **CSS Transforms via GPU:** Utilizar exclusivamente `transform: translate3d(...)` para delegar o cálculo de quadros à GPU, poupando a CPU para renderização suave.
- **Técnica da Duplicação Precisa (`[...ITEMS, ...ITEMS]`):** Duplicar a lista em uma trilha de largura estendida (`w-max`). A animação deve transladar de `0%` a `-50%` (ou de `-50%` a `0%` para movimento reverso). Ao atingir `-50%`, o ciclo recomeça no pixel exato do início, garantindo **zero corte visível e zero gap**.
- **Proibição de `setInterval`:** Nunca tentar mover a esteira calculando `scrollLeft` ou `left` via JavaScript contínuo.
- **Pausa Elegante:** Classes CSS `:hover` que acionam `animation-play-state: paused`, retomando suavemente quando o usuário retira o ponteiro.
- **Esmaecimento Lateral Cinematográfico:** Sempre aplicar máscaras com gradiente linear nas laterais esquerda e direita da tela (`bg-gradient-to-r from-[cor-fundo] to-transparent`) para que os cards não entrem ou saiam cortando secamente a moldura do display.

---

## 2. Configurações para Esteira Dupla

Quando o layout empregar duas esteiras paralelas:
- **Direções Opostas:**
  - Fileira Superior: Desliza da direita para a esquerda (`marqueeLeft`).
  - Fileira Inferior: Desliza da esquerda para a direita (`marqueeRight`).
- **Velocidades Dessincronizadas:**
  - Ajustar durações ligeiramente diferentes (ex.: 38s na superior, 44s na inferior) para evitar que os cards das duas linhas se movam em bloco geométrico estático.
- **Ordem Alternada de Conteúdo:** Embaralhar ou defasar a ordem dos cards na segunda esteira para criar uma sensação de riqueza e variedade na vitrine.
- **Controle de Altura e Respiro:** Cards mais compactos e espaçamento harmonioso (`gap-5` a `gap-6`), assegurando que a composição respire no desktop e no mobile.

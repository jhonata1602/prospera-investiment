# Prospera Investment — Cinematic Hero Specification

## Objetivo
Transformar a primeira dobra da Prospera Investment em uma experiência cinematográfica premium, dinâmica e sofisticada, sem aparência de landing page agressiva ou template genérico.

## Conceito central
A Hero deve combinar três planos visuais sincronizados:

1. **Plano de fundo em movimento** — Londres em vídeo ou sequência cinematográfica.
2. **Plano intermediário** — gradientes, luz, linhas douradas e profundidade visual.
3. **Primeiro plano** — Adriana Horrocks em composição executiva / escritório, com copy e CTAs.

A sensação desejada é de private wealth, property advisory e investimento imobiliário britânico de alto padrão.

## Sequência visual recomendada
Loop total aproximado: 12–18 segundos, sem áudio.

### Cena 1 — Londres / rio / ponte
- plano aberto cinematográfico de Londres;
- movimento lento;
- sensação de entrada no mercado britânico.

### Cena 2 — Westminster / Big Ben
- transição suave;
- aproximação lenta no relógio / arquitetura;
- nunca usar zoom brusco.

### Cena 3 — London Eye / skyline
- movimento lateral ou tilt suave;
- manter elegância e sensação institucional.

### Cena 4 — imóveis britânicos premium
- casas elegantes, ruas britânicas, fachadas refinadas;
- conectar Londres ao investimento imobiliário.

### Cena 5 — retorno ao plano amplo
- fechar o loop de forma imperceptível.

## Adriana em primeiro plano
- usar foto real oficial;
- preferir composição executiva / escritório;
- preservar rosto, proporções e identidade;
- posicionar à esquerda ou centro-esquerda;
- nunca esticar ou deformar;
- usar máscara/recorte suave se necessário;
- pode haver microparallax independente do fundo.

## Copy da Hero
### Eyebrow
PROSPERA INVESTMENT

### Headline
**Invista no mercado imobiliário britânico com direção, estrutura e visão de longo prazo.**

### Subheadline
**Da análise do seu perfil à aquisição, gestão e crescimento do patrimônio no Reino Unido.**

### CTA principal
**DESCOBRIR MINHA ROTA**

### CTA secundário
**CONHECER A PROSPERA**

### Linha de autoridade
**Estratégia • Aquisição • Gestão • Crescimento Patrimonial**

## Layout desktop
- hero entre 90vh e 100vh;
- conteúdo contido em max-width de 1440–1600px;
- não espalhar conteúdo em ultrawide;
- Adriana ocupa aproximadamente 42–50% da composição visual;
- copy ocupa aproximadamente 40–46%;
- manter respiro entre imagem, copy e bordas;
- headline com clamp, aproximadamente 56–72px;
- subheadline 18–22px;
- CTAs grandes e claros.

## Layout tablet
- reduzir parallax;
- manter Adriana e copy em equilíbrio;
- usar 50/50 ou leve stack conforme largura;
- preservar rosto e imóvel.

## Layout mobile
- evitar vídeo pesado quando necessário;
- usar poster/slideshow otimizado como fallback;
- imagem acima ou background com overlay controlado;
- copy centralizada ou alinhada à esquerda com alta legibilidade;
- CTAs full-width ou quase full-width;
- sem cortes agressivos no rosto;
- sem parallax pesado.

## Sistema de movimento
### Entrada
- eyebrow: fade + translateY leve;
- headline: fade/reveal em 500–700ms;
- subheadline: 100–160ms depois;
- CTAs: stagger discreto;
- linha de autoridade: por último.

### Fundo
- crossfade suave entre cenas;
- zoom/pan quase imperceptível;
- sem cortes secos;
- sem autoplay com áudio.

### Adriana
- microparallax de 4–10px no desktop;
- leve float respiratório opcional;
- desativar em reduced-motion.

### Detalhes dourados
- linhas finas, brilho ou gradiente muito sutil;
- nunca neon;
- movimento lento e mínimo.

### Easing
`cubic-bezier(0.22, 1, 0.36, 1)`

## Performance
- vídeo principal preferencialmente WebM + MP4 fallback;
- 1080p no desktop, otimizado para web;
- duração curta e loop perfeito;
- sem áudio;
- poster obrigatório;
- lazy-load das cenas secundárias;
- `preload="metadata"` ou estratégia equivalente;
- reduzir ou remover vídeo em mobile caso pese;
- usar `prefers-reduced-motion`;
- manter Core Web Vitals como prioridade.

## Estrutura de assets sugerida
```text
public/
  assets/
    prospera/
      adriana/
        hero-adriana.webp
        about-adriana.webp
      brand/
        logo-prospera.svg
        logo-prospera-light.svg
      hero/
        poster-london.webp
        london-master.webm
        london-master.mp4
      london/
        london-bridge.webp
        big-ben.webp
        london-eye.webp
        uk-houses.webp
```

## Fonte dos vídeos e imagens
Pinterest deve ser usado somente como referência estética. Não depender do Pinterest como origem do background do site.

Usar assets próprios ou devidamente licenciados, com arquivos hospedados/controlados pelo projeto.

## Regras visuais
- verde profundo + dourado + off-white;
- preto apenas como apoio/contraste;
- premium, editorial e institucional;
- movimento elegante, nunca chamativo demais;
- sem bounce, neon, glitch, zoom agressivo ou efeitos gamer;
- evitar excesso de camadas que prejudiquem leitura.

## Próxima etapa técnica
1. Produzir/selecionar o vídeo master de Londres.
2. Criar poster estático equivalente.
3. Preparar recorte/foto oficial da Adriana.
4. Implementar componente `CinematicHero` isolado.
5. Testar 1366x768, 1440x900, 1920x1080, 2560x1440, 3440x1440, tablet e mobile.
6. Só depois expandir o mesmo sistema de motion para o restante da Home.

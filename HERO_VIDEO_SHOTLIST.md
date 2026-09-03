# Prospera Investment — Hero Video Shotlist

Objetivo: construir uma Hero cinematográfica premium com Londres em movimento ao fundo, Adriana integrada em primeiro plano e leitura forte da copy.

## Sequência master recomendada — 15 segundos

### Cena 1 — Tâmisa + ponte + skyline
- Duração: 0s–3s
- Take: plano amplo do Rio Tâmisa com ponte e skyline de Londres.
- Movimento: travelling/drone/pan suave.
- Função: apresentar Londres imediatamente e dar escala internacional.
- Referência visual pública: Pexels — aerial River Thames / London skyline.
- Arquivo local sugerido: `public/assets/prospera/video/london-thames-bridge.mp4`

### Cena 2 — Westminster / Big Ben
- Duração: 3s–6s
- Take: aproximação elegante do Big Ben e Houses of Parliament a partir do rio ou ponte.
- Movimento: zoom/pan lento, sem timelapse agressivo.
- Função: reforçar reconhecimento imediato de Londres.
- Arquivo local sugerido: `public/assets/prospera/video/london-big-ben.mp4`

### Cena 3 — London Eye + Tâmisa
- Duração: 6s–9s
- Take: London Eye com rio e contexto urbano.
- Movimento: pan horizontal lento ou leve travelling.
- Função: variar o ícone visual sem quebrar a continuidade.
- Arquivo local sugerido: `public/assets/prospera/video/london-eye.mp4`

### Cena 4 — Skyline premium / cidade viva
- Duração: 9s–12s
- Take: skyline sofisticado de Londres, preferencialmente golden hour / blue hour suave.
- Movimento: drone ou pan muito lento.
- Função: criar sensação de cidade global, patrimônio e sofisticação.
- Arquivo local sugerido: `public/assets/prospera/video/london-skyline.mp4`

### Cena 5 — imóveis britânicos premium
- Duração: 12s–15s
- Take: fachada/residencial britânica elegante (townhouses, mews, casas de alto padrão ou rua residencial refinada).
- Movimento: travelling lateral ou push-in discreto.
- Função: fechar conectando Londres ao investimento imobiliário.
- Arquivo local sugerido: `public/assets/prospera/video/london-property.mp4`

## Transições
- Crossfade de 350–500ms entre cenas.
- Nada de cortes secos rápidos.
- Nada de transições chamativas.
- Evitar zoom excessivo, glitch, whip pan ou efeitos de template.
- O loop final deve retornar para a Cena 1 sem salto perceptível.

## Tratamento visual
- Exposição clara; não esmagar sombras.
- Overlay localizado principalmente atrás da copy, não sobre a cidade inteira.
- Gradiente recomendado: transparente na esquerda/centro e verde profundo apenas atrás do texto.
- Saturação moderada, contraste refinado.
- Evitar aspecto preto pesado.

## Camadas da Hero
1. Vídeo de Londres full-bleed.
2. Escritório premium / ambientação intermediária, apenas se não encobrir Londres.
3. Adriana em primeiro plano, sem moldura/card e sem duplicação.
4. Copy e CTAs à direita.
5. Header transparente/semitransparente.

## Adriana
- Fixa ou quase fixa no lado esquerdo.
- Leve parallax máximo de 8–14px.
- Sem quadro, borda ou container visual.
- Preservar rosto, mãos e postura.
- Não cobrir Big Ben/London Eye em todos os momentos; posicionar para permitir leitura do fundo.

## Desktop
- Hero: 92–100vh.
- Vídeo: `object-fit: cover`.
- Copy: max-width aproximado 620px.
- Adriana: ocupar aproximadamente 38–46% da largura visual.
- Londres precisa permanecer perceptível em pelo menos 35–45% da composição.

## Mobile
- Priorizar poster/slideshow leve se o vídeo ficar pesado.
- Alternativa: usar apenas 2 ou 3 cenas essenciais (Big Ben, London Eye, imóveis).
- CTAs em largura total.
- Não cortar agressivamente o rosto.

## Performance
- Gerar MP4 H.264 e WebM.
- Sem áudio.
- Loop, autoplay, muted, playsInline.
- Preferir 1080p bem comprimido; 4K não é necessário para entrega web normal.
- Poster WebP/AVIF enquanto o vídeo carrega.
- Respeitar `prefers-reduced-motion`.

## Critério de aprovação
A Hero só deve ser considerada pronta quando, em até 3 segundos, o visitante perceber claramente:
- Adriana / autoridade
- Londres
- investimento imobiliário britânico
- sofisticação / patrimônio

Não aprovar se o fundo parecer apenas uma parede escura ou se Londres ficar escondida.

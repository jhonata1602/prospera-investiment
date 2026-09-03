---
name: prospera-video-workflow
description: Workflow operacional de ingestão, seleção, otimização, nomenclatura e transições de vídeos de Londres para a Prospera Investment.
---

# Prospera Video Workflow

Skill operacional para gerenciar o pipeline de vídeos cinematográficos da Hero, garantindo desempenho, busca eficiente e ausência de loops.

---

## 1. Localização e Estrutura de Arquivos

- **Pasta Interna do Projeto:** `public/assets/prospera/video/`
- **Pasta Externa Primária de Download:** `C:\Users\AMD\Downloads`

---

## 2. Regras Rígidas de Busca e Gestão de Mídia

1. **Nunca realizar varredura ampla no disco inteiro:** Focar exclusivamente na pasta de Downloads ou na pasta local do projeto.
2. **Filtrar por data e formato:** Buscar apenas arquivos `.mp4` recentes na pasta `C:\Users\AMD\Downloads`.
3. **Detecção de duplicatas:** Navegadores frequentemente salvam cópias como `arquivo (1).mp4`, `arquivo (2).mp4`. Verificar tamanho em bytes e metadados antes de processar.
4. **Sem reanálises redundantes:** Registrar o que já foi mapeado para não inspecionar o mesmo arquivo repetidamente.
5. **Anti-bloqueio:** Se um vídeo específico (ex: `london-property.mp4`) não estiver disponível no computador, **prosseguir imediatamente** com os vídeos existentes de Londres. Nunca interromper a entrega visual por falta de um take.

---

## 3. Nomenclatura Padrão dos Arquivos

| Nome do Arquivo | Conteúdo Visual | Prioridade |
| :--- | :--- | :--- |
| `london-thames-bridge.mp4` | Rio Tâmisa + Tower Bridge em plano amplo | 1 (Abertura) |
| `london-big-ben.mp4` | Big Ben / Palácio de Westminster com iluminação nobre | 2 (Reconhecimento) |
| `london-eye.mp4` | London Eye com reflexo sobre o Rio Tâmisa | 3 (Ícone urbano) |
| `london-victoria-memorial.mp4` | Victoria Memorial / Palácio de Buckingham com anjo dourado | 4 (Tradição e realeza) |
| `london-skyline.mp4` | Skyline contemporâneo de Londres / City of London | 5 (Metrópole global) |
| `london-property.mp4` | Fachada residencial britânica de alto padrão / townhouse | 6 (Investimento imobiliário) |
| `london-streets.mp4` | Ruas clássicas, Trafalgar Square ou vida urbana refinada | 7 (Apoio / complemento) |
| `london-night.mp4` | Tomadas noturnas aéreas ou fluviais de Londres | 8 (Apoio / complemento) |

---

## 4. Ordem e Ritmo da Sequência Cinematográfica

- **Sequência Recomendada:**
  1. Tower Bridge & Rio Tâmisa
  2. Big Ben & Westminster
  3. London Eye (com enquadramento protegido)
  4. Victoria Memorial
  5. Skyline de Londres
  6. Propriedades / Townhouses
- **Tempo por Cena:** Entre `3.0s` e `4.0s` por take.
- **Transição:** Crossfade suave entre `500ms` e `800ms`.
- **Loop:** Contínuo e harmonioso, retornando à primeira cena sem flash, salto ou corte seco.

---

## 5. Performance e Diretrizes Técnicas

- **Atributos Obrigatórios:** `<video autoPlay muted loop playsInline preload="metadata">`.
- **Enquadramento:** `object-fit: cover`, com `object-position` customizável por cena quando necessário.
- **Resolução e Peso Web:**
  - Evitar carregar vídeos pesados em 4K nativo (30–60 Mbps) de forma simultânea.
  - Priorizar resolução 1080p bem comprimida (~3 a 6 Mbps, sem áudio).
  - Sempre manter fallback de poster em imagem estática de alta qualidade (`poster-london.webp`).
- **Respeito a Movimento Reduzido:** Em dispositivos com `prefers-reduced-motion: reduce`, desativar a troca automática de vídeos e exibir o poster panorâmico.

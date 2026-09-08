---
name: prospera-video-performance
description: Diretrizes de performance, carregamento assíncrono, controle de viewport e reprodução otimizada para múltiplos vídeos na Prospera Investment.
---

# Prospera Video Performance

Skill de engenharia de performance dedicada a garantir que vídeos de fundo, heros e carrosséis/esteiras rodem com máxima fluidez, sem sobrecarregar a GPU, CPU ou a rede do usuário.

---

## 1. Padrão Obrigatório para Vídeos Web

Em todas as instâncias de `<video>` do projeto Prospera Investment, aplique os seguintes atributos e boas práticas:

1. **`autoPlay` + `muted`:** Reprodução automática somente é permitida se o vídeo estiver 100% mudo. Nenhum áudio automático é tolerado.
2. **`playsInline`:** Obrigatório para evitar que dispositivos móveis (iOS/Android) forcem o vídeo em modo tela cheia nativo.
3. **`preload="metadata"`:** Padrão para não baixar o vídeo inteiro antes de o usuário chegar à seção.
4. **`loop`:** Utilizar quando for plano de fundo cinematográfico ou vitrine.
5. **`object-fit: cover`:** Garantir preenchimento responsivo sem deformar proporções ou criar barras pretas internas.
6. **Resolução Inteligente:**
   - Para cards de esteira: vídeos comprimidos em 720p ou 1080p leve (H.264/MP4).
   - Proibido carregar vídeos 4K pesados em cards de esteira ou elementos secundários.

---

## 2. Gestão de Múltiplos Vídeos Simultâneos

Quando uma seção contiver múltiplos vídeos (como a esteira de Rotas de Investimento):

- **IntersectionObserver:** Pausar a reprodução quando a seção estiver fora do campo de visão do usuário.
- **Prevenção de Re-render React:** Nunca utilizar estados reativos de alta frequência (`setInterval`, `requestAnimationFrame` atualizando `useState`) para sincronizar timecodes de vídeos.
- **Mobile Friendly:** Em smartphones, limitar a carga de decodificação de hardware; fallback elegante com imagem de alta resolução se a banda ou economia de dados estiver ativa.
- **Poster Obrigatório:** Sempre definir `poster="/assets/prospera/..."` para evitar telas pretas antes do primeiro frame decodificar.

---

## 3. Comportamento em Esteiras e Marquees

- **Independência de Execução:** O movimento da esteira (CSS marquee) tem prioridade sobre o estado individual de cada vídeo. A esteira nunca deve travar aguardando o carregamento de uma mídia.
- **Dessincronização Natural:** Os vídeos dos cards podem e devem rodar em tempos e loops assíncronos, criando uma sensação visual rica, viva e não robótica.
- **Acessibilidade:** Respeitar integralmente `prefers-reduced-motion: reduce`. Caso ativado, o autoplay de esteiras deve ser desabilitado e os vídeos estabilizados.

---
name: prospera-media-fallback
description: Protocolo de contingência para falhas de mídia, bloqueio de autoplay e resiliência visual na Prospera Investment.
---

# Prospera Media Fallback

Skill de robustez visual dedicada a assegurar que o portal jamais apresente telas pretas, ícones de imagem quebrada ou vazios estruturais caso um vídeo ou recurso de rede falhe ou seja bloqueado pelo navegador.

---

## 1. Princípio da Contingência Graciosa

> **"Nenhum usuário deve ver uma tela preta ou ícone de mídia quebrada."**

Diferentes navegadores, políticas corporativas de rede, modos de economia de bateria no mobile ou falhas temporárias de conexão podem impedir a reprodução automática de vídeos. A interface deve ser projetada para ser impecável mesmo se zero vídeos executarem.

---

## 2. Padrões de Implementação Resiliente

### 1. Dupla Camada (Poster + Fallback Image):
Em todo `<video>` de fundo ou card de esteira, declare o atributo `poster` apontando para uma imagem real e posicione uma tag `<img>` de contingência imediatamente aninhada ou sobposta com `z-index` inferior:
```tsx
<div className="relative w-full h-full overflow-hidden">
  {/* Fallback estático garantido */}
  <img
    src={posterPath}
    alt=""
    className="absolute inset-0 w-full h-full object-cover -z-10 brightness-[0.9]"
    aria-hidden="true"
  />
  {/* Vídeo com poster nativo */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    poster={posterPath}
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={videoPath} type="video/mp4" />
  </video>
</div>
```

### 2. Captura de Erros de Reprodução:
Ao lidar com playlists ou trocas ativas de vídeo:
```ts
videoElement.play().catch(() => {
  // O navegador bloqueou o autoplay. O poster estático assume graciosamente.
})
```

### 3. Modos de Economia de Energia:
Em dispositivos móveis rodando em modo de baixo consumo (Low Power Mode), o Safari no iOS suspende o autoplay de vídeos. Graças à imagem de fallback de alta resolução, o investidor continuará visualizando uma fotografia arquitetônica britânica impecável, sem interrupção estética.

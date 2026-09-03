---
name: prospera-quality-check
description: Protocolo de validação técnica e visual obrigatório antes de concluir qualquer entrega no projeto Prospera Investment.
---

# Prospera Quality Check

Skill de auditoria e garantia de qualidade para assegurar que nenhuma alteração seja entregue sem rigorosa verificação técnica e visual.

---

## 1. Checklist Técnico Obrigatório

Execute os seguintes comandos e verificações antes de finalizar qualquer etapa:

1. **Build de Produção:**
   ```powershell
   npm run build
   ```
   Deve compilar sem erros (código de saída 0) e gerar os bundles em `dist/`.

2. **Tipagem TypeScript Estrita:**
   ```powershell
   npx tsc --noEmit
   ```
   Deve retornar zero erros de tipagem.

3. **Validação de Assets Principais:**
   - Confirmar existência física da logo oficial (`public/assets/prospera/brand/logo-shield.webp` ou similar).
   - Confirmar integridade da foto de Adriana (`hero-adriana-office.webp`).
   - Confirmar poster panorâmico (`poster-london.webp`).

4. **Validação de Mídia e Rotas de Vídeo:**
   - Confirmar que os caminhos referenciados nos arrays de vídeo existem em `public/assets/prospera/video/`.
   - Garantir que as tags `<video>` estão configuradas com `muted`, `playsInline` e `preload="metadata"`.

5. **Auditoria de Console:**
   - Garantir ausência de erros críticos de runtime no navegador.

---

## 2. Checklist de Responsividade e Enquadramento Visual

Verificar o layout nas seguintes resoluções:

### Telas Padrão (Desktop Comercial)
- **1366x768:** Respiro entre Adriana e a copy; ausência de scroll horizontal indesejado.
- **1440x900:** Proporção equilibrada entre imagem (esquerda) e tipografia (direita).
- **1536x864:** Escalabilidade fluida de fontes via `clamp`.
- **1920x1080 (Full HD):** Altura confortável da Hero (`min-h-[100svh]`), CTAs bem posicionados.

### Telas Grandes & Ultrawide
- **2560x1080 (Ultrawide 21:9):** Adriana cresce proporcionalmente; sem cortes na lateral da mesa/notebook; sem moldura aparente.
- **2560x1440 (2K 16:9):** Copy permanece contida em `max-w-[600px–680px]`, sem flutuar para longe.
- **3440x1440 (Curved Ultrawide 21:9):** O fundo preenche a tela inteira; a composição central permanece integrada.

### Dispositivos Móveis e Touch
- **Tablet (768px – 1024px):** Adriana e copy não competem; mesa visível; menu acessível.
- **Mobile (< 640px):** Legibilidade total da headline; CTA principal em largura total ou dominante; menu drawer funcionando suavemente.

---

## 3. Itens Visuais de Auditoria

| Elemento | Critério de Aceitação |
| :--- | :--- |
| **Overflow** | Zero scrollbar horizontal indesejada (`overflow-x: hidden`). |
| **Adriana** | Sem borda dura lateral, sem efeito de foto colada, mesa contínua. |
| **Notebook** | Marca Prospera visível e sem corte abrupto na carcaça. |
| **London Eye** | Não atravessa o rosto, cabelo ou corpo de Adriana. |
| **Menu** | Texto branco/off-white de alto contraste sobre o vídeo. |
| **Copy** | Sem quebras de linha estranhas em palavras-chave. |
| **CTAs** | Um CTA principal claramente dominante; um secundário sutil. |
| **Dourado** | Metálico elegante (#D4AF37 / #E7C76A), nunca amarelo puro. |

---

## 4. Regra de Ouro de Integridade

- **Nunca declarar "pronto", "perfeito" ou "finalizado"** sem ter executado e aprovado as verificações técnicas e visuais acima.
- Se algum breakpoint ou teste não puder ser realizado no ambiente atual, **informar explicitamente** o status real ao usuário.

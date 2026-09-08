---
name: prospera-deployment-check
description: Checklist exaustivo de pré-deploy para homologação de código, validação estática de builds e integridade antes de commit/push na Prospera Investment.
---

# Prospera Deployment Check

Skill de controle de qualidade final responsável por blindar o repositório contra quebras de compilação, links órfãos ou regressões em produção.

---

## 1. O Checklist dos 12 Pontos de Homologação

Antes de reportar a conclusão de qualquer entrega e antes de sugerir que o usuário realize commit ou push, verifique os 12 pontos:

1. **`npm run build`:** Executar e confirmar código de saída `0`.
2. **`npx tsc --noEmit`:** Checagem rigorosa de tipagem TypeScript sem nenhum erro reportado.
3. **Existência de Assets:** Todos os arquivos referenciados em `src/` devem existir fisicamente em `public/`.
4. **Links e Âncoras:** Checar se âncoras (`#sobre`, `#rotas`, `#metodo`, `#diagnostico`) possuem IDs correspondentes nas seções do DOM.
5. **Rotas e Enlaces:** Zero caminhos quebrados ou apontamentos para páginas inexistentes.
6. **Responsividade Multi-Resolução:** Validar mentalmente ou visualmente em mobile (360px), tablet (768px), desktop (1366px, 1920px) e ultrawide (2560px+).
7. **Console Limpo:** Zero erros de console ou warnings graves de hooks React.
8. **Prevenção de Overflow Horizontal:** `overflow-x: hidden` nas seções críticas para evitar barras de rolagem laterais indesejadas no mobile.
9. **Resiliência de Vídeos:** Tags de vídeo acompanhadas de imagem de contingência (`poster`) e atributos `muted playsInline`.
10. **Paths de Produção:** Utilizar sempre caminhos absolutos relativos à raiz pública (ex.: `/assets/prospera/...`).
11. **Zero Referências Localhost:** Nenhuma URL apontando para `localhost:5173` ou `127.0.0.1` gravada no código.
12. **Compatibilidade com Vercel:** Nomes de arquivos respeitando case-sensitive rigoroso (ex.: `CinematicHero.tsx` deve bater exatamente com a importação).

---

## 2. Regra de Não Autonomia Destrutiva

> **"O agente NUNCA deve executar `git commit` ou `git push` automaticamente sem instrução expressa e consentimento do usuário."**

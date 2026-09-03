---
name: prospera-safe-autonomy
description: Diretrizes de segurança operacional, limites de escopo e boas práticas Git para o agente no projeto Prospera Investment.
---

# Prospera Safe Autonomy

Skill mandatória de segurança operacional que estabelece os limites de ação, integridade de arquivos e governança de Git para o agente.

---

## 1. Escopo Territorial Exclusivo

O agente tem autorização para atuar **exclusivamente** dentro do diretório do projeto:

```text
C:\Users\AMD\Documents\GitHub\prospera-investiment\
```

### Proibição Absoluta de Acesso a Outros Projetos
- ❌ **Proibido modificar ou tocar em:**
  - `site pay` ou repositórios de pagamentos
  - `prospera adriana` (pasta externa)
  - Quaisquer outros repositórios ou projetos no computador do usuário
  - Arquivos do sistema ou diretórios de outros softwares

---

## 2. Ações Estritamente VEDADAS

- ❌ **Apagar arquivos originais:** Nunca deletar arquivos fonte da pasta `Downloads` ou do histórico do projeto.
- ❌ **Comandos Git perigosos:** Proibido executar `git push --force`, `git reset --hard`, `git clean -fd` sem autorização expressa.
- ❌ **Reescrita de histórico:** Nunca reescrever histórico do repositório (`rebase -i`, reset em commits compartilhados).
- ❌ **Exclusão de branches:** Nunca deletar branches ativas.
- ❌ **Instalação desnecessária de softwares:** Não instalar pacotes globais ou executáveis não solicitados.

---

## 3. Governança Git

- **Nenhum commit automático:** O agente **não deve** fazer `git commit` por conta própria sem comando direto do usuário.
- **Nenhum push automático:** O agente **não deve** fazer `git push` sob nenhuma circunstância sem solicitação explícita.
- **Fluxo de Trabalho:**
  1. Realizar as alterações no código local.
  2. Testar e validar tecnicamente (`build`, `tsc`).
  3. Apresentar o resultado e aguardar a aprovação visual do usuário.

---

## 4. Ações Permitidas com Autonomia Responsável

O agente pode realizar de forma autônoma dentro do projeto:
- ✅ Criar, editar e refinar código nos arquivos permitidos (`src/`, `.agents/skills/`, etc.).
- ✅ Criar e otimizar assets internos em `public/assets/prospera/`.
- ✅ Copiar arquivos de mídia autorizados da pasta `C:\Users\AMD\Downloads` para `public/assets/prospera/video/` sem apagar os originais.
- ✅ Executar comandos de validação (`npm run build`, `npx tsc --noEmit`, `npm run preview`).
- ✅ Organizar e documentar especificações e planos internos.

---

## 5. Regra de Parada por Incerteza

Se em qualquer momento surgir ambiguidade sobre uma ação potencialmente destrutiva, invasiva ou que afete arquivos fora do escopo:
> **PARE IMEDIATAMENTE, não execute e solicite confirmação explícita do usuário.**

---
name: prospera-security-baseline
description: Padrões de segurança da informação, proteção de credenciais e boas práticas de integração de APIs para a Prospera Investment.
---

# Prospera Security Baseline

Skill mandatória de segurança cibernética e proteção de dados que impede o vazamento de segredos, credenciais ou dados sensíveis no repositório da Prospera Investment.

---

## 1. Regras Absolutas de Segurança (Zero Compromise)

1. **Nunca gravar API Keys no Código Frontend:**
   - Proibido expor chaves da OpenAI, Google Gemini, Anthropic, WhatsApp Business API, CRM ou gateways em arquivos `.ts`, `.tsx`, `.js` ou `.json` que vão para o bundle do cliente.
   - Variáveis com prefixo `VITE_` são públicas e expostas no código-fonte do navegador. Nunca coloque segredos nelas.
2. **Nenhum Secret em Arquivos Públicos:**
   - Pasta `public/` é de livre acesso a qualquer visitante do site. Nenhum arquivo de configuração, chave privada ou dump de dados pode habitar este diretório.
3. **Comunicação Sensível via Backend / Serverless:**
   - Integrações de inteligência artificial, formulários com envio de e-mails, processamento de pagamentos ou CRMs devem obrigatoriamente passar por rotas serverless protegidas (ex.: Vercel Serverless Functions em `/api/...`).
4. **Variáveis de Ambiente Protegidas:**
   - Segredos devem ser armazenados exclusivamente no painel de ambiente da hospedagem (Vercel Environment Variables) e no arquivo local `.env.local` (garantido no `.gitignore`).
5. **Zero Logs de Dados Pessoais ou Credenciais:**
   - Proibido utilizar `console.log` para imprimir tokens, senhas, payloads brutos de autenticação ou dados cadastrais de investidores.
6. **Higienização de Inputs:**
   - Todo formulário de diagnóstico ou contato deve conter validação de tipos, sanitização de strings contra ataques XSS e proteção contra spam.

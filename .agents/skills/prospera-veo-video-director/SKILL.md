---
name: prospera-veo-video-director
description: Diretrizes de direção de arte e engenharia de prompts para geração de vídeos cinematográficos imobiliários via modelos Veo (Google DeepMind) quando integrados oficialmente.
---

# Prospera Veo Video Director

Skill especializada em governança, concepção estética e especificação técnica de prompts para geração de vídeo com inteligência artificial generativa (modelos Veo via Gemini API), voltada ao mercado imobiliário britânico de alto padrão.

---

## 1. Regras de Segurança e Infraestrutura

- **Zero Credenciais no Frontend:** Nenhuma chave de API (Google AI Studio, Vertex AI, Gemini) pode ser adicionada ao código do cliente React (`src/` ou `public/`).
- **Sem Conexões Fictícias:** Não simular chamadas de API inexistentes. As gerações são configuradas e documentadas estruturalmente, e integradas via endpoints seguros/serverless apenas quando solicitadas.
- **Tratamento do Google Flow / Ferramentas Externas:** Tratar o Flow ou suítes visuais externas como ferramentas criativas de operador humano, a menos que uma tool programática homologada esteja ativamente disponível no ambiente do agente.

---

## 2. Padrão Estético Prospera Investment

### Para Cards de Estratégias (Rotas de Investimento):
- **Duração:** Clipes curtos (4s a 8s em loop suave).
- **Movimento de Câmera:** Lento, estabilizado, cinematográfico (slow dolly in, subtle tracking, gentle pan). Zero tremor de câmera na mão.
- **Iluminação:** Luz natural da *golden hour* ou crepúsculo suave (*twilight*), destacando janelas iluminadas com calor acolhedor.
- **Assunto:** Arquitetura autêntica britânica (tijolos vitorianos, molduras georgianas de stucco, praças residenciais arborizadas, interiores restaurados com acabamentos nobres).
- **Aspect Ratio:** `16:9` widescreen.

### Para a Hero Principal:
- **Assunto:** Skyline icônico e Rio Tâmisa, pontes arquitetônicas, Big Ben, Westminster, edifícios contemporâneos de Londres.
- **Espaço Negativo:** Cenas com áreas equilibradas de céu e água para acomodar a tipografia centralizada sem competição visual.
- **Sem Textos Gerados:** Imagens e vídeos nunca devem conter textos, letreiros fictícios, números ou marcas inventadas pelo gerador.

---

## 3. Nomenclatura Padronizada de Prompts e Assets

Ao estruturar prompts para o ecossistema Prospera, categorize-os pelas rotas oficiais:
- `buy-to-let`: Foco em fachadas residenciais clássicas, townhouses de tijolo inglês em Kensington/Chelsea, imóveis prontos.
- `hmo`: Mansões senhoriais adaptadas, entradas duplas elegantes, proporções amplas com vários níveis.
- `flip`: Renovação e restauro de interiores, lareiras de mármore, piso espinha de peixe em carvalho escuro, detalhes em latão.
- `portfolio`: Ruas mews residenciais britânicas com paralelepípedos e múltiplas propriedades harmoniosas.
- `appreciation`: Edifícios imponentes em pedra de Portland em Mayfair e Belgravia, prestígio centenário.
- `developments`: Empreendimentos novos e modernos à beira do Tâmisa, com varandas de vidro e luzes noturnas.

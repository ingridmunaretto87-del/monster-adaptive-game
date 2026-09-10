# 👹 Monster Adaptive Game

Um jogo inovador onde você completa tarefas para progredir através de níveis, enquanto um **monstro IA adaptativo** aprende seu estilo de jogo e se adapta em tempo real.

Inspired by **Cob K Move** mechanics - O monstro evolui conforme você joga!

## 🎮 Características Principais

### 👹 Sistema Adaptativo do Monstro
- **Aprendizado de Padrões**: Analisa movimentos e estratégias do jogador
- **Adaptação de Dificuldade**: Ajusta desafios dinamicamente baseado no desempenho
- **Evolução de Comportamento**: Muda tática conforme aprende o estilo do jogador
- **Companheirismo Progressivo**: Monstro e jogador evoluem juntos

### 🎯 Sistema de Tarefas
- **Quebra-Cabeças**: Desafios lógicos que variam em complexidade
- **Desafios em Tempo Real**: Ação dinâmica com reflexo e estratégia
- **Estratégia**: Planejamento e tomada de decisão
- **Tarefas Adaptativas**: Dificuldade aumenta conforme o monstro aprende

### 📊 Progressão
- Sistema de níveis progressivos (1-50+)
- Ranking de desempenho
- Stats do monstro (força, inteligência, adaptabilidade)
- Desbloqueio de novas mecânicas
- Achievements & Milestones

## 🏗️ Arquitetura

```
monster-adaptive-game/
├── backend/                    # Node.js/Express
│   ├── src/
│   │   ├── controllers/        # Lógica de requisições
│   │   ├── services/           # IA adaptativo, progressão
│   │   ├── models/             # Esquemas de dados
│   │   ├── routes/             # Endpoints da API
│   │   └── utils/              # Utilitários
│   ├── package.json
│   └── .env.example
│
├── frontend-web/               # React + Vite
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── pages/              # Páginas do jogo
│   │   ├── hooks/              # Custom hooks
│   │   ├── utils/              # Utilitários
│   │   └── styles/             # CSS/Tailwind
│   ├── package.json
│   └── vite.config.js
│
├── frontend-mobile/            # React Native / Expo
│   ├── src/
│   ├── app.json
│   └── package.json
│
├── docs/                       # Documentação
│   ├── ARCHITECTURE.md
│   ├── AI_SYSTEM.md
│   ├── GAMEPLAY.md
│   └── API.md
│
└── docker-compose.yml          # Setup local com Docker
```

## 🤖 Sistema de IA Adaptativo

### Componentes Principais
1. **Player Profiler**: Coleta dados sobre estilo de jogo
2. **Adaptive Engine**: Analisa padrões e toma decisões
3. **Difficulty Manager**: Ajusta desafio em tempo real
4. **Monster Behavior System**: Define comportamento do monstro
5. **Learning Model**: Melhora predições com cada partida

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Docker (opcional)

### Setup Local

```bash
# Clone o repositório
git clone https://github.com/ingridmunaretto87-del/monster-adaptive-game.git
cd monster-adaptive-game

# Setup Backend
cd backend
npm install
npm run dev

# Setup Frontend Web (em outro terminal)
cd frontend-web
npm install
npm run dev

# Setup Mobile (em outro terminal)
cd frontend-mobile
npm install
npm start
```

### Com Docker

```bash
cd monster-adaptive-game
docker-compose up -d
```

## 📱 Plataformas

- **Web**: React + Vite + Canvas API
- **Mobile**: React Native + Expo (iOS/Android)
- **Backend**: Node.js + Express + MongoDB

## 🎮 Mecânicas de Jogo

### Tipos de Tarefas

**1. 🧩 Quebra-Cabeças**
- Pattern Matching
- Memory Games
- Logic Gates
- Sliding Blocks
- Color Matching

**2. ⚡ Desafios em Tempo Real**
- Tap/Click em alvos
- Dodge de obstáculos
- Sequence seguidor
- Reaction time
- Coordination

**3. 🎯 Estratégia**
- Resource Management
- Pathfinding
- Turn-Based Combat
- Territory Control
- Risk/Reward decisions

### Progressão

```
Level 1-5    (Iniciante)      → Monstro aprende básico
   ↓
Level 6-15   (Intermediário)  → Monstro reconhece padrões
   ↓
Level 16-30  (Avançado)       → Monstro contra-estrategiza
   ↓
Level 31-50  (Mestre)         → Monstro é desafio real
   ↓
Level 50+    (Lendário)       → Sem limite!
```

## 👹 Evolução do Monstro

### Stats
- **Força**: 0-100 (capacidade de ataque)
- **Inteligência**: 0-100 (análise de padrões)
- **Velocidade**: 0-100 (reação rápida)
- **Adaptabilidade**: 0-100 (aprendizado)

### Comportamentos
- 😈 **Agressivo**: Ataca direto
- 🛡️ **Defensivo**: Bloqueia ataques
- 🧠 **Estratégico**: Planeja movimentos
- 🎭 **Mimicador**: Copia seu estilo
- 👑 **Maestro**: Impredizível e perfeito

## 🎯 Roadmap

- [ ] **Phase 1**: MVP com sistema básico
- [ ] **Phase 2**: IA adaptativo funcional
- [ ] **Phase 3**: Integração Web e Mobile
- [ ] **Phase 4**: Progressão avançada
- [ ] **Phase 5**: Multiplayer
- [ ] **Phase 6**: Analytics e otimizações

## 📄 Licença

MIT License

## 👨‍💻 Autor

Ingrid Munaretto (@ingridmunaretto87-del)

---

**Última atualização**: Setembro 2026

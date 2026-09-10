require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(','),
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB conectado');
}).catch(err => {
  console.error('❌ Erro ao conectar MongoDB:', err);
  process.exit(1);
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Monster Adaptive Game API',
    version: '1.0.0',
    status: 'running'
  });
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log(`👹 Novo jogador conectado: ${socket.id}`);

  socket.on('playerAction', (data) => {
    console.log(`Action recebida: ${data.type}`);
    // Processar ação do jogador
    socket.emit('actionProcessed', { success: true });
  });

  socket.on('disconnect', () => {
    console.log(`👹 Jogador desconectado: ${socket.id}`);
  });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`👹 Monster Adaptive Game - Ready!`);
});

module.exports = { app, io };

const express = require('express');
const bodyParser = require('body-parser');

// Configurar o app Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Banco de dados em forma de array
let items = [];

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'API do CRUD em Node.js com Array' });
});

// Rota para criar um novo item
app.post('/items', (req, res) => {
    const newItem = {
      id: items.length + 1,
      name: req.body.name,
      description: req.body.description
    };
    items.push(newItem);
    res.status(201).json({ message: 'Item criado com sucesso!', item: newItem });
  });;

// Rota para listar todos os itens
app.get('/items', (req, res) => {
    res.json(items);
  });

// Rota para buscar um item por ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item não encontrado.' });
  }
});

// Rota para atualizar um item
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);
  if (item) {
    item.name = req.body.name;
    item.description = req.body.description;
    res.json({ message: 'Item atualizado com sucesso!', item });
  } else {
    res.status(404).json({ message: 'Item não encontrado.' });
  }
});

// Rota para excluir um item
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === itemId);
  if (index !== -1) {
    items.splice(index, 1);
    res.json({ message: 'Item excluído com sucesso!' });
  } else {
    res.status(404).json({ message: 'Item não encontrado.' });
  }
});

// Iniciar o servidor
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

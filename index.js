const express = require('express'); // Importar Express con CommonJS
const cors = require('cors'); // Importar CORS
const funciones = require('./express/funciones'); // Asegúrate de que este archivo existe
const path = require('path'); // Importar Path

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON

// Rutas
app.get('/api/saludo', funciones.saludar);
app.post('/api/req', funciones.Despedida);
app.get('/api/numero/:numero', funciones.Parametro);
app.post('/api/AS', funciones.insertar);
app.delete('/api/AS/:id', funciones.eliminar);
app.put('/api/AS/:id', funciones.actualizar);
app.get('/api/AS', funciones.seleccionarTodo);
app.get('/api/AS/:id', funciones.seleccionarID);

app.use(express.static(path.join(__dirname,'dist')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist','index.js'))
})
// Servidor
app.listen(3000, () => {
  console.log('APIs listas en el puerto 3000');
});

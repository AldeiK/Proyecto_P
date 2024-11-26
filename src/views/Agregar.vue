<template>
    <div class="personajes-table">
      <h2>Agregar Personaje</h2>
  
      <div class="formulario-agregar">
        <form @submit.prevent="addPersonaje">
          <label for="nombre">Nombre:</label>
          <input type="text" v-model="nuevoPersonaje.nombre" id="nombre" required />
  
          <label for="epoca">Época Histórica:</label>
          <input type="text" v-model="nuevoPersonaje.epoca_historica" id="epoca" required />
  
          <label for="juego">ID del Juego:</label>
          <input type="number" v-model="nuevoPersonaje.juego_id" id="juego" required />
  
          <button type="submit" class="btn-add">Agregar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        nuevoPersonaje: {
          nombre: '',
          epoca_historica: '',
          juego_id: null
        }
      };
    },
    methods: {
      async addPersonaje() {
        try {
          await axios.post('http://localhost:3000/api/AS', this.nuevoPersonaje);
          this.nuevoPersonaje = { nombre: '', epoca_historica: '', juego_id: null };
          alert("Personaje agregado correctamente.");
        } catch (error) {
          console.error('Error al agregar el personaje:', error);
          alert("Error al agregar el personaje. Por favor, intenta de nuevo.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .personajes-table {
    font-family: 'Trajan Pro', serif; 
    color: #ffffff;
    background-color: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }
  
  .personajes-table h2 {
    text-align: center;
    color: #d72b27; 
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  
  .formulario-agregar {
    padding: 15px;
    border: 1px solid #444444;
    border-radius: 5px;
    background-color: #252525;
  }
  
  form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #ffffff;
  }
  
  form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #555555;
    border-radius: 5px;
    background-color: #333333;
    color: #ffffff;
  }
  
  .btn-add {
    font-size: 14px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    background-color: #007acc; 
    color: white;
    text-transform: uppercase;
  }
  
  .btn-add:hover {
    background-color: #005fa3;
    transform: scale(1.05);
  }
  </style>
  
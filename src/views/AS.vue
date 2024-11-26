<template>
  <div class="personajes-table">
    <h2>Personajes</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Época Histórica</th>
          <th>Juego</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="personaje in personajes" :key="personaje.id_personaje">
          <td>{{ personaje.nombre }}</td>
          <td>{{ personaje.epoca_historica }}</td>
          <td>{{ personaje.juego_id }}</td>
          <td>
            <button class="btn-delete" @click="deletePersonaje(personaje.id_personaje)">Eliminar</button>
            <button class="btn-edit" @click="setEditPersonaje(personaje)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="editando" class="formulario-editar">
      <h3>Editar Personaje</h3>
      <form @submit.prevent="updatePersonaje">
        <label for="edit-nombre">Nombre:</label>
        <input
          type="text"
          id="edit-nombre"
          v-model="personajeEditado.nombre"
          required
        />

        <label for="edit-epoca">Época Histórica:</label>
        <input
          type="text"
          id="edit-epoca"
          v-model="personajeEditado.epoca_historica"
          required
        />

        <label for="edit-juego">ID del Juego:</label>
        <input
          type="number"
          id="edit-juego"
          v-model="personajeEditado.juego_id"
          required
        />

        <div class="form-buttons">
          <button type="submit" class="btn-save">Guardar Cambios</button>
          <button type="button" class="btn-cancel" @click="cancelEdit">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      personajes: [],
      editando: false, 
      personajeEditado: null
    };
  },
  mounted() {
    this.fetchPersonajes();
  },
  methods: {
    
    async fetchPersonajes() {
      try {
        const response = await axios.get("http://localhost:3000/api/AS");
        this.personajes = response.data;
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
      }
    },
  
    async deletePersonaje(id) {
      try {
        await axios.delete(`http://localhost:3000/api/AS/${id}`);
        this.fetchPersonajes(); 
      } catch (error) {
        console.error("Error al eliminar el personaje:", error);
      }
    },
    
    setEditPersonaje(personaje) {
      this.editando = true;
      this.personajeEditado = { ...personaje }; 
    },
   
    cancelEdit() {
      this.editando = false;
      this.personajeEditado = null;
    },
    
    async updatePersonaje() {
      try {
        const { id_personaje, nombre, epoca_historica, juego_id } =
          this.personajeEditado;
        await axios.put(`http://localhost:3000/api/AS/${id_personaje}`, {
          nombre,
          epoca_historica,
          juego_id
        });
        this.fetchPersonajes(); 
        this.cancelEdit(); 
      } catch (error) {
        console.error("Error al actualizar el personaje:", error);
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

thead {
  background-color: #252525;
}

thead th {
  padding: 10px;
  text-align: left;
  color: #d72b27;
  font-weight: bold;
  text-transform: uppercase;
}

tbody tr {
  transition: background-color 0.3s;
}

tbody tr:hover {
  background-color: #333333;
}

tbody td {
  padding: 10px;
  border-bottom: 1px solid #444444;
}

.formulario-editar {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #444444;
  border-radius: 5px;
  background-color: #252525;
}

.formulario-editar h3 {
  color: #d72b27;
  margin-bottom: 10px;
  text-transform: uppercase;
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

.form-buttons {
  display: flex;
  gap: 10px;
}

button {
  font-size: 14px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

.btn-delete {
  background-color: #d72b27;
  color: white;
}

.btn-delete:hover {
  background-color: #a81f1c;
}

.btn-edit {
  background-color: #007acc;
  color: white;
}

.btn-edit:hover {
  background-color: #005fa3;
}

.btn-save {
  background-color: #007acc;
  color: white;
}

.btn-save:hover {
  background-color: #005fa3;
}

.btn-cancel {
  background-color: #d72b27;
  color: white;
}

.btn-cancel:hover {
  background-color: #a81f1c;
}
</style>

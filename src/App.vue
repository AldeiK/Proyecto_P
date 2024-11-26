<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
   

    <div class="wrapper">
      

      <nav>
        
        <RouterLink to="/AS">AS</RouterLink>
        <RouterLink to="/Agregar">Agregar personaje</RouterLink>

      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  background: linear-gradient(90deg, #c2381c, #c63500); 
  padding: 1rem; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

nav {
  display: flex; 
  justify-content: center; 
  gap: 2rem; 
}

nav a {
  color: rgb(0, 0, 0); 
  text-decoration: none; 
  font-size: 1.2rem; 
  font-weight: bold; 
  transition: color 0.3s ease, transform 0.3s ease; 
}

nav a:hover {
  color: #ffffff; 
  transform: scale(1.1); 
}

  RouterView {
  margin-top: 2rem;
}

</style>

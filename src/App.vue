<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-custom">
      <router-link to="/" class="navbar-brand">Escriba Projeto</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/pessoas" class="nav-link">Pessoas</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Adicionar Pessoa</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/produtos" class="nav-link">Produtos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addProdutos" class="nav-link">Adicionar Produtos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/pedidos" class="nav-link">Pedidos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addPedidos" class="nav-link">Adicionar Pedidos</router-link>
        </li>

      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* change the background color */
.navbar-custom {
  background-color:#2c3e50;
}
/* change the brand and text color */
.navbar-custom .navbar-brand,
.navbar-custom .navbar-text {
  color:gold;
  padding-left: 20px;
}
/* change the link color */
.navbar-custom .navbar-nav .nav-link {
  color: white;
}
/* change the color of active or hovered links */
.navbar-custom .nav-item.active .nav-link,
.navbar-custom .nav-item:focus .nav-link,
.navbar-custom .nav-item:hover .nav-link {
  color: burlywood;
}

</style>

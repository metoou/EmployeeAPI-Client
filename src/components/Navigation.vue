<template>
    <nav class="navbar navbar-expand navbar-light ">
      <div class="container">
        <router-link to="/" class="navbar-brand">OTC</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Сотрудники</router-link>
            </li>
            <li class="nav-item">
              <router-link to="department" class="nav-link">Отделы</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>

export default {
    name: 'Navigation'
    }
</script>

<style>
  .navbar {
    margin-bottom: 50px;
  }
</style>
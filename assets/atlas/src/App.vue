<template>
  <div id="app">
    <div id="nav" style="display: none">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Roboto', sans-serif;
}
</style>
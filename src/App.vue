<template>
  <div id="app">
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import './styles/style.scss';
html {
  background-color: $color_lightsilver;
}

body {
  width: calc(100vw - 17px);
}

#app {
  width: 100%;
  min-height: 100vh;
  background-color: $color_lightsilver;
  font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-size: 18px;
}
</style>

<template lang="pug">
  section.nav
    h2.navTitle
      a(href="#" @click.prevent="onBack") Back
</template>

<script>
export default {
  name: 'PageNav',
  methods: {
    onBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" src="./PageNav.scss" scoped />

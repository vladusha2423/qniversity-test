<template>
  <div class="menu-item" v-on="$listeners" v-bind:class="{ cert: hasClass }">
    {{ name }}
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    name: {
      type: String,
      required: true,
      default: null,
    },
    hasClass: Boolean,
  },
};
</script>

<style lang="scss" src="./MenuItem.scss" scoped></style>

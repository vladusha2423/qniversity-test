<template>
  <div class="circle" v-on="$listeners" :class="{ primary, success, silver }">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'CircleButton',
  props: {
    silver: Boolean,
    primary: Boolean,
    success: Boolean,
    width: {
      type: Number,
      default: 25,
    },
    height: {
      type: Number,
      default: 24,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" src="./CircleButton.scss" scoped></style>

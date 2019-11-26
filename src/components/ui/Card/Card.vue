<template lang="pug">
  .card(:class="{ 'no-shadow': noShadow, 'no-margin': noMargin, 'no-padding': noPadding, 'small-shadow': smallShadow }")
    slot
</template>

<script>
export default {
  name: 'Card',
  props: {
    noShadow: Boolean,
    noMargin: Boolean,
    noPadding: Boolean,
    smallShadow: Boolean,
  },
};
</script>

<style lang="scss" src="./Card.scss" scoped />

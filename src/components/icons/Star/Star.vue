<template lang="pug">
  svg(:width="width" :height="height" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg")
    path.star-path(:class="{ primary, success, silver }" d="M11.7329 0.923444C12.0325 0.00255227 13.3353 0.00255609 13.6348 0.923448L15.8307 7.67408C15.9647 8.08594 16.3486 8.36475 16.7817 8.36475H23.8853C24.8543 8.36475 25.2569 9.60493 24.4726 10.1741L18.7276 14.3434C18.3767 14.598 18.2299 15.0498 18.364 15.462L20.5589 22.2095C20.8585 23.1306 19.8045 23.8971 19.0206 23.3282L13.2712 19.1557C12.9209 18.9015 12.4468 18.9015 12.0965 19.1557L6.34717 23.3282C5.56324 23.8971 4.50924 23.1306 4.80886 22.2095L7.00372 15.462C7.13783 15.0498 6.991 14.598 6.64012 14.3434L0.895102 10.1741C0.110864 9.60493 0.513459 8.36475 1.48245 8.36475H8.58608C9.01918 8.36475 9.40306 8.08594 9.53703 7.67408L11.7329 0.923444Z")
</template>

<script>
export default {
  name: 'Star',
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
  },
};
</script>

<style lang="scss" src="./Star.scss" scoped />

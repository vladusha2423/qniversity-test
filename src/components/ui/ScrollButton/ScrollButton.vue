<template>
  <button class="button" v-on="$listeners" :class="{ flat, point }">
    <div>
      <slot />
      <Icon class="actionIcon" :icon="icon" />
    </div>
  </button>
</template>

<script>
  import Icon from '../Icon';

  export default {
    name: 'ActionButton',
    components: {
      Icon,
    },
    props: {
      flat: Boolean,
      point: Boolean,
      progress: {
        type: Number,
        default: null,
      },
      icon: {
        type: String,
        required: false,
        default: null,
      },
    },

  };
</script>

<style lang="scss" src="./ScrollButton.scss" scoped />

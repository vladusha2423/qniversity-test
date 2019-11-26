<template>
  <button class="button" v-on="$listeners" :class="{ flat, point }">
    <div>
      <slot />
      <Icon class="actionIcon" :icon="icon" width="100%" height="100%" />
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

<style lang="scss" src="./CloseButton.scss" scoped />

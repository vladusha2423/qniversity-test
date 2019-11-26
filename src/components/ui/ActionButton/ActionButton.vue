<template>
  <button class="button" v-on="$listeners" :class="{ flat, point }">
    <svg class="progress" v-if="showProgress" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="27" fill="none" stroke="transparent" stroke-width="2" />
      <circle
        cx="30"
        cy="30"
        r="27"
        fill="none"
        stroke-width="2"
        class="circle"
        :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset"
      />
    </svg>
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
  data: () => ({
    radius: 27,
  }),
  computed: {
    showProgress() {
      return this.progress !== null;
    },
    strokeDasharray() {
      return 2 * Math.PI * this.radius;
    },
    strokeDashoffset() {
      const progress = this.progress / 100;
      return progress && (progress <= 1 && progress >= 0)
        ? this.strokeDasharray * (1 - progress)
        : this.strokeDasharray;
    },
  },
};
</script>

<style lang="scss" src="./ActionButton.scss" scoped />

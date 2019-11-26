<template>
  <div class="icon" :style="{ width: width, height: height }" v-html="getIcon" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: false,
      default: null,
    },
    height: {
      type: String,
      required: false,
      default: null,
    },
    width: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    getIcon() {
      const { icon } = this;
      if (icon) {
        const svg = require(`!raw-loader!./icons/${icon}.svg`);
        return svg.default;
      }
      return null;
    },
  },
};
</script>
<style scoped lang="scss">
.icon {
  position: relative;
  display: inline-flex;
  font-size: 0.001px;
  line-height: 1;
}
</style>

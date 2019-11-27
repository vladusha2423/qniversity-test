<template>
  <div class="progress-container" v-bind:class="{ hidden: isHidden }">
    <div class="progress-item" v-on="$listeners">
      {{ name }}
    </div>
    <hr class="overall" />
    <hr class="progress" :style="{ width: progress + '%' }" />
  </div>
</template>

<script>
export default {
  name: 'ProgressItem',
  props: {
    name: {
      type: String,
      required: true,
      default: null,
    },
    progress: {
      type: Number,
      default: null,
    },
  },
  computed: {
    isHidden() {
      return this.progress === 0;
    },
  },
};
</script>

<style lang="scss" src="./ProgressItem.scss" scoped></style>

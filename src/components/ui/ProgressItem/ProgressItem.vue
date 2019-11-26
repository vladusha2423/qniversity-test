<template>
  <div class="progress-container">
    <div class="progress-item" v-on="$listeners">
      {{ name }}
    </div>
    <hr class="overall" />
    <hr class="progress" :style="{ width: progress + '%' }" />
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
    progress: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style lang="scss" src="./ProgressItem.scss" scoped></style>

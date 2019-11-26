<template>
  <button
    class="button"
    :class="{ primary, success, error, warning, disabled, flat, ...classNames }"
    :disabled="disabled"
    v-on="$listeners"
    @click="handleClick"
  >
    <slot />
    <div v-if="isLoading" class="button__loadingWrapper">
      <div class="button__loadingPin"></div>
      <div class="button__loadingPin"></div>
      <div class="button__loadingPin"></div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    flat: Boolean,
    primary: Boolean,
    success: Boolean,
    error: Boolean,
    warning: Boolean,
    disabled: Boolean,
    isLoading: Boolean,
    classNames: Object,
    to: {
      type: [String, Object],
      default: null,
    },
  },
  methods: {
    handleClick() {
      if (this.to) {
        this.$router.push(this.to);
      }
      this.$emit('onClick');
    },
  },
};
</script>

<style lang="scss" src="./Button.scss" scoped />

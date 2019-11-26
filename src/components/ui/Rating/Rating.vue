<template>
  <div class="rating">
    <a
      :class="{ star: true, disable: disabled }"
      href="#"
      v-for="star in starList"
      :key="star.value"
      @mouseenter="onMouseEnter(star)"
      @mouseleave="onMouseLeave(star)"
      @click.prevent="onClick(star)"
    >
      <!--      <Star v-bind="star" />-->
      <CircleButton v-bind="star" :value="star.value" />
    </a>
  </div>
</template>

<script>
import CircleButton from '@/components/ui/CircleButton';

export default {
  name: 'Rating',
  components: { CircleButton },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5,
    },
    color: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    hoveringStar: null,
    isPressed: false,
  }),
  computed: {
    starList() {
      return Array.apply(null, Array(this.max)).map((item, index) => {
        if ((index + 1 === this.hoveringStar && !this.isPressed) || index + 1 === this.value)
          return { value: index + 1, [this.color]: true };
        else return { value: index + 1, silver: true };
      });
    },
  },
  methods: {
    onMouseEnter(star) {
      if (this.disabled) return;
      this.hoveringStar = star.value;
    },
    onMouseLeave() {
      if (this.disabled) return;
      this.hoveringStar = null;
    },
    onClick(star) {
      if (this.disabled) return;
      this.$emit('input', star.value);
      this.isPressed = true;
    },
  },
};
</script>

<style lang="scss" src="./Rating.scss" scoped />

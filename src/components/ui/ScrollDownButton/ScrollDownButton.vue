<template lang="pug">
  ActionButton.scroll-btn(:class="{ visible }" :icon="ActionIcons.ScrollDown" @click="backToTop")
</template>

<script>
import ActionButton from '@/components/ui/ActionButton';
import { ActionIcons } from '@/assets/icons';

export default {
  name: 'ScrollDownButton',
  props: {
    offsetTop: {
      type: [String, Number],
      default: 0,
    },
    offsetBottom: {
      type: [String, Number],
      default: 600,
    },
  },
  components: {
    ActionButton,
  },
  data: () => ({
    ActionIcons,
    visible: false,
  }),
  methods: {
    catchScroll() {
      const pastTopOffset = window.pageYOffset > parseInt(this.offsetTop);
      const pastBottomOffset =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.offsetBottom);
      this.visible = parseInt(this.offsetBottom) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset;
    },
    backToTop() {
      this.smoothscroll();
      this.$emit('scrolled');
    },
    smoothscroll() {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(this.smoothscroll);
        window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5));
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.catchScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.catchScroll);
  },
};
</script>

<style lang="scss" src="./ScrollDownButton.scss" scoped />

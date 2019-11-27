<template lang="pug">
  .modal-overflow(:class="{ 'modal-overflow-show': value }" @click.self="onClose")
    div
      slot
    CloseButton(
      icon="close"
      @click.prevent="onClose"
    )
</template>

<script>
import CloseButton from '@/components/ui/CloseButton';

export default {
  name: 'ModalOverflow',
  model: {
    prop: 'value',
    event: 'input',
  },
  components: { CloseButton },
  props: {
    value: Boolean,
  },
  methods: {
    onClose() {
      this.$emit('input', false);
    },
    escWatcher(event) {
      var isEscape = false;
      if ('key' in event) {
        isEscape = event.key === 'Escape' || event.key === 'Esc';
      } else {
        isEscape = event.keyCode === 27;
      }

      if (isEscape) {
        this.onClose();
      }
    },
  },
  created() {
    document.addEventListener('keydown', this.escWatcher);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.escWatcher);
  },
};
</script>

<style lang="scss" src="./ModalOverflow.scss" scoped />

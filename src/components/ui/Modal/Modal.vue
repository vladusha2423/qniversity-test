<template lang="pug">
  .modal(:class="{ 'modal-show': value }" @click.self="onClose")
    Card.modal-container(noShadow noPadding :class="{ 'modal-show': value }")
      ActionButton.modal-close-btn(flat icon="close" @click.prevent="onClose")
      .modal-header(v-if="hasHeader")
        slot(name="header")
      .modal-body(:class="{ 'full-width': fullWidth, 'with-header': hasHeader, 'with-footer': hasFooter }")
        slot
      .modal-footer(v-if="hasFooter")
        slot(name="footer")
</template>

<script>
import ActionButton from '@/components/ui/ActionButton';
import Card from '@/components/ui/Card';

export default {
  name: 'Modal',
  model: {
    prop: 'value',
    event: 'input',
  },
  components: {
    ActionButton,
    Card,
  },
  props: {
    value: Boolean,
    fullWidth: Boolean,
  },
  computed: {
    hasHeader() {
      return this.$slots.header;
    },
    hasFooter() {
      return this.$slots.footer;
    },
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

<style lang="scss" src="./Modal.scss" scoped />

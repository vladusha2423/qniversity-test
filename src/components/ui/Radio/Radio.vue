<template lang="pug">
  label.radio(:class="[{ disabled: disabled }, isChecked]")
    slot
    input(type="radio" :id="id" :name="name" :value="inputValue" v-model="checkValue" :class="{ disabled: disabled }")
    span(:class="[isChecked]")
</template>

<script>
export default {
  name: 'Radio',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    id: String,
    name: String,
    inputValue: [String, Object, Number],
    value: [String, Object, Number],
    disabled: Boolean,
  },
  computed: {
    isChecked() {
      return this.value === this.inputValue ? 'checked' : '';
    },
    checkValue: {
      get: function() {
        return this.value;
      },
      set: function() {
        this.$emit('change', this.inputValue);
      },
    },
  },
};
</script>

<style lang="scss" src="./Radio.scss" scoped />

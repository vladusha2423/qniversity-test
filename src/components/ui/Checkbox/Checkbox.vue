<template lang="pug">
  label.checkbox(:class="[{ disabled: disabled }, isChecked]")
    slot
    input(type="checkbox" :id="id" :name="name" v-model="checkValue" @change="!disabled && onChange" :class="{ disabled: disabled }")
    span(:class="[isChecked]")
</template>

<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
    disabled: Boolean,
    name: String,
    id: String,
  },
  computed: {
    isChecked() {
      return this.checked ? 'checked' : '';
    },
    checkValue: {
      get: function() {
        return this.checked;
      },
      set: function() {
        this.$emit('change', !this.checked);
      },
    },
  },
  methods: {
    onChange(event) {
      const options = event.target.parentNode.parentNode.parentNode.querySelectorAll('.option');
      Array.from(options).forEach(option => {
        option.classList.remove('active');
      });
      event.target.parentNode.parentNode.classList.add('active');
    },
  },
};
</script>

<style lang="scss" src="./Checkbox.scss" scoped />

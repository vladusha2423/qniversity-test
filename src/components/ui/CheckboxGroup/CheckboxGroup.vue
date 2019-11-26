<template lang="pug">
  .checkbox-group
    label.option(v-for="option in options" :for="`${uniqueName}_${option[labelKey]}`" :key="option[labelKey]" tabindex="0" :class="{ disabled: disabled, checked: isChecked(option) }")
      Checkbox(:id="`${uniqueName}_${option[labelKey]}`" :name="uniqueName" :checked="isChecked(option)" @change="onChange(option)" :disabled="disabled") {{ option[nameKey] }}
</template>

<script>
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import every from 'lodash/every';
import without from 'lodash/without';
import shortid from 'shortid';
import Checkbox from '@/components/ui/Checkbox';

export default {
  name: 'CheckboxGroup',
  components: {
    Checkbox,
  },
  props: {
    value: Array,
    disabled: {
      type: Boolean,
      default: false,
    },
    labelKey: {
      type: String,
      required: true,
    },
    nameKey: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator: function(value) {
        return isArray(value) && every(value, item => isObject(item));
      },
    },
  },
  data: () => ({
    uniqueName: shortid(),
  }),
  methods: {
    isChecked(option) {
      return this.value && this.value.includes(option[this.labelKey]);
    },
    onChange(option) {
      if (this.disabled) {
        return;
      }
      let newValue = this.value;
      if (this.isChecked(option)) {
        newValue = without(this.value, option[this.labelKey]);
      } else {
        if (isArray(this.value)) {
          newValue = this.value.concat([option[this.labelKey]]);
        } else {
          newValue = [option[this.labelKey]];
        }
      }
      this.$emit('input', newValue);
    },
  },
};
</script>

<style lang="scss" src="./CheckboxGroup.scss" scoped />

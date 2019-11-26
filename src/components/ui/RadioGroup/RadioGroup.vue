<template>
  <div class="checkbox-group">
    <label
      class="option"
      :class="{ checked: value === option[labelKey], disabled: disabled }"
      v-for="option in options"
      :for="`${uniqueName}_${option[labelKey]}`"
      :key="option[labelKey]"
      tabindex="0"
    >
      <Radio
        :id="`${uniqueName}_${option[labelKey]}`"
        :name="uniqueName"
        :inputValue="option[labelKey]"
        :value="value"
        @change="onChange"
        :disabled="disabled"
      >
        {{ option[nameKey] }}
      </Radio>
    </label>
  </div>
</template>

<script>
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import every from 'lodash/every';
import shortid from 'shortid';
import Radio from '@/components/ui/Radio';

export default {
  name: 'RadioGroup',
  components: { Radio },
  props: {
    value: [String, Object, Number],
    labelKey: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    onChange(value) {
      if (this.disabled) {
        return;
      }
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" src="./RadioGroup.scss" scoped />

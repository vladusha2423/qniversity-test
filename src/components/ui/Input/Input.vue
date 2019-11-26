<template>
  <div class="input-block">
    <input
      v-if="!multiline"
      v-model="storedValue"
      class="input"
      :class="{ active: isActive, disabled, 'no-margin': noMargin, hasError, success }"
      :id="inputId"
      :name="name"
      :type="type"
      :required="required"
      :disabled="disabled"
    />

    <textarea
      v-if="multiline"
      v-model="storedValue"
      class="input multiline"
      rows="4"
      :class="{ active: isActive, disabled, 'no-margin': noMargin, hasError, success }"
      :id="inputId"
      :name="name"
      :required="required"
      :disabled="disabled"
    ></textarea>

    <label class="label" :class="{ active: isActive }" :for="inputId" v-if="placeholder">
      {{ placeholder }}
    </label>

    <span class="error" v-if="hasError">
      {{ errorText }}
    </span>
  </div>
</template>

<script>
import shortid from 'shortid';
export default {
  props: {
    name: String,
    success: Boolean,
    hasError: Boolean,
    required: Boolean,
    multiline: Boolean,
    noMargin: Boolean,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    errorText: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    storedValue: '',
    inputId: `input_${shortid()}`,
  }),
  created() {
    this.storedValue = this.value;
  },
  computed: {
    isActive() {
      return !!this.storedValue;
    },
  },
  watch: {
    storedValue(value) {
      this.$emit('input', value);
    },
    value(newValue) {
      this.storedValue = newValue;
    },
  },
};
</script>

<style lang="scss" src="./Input.scss" scoped />

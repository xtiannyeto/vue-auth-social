<template>
  <input
    :id="inputId"
    type="checkbox"
    v-bind="$attrs"
    :checked="modelValue"
    :placeholder="label"
    @change="changeCheck($event.target.checked)"
    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
  />
  <label v-if="label" class="block text-sm font-medium text-gray-700 ml-2">
    {{ label }}
  </label>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    id: String,
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const checked = ref(props['modelValue']);
    function changeCheck(value: boolean) {
      checked.value = value;
      emit('update:modelValue', value);
    }
    return { checked, changeCheck };
  },
  computed: {
    inputId(): string {
      return `${this.id}${this.label}`;
    }
  }
});
</script>
<style lang="scss" scoped></style>

<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <textarea
      :id="areaId"
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="label"
      rows="3"
      @input="$emit('update:modelValue', $event.target.value)"
      class="mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm "
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseArea',
  props: {
    id: String,
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String],
      default: ''
    }
  },
  computed: {
    areaId(): string {
      return `${this.id}${this.label}`;
    }
  }
});
</script>
<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>

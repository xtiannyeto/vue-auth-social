<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="placeHolder"
      @input="$emit('update:modelValue', $event.target.value)"
      class="mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    id: String,
    label: {
      type: String,
      default: ''
    },
    placeHolder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    autocomplete: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputId(): string {
      return `${this.id}${this.label}`;
    }
  }
});
</script>

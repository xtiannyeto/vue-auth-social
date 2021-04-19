<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <select
      :value="modelValue"
      v-bind="{
        ...$attrs,
        onChange: $event => {
          $emit('update:modelValue', $event.target.value);
        }
      }"
      :id="inputId"
      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option
        v-for="option in options"
        :value="pairs ? option[0] : option"
        :key="pairs ? option[0] : option"
        :selected="pairs ? option[0] === modelValue : option === modelValue"
      >
        {{ pairs ? option[1] : option }}
      </option>
    </select>
  </div>
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
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    pairs: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputId(): string {
      return `${this.id}${this.label}`;
    }
  }
});
</script>

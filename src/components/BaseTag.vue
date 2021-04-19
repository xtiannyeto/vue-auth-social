<template>
  <span
    :class="bgTextColor"
    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
  >
    <slot></slot>
  </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

const colors = ['green', 'red', 'blue', 'indigo'];

export default defineComponent({
  name: 'BaseTag',
  props: {
    color: {
      type: String,
      validator: (value: string) => {
        return colors.indexOf(value) !== -1;
      }
    }
  },
  computed: {
    bgTextColor(): string {
      return `bg-${this.color}-100 text-${this.color}-800`;
    }
  }
});
</script>

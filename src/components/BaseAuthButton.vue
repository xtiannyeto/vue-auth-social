<template>
  <button
    :class="mainColor"
    class="inline-flex justify-center py-2 px-4 border text-sm font-medium rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 h-14 items-center"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'indigo'
    }
  },
  computed: {
    mainColor(): string {
      return `bg-${this.color}-600 hover:bg-${this.color}-700 focus:ring-${this.color}-500 border-gray-300 `;
    }
  }
});
</script>

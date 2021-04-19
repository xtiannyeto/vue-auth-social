<template>
  <div
    :id="chipId"
    class="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-indigo-100 bg-indigo-500 border border-indigo-500 "
  >
    <div class="text-xs font-normal leading-none max-w-full flex-initial">
      {{ label }}
    </div>
    <div class="flex flex-auto flex-row-reverse">
      <div v-if="xIcon">
        <x-icon
          class="cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2"
          @click.prevent="$emit('delete')"
        ></x-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { XIcon } from '@zhuowenli/vue-feather-icons';

export default defineComponent({
  components: {
    XIcon
  },
  props: {
    id: String,
    label: {
      type: String,
      default: ''
    },
    xIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    chipId(): string {
      return `${this.id}${this.label}`;
    }
  }
});
</script>
<style lang="scss" scoped></style>

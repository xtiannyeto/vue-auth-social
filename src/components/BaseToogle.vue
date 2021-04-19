<template>
  <div class="flex flex-col">
    <label for="checked" class="mt-3 inline-flex items-center cursor-pointer">
      <span class="relative">
        <span
          class="block w-10 h-6 rounded-lg shadow-inner"
          :class="checked ? 'bg-indigo-200' : 'bg-gray-200'"
        ></span>
        <span
          class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out "
          :class="
            checked ? 'bg-indigo-500 transform translate-x-full' : 'bg-white '
          "
        >
          <input
            id="checked"
            type="checkbox"
            class="absolute opacity-0 w-0 h-0"
            :checked="modelValue"
            @change="changeCheck($event.target.checked)"
          />
        </span>
      </span>
      <span class="ml-3 text-sm"></span>
    </label>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
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
  }
});
</script>
<style lang="scss" scoped></style>

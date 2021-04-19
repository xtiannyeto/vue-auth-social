<template>
  <div class="relavive">
    <div
      class="absolute z-40 bottom-2 left-1/3 w-2/12"
      :class="
        show
          ? 'ease-out duration-300 opacity-100'
          : 'ease-in duration-200 opacity-0'
      "
    >
      <div
        :class="bgTextColor"
        class="w-full flex flex-row border px-4 py-3 rounded relative justify-between items-start"
        role="alert"
      >
        <span class="">
          <check-icon size="1.5x" v-if="status === 'success'"></check-icon>
          <alert-triangle-icon size="1.5x" v-if="status === 'error'">
          </alert-triangle-icon>
          <alert-circle-icon size="1.5x" v-if="status === 'warning'">
          </alert-circle-icon>
          <info-icon size="1.5x" v-if="status === 'infos'"></info-icon>
        </span>
        <span class="block sm:inline">{{ message }}</span>
        <span class="cursor-pointer" @click="close()">
          <x-icon class="fill-current h-6 w-6" size="1.5x"></x-icon>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import {
  CheckIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  InfoIcon,
  XIcon
} from '@zhuowenli/vue-feather-icons';

type StatusColor = {
  warning: string;
  error: string;
  success: string;
  infos: string;
};
const statusColors = {
  warning: 'orange',
  error: 'red',
  success: 'green',
  infos: 'indigo'
} as StatusColor;

export default defineComponent({
  name: 'BaseAlert',
  components: {
    CheckIcon,
    AlertTriangleIcon,
    AlertCircleIcon,
    InfoIcon,
    XIcon
  },
  props: {
    message: String,
    color: String,
    status: {
      type: String,
      default: 'infos',
      validator: (value: string) => {
        return ['warning', 'error', 'success', 'infos'].indexOf(value) !== -1;
      }
    }
  },
  setup(props, { emit }) {
    const show = ref(true);
    const mainColor = computed(() =>
      props.color
        ? props.color
        : statusColors[props.status as keyof StatusColor]
    );

    function close() {
      show.value = false;
      emit('close');
    }

    setTimeout(() => {
      close();
    }, 2000);
    return { mainColor, show, close };
  },
  computed: {
    bgTextColor(): string {
      return `bg-${this.mainColor}-100 text-${this.mainColor}-700 `;
    }
  }
});
</script>

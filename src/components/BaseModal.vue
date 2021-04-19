<template>
  <div class="fixed z-50 inset-0 overflow-y-auto">
    <div
      :class="
        isOpen
          ? 'ease-out duration-300 opacity-100'
          : 'ease-in duration-200 opacity-0'
      "
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
              Background overlay, show/hide based on modal state.

              Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
            -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <!--
                Modal panel, show/hide based on modal state.

                Entering: "ease-out duration-300"
                  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                  From: "opacity-100 translate-y-0 sm:scale-100"
                  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              -->
      <div
        :class="
          isOpen
            ? 'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100'
            : 'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
        "
        class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="flex pt-2 pr-2 justify-end text-gray-500">
          <x-icon
            :class="disabled ? 'disabled' : ''"
            class="cursor-pointer"
            @click.prevent="close"
            size="1.5x"
          ></x-icon>
        </div>
        <div class="bg-white px-4 pt-2 pb-4">
          <div class="flex flex-col items-center">
            <div
              v-if="icon"
              :class="bgTextColor"
              class="mx-auto my-1 flex items-center justify-center h-14 w-14 rounded-full"
            >
              <check-icon size="1.5x" v-if="status === 'success'"></check-icon>
              <alert-triangle-icon size="1.5x" v-if="status === 'error'">
              </alert-triangle-icon>
              <alert-circle-icon size="1.5x" v-if="status === 'warning'">
              </alert-circle-icon>
              <info-icon size="1.5x" v-if="status === 'infos'"></info-icon>
            </div>
          </div>
          <div>
            <slot></slot>
          </div>
          <div
            v-if="isAsk"
            class="px-4 py-3 flex flex-row justify-items-stretch"
          >
            <button
              @click.prevent="answer(false)"
              type="button"
              class="mt-3 w-1/2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:text-sm"
            >
              Cancel
            </button>
            <button
              :class="buttonColor"
              @click.prevent="answer(true)"
              type="button"
              class="w-1/2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:text-sm"
            >
              Ok
            </button>
          </div>
        </div>
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

const colors = ['green', 'red', 'blue', 'indigo', 'orange'];
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
  name: 'BaseModal',
  components: {
    CheckIcon,
    AlertTriangleIcon,
    AlertCircleIcon,
    InfoIcon,
    XIcon
  },
  props: {
    isAsk: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: 'infos',
      validator: (value: string) => {
        return ['warning', 'error', 'success', 'infos'].indexOf(value) !== -1;
      }
    },
    color: {
      type: String,
      validator: (value: string) => {
        return colors.indexOf(value) !== -1;
      }
    },
    disabled: Boolean,
    icon: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const isOpen = ref(true);
    const mainColor = computed(() =>
      props.color
        ? props.color
        : statusColors[props.status as keyof StatusColor]
    );
    return { mainColor, isOpen };
  },
  computed: {
    bgTextColor(): string {
      return `bg-${this.mainColor}-100 text-${this.mainColor}-600`;
    },
    textColor(): string {
      return `text-${this.mainColor}-600`;
    },
    buttonColor(): string {
      return `bg-${this.mainColor}-600 hover:bg-${this.mainColor}-700 focus:ring-${this.mainColor}-500 focus:ring-${this.mainColor}-500 `;
    }
  },
  methods: {
    answer(response: boolean) {
      this.isOpen = false;
      this.$emit('response', response);
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
});
</script>

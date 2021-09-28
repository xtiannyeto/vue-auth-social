<template>
  <div id="app" class="h-full static flex flex-col dark:bg-black">
    <div class="w-full h-2/5">
      <div class="flex flex-row justify-end font-bold text-md px-12 py-4">
        <a class="mx-4 dark:text-white" :href="githubLink">Github</a>
        <a class="mx-4 dark:text-white" :href="npmLink">npm</a>
        <span class="cursor-pointer dark:text-white" @click="modeChange">
          <sun-icon v-if="darkMode" size="1.5x" class="custom-class"></sun-icon>
          <moon-icon
            v-if="!darkMode"
            size="1.5x"
            class="custom-class"
          ></moon-icon>
        </span>
      </div>
      <h1
        class="mt-32 text-center text-5xl font-bold leading-7 text-gray-900 dark:text-white"
      >
        Vue Auth Social
      </h1>
    </div>
    <div
      class="flex justify-evenly h-1/5 py-16 px-14 text-center dark:text-white"
    >
      <div class="w-1/4 sm:w-1/5">
        <GoogleAuth :clientId="googleClientId" @on-submit="handleResponse">
          <h3 class="text-xl font-bold mb-4 hover:underline">Google</h3>
        </GoogleAuth>
      </div>
      <div class="w-1/4 sm:w-1/5">
        <FacebookAuth :appId="facebookAppId" @on-submit="handleResponse">
          <h3 class="text-xl font-bold mb-4 hover:underline">Facebook</h3>
        </FacebookAuth>
      </div>
      <div class="w-1/4 sm:w-1/5">
        <Auth
          ref="authRef"
          :logo="'https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'"
          :color="'green'"
          :userPassword="true"
          :facebookAppId="facebookAppId"
          :googleClientId="googleClientId"
          @on-google="handleResponse"
          @on-facebook="handleResponse"
          @on-signin="handleResponse"
          @on-signup="handleResponse"
        >
          <h3 class="text-xl font-bold mb-4 hover:underline">
            User / Password
          </h3>
        </Auth>
      </div>
    </div>
    <div
      class="bg-gray-100 h-2/5 my-4 dark:bg-gray-700 dark:text-white px-4 py-4 mx-4 rounded-md"
    >
      <h3 class="text-xl font-bold mb-4 text-left">Response</h3>
      <div class="w-full h-5/6 rounded-md overflow-scroll">
        <pre>{{ response }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Auth from '@/components/Auth.vue';
import FacebookAuth from '@/components/FacebookAuth.vue';
import GoogleAuth from '@/components/GoogleAuth.vue';
import { MoonIcon, SunIcon } from '@zhuowenli/vue-feather-icons';

export default defineComponent({
  name: 'App',
  components: {
    Auth,
    FacebookAuth,
    GoogleAuth,
    MoonIcon,
    SunIcon
  },
  setup() {
    const darkMode = ref(false);
    const authRef: any = ref(null);
    const response: any = ref(null);
    const githubLink = 'https://github.com/xtiannyeto/vue-auth-social';
    const npmLink = 'https://www.npmjs.com/package/@xtiannyeto/vue-auth-social';
    const facebookAppId = process.env.VUE_APP_FACEBOOK_APP_ID;
    const googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID;

    function closeAuth() {
      setTimeout(() => {
        authRef.value?.close();
      }, 100);
    }

    function handleResponse(value: any): void {
      response.value = JSON.stringify(value, null, 4);
      closeAuth();
    }

    function modeChange(): void {
      darkMode.value = !darkMode.value;
      if (darkMode.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    return {
      authRef,
      response,
      closeAuth,
      facebookAppId,
      googleClientId,
      handleResponse,
      githubLink,
      npmLink,
      darkMode,
      modeChange
    };
  }
});
</script>

<style lang="scss">
.main-container {
  height: calc(100% - 4.1rem);
}
</style>

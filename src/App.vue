<template>
  <div id="app" class="h-full static flex flex-col">
    <div class="w-full h-2/5">
      <div class="text-right font-bold text-md px-12 py-4">
        <a :href="githubLink">Github</a>
      </div>
      <h1 class="mt-32 text-center text-9xl font-bold leading-7 text-gray-900">
        Vue Auth Social
      </h1>
    </div>
    <div class="flex justify-evenly h-1/5 py-16 px-14 text-center">
      <div class="w-1/4">
        <GoogleAuth :clientId="googleClientId" @on-submit="handleResponse">
          <h3 class="text-3xl font-bold mb-4">Google</h3>
        </GoogleAuth>
      </div>
      <div class="w-1/4">
        <FacebookAuth :appId="facebookAppId" @on-submit="handleResponse">
          <h3 class="text-3xl font-bold mb-4">Facebook</h3>
        </FacebookAuth>
      </div>
      <div class="w-1/4">
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
          <h3 class="text-3xl font-bold mb-4">User / Password</h3>
        </Auth>
      </div>
    </div>
    <div class="w-full h-2/5 px-40 py-4">
      <h3 class="text-3xl font-bold mb-4 text-center">Response</h3>
      <div class="bg-gray-100 w-full h-5/6 rounded-md overflow-scroll">
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

export default defineComponent({
  name: 'App',
  components: {
    Auth,
    FacebookAuth,
    GoogleAuth
  },
  setup() {
    const authRef: any = ref(null);
    const response: any = ref(null);
    const githubLink = 'https://github.com/xtiannyeto/vue-auth-social';
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
    return {
      authRef,
      response,
      closeAuth,
      facebookAppId,
      googleClientId,
      handleResponse,
      githubLink
    };
  }
});
</script>

<style lang="scss">
.main-container {
  height: calc(100% - 4.1rem);
}
</style>

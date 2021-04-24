<template>
  <div id="app" class="h-full static">
    <div class="main-container">
      <button @click="closeAuth">CLOSE</button>
      <FacebookAuth :appId="facebookAppId" @on-submit="facebook">
        Facebook
      </FacebookAuth>
      <GoogleAuth :clientId="googleClientId" @on-submit="google">
        Google
      </GoogleAuth>
      <Auth
        ref="authRef"
        :logo="'https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'"
        :color="'green'"
        :userPassword="true"
        :facebookAppId="facebookAppId"
        :googleClientId="googleClientId"
        @on-google="google"
        @on-facebook="facebook"
        @on-signin="signin"
        @on-signup="signup"
      >
        Login
      </Auth>
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
    const facebookAppId = '';
    const googleClientId = '';

    function closeAuth() {
      setTimeout(() => {
        console.log('call');
        authRef.value?.close();
      }, 5000);
    }
    return { authRef, closeAuth, facebookAppId, googleClientId };
  },
  methods: {
    google(response: any) {
      console.log(response);
    },
    facebook(response: any) {
      console.log(response);
    },
    signin(response: any) {
      console.log(response.email);
    },
    signup(response: any) {
      console.log(response.email);
    }
  }
});
</script>

<style lang="scss">
.main-container {
  height: calc(100% - 4.1rem);
}
</style>

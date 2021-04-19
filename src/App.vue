<template>
  <div id="app" class="h-full static">
    <div class="main-container">
      <Auth
        :color="'blue'"
        :userPassword="true"
        :facebookAppId="'258641021230701'"
        :googleClientId="'852582397994-fhm8gqu5dqoatgvgvarb5fa694sgpcdd'"
        @on-google-submit="google"
        @on-facebook-submit="facebook"
        @on-signin-submit="signin"
        @on-signup-submit="signup"
      >
        Login
      </Auth>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Auth from '@/components/Auth.vue';

export default defineComponent({
  name: 'App',
  components: {
    Auth
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

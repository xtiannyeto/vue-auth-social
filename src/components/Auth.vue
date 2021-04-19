<template>
  <span
    :class="mainColor"
    class="font-medium cursor-pointer"
    @click="openModal = !openModal"
  >
    <slot></slot>
  </span>

  <BaseModal
    v-if="openModal"
    :status="'infos'"
    :icon="false"
    @close="openModal = false"
  >
    <div>
      <img class="mx-auto h-12 w-auto" :src="logo" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        <span v-if="isLogin">Sign in your account</span>
        <span v-else>Create an account</span>
      </h2>
    </div>
    <div class="px-6">
      <div v-if="userPassword">
        <SignIn
          v-if="isLogin"
          @is-login="isLogin = false"
          @on-submit="responseSignIn"
        />
        <SignUp v-else @is-login="isLogin = true" @on-submit="responseSignUp" />
      </div>
      <div class="grid grid-cols-1 space-y-4 mt-6 mb-6">
        <div v-if="or" class="login-choice">
          <span v-if="isLogin">Or Sign In with</span>
          <span v-else>Or Sign up with</span>
        </div>
        <FacebookAuth
          v-if="facebookAppId"
          :appId="facebookAppId"
          @on-submit="responseFacebook"
        >
          <FacebookButton @click="openModal = true" />
        </FacebookAuth>
        <GithubAuth
          v-if="false"
          :clientId="'304c0f60fcd8ca740c12'"
          :redirectUri="'https://localhost:8080/return'"
        >
          <GithubButton @click="openModal = true" />
        </GithubAuth>
        <GoogleAuth
          v-if="googleClientId"
          :clientId="googleClientId"
          @on-submit="responseGoogle"
        >
          <GoogleButton @click="openModal = true" />
        </GoogleAuth>
      </div>
    </div>
  </BaseModal>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import FacebookAuth from '@/components/FacebookAuth.vue';
import GithubAuth from '@/components/GithubAuth.vue';
import GoogleAuth from '@/components/GoogleAuth.vue';
import FacebookButton from '@/components/FacebookButton.vue';
import GithubButton from '@/components/GithubButton.vue';
import GoogleButton from '@/components/GoogleButton.vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';

export default defineComponent({
  name: 'Auth',
  components: {
    FacebookAuth,
    GithubAuth,
    GoogleAuth,
    FacebookButton,
    GithubButton,
    GoogleButton,
    SignIn,
    SignUp
  },
  props: {
    color: {
      type: String,
      default: 'indigo'
    },
    logo: {
      type: String,
      default: 'https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
    },
    facebookAppId: String,
    googleClientId: String,
    userPassword: Boolean
  },
  setup(props, { emit }) {
    const openModal = ref(false);
    const isLogin = ref(true);

    const or = computed(
      () => props.userPassword && (props.facebookAppId || props.googleClientId)
    );

    function responseGoogle(response: any) {
      emit('on-google-submit', response);
    }

    function responseFacebook(response: any) {
      emit('on-facebook-submit', response);
    }

    function responseSignIn(response: any) {
      emit('on-signin-submit', response);
    }

    function responseSignUp(response: any) {
      emit('on-signup-submit', response);
    }

    return {
      openModal,
      isLogin,
      or,
      responseGoogle,
      responseFacebook,
      responseSignIn,
      responseSignUp
    };
  },
  computed: {
    mainColor(): string {
      return `text-${this.color}-700 hover:text-${this.color}-500`;
    },
    textColor(): string {
      return `text-${this.color}-700`;
    }
  }
});
</script>
<style lang="scss" scoped>
.login-choice span {
  color: #5b6987;
  display: -ms-grid;
  display: grid;
  font-size: 16px;
  width: 100%;
  line-height: 40px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  -ms-grid-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
  grid-template-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
  grid-gap: 19px;
}
.login-choice span:after,
.login-choice span:before {
  content: '';
  border-top: 1px solid #e5e8ed;
}
</style>

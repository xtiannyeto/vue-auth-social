<template>
  <span @click="signIn">
    <slot></slot>
    {{ error }}
  </span>
</template>
<script lang="ts">
import { installGoogleAuth } from '@/config/GoogleAuth';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'GoogleAuth',
  props: {
    clientId: String
  },
  setup(props, { emit }) {
    let gAuth: any = null;
    const error = ref('');

    function signIn() {
      error.value = '';
      if (!gAuth) return;
      gAuth
        .signIn()
        .then((googleUser: any) => {
          emit('on-submit', googleUser);
          console.log('GoogleUser', googleUser);
          console.log('getId', googleUser.getId());
          console.log('getBasicProfile', googleUser.getBasicProfile());
          console.log('getAuthResponse', googleUser.getAuthResponse());
        })
        .catch((e: any) => {
          error.value = 'something went wrong...';
          console.log('error', e);
        });
    }

    function signOut() {
      gAuth.signOut();
    }

    const options = {
      clientId: `${props.clientId}.apps.googleusercontent.com`,
      scope: 'profile email',
      prompt: 'select_account'
    };
    onMounted(async () => {
      gAuth = await installGoogleAuth(options);
    });

    return { signIn, error, signOut };
  }
});
</script>

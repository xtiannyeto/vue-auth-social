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
  emits: ['on-submit'],
  setup(props, { emit }) {
    let gAuth: any = null;
    const error = ref('');

    function signIn() {
      error.value = '';
      if (!gAuth) return;
      gAuth
        .signIn()
        .then((googleUser: any) => {
          const user = {
            id: googleUser?.getBasicProfile()?.getId(),
            email: googleUser?.getBasicProfile()?.getEmail(),
            name: googleUser?.getBasicProfile()?.getName(),
            picture: googleUser?.getBasicProfile()?.getImageUrl(),
            googleUser: googleUser
          };
          emit('on-submit', user);
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

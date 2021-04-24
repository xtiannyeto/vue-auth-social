<template>
  <span @click="signIn">
    <slot></slot>
  </span>
</template>
<script lang="ts">
import { initFacebook, login, logout } from '@/config/FaceBookAuth';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'FacebookAuth',
  props: {
    appId: String
  },
  emits: ['on-submit'],
  setup(props, { emit }) {
    async function signIn() {
      const response = await login();
      emit('on-submit', response);
    }

    async function signOut() {
      logout();
    }

    onMounted(async () => {
      initFacebook(props.appId);
    });
    return { signIn, signOut };
  }
});
</script>

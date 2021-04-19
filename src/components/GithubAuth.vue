<template>
  <a :href="url">
    <slot></slot>
  </a>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'GithubAuth',
  props: {
    clientId: String,
    redirectUri: String
  },
  setup(props) {
    const url = `https://github.com/login/oauth/authorize?scope=user&client_id=${props.clientId}&redirect_uri=${props.redirectUri}`;
    onMounted(async () => {
      console.log('sign in /.');
    });
    return { url };
  }
});
</script>

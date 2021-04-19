<template>
  <form>
    <div class="my-4">
      <BaseInput
        :disabled="!enabled"
        :type="'email'"
        :id="'signIn-email'"
        v-model="email.value.value"
        label="Email address"
      />
      <span class="text-red-500 font-medium text-sm">{{
        form.errors.value.email
      }}</span>
    </div>

    <div class="my-4">
      <BaseInput
        :disabled="!enabled"
        :type="'password'"
        :id="'signIn-password'"
        v-model="password.value.value"
        label="Password"
      />
      <span class="text-red-500 font-medium text-sm">
        {{ form.errors.value.password }}
      </span>
    </div>
    <div class="py-2 relative cursor-pointer">
      <a
        @click="$emit('is-login')"
        class="absolute right-2 font-medium text-indigo-600 hover:text-indigo-500"
      >
        I dont have an account yet?
      </a>
    </div>
    <div class="mt-8">
      <BaseButton
        @click.prevent="submitForm"
        class="w-full"
        :disabled="!isFormValid"
        >Sign in</BaseButton
      >
    </div>
  </form>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { defineRule, useField, useForm } from 'vee-validate';
import { required, email, min, confirmed } from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('confirmed', confirmed);

export default defineComponent({
  name: 'SignIn',
  components: {},
  props: {
    enabled: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const form = useForm();
    const email = useField<string>('email', 'required|email');
    const password = useField<string>('password', 'required');
    const isFormValid = computed(() => form.meta.value.valid);
    function submitForm() {
      console.log(form.values);
      emit('on-submit', form.values);
    }
    return {
      form,
      email,
      password,
      isFormValid,
      submitForm
    };
  }
});
</script>
<style lang="scss" scoped></style>

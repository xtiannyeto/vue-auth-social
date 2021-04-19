<template>
  <form>
    <div class="my-4">
      <BaseInput
        :disabled="!enabled"
        :type="'email'"
        :id="'signIn-email'"
        v-model="email.value.value"
        label="Email"
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
        {{ form.errors.value.password }}</span
      >
    </div>
    <div class="my-4">
      <BaseInput
        :disabled="!enabled"
        :type="'password'"
        :id="'signIn-confirm'"
        v-model="confirm.value.value"
        label="Confirm password"
      />
      <span class="text-red-500 font-medium text-sm">
        {{ form.errors.value.confirm }}
      </span>
    </div>

    <div class="py-2 relative cursor-pointer">
      <a
        @click="$emit('is-login')"
        class="absolute right-2 font-medium text-indigo-600 hover:text-indigo-500"
      >
        I already have an account?
      </a>
    </div>
    <div class="mt-8">
      <BaseButton
        @click.prevent="submitForm"
        class="w-full"
        :disabled="!isFormValid"
        >Sign up</BaseButton
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
    const password = useField<string>('password', 'required|min:8');
    const confirm = useField<string>('confirm', 'confirmed:@password');
    const isFormValid = computed(() => form.meta.value.valid);

    function submitForm() {
      console.log(form.values);
      emit('on-submit', form.values);
    }

    return {
      form,
      email,
      password,
      confirm,
      isFormValid,
      submitForm
    };
  }
});
</script>
<style lang="scss" scoped></style>

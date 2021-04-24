<template>
  <form>
    <div class="my-2">
      <BaseAuthInput
        :color="color"
        :disabled="!enabled"
        :type="'email'"
        :id="'signin-email'"
        :placeHolder="'E.g thomas.blondy@social.com'"
        v-model="email.value.value"
        label="Email address"
      />
      <span class="text-red-500 font-medium text-sm">{{
        form.errors.value.email
      }}</span>
    </div>

    <div class="my-2">
      <BaseAuthInput
        :color="color"
        :disabled="!enabled"
        :type="'password'"
        :id="'current-password'"
        :placeHolder="'Xyz@#%$!'"
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
        :class="mainColor"
        class="absolute right-2 font-medium"
      >
        I dont have an account yet
      </a>
    </div>
    <div class="mt-6">
      <BaseAuthButton
        :color="color"
        @click.prevent="submitForm"
        class="w-full"
        :disabled="!isFormValid"
      >
        <span class="text-lg ml-4">Sign in</span>
      </BaseAuthButton>
    </div>
  </form>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { defineRule, useField, useForm } from 'vee-validate';
import { required, email, min, confirmed } from '@vee-validate/rules';
import BaseAuthButton from '@/components/BaseAuthButton.vue';
import BaseAuthInput from '@/components/BaseAuthInput.vue';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('confirmed', confirmed);

export default defineComponent({
  name: 'SignIn',
  components: {
    BaseAuthButton,
    BaseAuthInput
  },
  props: {
    enabled: {
      type: Boolean,
      default: true
    },
    color: String
  },
  setup(props, { emit }) {
    const form = useForm();
    const email = useField<string>('email', 'required|email');
    const password = useField<string>('password', 'required');
    const isFormValid = computed(() => form.meta.value.valid);
    function submitForm() {
      emit('on-submit', form.values);
    }
    return {
      form,
      email,
      password,
      isFormValid,
      submitForm
    };
  },
  computed: {
    mainColor(): string {
      return `text-${this.color}-600 hover:text-${this.color}-500`;
    }
  }
});
</script>
<style lang="scss" scoped></style>

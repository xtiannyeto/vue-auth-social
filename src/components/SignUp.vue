<template>
  <form>
    <div class="my-2">
      <BaseAuthInput
        :color="color"
        :disabled="!enabled"
        :type="'email'"
        :id="'signup-email'"
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
        :id="'signup-password'"
        :placeHolder="'Xyz@#%$!'"
        v-model="password.value.value"
        label="Password"
      />
      <span class="text-red-500 font-medium text-sm">
        {{ form.errors.value.password }}
      </span>
    </div>
    <div class="my-2">
      <BaseAuthInput
        :color="color"
        :disabled="!enabled"
        :type="'password'"
        :id="'signu-confirm'"
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
        :class="mainColor"
        class="absolute right-2 font-medium"
      >
        I already have an account
      </a>
    </div>
    <div class="mt-8">
      <BaseAuthButton
        :color="color"
        @click.prevent="submitForm"
        class="w-full"
        :disabled="!isFormValid"
      >
        <span class="text-lg ml-4">Sign up</span>
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
    const password = useField<string>('password', 'required|min:8');
    const confirm = useField<string>('confirm', 'confirmed:@password');
    const isFormValid = computed(() => form.meta.value.valid);

    function submitForm() {
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
  },
  computed: {
    mainColor(): string {
      return `text-${this.color}-600 hover:text-${this.color}-500`;
    }
  }
});
</script>
<style lang="scss" scoped></style>

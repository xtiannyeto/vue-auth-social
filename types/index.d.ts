import { Component } from 'vue';

declare module 'vue-social-auth' {
  export const Auth: Component;
  export const GoogleAuth: Component;
  export const FacebookAuth: Component;
  export const SignIn: Component;
  export const SignUp: Component;
}

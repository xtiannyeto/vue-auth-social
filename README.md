# @xtiannyeto/vue-auth-social

Use social authentication Facebook / Google with Vue 3 composition api

## Installation

Use the package manager [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) to install vue-auth-social.

```bash
yarn add @xtiannyeto/vue-auth-social
npm install @xtiannyeto/vue-auth-social
```

## Usage

### Facebook Auth
```html
 <FacebookAuth :appId="facebookAppId" @on-submit="facebook">
    Facebook <!-- Whatever you want event your own custom button-->
 </FacebookAuth>
```

```typescript
import { defineComponent } from 'vue';
import { FacebookAuth } from '@xtiannyeto/vue-auth-social';

export default defineComponent({
  name: 'xxx',
  components: {
    ...
    FacebookAuth,
    ...
  },
  setup() {
    const facebookAppId = process.env.FACEBOOK_APP_ID; // your facebook application ID
    return { facebookAppId };
  },
  methods: {
    facebook(event: any) {
      console.log(event); // event response handler
    }
  }
});
```

### Google Auth
```html
 <GoogleAuth :clientId="googleClientId" @on-submit="google">
    Google <!-- Whatever you want, even your own custom button -->
 </GoogleAuth>
```

```typescript
import { defineComponent } from 'vue';
import { GoogleAuth } from '@xtiannyeto/vue-auth-social';

export default defineComponent({
  name: 'xxx',
  components: {
    ...
    GoogleAuth,
    ...
  },
  setup() {
    const googleClientId = process.env.GOOGLE_CLIENT_ID; // your Google Client ID
    return { googleClientId };
  },
  methods: {
    google(event: any) {
      console.log(event); // event response handler
    }
  }
});
```

### Use Auth Modal

```html
 <Auth ref="authRef"
    :logo="YOUR_ICON_PATH"
    :color="MAIN_COLOR" <!-- tailwind color, indigo by default -->
    :facebookAppId="facebookAppId"
    :googleClientId="googleClientId"
    @on-google="google"
    @on-facebook="facebook">
     Login <!-- Whatever you want, even your own custom button -->
 </Auth>
```

```typescript
import { defineComponent } from 'vue';
import { Auth } from '@xtiannyeto/vue-auth-social';

export default defineComponent({
  name: 'xxx',
  components: {
    Auth
  },
  setup() {
    const facebookAppId = process.env.FACEBOOK_APP_ID; // your application ID
    const googleClientId = process.env.GOOGLE_CLIENT_ID; // your Google Client ID
    return { googleClientId, facebookAppId };
  },
  methods: {
    facebook(event: any) {
      console.log(event);
    },
    google(event: any) {
      console.log(event);
    }
  }
});
```

### Use Auth Modal with user / password (No authentication just form handler)
In previe
```html
 <Auth ref="authRef"
    ....
    :color="MAIN_COLOR" 
    :userPassword="true" <!-- active user / Mp auth on modal and register -->
    .......
    .......
    @on-signin="signin" <!-- handle signIn -->
    @on-signup="signup"> <!-- handle signup -->
     Login
 </Auth>
```

```typescript
.....
signIn(event: any) {
  console.log(event);
},
signUp(event: any) {
  console.log(event);
}
.....
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

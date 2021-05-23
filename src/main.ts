import { createApp } from 'vue';
import App from './App.vue';
import './index.scss';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

createApp(App).mount('#app');

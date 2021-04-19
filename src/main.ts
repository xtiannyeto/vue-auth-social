import { createApp } from 'vue';
import App from './App.vue';
import importBase from './Import';
import './index.scss';

importBase(createApp(App)).mount('#app');

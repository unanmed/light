import { createApp } from 'vue';
import App from './App.vue';
import './styles.less';
import './core/index';
import { login } from './core/data/login';

createApp(App).mount('#app');
login('admin35', 'admin123#');

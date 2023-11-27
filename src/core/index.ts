import { init } from './data/init';
import { hook } from './global/hook';
import './view/init';

hook.once('login', () => {
    init();
});

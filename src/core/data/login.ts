import { toFormData } from '../common/utils';
import { LoginResponse, LoginResponseData } from './base';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { hook } from '../global/hook';

let loginData: LoginResponseData;

export async function login(user: string, password: string) {
    const loginForm = toFormData({
        username: user,
        pwd: password
    });
    const { data } = await axios.post<LoginResponse>(
        'http://114.215.99.188:9136/User/Login_NoCode',
        loginForm
    );
    if (data.state !== 0) {
        message.error(data.err);
        return false;
    }
    loginData = data.data!;
    message.success(`${user} 登录成功`);
    hook.emit('login');
    return true;
}

export function getLoginData() {
    if (!loginData) {
        message.error(`当前未登录！`);
        throw new Error(`Cannot access login data before login!`);
    }
    return loginData;
}

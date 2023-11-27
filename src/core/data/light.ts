import { EmitableEvent, EventEmitter } from '../common/eventEmitter';
import { has, toFormData } from '../common/utils';
import { DataSetBase, DeviceResponse, QueryLightMonitorResponse } from './base';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { getLoginData } from './login';

interface LightEvent extends EmitableEvent {}

interface LightData {
    status: boolean;
    brightness: number;
}

export class Light
    extends EventEmitter<LightEvent>
    implements LightData, DataSetBase
{
    status: boolean = true;
    brightness: number = 50;
    code: string;
    statusInfo: [string, string] = ['正常', 'green'];

    constructor(code: string) {
        super();
        this.code = code;
    }

    /**
     * 更新路灯数据
     * @param data 路灯数据
     */
    update(data: Partial<LightData>) {
        has(data.status) && (this.status = data.status);
        has(data.brightness) && (this.brightness = data.brightness);
    }

    /**
     * 重置路灯数据
     */
    reset() {
        this.update({
            status: false,
            brightness: 100
        });
    }

    /**
     * 发送数据
     */
    async post(): Promise<any> {
        const { token } = getLoginData();
        const {
            data: { rFrame, ...setData }
        } = await axios.post<DeviceResponse>(
            'http://114.215.99.188:9136/CommunicationNbTcp/AFN05F2',
            toFormData({
                devAddr: '20F9100200003083',
                lightNos: '1,2,3',
                lightLevel: String(this.status ? this.brightness : 0)
            }),
            {
                headers: {
                    token,
                    password: 'admin123#'
                }
            }
        );
        if (setData.err) {
            message.error(setData.err);
            return;
        }
        await this.sync();
    }

    /**
     * 同步数据
     */
    async sync() {
        const { token } = getLoginData();
        const { data: statusData } =
            await axios.post<QueryLightMonitorResponse>(
                'http://114.215.99.188:9136/Monitor/QueryLightMonitor',
                toFormData({ value: '20F9100200003083' }),
                {
                    headers: {
                        token
                    }
                }
            );
        if (!has(statusData)) {
            message.error('状态数据不存在');
            this.statusInfo = ['状态数据不存在', 'red'];
            return;
        }
        const bright = statusData.data[0].TnLevel1;
        this.brightness = bright;
        this.statusInfo = ['正常', 'green'];
    }
}

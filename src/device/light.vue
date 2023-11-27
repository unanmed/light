<template>
    <Card title="智慧路灯调光设置" class="light">
        <div class="light-data">
            <div class="light-data-item" v-for="(value, key) of lightData">
                <span class="light-item-name">{{ dataName[key] }}</span>
                <span class="light-item-value" :style="{ color: value[1] }">{{
                    value[0]
                }}</span>
            </div>
            <Divider class="divider"></Divider>
            <Slider
                class="slider"
                :min="0"
                :max="100"
                :step="5"
                v-model:value="bright"
            ></Slider>
            <span class="light-setter">
                <Switch
                    v-model:checked="enable"
                    checked-children="开"
                    un-checked-children="关"
                ></Switch>
                <Button @click="setBright" type="primary">修改亮度</Button>
            </span>
        </div>
    </Card>
</template>

<script lang="ts" setup>
import { GameUi } from '../core/view/ui';
import { Light } from '../core/data/light';
import { Card, Divider, Slider, Button, message, Switch } from 'ant-design-vue';
import { reactive, ref } from 'vue';

type DataKey = 'code' | 'status' | 'brightness';

const props = defineProps<{
    num: number;
    ui: GameUi;
    light: Light;
}>();

const lightData = reactive<Record<DataKey, [string | number, string]>>({
    code: [props.light.code, 'black'],
    status: props.light.statusInfo,
    brightness: [props.light.brightness, 'black']
});
const dataName = {
    code: '控制器编号',
    status: '状态',
    brightness: '亮度'
};
const bright = ref(props.light.brightness);
const enable = ref(props.light.status);

async function setBright() {
    props.light.update({
        status: enable.value,
        brightness: bright.value
    });
    await props.light.post();
    message.success('修改成功');
    lightData.brightness[0] = props.light.brightness;
    lightData.status[0] = props.light.statusInfo[0];
}
</script>

<style lang="less" scoped>
.light {
    user-select: none;
    font-size: 100%;
    width: 300px;
}

.light-data {
    display: flex;
    flex-direction: column;
    align-items: center;

    .light-data-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;

        .light-item-name {
            flex-basis: 50%;
            text-align: end;
            padding-right: 8px;
            border: 1px solid #bbb4;
        }

        .light-item-value {
            flex-basis: 50%;
            text-align: start;
            padding-left: 8px;
            border: 1px solid #bbb4;
        }
    }

    .divider {
        margin: 8px;
    }

    .slider {
        width: 100%;
    }

    .light-setter {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}
</style>

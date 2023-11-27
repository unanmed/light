<template>
    <div id="main">
        <template v-for="data of mainCard.stack">
            <component
                :is="data.ui.component"
                v-bind="data.vBind ?? {}"
                v-on="data.vOn ?? {}"
            ></component>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { mainCard } from './core/view/init';
</script>

<style lang="less" scoped>
#main {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 8px;
    font-size: 16px;
}
</style>
